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
const searchParams = new URLSearchParams(window.location.search);
const requestedLogoId = searchParams.get('logo') || DEFAULT_LOGO_ID;
const requestedVariantId = searchParams.get('variant');
const requestedPresetId = searchParams.get('preset') || DEFAULT_PRESET_ID;
const uiParam = searchParams.get('ui');
const SHOW_UI = uiParam === '1' || (uiParam !== '0' && !navigator.webdriver);
const STATUS_AUTO_CLEAR_MS = 2200;
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

const {
  logoId,
  variantId,
  presetId
} = resolveSelection(requestedLogoId, requestedVariantId, requestedPresetId);
const PROFILE = getResolvedRenderProfile(logoId, variantId, presetId);
const CONFIG = PROFILE.scene;

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

let controls;
let autoRotateButton;
let autoRotateActive = false;
let autoRotateFrameId = 0;
let exportStatusElement;
let exportStatusTimeoutId = 0;
let capturePngButton;
let downloadGlbButton;
const presetAssetButtons = new Map();

const ambientLight = new THREE.HemisphereLight(
  CONFIG.lighting.ambientSky,
  CONFIG.lighting.ambientGround,
  CONFIG.lighting.ambientIntensity
);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(
  CONFIG.lighting.keyColor,
  CONFIG.lighting.keyIntensity
);
keyLight.position.fromArray(CONFIG.lighting.keyPosition);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(
  CONFIG.lighting.rimColor,
  CONFIG.lighting.rimIntensity
);
rimLight.position.fromArray(CONFIG.lighting.rimPosition);
scene.add(rimLight);

const lowerLight = new THREE.PointLight(
  CONFIG.lighting.lowerColor,
  CONFIG.lighting.lowerIntensity,
  CONFIG.lighting.lowerDistance,
  CONFIG.lighting.lowerDecay
);
lowerLight.position.fromArray(CONFIG.lighting.lowerPosition);
scene.add(lowerLight);

const logoRig = new THREE.Group();
scene.add(logoRig);

const stageRig = new THREE.Group();
scene.add(stageRig);

const glowRig = new THREE.Group();
scene.add(glowRig);

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

function buildPreviewUrl(nextSelection) {
  const nextUrl = new URL(window.location.href);
  nextUrl.searchParams.set('logo', nextSelection.logoId);
  nextUrl.searchParams.set('variant', nextSelection.variantId);
  nextUrl.searchParams.set('preset', nextSelection.presetId);

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
  button._labelElement = label;
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

function decodeBase64ToBlob(base64, mimeType) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);

  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }

  return new Blob([bytes], { type: mimeType });
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

async function handleCapturePngDownload() {
  const fileNames = buildDownloadFileNames();

  await runBusyExport(capturePngButton, 'Preparing PNG...', async () => {
    triggerUrlDownload(capturePng(), fileNames.png);
  });
}

async function handleGlbDownload() {
  const fileNames = buildDownloadFileNames();

  await runBusyExport(downloadGlbButton, 'Preparing GLB...', async () => {
    const glbBase64 = await exportGLB();
    const glbBlob = decodeBase64ToBlob(glbBase64, 'model/gltf-binary');
    triggerBlobDownload(glbBlob, fileNames.glb);
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

function mountViewerUi() {
  if (!SHOW_UI) {
    return;
  }

  const panel = document.createElement('section');
  panel.id = 'viewer-ui';

  const title = document.createElement('h1');
  title.textContent = 'Interactive Preview';

  const copy = document.createElement('p');
  copy.textContent = 'Drag to orbit, scroll to zoom, right-drag to pan, or let the viewer spin the scene for you.';

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

  logoSelect.addEventListener('change', () => {
    replaceVariantOptions(variantSelect, logoSelect.value, variantSelect.value);
  });

  const actions = document.createElement('div');
  actions.className = 'viewer-ui__actions';

  autoRotateButton = document.createElement('button');
  autoRotateButton.type = 'button';
  autoRotateButton.className = 'viewer-ui__button viewer-ui__button--full';
  autoRotateButton.addEventListener('click', () => {
    toggleAutoRotate();
  });

  const applyButton = document.createElement('button');
  applyButton.type = 'button';
  applyButton.className = 'viewer-ui__button viewer-ui__button--primary';
  applyButton.textContent = 'Apply Scene';
  applyButton.addEventListener('click', () => {
    const nextUrl = buildPreviewUrl({
      logoId: logoSelect.value,
      variantId: variantSelect.value,
      presetId: presetSelect.value
    });
    window.location.assign(nextUrl.toString());
  });

  const resetButton = document.createElement('button');
  resetButton.type = 'button';
  resetButton.className = 'viewer-ui__button';
  resetButton.textContent = 'Reset View';
  resetButton.addEventListener('click', () => {
    resetView();
  });

  actions.append(autoRotateButton, applyButton, resetButton);
  syncAutoRotateButton();

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

function radiusPoint(angle, radius) {
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius
  };
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

  return Object.keys(parts).length > 0 ? parts : null;
}

function createMaterials() {
  return {
    face: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(CONFIG.materials.face.color),
      emissive: new THREE.Color(CONFIG.materials.face.emissive),
      emissiveIntensity: CONFIG.materials.face.emissiveIntensity,
      metalness: CONFIG.materials.face.metalness,
      roughness: CONFIG.materials.face.roughness,
      clearcoat: CONFIG.materials.face.clearcoat,
      clearcoatRoughness: CONFIG.materials.face.clearcoatRoughness,
      reflectivity: CONFIG.materials.face.reflectivity,
      side: THREE.DoubleSide
    }),
    side: new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(CONFIG.materials.side.color),
      emissive: new THREE.Color(CONFIG.materials.side.emissive),
      emissiveIntensity: CONFIG.materials.side.emissiveIntensity,
      metalness: CONFIG.materials.side.metalness,
      roughness: CONFIG.materials.side.roughness,
      clearcoat: CONFIG.materials.side.clearcoat,
      clearcoatRoughness: CONFIG.materials.side.clearcoatRoughness,
      side: THREE.DoubleSide
    })
  };
}

async function loadLogoGroup() {
  const loader = new SVGLoader();
  const data = await loader.loadAsync(CONFIG.svgUrl);
  const logoGroup = new THREE.Group();
  const materials = createMaterials();

  for (const pathData of data.paths) {
    const shapes = SVGLoader.createShapes(pathData);

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
    const frameMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(CONFIG.materials.frame.color),
      emissive: new THREE.Color(CONFIG.materials.frame.emissive),
      emissiveIntensity: CONFIG.materials.frame.emissiveIntensity,
      transparent: CONFIG.materials.frame.transparent ?? true,
      opacity: CONFIG.materials.frame.opacity,
      depthWrite: CONFIG.materials.frame.depthWrite ?? false,
      roughness: CONFIG.materials.frame.roughness,
      metalness: CONFIG.materials.frame.metalness,
      clearcoat: CONFIG.materials.frame.clearcoat,
      clearcoatRoughness: CONFIG.materials.frame.clearcoatRoughness,
      side: THREE.DoubleSide
    });
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.z = CONFIG.materials.frame.z;
    group.add(frame);
  }

  group.add(logoGroup);
  group.position.y = CONFIG.camera.lookAt[1];

  return group;
}

const glowParts = addGlowAccents();
const stageParts = addStageElements();

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

  frameScene();
}

async function exportGLB() {
  const exporter = new GLTFExporter();

  return await new Promise((resolve, reject) => {
    exporter.parse(
      logoRig,
      (result) => {
        if (!(result instanceof ArrayBuffer)) {
          reject(new Error('Expected binary GLB output.'));
          return;
        }

        const bytes = new Uint8Array(result);
        let binary = '';

        for (let offset = 0; offset < bytes.length; offset += 0x8000) {
          const chunk = bytes.subarray(offset, offset + 0x8000);
          binary += String.fromCharCode(...chunk);
        }

        resolve(btoa(binary));
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

function capturePng() {
  return renderer.domElement.toDataURL('image/png');
}

async function init() {
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
      stopAutoRotate();
    }
  });

  syncCanvasDisplaySize();
  window.addEventListener('resize', syncCanvasDisplaySize);
  mountViewerUi();
  void refreshPresetAssetButtons();

  const logo = await loadLogoGroup();
  logoRig.add(logo);
  resetView();
  setCurrentViewButtonsReady();

  window.sceneApi = {
    isReady: true,
    capturePng,
    setProgress,
    resetView,
    exportGLB,
    getMeta: () => ({
      logo: PROFILE.logoId,
      variant: PROFILE.variantId,
      preset: PROFILE.presetId
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
