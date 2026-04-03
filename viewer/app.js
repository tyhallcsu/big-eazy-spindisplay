import * as THREE from 'three';
import { SVGLoader } from 'three/addons/loaders/SVGLoader.js';
import { GLTFExporter } from 'three/addons/exporters/GLTFExporter.js';

const CONFIG = {
  brandColor: new THREE.Color('#02a5d1'),
  width: 1024,
  height: 1024,
  logoSize: 6,
  extrusionDepth: 44,
  bevelThickness: 6,
  bevelSize: 4,
  bevelSegments: 5,
  curveSegments: 20,
  svgUrl: '../source/big-eazy-spindisplay.svg'
};

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: false,
  preserveDrawingBuffer: true,
  powerPreference: 'high-performance'
});
renderer.setPixelRatio(1);
renderer.setSize(CONFIG.width, CONFIG.height, false);
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.setClearColor(0x000000, 1);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  30,
  CONFIG.width / CONFIG.height,
  0.1,
  100
);
camera.position.set(0, 0.35, 12.8);

const ambientLight = new THREE.HemisphereLight(0xc9fbff, 0x001018, 1.45);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xc5f7ff, 2.8);
keyLight.position.set(4.8, 5.2, 6.5);
scene.add(keyLight);

const rimLight = new THREE.DirectionalLight(0x8be8ff, 2.1);
rimLight.position.set(-5.5, 1.6, -4.4);
scene.add(rimLight);

const lowerLight = new THREE.PointLight(0x0377a8, 11, 20, 2);
lowerLight.position.set(0, -2.4, 4.5);
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

  gradient.addColorStop(0, 'rgba(120, 236, 255, 0.95)');
  gradient.addColorStop(0.2, 'rgba(38, 178, 219, 0.65)');
  gradient.addColorStop(0.45, 'rgba(8, 115, 170, 0.22)');
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
  gradient.addColorStop(0.2, 'rgba(20, 166, 209, 0.10)');
  gradient.addColorStop(0.5, 'rgba(120, 240, 255, 0.55)');
  gradient.addColorStop(0.8, 'rgba(20, 166, 209, 0.10)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  context.fillStyle = gradient;
  context.fillRect(0, 0, canvas.width, canvas.height);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function addGlowAccents() {
  const glowMap = createGlowTexture();
  const beamMap = createBeamTexture();

  const halo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowMap,
      color: 0x8ef5ff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.56
    })
  );
  halo.scale.set(11.8, 11.8, 1);
  halo.position.set(0, 0.2, -1.7);
  glowRig.add(halo);

  const innerHalo = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowMap,
      color: 0x18bde7,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.42
    })
  );
  innerHalo.scale.set(8.4, 8.4, 1);
  innerHalo.position.set(0, 0.15, -1.1);
  glowRig.add(innerHalo);

  const beam = new THREE.Mesh(
    new THREE.PlaneGeometry(2.9, 10.4),
    new THREE.MeshBasicMaterial({
      map: beamMap,
      color: 0x74f2ff,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      opacity: 0.3
    })
  );
  beam.position.set(0, 0.2, -2.25);
  glowRig.add(beam);

  return { halo, innerHalo, beam };
}

function createMaterials() {
  return {
    face: new THREE.MeshPhysicalMaterial({
      color: CONFIG.brandColor.clone(),
      emissive: CONFIG.brandColor.clone().multiplyScalar(0.4),
      emissiveIntensity: 0.95,
      metalness: 0.22,
      roughness: 0.16,
      clearcoat: 0.9,
      clearcoatRoughness: 0.18,
      reflectivity: 0.75,
      side: THREE.DoubleSide
    }),
    side: new THREE.MeshPhysicalMaterial({
      color: CONFIG.brandColor.clone().offsetHSL(0, 0, -0.08),
      emissive: CONFIG.brandColor.clone().multiplyScalar(0.22),
      emissiveIntensity: 0.8,
      metalness: 0.28,
      roughness: 0.32,
      clearcoat: 0.4,
      clearcoatRoughness: 0.38,
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

      // Convert the SVG coordinate system into a conventional 3D space.
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
  logoGroup.position.set(-center.x * scale, -center.y * scale, 0);
  logoGroup.updateMatrixWorld(true);

  const frameGeometry = new THREE.BoxGeometry(
    (size.x * scale) + 0.28,
    (size.y * scale) + 0.18,
    0.26
  );
  const frameMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x73efff,
    emissive: 0x1fb8e3,
    emissiveIntensity: 0.34,
    transparent: true,
    opacity: 0.035,
    depthWrite: false,
    roughness: 0.08,
    metalness: 0.18,
    clearcoat: 1,
    clearcoatRoughness: 0.06,
    side: THREE.DoubleSide
  });
  const frame = new THREE.Mesh(frameGeometry, frameMaterial);
  frame.position.z = -0.45;

  const group = new THREE.Group();
  group.add(frame);
  group.add(logoGroup);
  group.position.y = 0.18;
  logoGroup.position.z = 0.08;

  return group;
}

const glowParts = addGlowAccents();

function frameScene() {
  camera.lookAt(0, 0.18, 0);
  renderer.render(scene, camera);
}

function setProgress(progress) {
  const wrapped = ((progress % 1) + 1) % 1;
  const angle = wrapped * Math.PI * 2;
  const drift = Math.sin(wrapped * Math.PI * 2);
  const shimmer = (Math.sin(wrapped * Math.PI * 4) + 1) * 0.5;

  logoRig.rotation.x = 0.34;
  logoRig.rotation.y = angle;
  logoRig.rotation.z = drift * 0.08;
  logoRig.position.y = drift * 0.08;

  camera.position.x = Math.sin(angle) * 0.18;
  camera.position.y = 0.35 + Math.cos(angle * 2) * 0.06;
  camera.position.z = 12.8 - Math.cos(angle) * 0.08;

  glowRig.rotation.z = -angle * 0.22;
  glowParts.halo.material.opacity = 0.48 + shimmer * 0.12;
  glowParts.innerHalo.material.opacity = 0.3 + shimmer * 0.12;
  glowParts.beam.material.opacity = 0.18 + shimmer * 0.08;
  glowParts.halo.scale.setScalar(11.4 + shimmer * 0.8);
  glowParts.innerHalo.scale.setScalar(8 + shimmer * 0.5);

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
  setProgress(0);

  window.sceneApi = {
    isReady: true,
    setProgress,
    exportGLB
  };
}

init().catch((error) => {
  console.error(error);
  window.sceneApi = {
    isReady: false,
    error: error.message
  };
});
