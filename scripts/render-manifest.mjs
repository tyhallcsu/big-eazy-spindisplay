function createOutputs(overrides = {}) {
  return {
    preview: true,
    glb: false,
    glbPathMode: 'variant',
    mp4: false,
    gif: false,
    contactSheet: false,
    metadata: false,
    ...overrides
  };
}

function createConceptOutputs() {
  return createOutputs({
    glb: true,
    glbPathMode: 'preset',
    mp4: true,
    gif: true,
    contactSheet: true,
    metadata: true
  });
}

function createCyanPalette() {
  return {
    materials: {
      face: {
        color: '#02a5d1',
        emissive: '#02a5d1',
        emissiveIntensity: 0.95,
        metalness: 0.22,
        roughness: 0.16,
        clearcoat: 0.9,
        clearcoatRoughness: 0.18,
        reflectivity: 0.75
      },
      side: {
        color: '#017fa1',
        emissive: '#017fa1',
        emissiveIntensity: 0.8,
        metalness: 0.28,
        roughness: 0.32,
        clearcoat: 0.4,
        clearcoatRoughness: 0.38
      },
      frame: {
        enabled: true,
        color: '#73efff',
        emissive: '#1fb8e3',
        emissiveIntensity: 0.34,
        opacity: 0.035,
        roughness: 0.08,
        metalness: 0.18,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
        paddingX: 0.28,
        paddingY: 0.18,
        depth: 0.26,
        z: -0.45,
        transparent: true,
        depthWrite: false
      }
    },
    glow: {
      enabled: true,
      haloColor: '#8ef5ff',
      innerColor: '#18bde7',
      beamColor: '#74f2ff',
      haloOpacity: 0.56,
      innerOpacity: 0.42,
      beamOpacity: 0.3,
      haloScale: 11.8,
      innerScale: 8.4,
      beamWidth: 2.9,
      beamHeight: 10.4,
      haloPosition: [0, 0.2, -1.7],
      innerPosition: [0, 0.15, -1.1],
      beamPosition: [0, 0.2, -2.25],
      pulseAmplitude: 0.12,
      innerPulseAmplitude: 0.12,
      beamPulseAmplitude: 0.08,
      rotationFactor: -0.22
    },
    lighting: {
      ambientSky: '#c9fbff',
      ambientGround: '#001018',
      ambientIntensity: 1.45,
      keyColor: '#c5f7ff',
      keyIntensity: 2.8,
      keyPosition: [4.8, 5.2, 6.5],
      rimColor: '#8be8ff',
      rimIntensity: 2.1,
      rimPosition: [-5.5, 1.6, -4.4],
      lowerColor: '#0377a8',
      lowerIntensity: 11,
      lowerDistance: 20,
      lowerDecay: 2,
      lowerPosition: [0, -2.4, 4.5]
    }
  };
}

function createGoldPalette() {
  return {
    materials: {
      face: {
        color: '#f6d77f',
        emissive: '#b57a1c',
        emissiveIntensity: 0.34,
        metalness: 0.98,
        roughness: 0.12,
        clearcoat: 1,
        clearcoatRoughness: 0.04,
        reflectivity: 0.94
      },
      side: {
        color: '#bb8730',
        emissive: '#8b611b',
        emissiveIntensity: 0.2,
        metalness: 0.92,
        roughness: 0.2,
        clearcoat: 0.94,
        clearcoatRoughness: 0.1
      },
      frame: {
        enabled: false,
        color: '#1a1205',
        emissive: '#3a2708',
        emissiveIntensity: 0.06,
        opacity: 0.94,
        roughness: 0.28,
        metalness: 0.7,
        clearcoat: 0.88,
        clearcoatRoughness: 0.12,
        paddingX: 0.34,
        paddingY: 0.24,
        depth: 0.34,
        z: -0.34,
        transparent: false,
        depthWrite: true
      }
    },
    glow: {
      enabled: false,
      haloColor: '#f5db9d',
      innerColor: '#d7b165',
      beamColor: '#e5c56f',
      haloOpacity: 0.14,
      innerOpacity: 0.08,
      beamOpacity: 0.04,
      haloScale: 10.6,
      innerScale: 7.2,
      beamWidth: 2.2,
      beamHeight: 9.4,
      haloPosition: [0, 0.08, -1.6],
      innerPosition: [0, 0.08, -1.0],
      beamPosition: [0, 0.12, -2.0],
      pulseAmplitude: 0.03,
      innerPulseAmplitude: 0.02,
      beamPulseAmplitude: 0.01,
      rotationFactor: -0.08
    },
    lighting: {
      ambientSky: '#fff4d8',
      ambientGround: '#1b1102',
      ambientIntensity: 1.02,
      keyColor: '#fff1ca',
      keyIntensity: 3.7,
      keyPosition: [5.6, 4.9, 7.2],
      rimColor: '#f2cf85',
      rimIntensity: 1.9,
      rimPosition: [-5.2, 1.8, -4.2],
      lowerColor: '#b8842c',
      lowerIntensity: 6.8,
      lowerDistance: 16,
      lowerDecay: 2,
      lowerPosition: [0, -2.1, 4.3]
    }
  };
}

function createNeutralPalette() {
  return {
    materials: {
      face: {
        color: '#d5d9dd',
        emissive: '#494f57',
        emissiveIntensity: 0.22,
        metalness: 0.62,
        roughness: 0.22,
        clearcoat: 0.92,
        clearcoatRoughness: 0.14,
        reflectivity: 0.65
      },
      side: {
        color: '#848b93',
        emissive: '#343941',
        emissiveIntensity: 0.16,
        metalness: 0.5,
        roughness: 0.36,
        clearcoat: 0.46,
        clearcoatRoughness: 0.3
      },
      frame: {
        enabled: false,
        color: '#9ca2aa',
        emissive: '#525861',
        emissiveIntensity: 0.16,
        opacity: 0.02,
        roughness: 0.12,
        metalness: 0.18,
        clearcoat: 0.9,
        clearcoatRoughness: 0.1,
        paddingX: 0.22,
        paddingY: 0.14,
        depth: 0.2,
        z: -0.4,
        transparent: true,
        depthWrite: false
      }
    },
    glow: {
      enabled: true,
      haloColor: '#f1f5f8',
      innerColor: '#b7bec7',
      beamColor: '#d8dde2',
      haloOpacity: 0.28,
      innerOpacity: 0.2,
      beamOpacity: 0.14,
      haloScale: 11,
      innerScale: 7.8,
      beamWidth: 2.6,
      beamHeight: 9.8,
      haloPosition: [0, 0.1, -1.8],
      innerPosition: [0, 0.08, -1.15],
      beamPosition: [0, 0.08, -2.2],
      pulseAmplitude: 0.08,
      innerPulseAmplitude: 0.06,
      beamPulseAmplitude: 0.04,
      rotationFactor: -0.16
    },
    lighting: {
      ambientSky: '#f4f6f7',
      ambientGround: '#0a0b0d',
      ambientIntensity: 1.1,
      keyColor: '#ffffff',
      keyIntensity: 2.2,
      keyPosition: [4.6, 4.8, 6.8],
      rimColor: '#c7cbd0',
      rimIntensity: 1.2,
      rimPosition: [-5.2, 1.4, -4.2],
      lowerColor: '#8d949c',
      lowerIntensity: 6.4,
      lowerDistance: 18,
      lowerDecay: 2,
      lowerPosition: [0, -2.2, 4.2]
    }
  };
}

function createWarmPalette() {
  return {
    materials: {
      face: {
        color: '#fcf7ee',
        emissive: '#f7d38c',
        emissiveIntensity: 0.34,
        metalness: 0.24,
        roughness: 0.14,
        clearcoat: 0.98,
        clearcoatRoughness: 0.08,
        reflectivity: 0.78
      },
      side: {
        color: '#e4b14d',
        emissive: '#c97d24',
        emissiveIntensity: 0.24,
        metalness: 0.32,
        roughness: 0.24,
        clearcoat: 0.78,
        clearcoatRoughness: 0.16
      },
      frame: {
        enabled: false,
        color: '#f7cf7b',
        emissive: '#dc8b32',
        emissiveIntensity: 0.12,
        opacity: 0.02,
        roughness: 0.1,
        metalness: 0.16,
        clearcoat: 0.9,
        clearcoatRoughness: 0.08,
        paddingX: 0.18,
        paddingY: 0.12,
        depth: 0.16,
        z: -0.35,
        transparent: true,
        depthWrite: false
      }
    },
    glow: {
      enabled: true,
      haloColor: '#ffd36d',
      innerColor: '#ff9d5b',
      beamColor: '#ffcb73',
      haloOpacity: 0.26,
      innerOpacity: 0.16,
      beamOpacity: 0.1,
      haloScale: 10.4,
      innerScale: 7.4,
      beamWidth: 2.2,
      beamHeight: 8.6,
      haloPosition: [0, -0.02, -1.6],
      innerPosition: [0, -0.02, -1.0],
      beamPosition: [0, 0.02, -1.95],
      pulseAmplitude: 0.04,
      innerPulseAmplitude: 0.03,
      beamPulseAmplitude: 0.02,
      rotationFactor: -0.1
    },
    lighting: {
      ambientSky: '#fff6e0',
      ambientGround: '#120a02',
      ambientIntensity: 1.08,
      keyColor: '#fff0c2',
      keyIntensity: 2.6,
      keyPosition: [5.2, 4.6, 7.1],
      rimColor: '#ffc766',
      rimIntensity: 1.5,
      rimPosition: [-5.4, 1.6, -4.1],
      lowerColor: '#d48b2b',
      lowerIntensity: 5.8,
      lowerDistance: 18,
      lowerDecay: 2,
      lowerPosition: [0, -2.0, 4.2]
    }
  };
}

export const sceneDefaults = {
  width: 1024,
  height: 1024,
  fps: 30,
  seconds: 8,
  background: '#000000',
  logoSize: 6,
  extrusionDepth: 44,
  bevelThickness: 6,
  bevelSize: 4,
  bevelSegments: 5,
  curveSegments: 20,
  svgUrl: '',
  baseHalo: {
    enabled: false
  },
  lightColumn: {
    enabled: false
  },
  projectionPlate: {
    enabled: false
  },
  shieldPanel: {
    enabled: false
  },
  camera: {
    fov: 30,
    position: [0, 0.35, 12.8],
    lookAt: [0, 0.18, 0],
    orbitXAmplitude: 0.18,
    orbitYAmplitude: 0.06,
    orbitZAmplitude: 0.08
  },
  animation: {
    mode: 'loop',
    turns: 1,
    tiltX: 0.34,
    driftY: 0.08,
    driftRoll: 0.08,
    stillProgress: 0.0625
  },
  ...createCyanPalette()
};

export const presetDefinitions = {
  'spindisplay-loop': {
    label: 'SpinDisplay Loop',
    outputs: createOutputs({
      glb: true,
      mp4: true
    }),
    scene: {
      background: '#000000',
      animation: {
        mode: 'loop',
        stillProgress: 0.0625,
        turns: 1,
        tiltX: 0.34,
        driftY: 0.08,
        driftRoll: 0.08
      }
    }
  },
  'premium-turntable': {
    label: 'Premium Turntable',
    outputs: createOutputs({
      glb: true,
      mp4: true
    }),
    scene: {
      background: '#020305',
      camera: {
        position: [0, 0.28, 13.7],
        orbitXAmplitude: 0.1,
        orbitYAmplitude: 0.03,
        orbitZAmplitude: 0.05
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.14,
        turns: 1,
        tiltX: 0.2,
        driftY: 0.02,
        driftRoll: 0.03
      },
      glow: {
        enabled: false
      },
      materials: {
        face: {
          emissiveIntensity: 0.28,
          metalness: 0.44,
          roughness: 0.2,
          clearcoat: 1,
          clearcoatRoughness: 0.1
        },
        side: {
          emissiveIntensity: 0.16,
          metalness: 0.36,
          roughness: 0.28
        },
        frame: {
          enabled: false
        }
      }
    }
  },
  'hero-still': {
    label: 'Hero Still',
    outputs: createOutputs({
      glb: true
    }),
    scene: {
      background: '#020305',
      camera: {
        position: [0, 0.18, 13.3],
        orbitXAmplitude: 0,
        orbitYAmplitude: 0,
        orbitZAmplitude: 0
      },
      animation: {
        mode: 'still',
        stillProgress: 0.12,
        tiltX: 0.22,
        driftY: 0,
        driftRoll: 0,
        turns: 0
      },
      glow: {
        enabled: false
      },
      materials: {
        face: {
          emissiveIntensity: 0.22
        },
        side: {
          emissiveIntensity: 0.12
        },
        frame: {
          enabled: false
        }
      }
    }
  },
  'proof-pack': {
    label: 'Proof Pack',
    outputs: createOutputs({
      glb: true,
      mp4: true,
      gif: true,
      contactSheet: true,
      metadata: true
    }),
    scene: {
      background: '#000000',
      animation: {
        mode: 'loop',
        stillProgress: 0.0625,
        turns: 1,
        tiltX: 0.34,
        driftY: 0.08,
        driftRoll: 0.08
      }
    }
  },
  'floating-luxury-hologram': {
    label: 'Floating Luxury Hologram',
    outputs: createConceptOutputs(),
    scene: {
      background: '#000000',
      logoSize: 5.7,
      camera: {
        position: [0, 0.34, 13.2],
        lookAt: [0, 0.18, 0],
        orbitXAmplitude: 0.1,
        orbitYAmplitude: 0.035,
        orbitZAmplitude: 0.04
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.08,
        turns: 1,
        tiltX: 0.22,
        driftY: 0.024,
        driftRoll: 0.018
      },
      extrusionDepth: 42,
      bevelThickness: 5,
      bevelSize: 3.4,
      bevelSegments: 6,
      glow: {
        enabled: true,
        haloColor: '#9af7ff',
        innerColor: '#37d7ef',
        beamColor: '#74efff',
        haloOpacity: 0.34,
        innerOpacity: 0.24,
        beamOpacity: 0.12,
        haloScale: 9.4,
        innerScale: 6.8,
        beamWidth: 2.25,
        beamHeight: 9.6,
        haloPosition: [0, 0.16, -1.6],
        innerPosition: [0, 0.13, -0.98],
        beamPosition: [0, -0.04, -1.9],
        pulseAmplitude: 0.05,
        innerPulseAmplitude: 0.04,
        beamPulseAmplitude: 0.025,
        rotationFactor: -0.12
      },
      baseHalo: {
        enabled: true,
        color: '#5defff',
        opacity: 0.22,
        width: 5.8,
        depth: 3.2,
        y: -1.32,
        z: 0,
        pulseAmplitude: 0.04,
        scalePulse: 0.08
      },
      materials: {
        face: {
          emissiveIntensity: 0.92,
          metalness: 0.28,
          roughness: 0.14,
          clearcoat: 1,
          clearcoatRoughness: 0.12
        },
        side: {
          emissiveIntensity: 0.72,
          metalness: 0.3,
          roughness: 0.3
        },
        frame: {
          enabled: false
        }
      }
    }
  },
  'spinning-3d-emblem': {
    label: 'Spinning 3D Emblem',
    outputs: createConceptOutputs(),
    scene: {
      background: '#020100',
      ...createGoldPalette(),
      logoSize: 5.65,
      camera: {
        position: [0, 0.22, 13.6],
        lookAt: [0, 0.16, 0],
        orbitXAmplitude: 0.04,
        orbitYAmplitude: 0.015,
        orbitZAmplitude: 0.02
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.11,
        turns: 1,
        tiltX: 0.16,
        driftY: 0.008,
        driftRoll: 0.008
      },
      extrusionDepth: 54,
      bevelThickness: 8.5,
      bevelSize: 5.1,
      bevelSegments: 7,
      baseHalo: {
        enabled: false
      },
      projectionPlate: {
        enabled: false
      }
    }
  },
  'futuristic-projection': {
    label: 'Futuristic Projection',
    outputs: createConceptOutputs(),
    scene: {
      background: '#000000',
      logoSize: 5.6,
      camera: {
        position: [0, 0.3, 13.05],
        lookAt: [0, 0.18, 0],
        orbitXAmplitude: 0.09,
        orbitYAmplitude: 0.03,
        orbitZAmplitude: 0.035
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.07,
        turns: 1,
        tiltX: 0.24,
        driftY: 0.024,
        driftRoll: 0.02
      },
      extrusionDepth: 38,
      bevelThickness: 4.5,
      bevelSize: 3.1,
      bevelSegments: 6,
      glow: {
        enabled: true,
        haloColor: '#98f8ff',
        innerColor: '#74cfff',
        beamColor: '#b9f9ff',
        haloOpacity: 0.4,
        innerOpacity: 0.28,
        beamOpacity: 0.18,
        haloScale: 9.8,
        innerScale: 7.1,
        beamWidth: 2.4,
        beamHeight: 10.4,
        haloPosition: [0, 0.18, -1.65],
        innerPosition: [0, 0.14, -1.02],
        beamPosition: [0, -0.02, -1.92],
        pulseAmplitude: 0.07,
        innerPulseAmplitude: 0.05,
        beamPulseAmplitude: 0.04,
        rotationFactor: -0.14
      },
      baseHalo: {
        enabled: true,
        color: '#59e1ff',
        opacity: 0.12,
        width: 5.4,
        depth: 3,
        y: -1.34,
        z: 0,
        pulseAmplitude: 0.03,
        scalePulse: 0.05
      },
      projectionPlate: {
        enabled: true,
        color: '#73efff',
        underGlowColor: '#1ebbe8',
        opacity: 0.34,
        underGlowOpacity: 0.08,
        width: 6.2,
        depth: 3.7,
        y: -1.36,
        z: 0,
        rotationFactor: 0.08,
        pulseAmplitude: 0.05,
        scalePulse: 0.04
      },
      materials: {
        face: {
          color: '#a4fbff',
          emissive: '#4ce3ff',
          emissiveIntensity: 1.02,
          metalness: 0.18,
          roughness: 0.12,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          reflectivity: 0.82
        },
        side: {
          color: '#11658c',
          emissive: '#0f8ab8',
          emissiveIntensity: 0.62,
          metalness: 0.24,
          roughness: 0.28,
          clearcoat: 0.66,
          clearcoatRoughness: 0.2
        },
        frame: {
          enabled: false
        }
      },
      lighting: {
        ambientSky: '#d8fdff',
        ambientGround: '#00131a',
        ambientIntensity: 1.45,
        keyColor: '#dbfaff',
        keyIntensity: 2.6,
        keyPosition: [5.1, 5.4, 6.8],
        rimColor: '#7edaff',
        rimIntensity: 1.9,
        rimPosition: [-5.4, 1.6, -4.6],
        lowerColor: '#1bc0ef',
        lowerIntensity: 10.8,
        lowerDistance: 22,
        lowerDecay: 2,
        lowerPosition: [0, -2.05, 4.5]
      }
    }
  },
  'midnight-emboss': {
    label: 'Midnight Emboss',
    outputs: createConceptOutputs(),
    scene: {
      background: '#000000',
      logoSize: 5.7,
      camera: {
        position: [0, 0.22, 13.45],
        lookAt: [0, 0.16, 0],
        orbitXAmplitude: 0.035,
        orbitYAmplitude: 0.01,
        orbitZAmplitude: 0.02
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.12,
        turns: 1,
        tiltX: 0.14,
        driftY: 0.006,
        driftRoll: 0.005
      },
      extrusionDepth: 48,
      bevelThickness: 6.8,
      bevelSize: 4.2,
      bevelSegments: 6,
      glow: {
        enabled: false
      },
      baseHalo: {
        enabled: false
      },
      projectionPlate: {
        enabled: false
      },
      lightColumn: {
        enabled: false
      },
      shieldPanel: {
        enabled: false
      },
      materials: {
        face: {
          color: '#8b95a2',
          emissive: '#36414e',
          emissiveIntensity: 0.12,
          metalness: 0.72,
          roughness: 0.22,
          clearcoat: 1,
          clearcoatRoughness: 0.08,
          reflectivity: 0.62
        },
        side: {
          color: '#232a32',
          emissive: '#131920',
          emissiveIntensity: 0.06,
          metalness: 0.6,
          roughness: 0.34,
          clearcoat: 0.55,
          clearcoatRoughness: 0.18
        },
        frame: {
          enabled: false
        }
      },
      lighting: {
        ambientSky: '#f5f7fb',
        ambientGround: '#010204',
        ambientIntensity: 0.92,
        keyColor: '#f5f8ff',
        keyIntensity: 2.85,
        keyPosition: [5.8, 5.3, 7.6],
        rimColor: '#aeb9c8',
        rimIntensity: 2.45,
        rimPosition: [-5.6, 1.7, -4.4],
        lowerColor: '#263242',
        lowerIntensity: 4.6,
        lowerDistance: 18,
        lowerDecay: 2,
        lowerPosition: [0, -2.0, 4.0]
      }
    }
  },
  'signal-beacon': {
    label: 'Signal Beacon',
    outputs: createConceptOutputs(),
    scene: {
      background: '#000000',
      logoSize: 5.68,
      camera: {
        position: [0, 0.28, 13.2],
        lookAt: [0, 0.18, 0],
        orbitXAmplitude: 0.06,
        orbitYAmplitude: 0.022,
        orbitZAmplitude: 0.03
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.08,
        turns: 1,
        tiltX: 0.18,
        driftY: 0.012,
        driftRoll: 0.01
      },
      extrusionDepth: 42,
      bevelThickness: 5.2,
      bevelSize: 3.6,
      bevelSegments: 6,
      glow: {
        enabled: true,
        haloColor: '#b5fbff',
        innerColor: '#64ebff',
        beamColor: '#9cf7ff',
        haloOpacity: 0.26,
        innerOpacity: 0.2,
        beamOpacity: 0.08,
        haloScale: 9.8,
        innerScale: 7.2,
        beamWidth: 2.2,
        beamHeight: 10.2,
        haloPosition: [0, 0.16, -1.7],
        innerPosition: [0, 0.12, -1.02],
        beamPosition: [0, 0.08, -1.95],
        pulseAmplitude: 0.04,
        innerPulseAmplitude: 0.03,
        beamPulseAmplitude: 0.02,
        rotationFactor: -0.08
      },
      baseHalo: {
        enabled: true,
        color: '#78ecff',
        opacity: 0.12,
        width: 5.2,
        depth: 2.9,
        y: -1.3,
        z: 0,
        pulseAmplitude: 0.03,
        scalePulse: 0.04
      },
      lightColumn: {
        enabled: true,
        color: '#6ce8ff',
        coreColor: '#e4fdff',
        opacity: 0.13,
        coreOpacity: 0.08,
        width: 4.8,
        height: 10.8,
        y: 0.24,
        z: -1.45,
        pulseAmplitude: 0.04,
        scalePulse: 0.04
      },
      materials: {
        face: {
          color: '#c2fdff',
          emissive: '#5cecff',
          emissiveIntensity: 0.92,
          metalness: 0.2,
          roughness: 0.12,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
          reflectivity: 0.82
        },
        side: {
          color: '#15749a',
          emissive: '#1096bd',
          emissiveIntensity: 0.54,
          metalness: 0.24,
          roughness: 0.3,
          clearcoat: 0.7,
          clearcoatRoughness: 0.18
        },
        frame: {
          enabled: false
        }
      }
    }
  },
  'glass-panel-hologram': {
    label: 'Glass Panel Hologram',
    outputs: createConceptOutputs(),
    scene: {
      background: '#000000',
      logoSize: 5.62,
      camera: {
        position: [0, 0.3, 13.24],
        lookAt: [0, 0.18, 0],
        orbitXAmplitude: 0.075,
        orbitYAmplitude: 0.025,
        orbitZAmplitude: 0.03
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.09,
        turns: 1,
        tiltX: 0.2,
        driftY: 0.014,
        driftRoll: 0.012
      },
      extrusionDepth: 40,
      bevelThickness: 4.8,
      bevelSize: 3.2,
      bevelSegments: 6,
      glow: {
        enabled: true,
        haloColor: '#b5fbff',
        innerColor: '#68ecff',
        beamColor: '#a4f7ff',
        haloOpacity: 0.22,
        innerOpacity: 0.16,
        beamOpacity: 0.06,
        haloScale: 9.2,
        innerScale: 6.8,
        beamWidth: 2.1,
        beamHeight: 9.8,
        haloPosition: [0, 0.14, -1.62],
        innerPosition: [0, 0.1, -1.0],
        beamPosition: [0, 0.06, -1.86],
        pulseAmplitude: 0.03,
        innerPulseAmplitude: 0.025,
        beamPulseAmplitude: 0.015,
        rotationFactor: -0.06
      },
      baseHalo: {
        enabled: true,
        color: '#66e9ff',
        opacity: 0.1,
        width: 5.1,
        depth: 2.8,
        y: -1.3,
        z: 0,
        pulseAmplitude: 0.025,
        scalePulse: 0.04
      },
      shieldPanel: {
        enabled: true,
        color: '#b6fbff',
        edgeColor: '#66ecff',
        opacity: 0.08,
        edgeOpacity: 0.22,
        width: 5.95,
        height: 7.5,
        thickness: 0.14,
        y: 0.18,
        z: -0.68,
        pulseAmplitude: 0.02,
        scalePulse: 0.025
      },
      materials: {
        face: {
          color: '#b8fbff',
          emissive: '#56ddff',
          emissiveIntensity: 0.88,
          metalness: 0.16,
          roughness: 0.14,
          clearcoat: 1,
          clearcoatRoughness: 0.08,
          reflectivity: 0.84
        },
        side: {
          color: '#11688c',
          emissive: '#0d88b0',
          emissiveIntensity: 0.46,
          metalness: 0.22,
          roughness: 0.28,
          clearcoat: 0.72,
          clearcoatRoughness: 0.18
        },
        frame: {
          enabled: false
        }
      }
    }
  },
  'amber-marquee': {
    label: 'Amber Marquee',
    outputs: createConceptOutputs(),
    scene: {
      background: '#020100',
      ...createWarmPalette(),
      logoSize: 5.6,
      camera: {
        position: [0, 0.24, 13.5],
        lookAt: [0, 0.16, 0],
        orbitXAmplitude: 0.055,
        orbitYAmplitude: 0.02,
        orbitZAmplitude: 0.025
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.1,
        turns: 1,
        tiltX: 0.18,
        driftY: 0.01,
        driftRoll: 0.008
      },
      extrusionDepth: 46,
      bevelThickness: 6.2,
      bevelSize: 4.2,
      bevelSegments: 6,
      glow: {
        enabled: true,
        haloColor: '#ffe48a',
        innerColor: '#ffbf61',
        beamColor: '#ffd174',
        haloOpacity: 0.18,
        innerOpacity: 0.11,
        beamOpacity: 0.05,
        haloScale: 9.4,
        innerScale: 6.8,
        beamWidth: 2.05,
        beamHeight: 9.0,
        haloPosition: [0, 0.1, -1.62],
        innerPosition: [0, 0.08, -0.98],
        beamPosition: [0, 0.08, -1.86],
        pulseAmplitude: 0.03,
        innerPulseAmplitude: 0.02,
        beamPulseAmplitude: 0.015,
        rotationFactor: -0.06
      },
      baseHalo: {
        enabled: true,
        color: '#ffca69',
        opacity: 0.08,
        width: 5.2,
        depth: 2.8,
        y: -1.28,
        z: 0,
        pulseAmplitude: 0.02,
        scalePulse: 0.03
      },
      materials: {
        face: {
          color: '#fff0b4',
          emissive: '#ffc768',
          emissiveIntensity: 0.5,
          metalness: 0.48,
          roughness: 0.15,
          clearcoat: 1,
          clearcoatRoughness: 0.06,
          reflectivity: 0.86
        },
        side: {
          color: '#ba7323',
          emissive: '#d88c2d',
          emissiveIntensity: 0.3,
          metalness: 0.44,
          roughness: 0.24,
          clearcoat: 0.82,
          clearcoatRoughness: 0.1
        },
        frame: {
          enabled: false
        }
      }
    }
  }
};

export const logos = {
  'big-eazy': {
    label: 'Big Eazy',
    sourceSvg: '547227273_122137993856924986_8556302376693794118_n.svg',
    defaultVariant: 'display',
    palette: createCyanPalette(),
    variants: {
      full: {
        label: 'Full',
        derivedSvg: 'source/big-eazy/full.svg',
        derive: {
          mode: 'copy'
        },
        scene: {
          logoSize: 5.55,
          camera: {
            position: [0, 0.28, 13.8]
          },
          materials: {
            frame: {
              enabled: false
            }
          },
          glow: {
            enabled: false
          }
        }
      },
      display: {
        label: 'Display',
        derivedSvg: 'source/big-eazy/display.svg',
        derive: {
          mode: 'filter-max-y',
          maxY: 720,
          excludeText: ['Once You', 'Want Off']
        },
        scene: {
          logoSize: 6
        }
      }
    }
  },
  'big-eazy-v2': {
    label: 'Big Eazy v2',
    sourceSvg: 'source/big-eazy-v2/big-eazy-v2.svg',
    defaultVariant: 'display',
    palette: createCyanPalette(),
    variants: {
      full: {
        label: 'Full',
        derivedSvg: 'source/big-eazy-v2/full.svg',
        derive: {
          mode: 'copy'
        },
        scene: {
          logoSize: 5.55,
          camera: {
            position: [0, 0.28, 13.8]
          },
          materials: {
            frame: {
              enabled: false
            }
          },
          glow: {
            enabled: false
          }
        }
      },
      display: {
        label: 'Display',
        derivedSvg: 'source/big-eazy-v2/display.svg',
        derive: {
          mode: 'copy'
        },
        scene: {
          logoSize: 6
        }
      }
    }
  },
  'big-eazy-v3': {
    label: 'Big Eazy v3',
    sourceSvg: 'source/big-eazy-v3/big-eazy-v3.svg',
    defaultVariant: 'display',
    palette: createCyanPalette(),
    variants: {
      full: {
        label: 'Full',
        derivedSvg: 'source/big-eazy-v3/full.svg',
        derive: {
          mode: 'copy'
        },
        scene: {
          logoSize: 5.55,
          camera: {
            position: [0, 0.28, 13.8]
          },
          materials: {
            frame: {
              enabled: false
            }
          },
          glow: {
            enabled: false
          }
        }
      },
      display: {
        label: 'Display',
        derivedSvg: 'source/big-eazy-v3/display.svg',
        derive: {
          mode: 'copy'
        },
        scene: {
          logoSize: 6
        }
      }
    }
  },
  'earth-saving-solutions': {
    label: 'Earth Saving Solutions',
    sourceSvg: 'source/ESS-LOGO-THICK-BLACK.svg',
    defaultVariant: 'display',
    palette: createNeutralPalette(),
    variants: {
      full: {
        label: 'Full',
        derivedSvg: 'source/earth-saving-solutions/full.svg',
        derive: {
          mode: 'copy'
        },
        scene: {
          logoSize: 5.05,
          camera: {
            position: [0, 0.18, 14.7],
            lookAt: [0, 0.08, 0]
          },
          animation: {
            tiltX: 0.16
          },
          materials: {
            frame: {
              enabled: false
            }
          }
        }
      },
      display: {
        label: 'Display',
        derivedSvg: 'source/earth-saving-solutions/display.svg',
        derive: {
          mode: 'filter-max-y',
          maxY: 700,
          excludeText: ['SOLUTIONS']
        },
        scene: {
          logoSize: 5.55,
          camera: {
            position: [0, 0.16, 14.2],
            lookAt: [0, 0.06, 0]
          },
          animation: {
            tiltX: 0.22
          },
          materials: {
            frame: {
              enabled: false
            }
          }
        }
      }
    }
  },
  'munchies-and-mimosas': {
    label: 'Munchies and Mimosas',
    sourceSvg: 'source/munchies-and-mimosas/munchies-and-mimosas-transparent.svg',
    defaultVariant: 'display',
    palette: createWarmPalette(),
    variants: {
      full: {
        label: 'Full',
        derivedSvg: 'source/munchies-and-mimosas/full.svg',
        derive: {
          mode: 'copy'
        },
        scene: {
          logoSize: 4.95,
          camera: {
            position: [0, 0.02, 18.1],
            lookAt: [0, -0.05, 0]
          },
          animation: {
            tiltX: 0.14,
            driftY: 0.03,
            driftRoll: 0.015
          },
          materials: {
            frame: {
              enabled: false
            }
          }
        }
      },
      display: {
        label: 'Display',
        derivedSvg: 'source/munchies-and-mimosas/display.svg',
        derive: {
          mode: 'copy'
        },
        scene: {
          logoSize: 4.7,
          camera: {
            position: [0, 0.02, 18.8],
            lookAt: [0, -0.07, 0]
          },
          animation: {
            tiltX: 0.12,
            driftY: 0.02,
            driftRoll: 0.012
          },
          materials: {
            frame: {
              enabled: false
            }
          }
        }
      }
    }
  }
};

export const exampleJobs = [
  { logo: 'big-eazy', variant: 'display', preset: 'spindisplay-loop' },
  { logo: 'big-eazy', variant: 'display', preset: 'premium-turntable' },
  { logo: 'big-eazy', variant: 'display', preset: 'hero-still' },
  { logo: 'big-eazy', variant: 'display', preset: 'proof-pack' },
  { logo: 'earth-saving-solutions', variant: 'full', preset: 'premium-turntable' },
  { logo: 'earth-saving-solutions', variant: 'full', preset: 'hero-still' },
  { logo: 'earth-saving-solutions', variant: 'display', preset: 'spindisplay-loop' },
  { logo: 'earth-saving-solutions', variant: 'display', preset: 'proof-pack' }
];

export const jobSets = {
  examples: exampleJobs,
  'big-eazy-concepts': [
    { logo: 'big-eazy', variant: 'display', preset: 'floating-luxury-hologram' },
    { logo: 'big-eazy', variant: 'display', preset: 'spinning-3d-emblem' },
    { logo: 'big-eazy', variant: 'display', preset: 'futuristic-projection' }
  ],
  'shared-deployable-presets': [
    { logo: 'big-eazy', variant: 'display', preset: 'midnight-emboss' },
    { logo: 'big-eazy', variant: 'display', preset: 'signal-beacon' },
    { logo: 'big-eazy', variant: 'display', preset: 'glass-panel-hologram' },
    { logo: 'big-eazy', variant: 'display', preset: 'amber-marquee' },
    { logo: 'earth-saving-solutions', variant: 'display', preset: 'midnight-emboss' },
    { logo: 'earth-saving-solutions', variant: 'display', preset: 'signal-beacon' },
    { logo: 'earth-saving-solutions', variant: 'display', preset: 'glass-panel-hologram' },
    { logo: 'earth-saving-solutions', variant: 'display', preset: 'amber-marquee' },
    { logo: 'munchies-and-mimosas', variant: 'display', preset: 'midnight-emboss' },
    { logo: 'munchies-and-mimosas', variant: 'display', preset: 'signal-beacon' },
    { logo: 'munchies-and-mimosas', variant: 'display', preset: 'glass-panel-hologram' },
    { logo: 'munchies-and-mimosas', variant: 'display', preset: 'amber-marquee' }
  ]
};

function isPlainObject(value) {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
}

export function deepMerge(base, override) {
  if (Array.isArray(base) || Array.isArray(override)) {
    return override === undefined ? structuredClone(base) : structuredClone(override);
  }

  if (!isPlainObject(base)) {
    return override === undefined ? base : override;
  }

  const result = {};
  const keys = new Set([
    ...Object.keys(base),
    ...Object.keys(override || {})
  ]);

  for (const key of keys) {
    const baseValue = base[key];
    const overrideValue = override ? override[key] : undefined;

    if (overrideValue === undefined) {
      result[key] = structuredClone(baseValue);
      continue;
    }

    if (isPlainObject(baseValue) && isPlainObject(overrideValue)) {
      result[key] = deepMerge(baseValue, overrideValue);
      continue;
    }

    result[key] = structuredClone(overrideValue);
  }

  return result;
}

export function getLogoDefinition(logoId) {
  const logo = logos[logoId];

  if (!logo) {
    throw new Error(`Unknown logo "${logoId}".`);
  }

  return logo;
}

export function getVariantDefinition(logoId, variantId) {
  const logo = getLogoDefinition(logoId);
  const resolvedVariantId = variantId || logo.defaultVariant;
  const variant = logo.variants[resolvedVariantId];

  if (!variant) {
    throw new Error(`Unknown variant "${resolvedVariantId}" for logo "${logoId}".`);
  }

  return {
    variant,
    variantId: resolvedVariantId
  };
}

export function getPresetDefinition(presetId) {
  const preset = presetDefinitions[presetId];

  if (!preset) {
    throw new Error(`Unknown preset "${presetId}".`);
  }

  return preset;
}

export function getJobSetDefinition(jobSetId) {
  const jobs = jobSets[jobSetId];

  if (!jobs) {
    throw new Error(`Unknown job set "${jobSetId}".`);
  }

  return jobs;
}

export function getResolvedRenderProfile(logoId, variantId, presetId) {
  const logo = getLogoDefinition(logoId);
  const { variant, variantId: resolvedVariantId } = getVariantDefinition(logoId, variantId);
  const preset = getPresetDefinition(presetId);

  const scene = deepMerge(
    sceneDefaults,
    deepMerge(
      logo.palette || {},
      deepMerge(logo.scene || {}, deepMerge(variant.scene || {}, preset.scene || {}))
    )
  );
  scene.svgUrl = `../${variant.derivedSvg}`;

  return {
    logoId,
    variantId: resolvedVariantId,
    presetId,
    logo,
    variant,
    preset,
    outputs: preset.outputs,
    scene
  };
}

export function getVariantJobsFromLogo(logoId) {
  const logo = getLogoDefinition(logoId);

  return Object.keys(logo.variants).map((variantId) => ({
    logo: logoId,
    variant: variantId
  }));
}
