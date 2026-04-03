import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const inputSvgPath = path.join(
  rootDir,
  '547227273_122137993856924986_8556302376693794118_n.svg'
);
const outputDir = path.join(rootDir, 'source');
const outputSvgPath = path.join(outputDir, 'big-eazy-spindisplay.svg');

const Y_THRESHOLD = 720;

function getApproximateYBounds(pathData) {
  const numericValues = Array.from(
    pathData.matchAll(/-?\d*\.?\d+/g),
    (match) => Number(match[0])
  );

  let minY = Number.POSITIVE_INFINITY;
  let maxY = Number.NEGATIVE_INFINITY;

  for (let index = 1; index < numericValues.length; index += 2) {
    const y = numericValues[index];
    minY = Math.min(minY, y);
    maxY = Math.max(maxY, y);
  }

  return { minY, maxY };
}

async function main() {
  await mkdir(outputDir, { recursive: true });

  const svg = await readFile(inputSvgPath, 'utf8');
  const svgTagMatch = svg.match(/<svg\b[^>]*>/);

  if (!svgTagMatch) {
    throw new Error('Unable to locate the opening <svg> tag in the source file.');
  }

  const pathTags = Array.from(svg.matchAll(/<path\b[^>]*d="([^"]+)"[^>]*\/>/g));

  if (pathTags.length === 0) {
    throw new Error('Unable to locate any <path> tags in the source file.');
  }

  const filteredPaths = pathTags
    .map((match) => {
      const fullTag = match[0];
      const pathData = match[1];
      const bounds = getApproximateYBounds(pathData);

      return {
        fullTag,
        maxY: bounds.maxY
      };
    })
    .filter((entry) => entry.maxY <= Y_THRESHOLD)
    .map((entry) => `  ${entry.fullTag}`);

  if (filteredPaths.length === 0) {
    throw new Error('Filtering removed every path. Check the y-threshold logic.');
  }

  const simplifiedSvg = [
    '<?xml version="1.0" encoding="UTF-8" ?>',
    svgTagMatch[0],
    '<g id="big-eazy-spindisplay">',
    ...filteredPaths,
    '</g>',
    '</svg>',
    ''
  ].join('\n');

  await writeFile(outputSvgPath, simplifiedSvg, 'utf8');

  console.log(
    `Created ${path.relative(rootDir, outputSvgPath)} with ${filteredPaths.length} paths.`
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
