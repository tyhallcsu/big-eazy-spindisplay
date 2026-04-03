import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import {
  getResolvedRenderProfile,
  logos,
  presetDefinitions
} from '../scripts/render-manifest.mjs';

const DEFAULT_LOGO_ID = 'big-eazy';
const DEFAULT_PRESET_ID = 'spindisplay-loop';
const DEFAULT_COLOR_MODE = 'preset';
const STATUS_AUTO_CLEAR_MS = 2200;
const COLOR_MODE_LABELS = {
  preset: 'Preset Colors',
  custom: 'Custom Color',
  'original-svg': 'Original SVG Colors'
};
const PRESET_ASSET_DEFINITIONS = [
  {
    key: 'preview',
    label: 'Download Still',
    outputKey: 'preview',
    fileName: 'preview.png'
  },
  {
    key: 'mp4',
    label: 'Download MP4',
    outputKey: 'mp4',
    fileName: 'master.mp4'
  },
  {
    key: 'gif',
    label: 'Download GIF',
    outputKey: 'gif',
    fileName: 'preview.gif'
  },
  {
    key: 'contactSheet',
    label: 'Download Contact Sheet',
    outputKey: 'contactSheet',
    fileName: 'contact-sheet.png'
  }
];
const surfaceTextureCache = new Map();

function normalizeHexColor(value) {
  if (!value) {
    return null;
  }

  let normalized = String(value).trim().replace(/^#/, '').toLowerCase();

  if (/^[0-9a-f]{3}$/i.test(normalized)) {
    normalized = normalized
      .split('')
      .map((character) => `${character}${character}`)
      .join('');
  }

  if (!/^[0-9a-f]{6}$/i.test(normalized)) {
    return null;
  }

  return normalized;
}

function normalizeColorMode(value) {
  if (value === 'custom' || value === 'original-svg') {
    return value;
  }

  return DEFAULT_COLOR_MODE;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerp(start, end, t) {
  return start + (end - start) * t;
}

function smoothstep(edge0, edge1, value) {
  if (edge0 === edge1) {
    return value >= edge1 ? 1 : 0;
  }

  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - (2 * t));
}

function hexToColor(hex) {
  return new THREE.Color(`#${hex}`);
}

function colorToHex(color) {
  return color.getHexString();
}

function adjustColor(color, overrides = {}) {
  const next = color.clone();
  next.offsetHSL(overrides.h ?? 0, overrides.s ?? 0, overrides.l ?? 0);

  const hsl = { h: 0, s: 0, l: 0 };
  next.getHSL(hsl);
  next.setHSL(
    hsl.h,
    clamp(hsl.s, overrides.minSaturation ?? 0, overrides.maxSaturation ?? 1),
    clamp(hsl.l, overrides.minLightness ?? 0, overrides.maxLightness ?? 1)
  );

  return next;
}

function createReadableSeedColor(hex, mode) {
  const color = hexToColor(hex);
  const hsl = { h: 0, s: 0, l: 0 };
  color.getHSL(hsl);

  if (mode === 'original-svg') {
    if (hsl.l < 0.04) {
      color.setHSL(hsl.h, Math.min(hsl.s, 0.2), 0.26);
      return color;
    }

    if (hsl.l < 0.12) {
      color.setHSL(hsl.h, clamp(hsl.s + 0.04, 0, 1), 0.3);
      return color;
    }

    if (hsl.l < 0.18) {
      color.setHSL(hsl.h, clamp(hsl.s + 0.02, 0, 1), 0.22);
      return color;
    }

    return color;
  }

  if (hsl.l < 0.1) {
    color.setHSL(hsl.h, clamp(hsl.s + 0.06, 0, 1), 0.24);
  }

  return color;
}

function derivePaletteFromHex(hex, mode) {
  const seed = createReadableSeedColor(hex, mode);

  return {
    face: colorToHex(adjustColor(seed, { minLightness: 0.2 })),
    faceEmissive: colorToHex(adjustColor(seed, { l: 0.08, minLightness: 0.32 })),
    side: colorToHex(adjustColor(seed, { l: -0.18, minLightness: 0.08, maxLightness: 0.42 })),
    sideEmissive: colorToHex(
      adjustColor(seed, { l: -0.08, minLightness: 0.14, maxLightness: 0.44 })
    ),
    frame: colorToHex(adjustColor(seed, { l: 0.18, s: -0.08, minLightness: 0.52 })),
    frameEmissive: colorToHex(adjustColor(seed, { l: 0.12, minLightness: 0.42 })),
    halo: colorToHex(adjustColor(seed, { l: 0.22, minLightness: 0.58 })),
    inner: colorToHex(adjustColor(seed, { l: 0.12, minLightness: 0.44 })),
    beam: colorToHex(
      adjustColor(seed, { l: 0.18, s: -0.06, minLightness: 0.5, maxSaturation: 0.9 })
    ),
    sky: colorToHex(adjustColor(seed, { l: 0.34, s: -0.18, minLightness: 0.74 })),
    ground: colorToHex(
      adjustColor(seed, { l: -0.44, s: -0.16, minLightness: 0.01, maxLightness: 0.14 })
    ),
    lower: colorToHex(
      adjustColor(seed, { l: -0.18, s: -0.04, minLightness: 0.08, maxLightness: 0.36 })
    )
  };
}

function applyRuntimePalette(config, palette) {
  config.materials.face.color = `#${palette.face}`;
  config.materials.face.emissive = `#${palette.faceEmissive}`;
  config.materials.face.emissiveIntensity = Math.max(config.materials.face.emissiveIntensity, 0.28);
  config.materials.side.color = `#${palette.side}`;
  config.materials.side.emissive = `#${palette.sideEmissive}`;
  config.materials.side.emissiveIntensity = Math.max(config.materials.side.emissiveIntensity, 0.14);

  if (config.materials.frame.enabled) {
    config.materials.frame.color = `#${palette.frame}`;
    config.materials.frame.emissive = `#${palette.frameEmissive}`;
  }

  if (config.glow.enabled) {
    config.glow.haloColor = `#${palette.halo}`;
    config.glow.innerColor = `#${palette.inner}`;
    config.glow.beamColor = `#${palette.beam}`;
  }

  if (config.baseHalo.enabled) {
    config.baseHalo.color = `#${palette.inner}`;
  }

  if (config.projectionPlate.enabled) {
    config.projectionPlate.color = `#${palette.inner}`;
    config.projectionPlate.underGlowColor = `#${palette.beam}`;
  }

  if (config.lightColumn.enabled) {
    config.lightColumn.color = `#${palette.beam}`;
    config.lightColumn.coreColor = `#${palette.halo}`;
  }

  if (config.shieldPanel.enabled) {
    config.shieldPanel.color = `#${palette.sky}`;
    config.shieldPanel.edgeColor = `#${palette.inner}`;
  }

  if (config.logoOutline.enabled) {
    config.logoOutline.color = `#${palette.halo}`;

    if (config.logoOutline.secondaryColor) {
      config.logoOutline.secondaryColor = `#${palette.inner}`;
    }
  }

  if (config.backplate.enabled) {
    config.backplate.color = `#${palette.ground}`;
    config.backplate.emissive = `#${palette.lower}`;
  }

  if (config.sweepLight.enabled) {
    config.sweepLight.color = `#${palette.halo}`;
  }

  if (config.stadiumBeams.enabled) {
    config.stadiumBeams.color = `#${palette.beam}`;
    config.stadiumBeams.coreColor = `#${palette.halo}`;
  }

  if (config.sequence.mode === 'wireframe-reveal') {
    config.sequence.wireColor = `#${palette.halo}`;
  }

  config.lighting.ambientSky = `#${palette.sky}`;
  config.lighting.ambientGround = `#${palette.ground}`;
  config.lighting.keyColor = `#${palette.halo}`;
  config.lighting.rimColor = `#${palette.inner}`;
  config.lighting.lowerColor = `#${palette.lower}`;
}

function resolveSelection(logoId, variantId, presetId) {
  const resolvedLogoId = logos[logoId] ? logoId : DEFAULT_LOGO_ID;
  const resolvedLogo = logos[resolvedLogoId];
  const resolvedVariantId = resolvedLogo.variants[variantId]
    ? variantId
    : resolvedLogo.defaultVariant;
  const resolvedPresetId = presetDefinitions[presetId] ? presetId : DEFAULT_PRESET_ID;

  return {
    logoId: resolvedLogoId,
    variantId: resolvedVariantId,
    presetId: resolvedPresetId
  };
}

const searchParams = new URLSearchParams(window.location.search);
const requestedLogoId = searchParams.get('logo') || DEFAULT_LOGO_ID;
const requestedVariantId = searchParams.get('variant');
const requestedPresetId = searchParams.get('preset') || DEFAULT_PRESET_ID;
const requestedColorMode = normalizeColorMode(searchParams.get('colorMode'));
const requestedPrimaryColor = normalizeHexColor(searchParams.get('primaryColor'));
const requestedAutoSpin = searchParams.get('autospin') === '1';
const uiParam = searchParams.get('ui');
const SHOW_UI = uiParam === '1' || (uiParam !== '0' && !navigator.webdriver);

const {
  logoId,
  variantId,
  presetId
} = resolveSelection(requestedLogoId, requestedVariantId, requestedPresetId);

const PROFILE = getResolvedRenderProfile(logoId, variantId, presetId);
const BASE_CONFIG = structuredClone(PROFILE.scene);
const BASE_PRIMARY_COLOR = normalizeHexColor(BASE_CONFIG.materials.face.color) || 'ffffff';
const INITIAL_CUSTOM_PRIMARY_COLOR = requestedPrimaryColor || BASE_PRIMARY_COLOR;
const REQUESTED_COLOR_SELECTION = {
  mode: requestedColorMode,
  primaryColor: requestedColorMode === 'custom' ? INITIAL_CUSTOM_PRIMARY_COLOR : null
};

let CONFIG = structuredClone(BASE_CONFIG);

document.title = `${PROFILE.logo.label} ${PROFILE.variant.label} ${PROFILE.preset.label}`;
document.body.style.background = CONFIG.background;
document.body.classList.toggle('viewer-has-ui', SHOW_UI);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false,
  preserveDrawingBuffer: true,
  powerPreference: 'high-performance'
});
renderer.setPixelRatio(1);
renderer.setSize(CONFIG.width, CONFIG.height, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(new THREE.Color(CONFIG.background), 1);
renderer.domElement.style.touchAction = 'none';
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(CONFIG.background);

const camera = new THREE.PerspectiveCamera(
  CONFIG.camera.fov,
  CONFIG.width / CONFIG.height,
  0.1,
  100
);
camera.position.fromArray(CONFIG.camera.position);

const logoRig = new THREE.Group();
scene.add(logoRig);

const stageRig = new THREE.Group();
scene.add(stageRig);

const glowRig = new THREE.Group();
scene.add(glowRig);

let controls;
let autoRotateButton;
let autoRotateActive = false;
let autoRotateFrameId = 0;
let exportStatusElement;
let exportStatusTimeoutId = 0;
let capturePngButton;
let downloadGlbButton;
const presetAssetButtons = new Map();
let glowParts = null;
let stageParts = null;
let logoLayerParts = null;
let sequenceMaterialState = null;
let activeColorState = {
  colorMode: REQUESTED_COLOR_SELECTION.mode,
  primaryColor: REQUESTED_COLOR_SELECTION.primaryColor,
  dominantSvgColor: BASE_PRIMARY_COLOR
};

let ambientLight;
let keyLight;
let rimLight;
let lowerLight;

function syncCanvasDisplaySize() {
  if (!SHOW_UI) {
    renderer.domElement.style.width = '';
    renderer.domElement.style.height = '';
    return;
  }

  const maxWidth = window.innerWidth - 32;
  const maxHeight = window.innerHeight - 32;
  const size = Math.max(180, Math.min(CONFIG.width, maxWidth, maxHeight));

  renderer.domElement.style.width = `${size}px`;
  renderer.domElement.style.height = `${size}px`;
}

function createSelectOptions(records, value) {
  return records.map(({ id, label }) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = label;
    option.selected = id === value;
    return option;
  });
}

function replaceVariantOptions(select, nextLogoId, preferredVariantId) {
  const nextLogo = logos[nextLogoId];
  const variantIds = Object.keys(nextLogo.variants);
  const nextVariantId = variantIds.includes(preferredVariantId)
    ? preferredVariantId
    : nextLogo.defaultVariant;
  const variantOptions = variantIds.map((id) => ({
    id,
    label: nextLogo.variants[id].label
  }));

  select.replaceChildren(...createSelectOptions(variantOptions, nextVariantId));
  select.value = nextVariantId;
}

function createField(labelText, control) {
  const field = document.createElement('label');
  field.className = 'viewer-ui__field';

  const label = document.createElement('span');
  label.className = 'viewer-ui__label';
  label.textContent = labelText;

  field.append(label, control);
  return field;
}

function getColorSelectionFromInputs(colorMode, colorValue) {
  const normalizedMode = normalizeColorMode(colorMode);

  return {
    colorMode: normalizedMode,
    primaryColor:
      normalizedMode === 'custom'
        ? normalizeHexColor(colorValue) || BASE_PRIMARY_COLOR
        : null
  };
}

function buildPreviewUrl(nextSelection) {
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set('logo', nextSelection.logoId);
  nextUrl.searchParams.set('variant', nextSelection.variantId);
  nextUrl.searchParams.set('preset', nextSelection.presetId);

  if (nextSelection.colorMode !== DEFAULT_COLOR_MODE) {
    nextUrl.searchParams.set('colorMode', nextSelection.colorMode);
  } else {
    nextUrl.searchParams.delete('colorMode');
  }

  if (nextSelection.colorMode === 'custom' && nextSelection.primaryColor) {
    nextUrl.searchParams.set('primaryColor', nextSelection.primaryColor);
  } else {
    nextUrl.searchParams.delete('primaryColor');
  }

  if (nextSelection.autoSpin) {
    nextUrl.searchParams.set('autospin', '1');
  } else {
    nextUrl.searchParams.delete('autospin');
  }

  if (uiParam === '1') {
    nextUrl.searchParams.set('ui', '1');
  } else if (uiParam === '0') {
    nextUrl.searchParams.set('ui', '0');
  } else {
    nextUrl.searchParams.delete('ui');
  }

  return nextUrl;
}

function createDetailButton(labelText, metaText) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'viewer-ui__button viewer-ui__button--detail';

  const label = document.createElement('span');
  label.className = 'viewer-ui__button-label';
  label.textContent = labelText;

  const meta = document.createElement('span');
  meta.className = 'viewer-ui__button-meta';
  meta.textContent = metaText;

  button.append(label, meta);
  button._metaElement = meta;

  return button;
}

function setDetailButtonMeta(button, text) {
  if (button?._metaElement) {
    button._metaElement.textContent = text;
  }
}

function setExportStatus(message, tone = 'muted', autoClearMs = 0) {
  if (!exportStatusElement) {
    return;
  }

  if (exportStatusTimeoutId) {
    window.clearTimeout(exportStatusTimeoutId);
    exportStatusTimeoutId = 0;
  }

  exportStatusElement.textContent = message;
  exportStatusElement.dataset.tone = tone;

  if (autoClearMs > 0) {
    exportStatusTimeoutId = window.setTimeout(() => {
      exportStatusElement.textContent = 'Choose an export action.';
      exportStatusElement.dataset.tone = 'muted';
      exportStatusTimeoutId = 0;
    }, autoClearMs);
  }
}

function buildDownloadFileNames() {
  return {
    png: `${PROFILE.logoId}-${PROFILE.variantId}-${PROFILE.presetId}-current-view.png`,
    glb:
      PROFILE.outputs.glbPathMode === 'preset'
        ? `${PROFILE.logoId}-${PROFILE.variantId}-${PROFILE.presetId}.glb`
        : `${PROFILE.logoId}-${PROFILE.variantId}.glb`
  };
}

function resolvePresetAssetDescriptors() {
  return PRESET_ASSET_DEFINITIONS.map((asset) => ({
    ...asset,
    enabledByPreset: Boolean(PROFILE.outputs[asset.outputKey]),
    url: new URL(
      `../renders/${PROFILE.logoId}/${PROFILE.variantId}/${PROFILE.presetId}/${asset.fileName}`,
      window.location.href
    ).toString()
  }));
}

function triggerUrlDownload(url, fileName) {
  const link = document.createElement('a');
  link.href = url;
  link.download = fileName;
  link.rel = 'noopener';
  document.body.append(link);
  link.click();
  link.remove();
}

function triggerBlobDownload(blob, fileName) {
  const objectUrl = URL.createObjectURL(blob);
  triggerUrlDownload(objectUrl, fileName);
  window.setTimeout(() => {
    URL.revokeObjectURL(objectUrl);
  }, 1000);
}

async function probeAssetWithMethod(url, method) {
  try {
    const response = await fetch(url, {
      method,
      cache: 'no-store',
      headers: method === 'GET' ? { Range: 'bytes=0-0' } : undefined
    });

    if (method === 'GET' && response.body) {
      response.body.cancel().catch(() => {});
    }

    if (response.ok || response.status === 206) {
      return true;
    }

    if (method === 'HEAD' && [405, 501].includes(response.status)) {
      return null;
    }

    return false;
  } catch (error) {
    return method === 'HEAD' ? null : false;
  }
}

async function probeAssetAvailability(url) {
  const headResult = await probeAssetWithMethod(url, 'HEAD');

  if (headResult !== null) {
    return headResult;
  }

  return await probeAssetWithMethod(url, 'GET');
}

function setPresetAssetButtonState(button, state) {
  if (!button) {
    return;
  }

  button.disabled = !state.enabled;
  setDetailButtonMeta(button, state.meta);

  if (state.enabled) {
    button.dataset.assetUrl = state.url;
    button.dataset.fileName = state.fileName;
  } else {
    delete button.dataset.assetUrl;
    delete button.dataset.fileName;
  }
}

function setCurrentViewButtonsReady() {
  if (capturePngButton) {
    capturePngButton.disabled = false;
    setDetailButtonMeta(capturePngButton, `${CONFIG.width}x${CONFIG.height} canvas capture`);
  }

  if (downloadGlbButton) {
    downloadGlbButton.disabled = false;
    setDetailButtonMeta(
      downloadGlbButton,
      PROFILE.outputs.glbPathMode === 'preset'
        ? 'Preset-specific 3D asset'
        : 'Variant 3D asset'
    );
  }
}

async function refreshPresetAssetButtons() {
  const descriptors = resolvePresetAssetDescriptors();

  await Promise.all(
    descriptors.map(async (asset) => {
      const button = presetAssetButtons.get(asset.key);

      if (!button) {
        return;
      }

      if (!asset.enabledByPreset) {
        setPresetAssetButtonState(button, {
          enabled: false,
          meta: 'Not part of this preset'
        });
        return;
      }

      setPresetAssetButtonState(button, {
        enabled: false,
        meta: 'Checking availability...'
      });

      const available = await probeAssetAvailability(asset.url);

      if (available) {
        setPresetAssetButtonState(button, {
          enabled: true,
          meta: 'Ready to download',
          url: asset.url,
          fileName: asset.fileName
        });
        return;
      }

      setPresetAssetButtonState(button, {
        enabled: false,
        meta: 'Not generated yet'
      });
    })
  );
}

async function runBusyExport(button, pendingMessage, action) {
  const wasDisabled = button.disabled;
  button.disabled = true;
  setExportStatus(pendingMessage);

  try {
    await action();
    setExportStatus('Downloaded', 'success', STATUS_AUTO_CLEAR_MS);
  } catch (error) {
    console.error(error);
    setExportStatus('Export failed', 'error');
  } finally {
    button.disabled = wasDisabled;
  }
}

function navigateToSelection(nextSelection) {
  const nextUrl = buildPreviewUrl(nextSelection);

  if (nextUrl.toString() === window.location.href) {
    return;
  }

  window.location.assign(nextUrl.toString());
}

function persistAutoSpinPreference() {
  const nextUrl = buildPreviewUrl({
    logoId: PROFILE.logoId,
    variantId: PROFILE.variantId,
    presetId: PROFILE.presetId,
    colorMode: activeColorState.colorMode,
    primaryColor: activeColorState.primaryColor,
    autoSpin: autoRotateActive
  });
  window.history.replaceState({}, '', nextUrl.toString());
}

function mountViewerUi() {
  if (!SHOW_UI) {
    return;
  }

  const panel = document.createElement('section');
  panel.id = 'viewer-ui';

  const title = document.createElement('h1');
  title.textContent = 'Interactive Preview';

  const copy = document.createElement('p');
  copy.textContent =
    'Drag to orbit, scroll to zoom, right-drag to pan, then lock in the preset and color treatment you want to export.';

  const grid = document.createElement('div');
  grid.className = 'viewer-ui__grid';

  const logoSelect = document.createElement('select');
  logoSelect.className = 'viewer-ui__select';
  logoSelect.append(
    ...createSelectOptions(
      Object.entries(logos).map(([id, logo]) => ({
        id,
        label: logo.label
      })),
      logoId
    )
  );

  const variantSelect = document.createElement('select');
  variantSelect.className = 'viewer-ui__select';
  replaceVariantOptions(variantSelect, logoId, variantId);

  const presetSelect = document.createElement('select');
  presetSelect.className = 'viewer-ui__select';
  presetSelect.append(
    ...createSelectOptions(
      Object.entries(presetDefinitions).map(([id, preset]) => ({
        id,
        label: preset.label
      })),
      presetId
    )
  );

  const colorModeSelect = document.createElement('select');
  colorModeSelect.className = 'viewer-ui__select';
  colorModeSelect.append(
    ...createSelectOptions(
      Object.entries(COLOR_MODE_LABELS).map(([id, label]) => ({
        id,
        label
      })),
      activeColorState.colorMode
    )
  );

  const customColorWrap = document.createElement('div');
  customColorWrap.className = 'viewer-ui__inline';

  const colorPicker = document.createElement('input');
  colorPicker.type = 'color';
  colorPicker.className = 'viewer-ui__color';
  colorPicker.value = `#${activeColorState.primaryColor || BASE_PRIMARY_COLOR}`;

  const colorText = document.createElement('input');
  colorText.type = 'text';
  colorText.className = 'viewer-ui__text';
  colorText.inputMode = 'text';
  colorText.spellcheck = false;
  colorText.maxLength = 7;
  colorText.value = (activeColorState.primaryColor || BASE_PRIMARY_COLOR).toUpperCase();
  colorText.setAttribute('aria-label', 'Primary color hex');

  const syncCustomColorInputs = (value, force = false) => {
    const normalized = normalizeHexColor(value);

    if (normalized) {
      colorPicker.value = `#${normalized}`;
      colorText.value = normalized.toUpperCase();
      return normalized;
    }

    if (force) {
      colorPicker.value = `#${BASE_PRIMARY_COLOR}`;
      colorText.value = BASE_PRIMARY_COLOR.toUpperCase();
      return BASE_PRIMARY_COLOR;
    }

    return null;
  };

  colorPicker.addEventListener('input', () => {
    syncCustomColorInputs(colorPicker.value, true);
  });

  colorText.addEventListener('input', () => {
    syncCustomColorInputs(colorText.value, false);
  });

  colorText.addEventListener('blur', () => {
    syncCustomColorInputs(colorText.value, true);
  });

  customColorWrap.append(colorPicker, colorText);
  const customColorField = createField('Primary Color', customColorWrap);

  const syncCustomColorVisibility = () => {
    customColorField.hidden = colorModeSelect.value !== 'custom';
  };

  const navigateWithInputs = () => {
    const colorSelection = getColorSelectionFromInputs(colorModeSelect.value, colorText.value);
    navigateToSelection({
      logoId: logoSelect.value,
      variantId: variantSelect.value,
      presetId: presetSelect.value,
      colorMode: colorSelection.colorMode,
      primaryColor: colorSelection.primaryColor,
      autoSpin: autoRotateActive
    });
  };

  colorModeSelect.addEventListener('change', () => {
    syncCustomColorVisibility();
    navigateWithInputs();
  });
  syncCustomColorVisibility();

  logoSelect.addEventListener('change', () => {
    replaceVariantOptions(variantSelect, logoSelect.value, variantSelect.value);
    navigateWithInputs();
  });
  variantSelect.addEventListener('change', navigateWithInputs);
  presetSelect.addEventListener('change', navigateWithInputs);

  const actions = document.createElement('div');
  actions.className = 'viewer-ui__actions';

  autoRotateButton = document.createElement('button');
  autoRotateButton.type = 'button';
  autoRotateButton.className = 'viewer-ui__button viewer-ui__button--full';
  autoRotateButton.addEventListener('click', () => {
    toggleAutoRotate();
  });

  const resetButton = document.createElement('button');
  resetButton.type = 'button';
  resetButton.className = 'viewer-ui__button viewer-ui__button--full';
  resetButton.textContent = 'Reset View';
  resetButton.addEventListener('click', () => {
    resetView();
  });

  actions.append(autoRotateButton, resetButton);
  syncAutoRotateButton();

  colorPicker.addEventListener('change', () => {
    syncCustomColorInputs(colorPicker.value, true);
    if (colorModeSelect.value === 'custom') {
      navigateWithInputs();
    }
  });

  colorText.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter') {
      return;
    }

    event.preventDefault();
    syncCustomColorInputs(colorText.value, true);

    if (colorModeSelect.value === 'custom') {
      navigateWithInputs();
    }
  });

  colorText.addEventListener('blur', () => {
    syncCustomColorInputs(colorText.value, true);

    if (colorModeSelect.value === 'custom') {
      navigateWithInputs();
    }
  });

  const exportSection = document.createElement('section');
  exportSection.className = 'viewer-ui__section';

  const exportTitle = document.createElement('div');
  exportTitle.className = 'viewer-ui__section-title';
  exportTitle.textContent = 'Export';

  const currentViewSection = document.createElement('div');
  currentViewSection.className = 'viewer-ui__subsection';

  const currentViewTitle = document.createElement('div');
  currentViewTitle.className = 'viewer-ui__subsection-title';
  currentViewTitle.textContent = 'Current View';

  const currentViewActions = document.createElement('div');
  currentViewActions.className = 'viewer-ui__section-actions';

  capturePngButton = createDetailButton('Render PNG', 'Waiting for scene...');
  capturePngButton.disabled = true;
  capturePngButton.addEventListener('click', () => {
    void handleCapturePngDownload();
  });

  downloadGlbButton = createDetailButton('Download GLB', 'Waiting for scene...');
  downloadGlbButton.disabled = true;
  downloadGlbButton.addEventListener('click', () => {
    void handleGlbDownload();
  });

  currentViewActions.append(capturePngButton, downloadGlbButton);
  currentViewSection.append(currentViewTitle, currentViewActions);

  const presetAssetsSection = document.createElement('div');
  presetAssetsSection.className = 'viewer-ui__subsection';

  const presetAssetsTitle = document.createElement('div');
  presetAssetsTitle.className = 'viewer-ui__subsection-title';
  presetAssetsTitle.textContent = 'Preset Assets';

  const presetAssetActions = document.createElement('div');
  presetAssetActions.className = 'viewer-ui__section-actions';

  for (const asset of PRESET_ASSET_DEFINITIONS) {
    const button = createDetailButton(asset.label, 'Checking availability...');
    button.disabled = true;
    button.addEventListener('click', () => {
      handlePresetAssetDownload(button);
    });
    presetAssetButtons.set(asset.key, button);
    presetAssetActions.append(button);
  }

  presetAssetsSection.append(presetAssetsTitle, presetAssetActions);

  exportStatusElement = document.createElement('div');
  exportStatusElement.className = 'viewer-ui__status';
  exportStatusElement.dataset.tone = 'muted';
  exportStatusElement.textContent = 'Choose an export action.';

  exportSection.append(exportTitle, currentViewSection, presetAssetsSection, exportStatusElement);

  grid.append(
    createField('Logo', logoSelect),
    createField('Variant', variantSelect),
    createField('Preset', presetSelect),
    createField('Color Mode', colorModeSelect),
    customColorField,
    actions,
    exportSection
  );

  panel.append(title, copy, grid);
  document.body.append(panel);
}

function createGlowTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;

  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);

  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
  gradient.addColorStop(0.24, 'rgba(180, 208, 224, 0.56)');
  gradient.addColorStop(0.46, 'rgba(44, 55, 65, 0.18)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createBeamTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 512;

  const context = canvas.getContext('2d');
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);

  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(0.2, 'rgba(90, 105, 120, 0.08)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.52)');
  gradient.addColorStop(0.8, 'rgba(90, 105, 120, 0.08)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createStageHaloTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;

  const context = canvas.getContext('2d');
  const gradient = context.createRadialGradient(256, 256, 0, 256, 256, 256);

  gradient.addColorStop(0, 'rgba(255, 255, 255, 0.96)');
  gradient.addColorStop(0.18, 'rgba(200, 226, 240, 0.44)');
  gradient.addColorStop(0.46, 'rgba(54, 74, 92, 0.12)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createProjectionPlateTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;

  const context = canvas.getContext('2d');
  context.translate(canvas.width / 2, canvas.height / 2);
  context.strokeStyle = 'rgba(255, 255, 255, 0.9)';
  context.lineCap = 'round';
  context.lineWidth = 10;

  for (const radius of [300, 210, 120]) {
    context.beginPath();
    context.arc(0, 0, radius, 0, Math.PI * 2);
    context.stroke();
  }

  context.lineWidth = 5;
  context.globalAlpha = 0.8;

  for (let index = 0; index < 8; index += 1) {
    const angle = (index / 8) * Math.PI * 2;
    const inner = radiusPoint(angle, 90);
    const outer = radiusPoint(angle, 310);
    context.beginPath();
    context.moveTo(inner.x, inner.y);
    context.lineTo(outer.x, outer.y);
    context.stroke();
  }

  context.lineWidth = 12;
  context.globalAlpha = 0.62;
  context.beginPath();
  context.moveTo(-260, 0);
  context.lineTo(260, 0);
  context.moveTo(0, -260);
  context.lineTo(0, 260);
  context.stroke();

  context.globalAlpha = 1;
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createLightColumnTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 1024;

  const context = canvas.getContext('2d');
  const gradient = context.createLinearGradient(0, 0, 0, canvas.height);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
  gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.55)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.95)');
  gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.55)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const vignette = context.createRadialGradient(
    canvas.width / 2,
    canvas.height / 2,
    40,
    canvas.width / 2,
    canvas.height / 2,
    canvas.width / 2
  );
  vignette.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
  vignette.addColorStop(0.6, 'rgba(255, 255, 255, 0.24)');
  vignette.addColorStop(1, 'rgba(255, 255, 255, 0)');

  context.fillStyle = vignette;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function radiusPoint(angle, radius) {
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius
  };
}

function createSweepTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 1024;

  const context = canvas.getContext('2d');
  const gradient = context.createLinearGradient(0, 0, canvas.width, 0);
  gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
  gradient.addColorStop(0.48, 'rgba(255, 255, 255, 0.08)');
  gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.98)');
  gradient.addColorStop(0.52, 'rgba(255, 255, 255, 0.12)');
  gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const fade = context.createLinearGradient(0, 0, 0, canvas.height);
  fade.addColorStop(0, 'rgba(255, 255, 255, 0)');
  fade.addColorStop(0.2, 'rgba(255, 255, 255, 1)');
  fade.addColorStop(0.8, 'rgba(255, 255, 255, 1)');
  fade.addColorStop(1, 'rgba(255, 255, 255, 0)');
  context.globalCompositeOperation = 'destination-in';
  context.fillStyle = fade;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createLedGridTexture(pattern = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;

  const context = canvas.getContext('2d');
  const cellSize = Math.round(clamp(pattern.cellSize ?? 24, 12, 64));
  const gap = clamp(pattern.gap ?? 0.4, 0.08, 0.82);
  const contrast = clamp(pattern.contrast ?? 1, 0.6, 1.8);
  const radius = cellSize * (0.5 - (gap * 0.36));
  context.fillStyle = 'rgb(22, 22, 22)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = cellSize / 2; y < canvas.height; y += cellSize) {
    for (let x = cellSize / 2; x < canvas.width; x += cellSize) {
      const wave = (Math.sin((x * 0.06) + (y * 0.04)) + 1) * 0.5;
      const intensity = clamp((0.4 + (wave * 0.55)) * contrast, 0, 1);
      const value = Math.round(255 * intensity);
      context.fillStyle = `rgb(${value}, ${value}, ${value})`;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createBrushedMetalTexture(pattern = {}) {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;

  const context = canvas.getContext('2d');
  const strength = clamp(pattern.strength ?? 0.35, 0, 1);
  context.fillStyle = 'rgb(180, 180, 180)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < canvas.height; y += 2) {
    const wave = (Math.sin(y * 0.1) + Math.sin(y * 0.032 + 1.5)) * 0.5;
    const shade = Math.round(150 + (wave * 55 * strength));
    context.fillStyle = `rgb(${shade}, ${shade}, ${shade})`;
    context.fillRect(0, y, canvas.width, 1);
  }

  for (let x = 0; x < canvas.width; x += 128) {
    context.fillStyle = 'rgba(255, 255, 255, 0.02)';
    context.fillRect(x, 0, 1, canvas.height);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function createDecoFrameTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const context = canvas.getContext('2d');

  context.fillStyle = 'rgb(34, 24, 14)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.strokeStyle = 'rgba(212, 170, 90, 0.95)';
  context.lineWidth = 18;
  context.strokeRect(64, 64, canvas.width - 128, canvas.height - 128);

  context.strokeStyle = 'rgba(235, 200, 125, 0.75)';
  context.lineWidth = 6;
  context.strokeRect(108, 108, canvas.width - 216, canvas.height - 216);

  context.beginPath();
  context.moveTo(canvas.width * 0.5, 90);
  context.lineTo(canvas.width * 0.5, canvas.height - 90);
  context.moveTo(90, canvas.height * 0.5);
  context.lineTo(canvas.width - 90, canvas.height * 0.5);
  context.strokeStyle = 'rgba(190, 145, 75, 0.28)';
  context.lineWidth = 4;
  context.stroke();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function getSurfaceTexture(pattern) {
  if (!pattern || !pattern.mode) {
    return null;
  }

  const cacheKey = JSON.stringify(pattern);

  if (surfaceTextureCache.has(cacheKey)) {
    return surfaceTextureCache.get(cacheKey);
  }

  let texture = null;

  switch (pattern.mode) {
    case 'led-grid':
      texture = createLedGridTexture(pattern);
      break;
    case 'brushed-metal':
      texture = createBrushedMetalTexture(pattern);
      break;
    case 'deco-frame':
      texture = createDecoFrameTexture();
      break;
    default:
      texture = null;
      break;
  }

  surfaceTextureCache.set(cacheKey, texture);
  return texture;
}

function applySurfacePattern(material, pattern) {
  const texture = getSurfaceTexture(pattern);

  if (!texture) {
    return;
  }

  material.map = texture;

  if (pattern.mode === 'led-grid') {
    material.emissiveMap = texture;
    material.emissiveIntensity *= clamp(pattern.contrast ?? 1.2, 0.8, 2.2);
    material.roughness = clamp(material.roughness + 0.12, 0, 1);
  }
}

function createPhysicalMaterial(settings, colorHex, emissiveHex) {
  const material = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color(colorHex),
    emissive: new THREE.Color(emissiveHex),
    emissiveIntensity: settings.emissiveIntensity ?? 0,
    metalness: settings.metalness ?? 0,
    roughness: settings.roughness ?? 0.5,
    clearcoat: settings.clearcoat ?? 0,
    clearcoatRoughness: settings.clearcoatRoughness ?? 0,
    reflectivity: settings.reflectivity ?? 0.5,
    transmission: settings.transmission ?? 0,
    thickness: settings.thickness ?? 0,
    ior: settings.ior ?? 1.5,
    transparent:
      settings.transparent ?? ((settings.opacity ?? 1) < 1 || (settings.transmission ?? 0) > 0),
    opacity: settings.opacity ?? 1,
    attenuationDistance: settings.attenuationDistance ?? Infinity,
    iridescence: settings.iridescence ?? 0,
    iridescenceIOR: settings.iridescenceIOR ?? 1.3,
    iridescenceThicknessRange: settings.iridescenceThicknessRange ?? [100, 400],
    side: THREE.DoubleSide
  });

  if (settings.attenuationColor) {
    material.attenuationColor = new THREE.Color(settings.attenuationColor);
  }

  applySurfacePattern(material, settings.surfacePattern);

  return material;
}

function createMaterialPair(colors, overrides = {}) {
  const faceConfig = {
    ...CONFIG.materials.face,
    ...(overrides.face || {})
  };
  const sideConfig = {
    ...CONFIG.materials.side,
    ...(overrides.side || {})
  };

  return {
    face: createPhysicalMaterial(faceConfig, colors.face, colors.faceEmissive),
    side: createPhysicalMaterial(sideConfig, colors.side, colors.sideEmissive)
  };
}

function getDominantSvgColor(paths) {
  const counts = new Map();

  for (const pathData of paths) {
    const key = pathData.color.getHexString();
    counts.set(key, (counts.get(key) || 0) + 1);
  }

  let dominantColor = BASE_PRIMARY_COLOR;
  let dominantCount = -1;

  for (const [key, count] of counts.entries()) {
    if (count > dominantCount) {
      dominantColor = key;
      dominantCount = count;
    }
  }

  return dominantColor;
}

function resolveActiveColorState(svgData) {
  const nextConfig = structuredClone(BASE_CONFIG);
  const dominantSvgColor = getDominantSvgColor(svgData.paths);

  if (REQUESTED_COLOR_SELECTION.mode !== DEFAULT_COLOR_MODE) {
    const palette = derivePaletteFromHex(
      REQUESTED_COLOR_SELECTION.mode === 'original-svg'
        ? dominantSvgColor
        : REQUESTED_COLOR_SELECTION.primaryColor || BASE_PRIMARY_COLOR,
      REQUESTED_COLOR_SELECTION.mode
    );
    applyRuntimePalette(nextConfig, palette);
  }

  CONFIG = nextConfig;

  return {
    colorMode: REQUESTED_COLOR_SELECTION.mode,
    primaryColor: REQUESTED_COLOR_SELECTION.primaryColor,
    dominantSvgColor
  };
}

function createSvgMaterialPairCache() {
  const cache = new Map();

  return (fillHex) => {
    const key = fillHex.toLowerCase();

    if (!cache.has(key)) {
      const palette = derivePaletteFromHex(key, 'original-svg');
      cache.set(
        key,
        createMaterialPair({
          face: `#${palette.face}`,
          faceEmissive: `#${palette.faceEmissive}`,
          side: `#${palette.side}`,
          sideEmissive: `#${palette.sideEmissive}`
        }, {
          face: { surfacePattern: null },
          side: { surfacePattern: null }
        })
      );
    }

    return cache.get(key);
  };
}

function buildLightRig() {
  ambientLight = new THREE.HemisphereLight(
    CONFIG.lighting.ambientSky,
    CONFIG.lighting.ambientGround,
    CONFIG.lighting.ambientIntensity
  );
  scene.add(ambientLight);

  keyLight = new THREE.DirectionalLight(
    CONFIG.lighting.keyColor,
    CONFIG.lighting.keyIntensity
  );
  keyLight.position.fromArray(CONFIG.lighting.keyPosition);
  scene.add(keyLight);

  rimLight = new THREE.DirectionalLight(
    CONFIG.lighting.rimColor,
    CONFIG.lighting.rimIntensity
  );
  rimLight.position.fromArray(CONFIG.lighting.rimPosition);
  scene.add(rimLight);

  lowerLight = new THREE.PointLight(
    CONFIG.lighting.lowerColor,
    CONFIG.lighting.lowerIntensity,
    CONFIG.lighting.lowerDistance,
    CONFIG.lighting.lowerDecay
  );
  lowerLight.position.fromArray(CONFIG.lighting.lowerPosition);
  scene.add(lowerLight);
}

function addGlowAccents() {
  if (!CONFIG.glow.enabled) {
    return null;
  }

  const glowMap = createGlowTexture();
  const beamMap = createBeamTexture();

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowMap,
      color: new THREE.Color(CONFIG.glow.haloColor),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: CONFIG.glow.haloOpacity
    })
  );
  halo.scale.set(CONFIG.glow.haloScale, CONFIG.glow.haloScale, 1);
  halo.position.fromArray(CONFIG.glow.haloPosition);
  glowRig.add(halo);

  const innerHalo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowMap,
      color: new THREE.Color(CONFIG.glow.innerColor),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: CONFIG.glow.innerOpacity
    })
  );
  innerHalo.scale.set(CONFIG.glow.innerScale, CONFIG.glow.innerScale, 1);
  innerHalo.position.fromArray(CONFIG.glow.innerPosition);
  glowRig.add(innerHalo);

  const beam = new THREE.Mesh(
    new THREE.PlaneGeometry(CONFIG.glow.beamWidth, CONFIG.glow.beamHeight),
    new THREE.MeshBasicMaterial({
      map: beamMap,
      color: new THREE.Color(CONFIG.glow.beamColor),
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: CONFIG.glow.beamOpacity
    })
  );
  beam.position.fromArray(CONFIG.glow.beamPosition);
  glowRig.add(beam);

  return { halo, innerHalo, beam };
}

function addStageElements() {
  const parts = {};

  if (CONFIG.baseHalo.enabled) {
    const halo = new THREE.Mesh(
      new THREE.PlaneGeometry(CONFIG.baseHalo.width, CONFIG.baseHalo.depth),
      new THREE.MeshBasicMaterial({
        map: createStageHaloTexture(),
        color: new THREE.Color(CONFIG.baseHalo.color),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: CONFIG.baseHalo.opacity,
        side: THREE.DoubleSide
      })
    );
    halo.rotation.x = -Math.PI / 2;
    halo.position.set(0, CONFIG.baseHalo.y, CONFIG.baseHalo.z);
    stageRig.add(halo);
    parts.baseHalo = halo;
  }

  if (CONFIG.projectionPlate.enabled) {
    if (CONFIG.projectionPlate.underGlowOpacity > 0) {
      const underGlow = new THREE.Mesh(
        new THREE.PlaneGeometry(
          CONFIG.projectionPlate.width * 1.04,
          CONFIG.projectionPlate.depth * 1.04
        ),
        new THREE.MeshBasicMaterial({
          map: createStageHaloTexture(),
          color: new THREE.Color(CONFIG.projectionPlate.underGlowColor),
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          opacity: CONFIG.projectionPlate.underGlowOpacity,
          side: THREE.DoubleSide
        })
      );
      underGlow.rotation.x = -Math.PI / 2;
      underGlow.position.set(0, CONFIG.projectionPlate.y - 0.01, CONFIG.projectionPlate.z);
      stageRig.add(underGlow);
      parts.projectionUnderGlow = underGlow;
    }

    const projectionPlate = new THREE.Mesh(
      new THREE.PlaneGeometry(CONFIG.projectionPlate.width, CONFIG.projectionPlate.depth),
      new THREE.MeshBasicMaterial({
        map: createProjectionPlateTexture(),
        color: new THREE.Color(CONFIG.projectionPlate.color),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: CONFIG.projectionPlate.opacity,
        side: THREE.DoubleSide
      })
    );
    projectionPlate.rotation.x = -Math.PI / 2;
    projectionPlate.position.set(0, CONFIG.projectionPlate.y, CONFIG.projectionPlate.z);
    stageRig.add(projectionPlate);
    parts.projectionPlate = projectionPlate;
  }

  if (CONFIG.lightColumn.enabled) {
    const columnTexture = createLightColumnTexture();
    const columnGroup = new THREE.Group();

    const createColumnPlane = (width, height, color, opacity) =>
      new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshBasicMaterial({
          map: columnTexture,
          color: new THREE.Color(color),
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          opacity,
          side: THREE.DoubleSide
        })
      );

    const frontColumn = createColumnPlane(
      CONFIG.lightColumn.width,
      CONFIG.lightColumn.height,
      CONFIG.lightColumn.color,
      CONFIG.lightColumn.opacity
    );
    const sideColumn = createColumnPlane(
      CONFIG.lightColumn.width,
      CONFIG.lightColumn.height,
      CONFIG.lightColumn.color,
      CONFIG.lightColumn.opacity * 0.8
    );
    sideColumn.rotation.y = Math.PI / 2;

    const coreColumn = createColumnPlane(
      CONFIG.lightColumn.width * 0.42,
      CONFIG.lightColumn.height * 0.92,
      CONFIG.lightColumn.coreColor,
      CONFIG.lightColumn.coreOpacity
    );

    columnGroup.add(frontColumn, sideColumn, coreColumn);
    columnGroup.position.set(0, CONFIG.lightColumn.y, CONFIG.lightColumn.z);
    stageRig.add(columnGroup);

    parts.lightColumnGroup = columnGroup;
    parts.lightColumnPlanes = [frontColumn, sideColumn];
    parts.lightColumnCore = coreColumn;
  }

  if (CONFIG.shieldPanel.enabled) {
    const shieldGroup = new THREE.Group();

    const slab = new THREE.Mesh(
      new THREE.BoxGeometry(
        CONFIG.shieldPanel.width,
        CONFIG.shieldPanel.height,
        CONFIG.shieldPanel.thickness
      ),
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(CONFIG.shieldPanel.color),
        transparent: true,
        opacity: CONFIG.shieldPanel.opacity,
        transmission: 0.68,
        thickness: CONFIG.shieldPanel.thickness,
        metalness: 0.08,
        roughness: 0.06,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        depthWrite: false
      })
    );

    const edgeGlow = new THREE.Mesh(
      new THREE.PlaneGeometry(
        CONFIG.shieldPanel.width * 1.03,
        CONFIG.shieldPanel.height * 1.03
      ),
      new THREE.MeshBasicMaterial({
        map: createStageHaloTexture(),
        color: new THREE.Color(CONFIG.shieldPanel.edgeColor),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: CONFIG.shieldPanel.edgeOpacity,
        side: THREE.DoubleSide
      })
    );

    shieldGroup.add(slab, edgeGlow);
    shieldGroup.position.set(0, CONFIG.shieldPanel.y, CONFIG.shieldPanel.z);
    stageRig.add(shieldGroup);

    parts.shieldPanelGroup = shieldGroup;
    parts.shieldPanelSlab = slab;
    parts.shieldPanelEdge = edgeGlow;
  }

  if (CONFIG.stadiumBeams.enabled) {
    const beamTexture = createLightColumnTexture();
    const beamGroup = new THREE.Group();

    const createBeamPlane = (width, height, color, opacity) =>
      new THREE.Mesh(
        new THREE.PlaneGeometry(width, height),
        new THREE.MeshBasicMaterial({
          map: beamTexture,
          color: new THREE.Color(color),
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          opacity,
          side: THREE.DoubleSide
        })
      );

    const fanAngles = [-0.62, -0.31, 0, 0.31, 0.62];
    const beamPlanes = [];

    for (const angle of fanAngles) {
      const plane = createBeamPlane(
        CONFIG.stadiumBeams.width,
        CONFIG.stadiumBeams.height,
        CONFIG.stadiumBeams.color,
        CONFIG.stadiumBeams.opacity
      );
      plane.position.x = Math.sin(angle) * CONFIG.stadiumBeams.spread;
      plane.position.y = Math.abs(Math.sin(angle)) * 0.18;
      plane.rotation.z = angle * 0.22;
      plane.rotation.y = angle;
      beamGroup.add(plane);
      beamPlanes.push(plane);
    }

    const coreBeam = createBeamPlane(
      CONFIG.stadiumBeams.width * 0.5,
      CONFIG.stadiumBeams.height * 0.9,
      CONFIG.stadiumBeams.coreColor,
      CONFIG.stadiumBeams.coreOpacity
    );
    beamGroup.add(coreBeam);
    beamGroup.position.set(0, CONFIG.stadiumBeams.y, CONFIG.stadiumBeams.z);
    stageRig.add(beamGroup);

    parts.stadiumBeamGroup = beamGroup;
    parts.stadiumBeamPlanes = beamPlanes;
    parts.stadiumBeamCore = coreBeam;
  }

  return Object.keys(parts).length > 0 ? parts : null;
}

async function buildLogoGroup(svgData, colorState) {
  const logoGroup = new THREE.Group();
  const solidMaterials = new Set();
  const pathPalette =
    colorState.colorMode === 'preset' &&
    Array.isArray(CONFIG.materials.pathPalette) &&
    CONFIG.materials.pathPalette.length > 0
      ? CONFIG.materials.pathPalette
      : null;
  const pathPaletteMode = CONFIG.materials.pathPaletteMode || 'cycle';
  const pathPaletteCache = new Map();
  const sharedMaterials =
    colorState.colorMode === 'original-svg' || pathPalette
      ? null
      : createMaterialPair({
          face: CONFIG.materials.face.color,
          faceEmissive: CONFIG.materials.face.emissive,
          side: CONFIG.materials.side.color,
          sideEmissive: CONFIG.materials.side.emissive
        });
  const getSvgMaterials = createSvgMaterialPairCache();

  const getPathPaletteMaterials = (pathIndex) => {
    if (!pathPalette) {
      return sharedMaterials;
    }

    const paletteIndex =
      pathPaletteMode === 'single'
        ? 0
        : Math.abs(pathIndex) % pathPalette.length;

    if (!pathPaletteCache.has(paletteIndex)) {
      const entry = pathPalette[paletteIndex];
      const resolvedEntry = typeof entry === 'string' ? { face: entry } : (entry || {});
      pathPaletteCache.set(
        paletteIndex,
        createMaterialPair({
          face: resolvedEntry.face || resolvedEntry.color || CONFIG.materials.face.color,
          faceEmissive:
            resolvedEntry.faceEmissive || resolvedEntry.emissive || CONFIG.materials.face.emissive,
          side: resolvedEntry.side || CONFIG.materials.side.color,
          sideEmissive: resolvedEntry.sideEmissive || CONFIG.materials.side.emissive
        })
      );
    }

    return pathPaletteCache.get(paletteIndex);
  };

  for (let pathIndex = 0; pathIndex < svgData.paths.length; pathIndex += 1) {
    const pathData = svgData.paths[pathIndex];
    const shapes = SVGLoader.createShapes(pathData);

    if (shapes.length === 0) {
      continue;
    }

    const materials =
      colorState.colorMode === 'original-svg'
        ? getSvgMaterials(pathData.color.getHexString())
        : getPathPaletteMaterials(pathIndex);

    for (const shape of shapes) {
      const geometry = new THREE.ExtrudeGeometry(shape, {
        depth: CONFIG.extrusionDepth,
        bevelEnabled: true,
        bevelThickness: CONFIG.bevelThickness,
        bevelSize: CONFIG.bevelSize,
        bevelSegments: CONFIG.bevelSegments,
        curveSegments: CONFIG.curveSegments
      });

      geometry.scale(1, -1, 1);
      geometry.translate(0, 0, -CONFIG.extrusionDepth / 2);
      geometry.computeVertexNormals();

      const mesh = new THREE.Mesh(geometry, [materials.face, materials.side]);
      logoGroup.add(mesh);
      solidMaterials.add(materials.face);
      solidMaterials.add(materials.side);
    }
  }

  const bounds = new THREE.Box3().setFromObject(logoGroup);
  const center = bounds.getCenter(new THREE.Vector3());
  const size = bounds.getSize(new THREE.Vector3());
  const scale = CONFIG.logoSize / Math.max(size.x, size.y);

  logoGroup.scale.setScalar(scale);
  logoGroup.position.set(-center.x * scale, -center.y * scale, 0.08);
  logoGroup.updateMatrixWorld(true);

  const group = new THREE.Group();

  if (CONFIG.materials.frame.enabled) {
    const frameGeometry = new THREE.BoxGeometry(
      (size.x * scale) + CONFIG.materials.frame.paddingX,
      (size.y * scale) + CONFIG.materials.frame.paddingY,
      CONFIG.materials.frame.depth
    );
    const frameMaterial = createPhysicalMaterial(
      {
        ...CONFIG.materials.frame,
        depthWrite: CONFIG.materials.frame.depthWrite ?? false
      },
      CONFIG.materials.frame.color,
      CONFIG.materials.frame.emissive
    );
    frameMaterial.depthWrite = CONFIG.materials.frame.depthWrite ?? false;
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.z = CONFIG.materials.frame.z;
    group.add(frame);
  }

  const sequenceMode = CONFIG.sequence?.mode || 'none';

  if (sequenceMode !== 'none') {
    for (const material of solidMaterials) {
      material.transparent = true;
      material.opacity = material.opacity ?? 1;
    }
  }

  group.add(logoGroup);
  group.position.y = CONFIG.camera.lookAt[1];

  return {
    group,
    logoGroup,
    solidMaterials: Array.from(solidMaterials),
    scaledSize: {
      x: size.x * scale,
      y: size.y * scale
    }
  };
}

function addLogoEffects(logoBundle) {
  const parts = {};

  if (CONFIG.backplate.enabled) {
    const backplate = new THREE.Mesh(
      new THREE.BoxGeometry(
        logoBundle.scaledSize.x + CONFIG.backplate.widthPadding,
        logoBundle.scaledSize.y + CONFIG.backplate.heightPadding,
        CONFIG.backplate.depth
      ),
      createPhysicalMaterial(
        {
          ...CONFIG.backplate,
          surfacePattern: CONFIG.backplate.pattern
        },
        CONFIG.backplate.color,
        CONFIG.backplate.emissive
      )
    );
    backplate.position.z = CONFIG.backplate.z;
    logoBundle.group.add(backplate);
    parts.backplate = backplate;
  }

  if (CONFIG.logoOutline.enabled) {
    const outlineGroup = new THREE.Group();
    const outlineMaterials = [];
    const buildOutlineLayer = (color, opacity, scaleMultiplier = 1) => {
      if (!color || !opacity || opacity <= 0) {
        return;
      }

      logoBundle.logoGroup.traverse((node) => {
        if (!node.isMesh) {
          return;
        }

        const edgeGeometry = new THREE.EdgesGeometry(node.geometry, 20);
        const lineMaterial = new THREE.LineBasicMaterial({
          color: new THREE.Color(color),
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          opacity
        });
        lineMaterial.userData.baseOpacity = opacity;
        const line = new THREE.LineSegments(edgeGeometry, lineMaterial);
        line.position.copy(node.position);
        line.rotation.copy(node.rotation);
        line.scale.copy(node.scale).multiplyScalar(scaleMultiplier);
        line.renderOrder = 6;
        outlineGroup.add(line);
        outlineMaterials.push(lineMaterial);
      });
    };

    buildOutlineLayer(CONFIG.logoOutline.color, CONFIG.logoOutline.opacity, CONFIG.logoOutline.thickness || 1);
    buildOutlineLayer(
      CONFIG.logoOutline.secondaryColor,
      CONFIG.logoOutline.secondaryOpacity,
      (CONFIG.logoOutline.thickness || 1) * 1.02
    );

    outlineGroup.position.z = CONFIG.logoOutline.zOffset ?? 0.05;
    logoBundle.group.add(outlineGroup);
    parts.outlineGroup = outlineGroup;
    parts.outlineMaterials = outlineMaterials;
  }

  if (CONFIG.sweepLight.enabled) {
    const sweep = new THREE.Mesh(
      new THREE.PlaneGeometry(CONFIG.sweepLight.width, CONFIG.sweepLight.height),
      new THREE.MeshBasicMaterial({
        map: createSweepTexture(),
        color: new THREE.Color(CONFIG.sweepLight.color),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: CONFIG.sweepLight.opacity,
        side: THREE.DoubleSide
      })
    );
    sweep.material.userData.baseOpacity = CONFIG.sweepLight.opacity;
    sweep.rotation.z = CONFIG.sweepLight.angle;
    sweep.position.z = CONFIG.sweepLight.z;
    logoBundle.group.add(sweep);
    parts.sweep = sweep;
  }

  if (CONFIG.sequence?.mode === 'wireframe-reveal') {
    const wireGroup = new THREE.Group();
    const wireMaterials = [];

    logoBundle.logoGroup.traverse((node) => {
      if (!node.isMesh) {
        return;
      }

      const wireGeometry = new THREE.WireframeGeometry(node.geometry);
      const wireMaterial = new THREE.LineBasicMaterial({
        color: new THREE.Color(CONFIG.sequence.wireColor || '#8ef4ff'),
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        opacity: CONFIG.sequence.wireOpacity ?? 0.9
      });
      wireMaterial.userData.baseOpacity = CONFIG.sequence.wireOpacity ?? 0.9;
      const wire = new THREE.LineSegments(wireGeometry, wireMaterial);
      wire.position.copy(node.position);
      wire.rotation.copy(node.rotation);
      wire.scale.copy(node.scale);
      wire.renderOrder = 8;
      wireGroup.add(wire);
      wireMaterials.push(wireMaterial);
    });

    wireGroup.position.z = (CONFIG.logoOutline?.zOffset ?? 0.05) + 0.02;
    logoBundle.group.add(wireGroup);
    parts.sequenceWireGroup = wireGroup;
    parts.sequenceWireMaterials = wireMaterials;
  }

  if (CONFIG.sequence?.mode && CONFIG.sequence.mode !== 'none') {
    sequenceMaterialState = {
      mode: CONFIG.sequence.mode,
      materialState: logoBundle.solidMaterials.map((material) => ({
        material,
        baseOpacity: material.opacity ?? 1,
        baseEmissiveIntensity: material.emissiveIntensity ?? 0,
        baseRoughness: material.roughness ?? 0.5
      }))
    };
  } else {
    sequenceMaterialState = null;
  }

  return Object.keys(parts).length > 0 ? parts : null;
}

function frameScene() {
  renderer.render(scene, camera);
}

function syncAutoRotateButton() {
  if (!autoRotateButton) {
    return;
  }

  autoRotateButton.textContent = autoRotateActive ? 'Stop Auto-Rotate' : 'Start Auto-Rotate';
  autoRotateButton.setAttribute('aria-pressed', String(autoRotateActive));
  autoRotateButton.classList.toggle('viewer-ui__button--active', autoRotateActive);
}

function autoRotateTick() {
  if (!autoRotateActive || !controls) {
    autoRotateFrameId = 0;
    return;
  }

  controls.update();
  autoRotateFrameId = window.requestAnimationFrame(autoRotateTick);
}

function startAutoRotate() {
  if (autoRotateActive || !controls) {
    return;
  }

  autoRotateActive = true;
  controls.autoRotate = true;
  syncAutoRotateButton();
  persistAutoSpinPreference();

  if (!autoRotateFrameId) {
    autoRotateFrameId = window.requestAnimationFrame(autoRotateTick);
  }
}

function stopAutoRotate() {
  if (!autoRotateActive && !autoRotateFrameId) {
    return;
  }

  autoRotateActive = false;

  if (controls) {
    controls.autoRotate = false;
  }

  if (autoRotateFrameId) {
    window.cancelAnimationFrame(autoRotateFrameId);
    autoRotateFrameId = 0;
  }

  syncAutoRotateButton();
  persistAutoSpinPreference();
}

function toggleAutoRotate() {
  if (autoRotateActive) {
    stopAutoRotate();
    return;
  }

  startAutoRotate();
}

function resetView() {
  setProgress(CONFIG.animation.stillProgress);
}

function setProgress(progress) {
  const wrapped = ((progress % 1) + 1) % 1;
  const angle = wrapped * Math.PI * 2 * CONFIG.animation.turns;
  const drift = Math.sin(wrapped * Math.PI * 2);
  const shimmer = (Math.sin(wrapped * Math.PI * 4) + 1) * 0.5;

  logoRig.rotation.x = CONFIG.animation.tiltX;
  logoRig.rotation.y = angle;
  logoRig.rotation.z = drift * CONFIG.animation.driftRoll;
  logoRig.position.y = drift * CONFIG.animation.driftY;
  logoRig.scale.setScalar(1);

  camera.position.x = CONFIG.camera.position[0] + Math.sin(angle) * CONFIG.camera.orbitXAmplitude;
  camera.position.y = CONFIG.camera.position[1] + Math.cos(angle * 2) * CONFIG.camera.orbitYAmplitude;
  camera.position.z = CONFIG.camera.position[2] - Math.cos(angle) * CONFIG.camera.orbitZAmplitude;

  if (controls) {
    controls.target.set(...CONFIG.camera.lookAt);
    controls.update();
  } else {
    camera.lookAt(...CONFIG.camera.lookAt);
  }

  if (glowParts) {
    glowRig.rotation.z = angle * CONFIG.glow.rotationFactor;
    glowParts.halo.material.opacity =
      (CONFIG.glow.haloOpacity - CONFIG.glow.pulseAmplitude / 2) +
      shimmer * CONFIG.glow.pulseAmplitude;
    glowParts.innerHalo.material.opacity =
      (CONFIG.glow.innerOpacity - CONFIG.glow.innerPulseAmplitude / 2) +
      shimmer * CONFIG.glow.innerPulseAmplitude;
    glowParts.beam.material.opacity =
      (CONFIG.glow.beamOpacity - CONFIG.glow.beamPulseAmplitude / 2) +
      shimmer * CONFIG.glow.beamPulseAmplitude;
    glowParts.halo.scale.setScalar(CONFIG.glow.haloScale - 0.3 + shimmer * 0.6);
    glowParts.innerHalo.scale.setScalar(CONFIG.glow.innerScale - 0.2 + shimmer * 0.4);
  }

  if (stageParts?.baseHalo) {
    stageParts.baseHalo.material.opacity =
      (CONFIG.baseHalo.opacity - CONFIG.baseHalo.pulseAmplitude / 2) +
      shimmer * CONFIG.baseHalo.pulseAmplitude;
    const scale = 1 - (CONFIG.baseHalo.scalePulse / 2) + shimmer * CONFIG.baseHalo.scalePulse;
    stageParts.baseHalo.scale.set(scale, scale, 1);
  }

  if (stageParts?.projectionPlate) {
    stageParts.projectionPlate.material.opacity =
      (CONFIG.projectionPlate.opacity - CONFIG.projectionPlate.pulseAmplitude / 2) +
      shimmer * CONFIG.projectionPlate.pulseAmplitude;
    stageParts.projectionPlate.rotation.z = angle * CONFIG.projectionPlate.rotationFactor;
    const scale =
      1 - (CONFIG.projectionPlate.scalePulse / 2) + shimmer * CONFIG.projectionPlate.scalePulse;
    stageParts.projectionPlate.scale.set(scale, scale, 1);

    if (stageParts.projectionUnderGlow) {
      stageParts.projectionUnderGlow.material.opacity =
        (CONFIG.projectionPlate.underGlowOpacity - CONFIG.projectionPlate.pulseAmplitude / 3) +
        shimmer * (CONFIG.projectionPlate.pulseAmplitude * 0.66);
    }
  }

  if (stageParts?.lightColumnGroup) {
    const opacity =
      (CONFIG.lightColumn.opacity - CONFIG.lightColumn.pulseAmplitude / 2) +
      shimmer * CONFIG.lightColumn.pulseAmplitude;
    const coreOpacity =
      (CONFIG.lightColumn.coreOpacity - CONFIG.lightColumn.pulseAmplitude / 3) +
      shimmer * (CONFIG.lightColumn.pulseAmplitude * 0.66);
    const scale =
      1 - (CONFIG.lightColumn.scalePulse / 2) + shimmer * CONFIG.lightColumn.scalePulse;

    for (const plane of stageParts.lightColumnPlanes) {
      plane.material.opacity = opacity;
    }

    stageParts.lightColumnCore.material.opacity = coreOpacity;
    stageParts.lightColumnGroup.scale.set(scale, scale, 1);
  }

  if (stageParts?.shieldPanelGroup) {
    const opacity =
      (CONFIG.shieldPanel.opacity - CONFIG.shieldPanel.pulseAmplitude / 2) +
      shimmer * CONFIG.shieldPanel.pulseAmplitude;
    const edgeOpacity =
      (CONFIG.shieldPanel.edgeOpacity - CONFIG.shieldPanel.pulseAmplitude / 3) +
      shimmer * (CONFIG.shieldPanel.pulseAmplitude * 0.66);
    const scale =
      1 - (CONFIG.shieldPanel.scalePulse / 2) + shimmer * CONFIG.shieldPanel.scalePulse;

    stageParts.shieldPanelSlab.material.opacity = opacity;
    stageParts.shieldPanelEdge.material.opacity = edgeOpacity;
    stageParts.shieldPanelGroup.scale.set(scale, scale, 1);
  }

  if (stageParts?.stadiumBeamGroup) {
    const opacity =
      (CONFIG.stadiumBeams.opacity - CONFIG.stadiumBeams.pulseAmplitude / 2) +
      shimmer * CONFIG.stadiumBeams.pulseAmplitude;
    const coreOpacity =
      (CONFIG.stadiumBeams.coreOpacity - CONFIG.stadiumBeams.pulseAmplitude / 3) +
      shimmer * (CONFIG.stadiumBeams.pulseAmplitude * 0.66);
    const scale =
      1 - (CONFIG.stadiumBeams.scalePulse / 2) + shimmer * CONFIG.stadiumBeams.scalePulse;

    for (const plane of stageParts.stadiumBeamPlanes) {
      plane.material.opacity = opacity;
    }

    stageParts.stadiumBeamCore.material.opacity = coreOpacity;
    stageParts.stadiumBeamGroup.scale.set(scale, scale, 1);
    stageParts.stadiumBeamGroup.rotation.y = angle * 0.03;
  }

  if (logoLayerParts?.outlineGroup) {
    const pulseAmplitude = CONFIG.logoOutline.pulseAmplitude ?? 0;
    const pulseScale = 1 - (pulseAmplitude / 2) + (shimmer * pulseAmplitude);
    logoLayerParts.outlineGroup.rotation.z = angle * (CONFIG.logoOutline.rotationFactor ?? 0);

    for (const material of logoLayerParts.outlineMaterials || []) {
      const baseOpacity = material.userData.baseOpacity ?? material.opacity;
      material.opacity = clamp(baseOpacity * pulseScale, 0, 1);
    }
  }

  if (logoLayerParts?.sweep) {
    const sweepSpeed = CONFIG.sweepLight.speed ?? 1;
    const sweepRange = CONFIG.sweepLight.range ?? 6;
    logoLayerParts.sweep.position.x = Math.sin(angle * sweepSpeed) * sweepRange;
    const baseOpacity = logoLayerParts.sweep.material.userData.baseOpacity ?? CONFIG.sweepLight.opacity;
    logoLayerParts.sweep.material.opacity = clamp(baseOpacity * (0.74 + (shimmer * 0.52)), 0, 1);
  }

  if (sequenceMaterialState) {
    const sequenceConfig = CONFIG.sequence || {};
    const revealStart = sequenceConfig.revealStart ?? 0;
    const revealEnd = sequenceConfig.revealEnd ?? 0.7;
    const settleEnd = sequenceConfig.settleEnd ?? 0.95;
    const revealPhase = smoothstep(revealStart, revealEnd, wrapped);
    const settlePhase = smoothstep(revealEnd, settleEnd, wrapped);

    if (sequenceMaterialState.mode === 'wireframe-reveal') {
      const emissiveBoost = sequenceConfig.emissiveBoost ?? 0.3;
      const scaleStart = sequenceConfig.scaleStart ?? 0.9;
      const opacityPhase = lerp(0.12, 1, revealPhase);
      const settledOpacity = lerp(opacityPhase, 1, settlePhase);
      const settledScale = lerp(lerp(scaleStart, 1, revealPhase), 1, settlePhase);
      logoRig.scale.setScalar(settledScale);

      for (const state of sequenceMaterialState.materialState) {
        state.material.opacity = clamp(state.baseOpacity * settledOpacity, 0, 1);
        state.material.emissiveIntensity =
          state.baseEmissiveIntensity * lerp(1 + emissiveBoost, 1, settlePhase);
        state.material.roughness = state.baseRoughness;
      }

      if (logoLayerParts?.sequenceWireMaterials) {
        for (const material of logoLayerParts.sequenceWireMaterials) {
          const baseOpacity = material.userData.baseOpacity ?? (sequenceConfig.wireOpacity ?? 0.9);
          const fading = lerp(baseOpacity, baseOpacity * 0.1, revealPhase);
          material.opacity = clamp(fading * (1 - settlePhase), 0, 1);
        }
      }
    } else if (sequenceMaterialState.mode === 'molten-formation') {
      const emissiveBoost = sequenceConfig.emissiveBoost ?? 0.8;
      const roughnessBoost = sequenceConfig.roughnessBoost ?? 0.2;
      const scaleStart = sequenceConfig.scaleStart ?? 0.92;
      const glowBoost = sequenceConfig.glowBoost ?? 0;
      const settle = smoothstep(revealStart, settleEnd, wrapped);
      const heat = 1 - settle;
      logoRig.scale.setScalar(lerp(scaleStart, 1, settle));

      for (const state of sequenceMaterialState.materialState) {
        state.material.opacity = clamp(state.baseOpacity * lerp(0.82, 1, settle), 0, 1);
        state.material.emissiveIntensity =
          state.baseEmissiveIntensity * (1 + (heat * emissiveBoost) + (shimmer * 0.14));
        state.material.roughness = clamp(
          state.baseRoughness + (heat * roughnessBoost) - (shimmer * 0.03),
          0,
          1
        );
      }

      if (glowParts && glowBoost > 0) {
        glowParts.halo.material.opacity = clamp(
          glowParts.halo.material.opacity * (1 + (heat * glowBoost)),
          0,
          1
        );
        glowParts.innerHalo.material.opacity = clamp(
          glowParts.innerHalo.material.opacity * (1 + (heat * glowBoost)),
          0,
          1
        );
        glowParts.beam.material.opacity = clamp(
          glowParts.beam.material.opacity * (1 + (heat * glowBoost)),
          0,
          1
        );
      }
    }
  }

  frameScene();
}

async function exportGLBBlob() {
  const exporter = new GLTFExporter();

  return await new Promise((resolve, reject) => {
    exporter.parse(
      logoRig,
      (result) => {
        if (!(result instanceof ArrayBuffer)) {
          reject(new Error('Expected binary GLB output.'));
          return;
        }

        if (result.byteLength === 0) {
          reject(new Error('Received empty GLB output.'));
          return;
        }

        resolve(new Blob([result], { type: 'model/gltf-binary' }));
      },
      (error) => reject(error),
      {
        binary: true,
        trs: false,
        onlyVisible: true
      }
    );
  });
}

async function downloadGLB(fileName) {
  const glbBlob = await exportGLBBlob();
  triggerBlobDownload(glbBlob, fileName);
}

async function handleCapturePngDownload() {
  const fileNames = buildDownloadFileNames();

  await runBusyExport(capturePngButton, 'Preparing PNG...', async () => {
    triggerUrlDownload(capturePng(), fileNames.png);
  });
}

async function handleGlbDownload() {
  const fileNames = buildDownloadFileNames();

  await runBusyExport(downloadGlbButton, 'Preparing GLB...', async () => {
    await downloadGLB(fileNames.glb);
  });
}

function handlePresetAssetDownload(button) {
  const assetUrl = button.dataset.assetUrl;
  const fileName = button.dataset.fileName;

  if (!assetUrl || !fileName) {
    setExportStatus('Unavailable', 'error', STATUS_AUTO_CLEAR_MS);
    return;
  }

  triggerUrlDownload(assetUrl, fileName);
  setExportStatus('Downloaded', 'success', STATUS_AUTO_CLEAR_MS);
}

function capturePng() {
  return renderer.domElement.toDataURL('image/png');
}

async function init() {
  const loader = new SVGLoader();
  const svgData = await loader.loadAsync(CONFIG.svgUrl);
  activeColorState = resolveActiveColorState(svgData);

  scene.background = new THREE.Color(CONFIG.background);
  renderer.setClearColor(new THREE.Color(CONFIG.background), 1);
  document.body.style.background = CONFIG.background;
  camera.position.fromArray(CONFIG.camera.position);

  buildLightRig();
  glowParts = addGlowAccents();
  stageParts = addStageElements();

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = false;
  controls.autoRotate = false;
  controls.autoRotateSpeed = 4;
  controls.enablePan = true;
  controls.screenSpacePanning = true;
  controls.rotateSpeed = 0.9;
  controls.zoomSpeed = 0.95;
  controls.panSpeed = 0.9;
  controls.minDistance = Math.max(4.5, CONFIG.camera.position[2] * 0.45);
  controls.maxDistance = Math.max(18, CONFIG.camera.position[2] * 1.8);
  controls.target.set(...CONFIG.camera.lookAt);
  controls.addEventListener('change', frameScene);
  controls.addEventListener('start', () => {
    if (autoRotateActive) {
      controls.autoRotate = false;
    }
  });
  controls.addEventListener('end', () => {
    if (autoRotateActive) {
      controls.autoRotate = true;
    }
  });

  syncCanvasDisplaySize();
  window.addEventListener('resize', syncCanvasDisplaySize);
  mountViewerUi();
  void refreshPresetAssetButtons();

  const logoBundle = await buildLogoGroup(svgData, activeColorState);
  logoRig.add(logoBundle.group);
  logoLayerParts = addLogoEffects(logoBundle);
  resetView();
  setCurrentViewButtonsReady();

  if (requestedAutoSpin) {
    startAutoRotate();
  }

  window.sceneApi = {
    isReady: true,
    capturePng,
    setProgress,
    resetView,
    downloadGLB,
    getMeta: () => ({
      logo: PROFILE.logoId,
      variant: PROFILE.variantId,
      preset: PROFILE.presetId,
      colorMode: activeColorState.colorMode,
      primaryColor: activeColorState.primaryColor,
      dominantSvgColor: activeColorState.dominantSvgColor
    })
  };
}

init().catch((error) => {
  console.error(error);
  window.sceneApi = {
    isReady: false,
    error: error.message
  };
});
