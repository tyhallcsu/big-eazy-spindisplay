import http from 'node:http';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  createReadStream,
  existsSync
} from 'node:fs';
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
  stat,
  writeFile
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { spawn } from 'node:child_process';
import { chromium } from 'playwright';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

const paths = {
  root: rootDir,
  source: path.join(rootDir, 'source'),
  renders: path.join(rootDir, 'renders'),
  simplifiedSvg: path.join(rootDir, 'source', 'big-eazy-spindisplay.svg'),
  glb: path.join(rootDir, 'source', 'big-eazy-spindisplay.glb'),
  preview: path.join(rootDir, 'renders', 'big-eazy-spindisplay-preview.png'),
  mp4: path.join(rootDir, 'renders', 'big-eazy-spindisplay-master.mp4'),
  gif: path.join(rootDir, 'renders', 'big-eazy-spindisplay-preview.gif'),
  contactSheet: path.join(rootDir, 'renders', 'big-eazy-spindisplay-contact-sheet.png'),
  metadata: path.join(rootDir, 'renders', 'big-eazy-spindisplay-master.ffprobe.json')
};

const config = {
  width: 1024,
  height: 1024,
  fps: 30,
  seconds: 8
};

const totalFrames = config.fps * config.seconds;

function spawnProcess(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      cwd: rootDir,
      stdio: ['ignore', 'pipe', 'pipe'],
      ...options
    });

    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });

    child.on('error', reject);
    child.on('close', (code) => {
      if (code === 0) {
        resolve({ stdout, stderr });
        return;
      }

      reject(
        new Error(
          `${command} ${args.join(' ')} failed with exit code ${code}\n${stderr || stdout}`
        )
      );
    });
  });
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();

  switch (extension) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.js':
      return 'application/javascript; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.glb':
      return 'model/gltf-binary';
    case '.png':
      return 'image/png';
    default:
      return 'application/octet-stream';
  }
}

async function startStaticServer() {
  const server = http.createServer(async (request, response) => {
    try {
      const requestPath = decodeURIComponent((request.url || '/').split('?')[0]);
      const normalizedPath = requestPath === '/' ? '/viewer/index.html' : requestPath;
      const candidatePath = path.normalize(path.join(rootDir, normalizedPath));

      if (!candidatePath.startsWith(rootDir)) {
        response.writeHead(403);
        response.end('Forbidden');
        return;
      }

      const fileInfo = await stat(candidatePath);

      if (!fileInfo.isFile()) {
        response.writeHead(404);
        response.end('Not found');
        return;
      }

      response.writeHead(200, {
        'Content-Type': getContentType(candidatePath),
        'Cache-Control': 'no-store'
      });
      createReadStream(candidatePath).pipe(response);
    } catch (error) {
      response.writeHead(404);
      response.end('Not found');
    }
  });

  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  const address = server.address();
  const origin = `http://127.0.0.1:${address.port}`;

  return {
    origin,
    close: () =>
      new Promise((resolve, reject) => {
        server.close((error) => {
          if (error) {
            reject(error);
            return;
          }

          resolve();
        });
      })
  };
}

async function ensureSimplifiedSvg() {
  if (!existsSync(paths.simplifiedSvg)) {
    await spawnProcess('node', ['scripts/derive-simplified-svg.mjs']);
  }

  const svgContents = await readFile(paths.simplifiedSvg, 'utf8');

  if (svgContents.includes('Once You')) {
    throw new Error('The simplified SVG still contains the tagline text.');
  }
}

async function main() {
  await mkdir(paths.source, { recursive: true });
  await mkdir(paths.renders, { recursive: true });

  await ensureSimplifiedSvg();

  const framesDir = await mkdtemp(path.join(tmpdir(), 'big-eazy-frames-'));
  const staticServer = await startStaticServer();

  let browser;

  try {
    browser = await chromium.launch({
      headless: true,
      args: [
        '--enable-webgl',
        '--ignore-gpu-blocklist',
        '--use-angle=swiftshader',
        '--disable-background-timer-throttling'
      ]
    });

    const page = await browser.newPage({
      viewport: { width: config.width, height: config.height },
      deviceScaleFactor: 1
    });

    page.on('console', (message) => {
      if (message.type() === 'error') {
        console.error(`[viewer] ${message.text()}`);
      }
    });

    await page.goto(`${staticServer.origin}/viewer/index.html`, {
      waitUntil: 'networkidle'
    });

    await page.waitForFunction(() => window.sceneApi?.isReady === true, null, {
      timeout: 120000
    });

    await page.evaluate(() => window.sceneApi.setProgress(1 / 16));
    await page.screenshot({ path: paths.preview });

    const glbBase64 = await page.evaluate(() => window.sceneApi.exportGLB());
    await writeFile(paths.glb, Buffer.from(glbBase64, 'base64'));

    for (let frame = 0; frame < totalFrames; frame += 1) {
      const progress = frame / totalFrames;
      const framePath = path.join(
        framesDir,
        `frame-${String(frame).padStart(4, '0')}.png`
      );

      await page.evaluate((value) => {
        window.sceneApi.setProgress(value);
      }, progress);

      await page.screenshot({ path: framePath });

      if (frame % 30 === 0) {
        console.log(`Captured frame ${frame + 1}/${totalFrames}`);
      }
    }

    await spawnProcess('ffmpeg', [
      '-y',
      '-framerate',
      String(config.fps),
      '-i',
      path.join(framesDir, 'frame-%04d.png'),
      '-c:v',
      'libx264',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      paths.mp4
    ]);

    await spawnProcess('ffmpeg', [
      '-y',
      '-i',
      paths.mp4,
      '-vf',
      'fps=12,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse',
      paths.gif
    ]);

    await spawnProcess('ffmpeg', [
      '-y',
      '-i',
      paths.mp4,
      '-vf',
      'fps=1,scale=256:256:flags=lanczos,tile=4x2:padding=10:margin=10:color=black',
      '-frames:v',
      '1',
      paths.contactSheet
    ]);

    const probe = await spawnProcess('ffprobe', [
      '-v',
      'error',
      '-print_format',
      'json',
      '-show_streams',
      '-show_format',
      paths.mp4
    ]);

    await writeFile(paths.metadata, probe.stdout, 'utf8');
  } finally {
    if (browser) {
      await browser.close();
    }

    await staticServer.close();
    await rm(framesDir, { recursive: true, force: true });
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
