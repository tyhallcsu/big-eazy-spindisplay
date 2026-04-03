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
  rm,
  stat,
  writeFile
} from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { tmpdir } from 'node:os';
import { chromium } from 'playwright';
import {
  getLogoDefinition,
  getJobSetDefinition,
  getPresetDefinition,
  getResolvedRenderProfile
} from './render-manifest.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const options = {
    examples: false,
    jobSet: null,
    logo: null,
    variant: null,
    preset: null
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--examples') {
      options.examples = true;
      continue;
    }

    if (arg === '--job-set') {
      options.jobSet = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === '--logo') {
      options.logo = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === '--variant') {
      options.variant = argv[index + 1];
      index += 1;
      continue;
    }

    if (arg === '--preset') {
      options.preset = argv[index + 1];
      index += 1;
    }
  }

  return options;
}

function resolveJobs(options) {
  if (options.examples) {
    return getJobSetDefinition('examples').map((job) => ({ ...job }));
  }

  if (options.jobSet) {
    return getJobSetDefinition(options.jobSet).map((job) => ({ ...job }));
  }

  const logoId = options.logo || 'big-eazy';
  const logo = getLogoDefinition(logoId);
  const variantId = options.variant || logo.defaultVariant;
  const presetId = options.preset || 'spindisplay-loop';

  getPresetDefinition(presetId);

  return [
    {
      logo: logoId,
      variant: variantId,
      preset: presetId
    }
  ];
}

function getVariantGlbPath(logoId, variantId) {
  return path.join(rootDir, 'source', logoId, `${variantId}.glb`);
}

function getRenderDir(logoId, variantId, presetId) {
  return path.join(rootDir, 'renders', logoId, variantId, presetId);
}

function getRenderOutputs(logoId, variantId, presetId) {
  const baseDir = getRenderDir(logoId, variantId, presetId);

  return {
    dir: baseDir,
    glb: path.join(baseDir, 'asset.glb'),
    preview: path.join(baseDir, 'preview.png'),
    mp4: path.join(baseDir, 'master.mp4'),
    gif: path.join(baseDir, 'preview.gif'),
    contactSheet: path.join(baseDir, 'contact-sheet.png'),
    metadata: path.join(baseDir, 'ffprobe.json')
  };
}

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
    case '.mjs':
      return 'application/javascript; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    case '.glb':
      return 'model/gltf-binary';
    case '.png':
      return 'image/png';
    case '.gif':
      return 'image/gif';
    case '.mp4':
      return 'video/mp4';
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

  return {
    origin: `http://127.0.0.1:${address.port}`,
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

async function ensureDerivedVariant(logoId, variantId) {
  const logo = getLogoDefinition(logoId);
  const derivedSvg = path.join(rootDir, logo.variants[variantId].derivedSvg);

  if (existsSync(derivedSvg)) {
    return;
  }

  await spawnProcess('node', [
    'scripts/derive-simplified-svg.mjs',
    '--logo',
    logoId,
    '--variant',
    variantId
  ]);
}

async function exportGlbIfNeeded(page, glbPath, glbCache) {
  if (glbCache.has(glbPath)) {
    return;
  }

  await mkdir(path.dirname(glbPath), { recursive: true });

  const glbBase64 = await page.evaluate(() => window.sceneApi.exportGLB());
  await writeFile(glbPath, Buffer.from(glbBase64, 'base64'));
  glbCache.add(glbPath);
}

async function captureAnimationFrames(page, profile, framesDir) {
  const totalFrames = profile.scene.fps * profile.scene.seconds;

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
      console.log(
        `Captured frame ${frame + 1}/${totalFrames} for ${profile.logoId}/${profile.variantId}/${profile.presetId}`
      );
    }
  }
}

async function buildJob(page, origin, job, glbCache) {
  await ensureDerivedVariant(job.logo, job.variant);

  const profile = getResolvedRenderProfile(job.logo, job.variant, job.preset);
  const outputs = getRenderOutputs(job.logo, job.variant, job.preset);
  await mkdir(outputs.dir, { recursive: true });
  const glbPath =
    profile.outputs.glbPathMode === 'preset'
      ? outputs.glb
      : getVariantGlbPath(job.logo, job.variant);

  const url = new URL(`${origin}/viewer/index.html`);
  url.searchParams.set('logo', job.logo);
  url.searchParams.set('variant', job.variant);
  url.searchParams.set('preset', job.preset);

  await page.goto(url.toString(), {
    waitUntil: 'networkidle'
  });

  await page.waitForFunction(() => window.sceneApi?.isReady === true, null, {
    timeout: 120000
  });

  if (profile.outputs.glb) {
    await exportGlbIfNeeded(page, glbPath, glbCache);
  }

  await page.evaluate((value) => {
    window.sceneApi.setProgress(value);
  }, profile.scene.animation.stillProgress);

  if (profile.outputs.preview) {
    await page.screenshot({ path: outputs.preview });
  }

  if (!profile.outputs.mp4 && !profile.outputs.gif && !profile.outputs.contactSheet && !profile.outputs.metadata) {
    return;
  }

  const framesDir = await mkdtemp(path.join(tmpdir(), `${job.logo}-${job.variant}-${job.preset}-`));

  try {
    await captureAnimationFrames(page, profile, framesDir);

    await spawnProcess('ffmpeg', [
      '-y',
      '-framerate',
      String(profile.scene.fps),
      '-i',
      path.join(framesDir, 'frame-%04d.png'),
      '-c:v',
      'libx264',
      '-pix_fmt',
      'yuv420p',
      '-movflags',
      '+faststart',
      outputs.mp4
    ]);

    if (profile.outputs.gif) {
      await spawnProcess('ffmpeg', [
        '-y',
        '-i',
        outputs.mp4,
        '-vf',
        'fps=12,scale=640:-1:flags=lanczos,split[s0][s1];[s0]palettegen[p];[s1][p]paletteuse',
        outputs.gif
      ]);
    }

    if (profile.outputs.contactSheet) {
      await spawnProcess('ffmpeg', [
        '-y',
        '-i',
        outputs.mp4,
        '-vf',
        'fps=1,scale=256:256:flags=lanczos,tile=4x2:padding=10:margin=10:color=black',
        '-frames:v',
        '1',
        outputs.contactSheet
      ]);
    }

    if (profile.outputs.metadata) {
      const probe = await spawnProcess('ffprobe', [
        '-v',
        'error',
        '-print_format',
        'json',
        '-show_streams',
        '-show_format',
        outputs.mp4
      ]);

      await writeFile(outputs.metadata, probe.stdout, 'utf8');
    }
  } finally {
    await rm(framesDir, { recursive: true, force: true });
  }
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const jobs = resolveJobs(options);
  const glbCache = new Set();
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
      viewport: { width: 1024, height: 1024 },
      deviceScaleFactor: 1
    });

    page.on('console', (message) => {
      if (message.type() === 'error') {
        console.error(`[viewer] ${message.text()}`);
      }
    });

    for (const job of jobs) {
      console.log(`Rendering ${job.logo}/${job.variant}/${job.preset}`);
      await buildJob(page, staticServer.origin, job, glbCache);
    }
  } finally {
    if (browser) {
      await browser.close();
    }

    await staticServer.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
