import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';
import { getResolvedRenderProfile } from '../scripts/render-manifest.mjs';

const searchParams = new URLSearchParams(window.location.search);
const logoId = searchParams.get('logo') || 'big-eazy';
const variantId = searchParams.get('variant') || 'display';
const presetId = searchParams.get('preset') || 'spindisplay-loop';
const PROFILE = getResolvedRenderProfile(logoId, variantId, presetId);
const CONFIG = PROFILE.scene;

document.title = `${PROFILE.logo.label} ${PROFILE.variant.label} ${PROFILE.preset.label}`;
document.body.style.background = CONFIG.background;

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

const glowRig = new THREE.Group();
scene.add(glowRig);

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
      transparent: true,
      opacity: CONFIG.materials.frame.opacity,
      depthWrite: false,
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

function frameScene() {
  camera.lookAt(...CONFIG.camera.lookAt);
  renderer.render(scene, camera);
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

async function init() {
  const logo = await loadLogoGroup();
  logoRig.add(logo);
  setProgress(CONFIG.animation.stillProgress);

  window.sceneApi = {
    isReady: true,
    setProgress,
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
