import { copyFile } from 'node:fs/promises';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  getLogoDefinition,
  getVariantDefinition,
  logos
} from './render-manifest.mjs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

function parseArgs(argv) {
  const options = {
    all: false,
    logo: null,
    variant: null
  };

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === '--all') {
      options.all = true;
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
    }
  }

  return options;
}

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

function getTargetJobs(options) {
  if (options.all || !options.logo) {
    return Object.keys(logos).flatMap((logoId) =>
      Object.keys(getLogoDefinition(logoId).variants).map((variantId) => ({
        logoId,
        variantId
      }))
    );
  }

  const logo = getLogoDefinition(options.logo);

  if (options.variant) {
    getVariantDefinition(options.logo, options.variant);
    return [
      {
        logoId: options.logo,
        variantId: options.variant
      }
    ];
  }

  return Object.keys(logo.variants).map((variantId) => ({
    logoId: options.logo,
    variantId
  }));
}

async function deriveVariant({ logoId, variantId }) {
  const logo = getLogoDefinition(logoId);
  const { variant } = getVariantDefinition(logoId, variantId);
  const inputSvgPath = path.join(rootDir, logo.sourceSvg);
  const outputSvgPath = path.join(rootDir, variant.derivedSvg);

  await mkdir(path.dirname(outputSvgPath), { recursive: true });

  if (variant.derive.mode === 'copy') {
    await copyFile(inputSvgPath, outputSvgPath);
    console.log(`Copied ${path.relative(rootDir, outputSvgPath)}`);
    return;
  }

  const svg = await readFile(inputSvgPath, 'utf8');
  const svgTagMatch = svg.match(/<svg\b[^>]*>/);

  if (!svgTagMatch) {
    throw new Error(`Unable to locate the opening <svg> tag in ${logo.sourceSvg}.`);
  }

  const pathTags = Array.from(svg.matchAll(/<path\b[^>]*d="([^"]+)"[^>]*\/>/g));

  if (pathTags.length === 0) {
    throw new Error(`Unable to locate any <path> tags in ${logo.sourceSvg}.`);
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
    .filter((entry) => entry.maxY <= variant.derive.maxY)
    .map((entry) => `  ${entry.fullTag}`);

  if (filteredPaths.length === 0) {
    throw new Error(`Filtering removed every path for ${logoId}/${variantId}.`);
  }

  const simplifiedSvg = [
    '<?xml version="1.0" encoding="UTF-8" ?>',
    svgTagMatch[0],
    `<g id="${logoId}-${variantId}">`,
    ...filteredPaths,
    '</g>',
    '</svg>',
    ''
  ].join('\n');

  await writeFile(outputSvgPath, simplifiedSvg, 'utf8');

  for (const excludedSnippet of variant.derive.excludeText || []) {
    if (simplifiedSvg.includes(excludedSnippet)) {
      throw new Error(
        `Derived SVG for ${logoId}/${variantId} still contains excluded text "${excludedSnippet}".`
      );
    }
  }

  console.log(
    `Created ${path.relative(rootDir, outputSvgPath)} with ${filteredPaths.length} paths.`
  );
}

async function main() {
  const options = parseArgs(process.argv.slice(2));
  const jobs = getTargetJobs(options);

  for (const job of jobs) {
    await deriveVariant(job);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
