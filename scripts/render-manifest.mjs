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
  logoOutline: {
    enabled: false
  },
  backplate: {
    enabled: false
  },
  sweepLight: {
    enabled: false
  },
  stadiumBeams: {
    enabled: false
  },
  sequence: {
    mode: 'none'
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
  },
  'casino-neon-sign': {
    label: 'Casino Neon Sign',
    category: 'display-safe',
    display_safe: true,
    style_family: 'neon-signage',
    notes: 'Tube-neon signage vibe with bright edge energy and dark interior fill.',
    outputs: createConceptOutputs(),
    scene: {
      background: '#000000',
      logoSize: 5.8,
      camera: {
        position: [0, 0.28, 13.25],
        lookAt: [0, 0.17, 0],
        orbitXAmplitude: 0.065,
        orbitYAmplitude: 0.022,
        orbitZAmplitude: 0.032
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.08,
        turns: 1,
        tiltX: 0.2,
        driftY: 0.016,
        driftRoll: 0.01
      },
      extrusionDepth: 26,
      bevelThickness: 2.8,
      bevelSize: 1.65,
      bevelSegments: 5,
      glow: {
        enabled: true,
        haloColor: '#63ff8f',
        innerColor: '#ff4fb9',
        beamColor: '#ffc75f',
        haloOpacity: 0.48,
        innerOpacity: 0.36,
        beamOpacity: 0.13,
        haloScale: 10.8,
        innerScale: 7.2,
        beamWidth: 2.2,
        beamHeight: 9.4,
        haloPosition: [0, 0.16, -1.55],
        innerPosition: [0, 0.13, -0.98],
        beamPosition: [0, 0.05, -1.9],
        pulseAmplitude: 0.16,
        innerPulseAmplitude: 0.12,
        beamPulseAmplitude: 0.05,
        rotationFactor: -0.22
      },
      baseHalo: {
        enabled: true,
        color: '#58ff97',
        opacity: 0.16,
        width: 5.3,
        depth: 2.9,
        y: -1.3,
        z: 0,
        pulseAmplitude: 0.06,
        scalePulse: 0.08
      },
      materials: {
        face: {
          color: '#1c0d13',
          emissive: '#ff53b8',
          emissiveIntensity: 0.62,
          metalness: 0.14,
          roughness: 0.45,
          clearcoat: 0.76,
          clearcoatRoughness: 0.23,
          reflectivity: 0.42
        },
        side: {
          color: '#28190e',
          emissive: '#ffbf59',
          emissiveIntensity: 0.42,
          metalness: 0.16,
          roughness: 0.52,
          clearcoat: 0.58,
          clearcoatRoughness: 0.28
        },
        frame: {
          enabled: false
        }
      },
      logoOutline: {
        enabled: true,
        color: '#61ff8b',
        secondaryColor: '#ff4fb9',
        opacity: 0.68,
        secondaryOpacity: 0.34,
        thickness: 1.06,
        pulseAmplitude: 0.16,
        rotationFactor: -0.12,
        zOffset: 0.06
      },
      lighting: {
        ambientSky: '#f2deff',
        ambientGround: '#050205',
        ambientIntensity: 1.05,
        keyColor: '#fff0cf',
        keyIntensity: 2.4,
        keyPosition: [5.2, 4.8, 7.0],
        rimColor: '#6dffab',
        rimIntensity: 2.0,
        rimPosition: [-5.2, 1.7, -4.1],
        lowerColor: '#ff4ab0',
        lowerIntensity: 7.2,
        lowerDistance: 19,
        lowerDecay: 2,
        lowerPosition: [0, -2.0, 4.2]
      }
    }
  },
  'trophy-emblem': {
    label: 'Trophy Emblem',
    category: 'display-safe',
    display_safe: true,
    style_family: 'championship-metal',
    notes: 'Heavy gold championship object with dark enamel backing and restrained motion.',
    outputs: createConceptOutputs(),
    scene: {
      background: '#040200',
      ...createGoldPalette(),
      logoSize: 5.74,
      camera: {
        position: [0, 0.18, 13.65],
        lookAt: [0, 0.16, 0],
        orbitXAmplitude: 0.032,
        orbitYAmplitude: 0.01,
        orbitZAmplitude: 0.016
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.11,
        turns: 1,
        tiltX: 0.14,
        driftY: 0.004,
        driftRoll: 0.004
      },
      extrusionDepth: 64,
      bevelThickness: 10.8,
      bevelSize: 5.9,
      bevelSegments: 8,
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
          color: '#f6d995',
          emissive: '#7f5114',
          emissiveIntensity: 0.16,
          metalness: 1,
          roughness: 0.1,
          clearcoat: 1,
          clearcoatRoughness: 0.03,
          reflectivity: 0.98,
          surfacePattern: {
            mode: 'brushed-metal',
            strength: 0.42
          }
        },
        side: {
          color: '#885a1b',
          emissive: '#4f310c',
          emissiveIntensity: 0.06,
          metalness: 0.94,
          roughness: 0.24,
          clearcoat: 0.86,
          clearcoatRoughness: 0.13
        },
        frame: {
          enabled: false
        }
      },
      backplate: {
        enabled: true,
        color: '#1f1304',
        emissive: '#2a1b06',
        emissiveIntensity: 0.05,
        metalness: 0.72,
        roughness: 0.36,
        clearcoat: 0.64,
        clearcoatRoughness: 0.23,
        opacity: 0.98,
        transparent: false,
        widthPadding: 0.86,
        heightPadding: 0.62,
        depth: 0.28,
        z: -0.82
      },
      lighting: {
        ambientSky: '#fff1d2',
        ambientGround: '#0f0901',
        ambientIntensity: 0.92,
        keyColor: '#fff0c7',
        keyIntensity: 4.2,
        keyPosition: [5.9, 5.3, 7.9],
        rimColor: '#f2ca75',
        rimIntensity: 2.5,
        rimPosition: [-5.2, 1.8, -4.0],
        lowerColor: '#9f6e22',
        lowerIntensity: 6.4,
        lowerDistance: 17,
        lowerDecay: 2,
        lowerPosition: [0, -2.0, 3.9]
      }
    }
  },
  'crystal-glass-luxury': {
    label: 'Crystal Glass Luxury',
    category: 'cinematic',
    display_safe: false,
    style_family: 'glass-luxury',
    notes: 'Translucent crystal-like logo with cyan/violet rim light and refined movement.',
    outputs: createConceptOutputs(),
    scene: {
      background: '#01020a',
      logoSize: 5.62,
      camera: {
        position: [0, 0.26, 13.5],
        lookAt: [0, 0.16, 0],
        orbitXAmplitude: 0.05,
        orbitYAmplitude: 0.018,
        orbitZAmplitude: 0.025
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.09,
        turns: 1,
        tiltX: 0.18,
        driftY: 0.01,
        driftRoll: 0.008
      },
      extrusionDepth: 34,
      bevelThickness: 3.9,
      bevelSize: 2.5,
      bevelSegments: 6,
      glow: {
        enabled: true,
        haloColor: '#95eeff',
        innerColor: '#b89bff',
        beamColor: '#80d8ff',
        haloOpacity: 0.2,
        innerOpacity: 0.12,
        beamOpacity: 0.05,
        haloScale: 9.6,
        innerScale: 6.9,
        beamWidth: 2.0,
        beamHeight: 8.9,
        haloPosition: [0, 0.14, -1.62],
        innerPosition: [0, 0.1, -1.02],
        beamPosition: [0, 0.03, -1.86],
        pulseAmplitude: 0.04,
        innerPulseAmplitude: 0.03,
        beamPulseAmplitude: 0.02,
        rotationFactor: -0.08
      },
      baseHalo: {
        enabled: true,
        color: '#91dcff',
        opacity: 0.08,
        width: 5.0,
        depth: 2.8,
        y: -1.28,
        z: 0,
        pulseAmplitude: 0.02,
        scalePulse: 0.03
      },
      shieldPanel: {
        enabled: true,
        color: '#a4dbff',
        edgeColor: '#c39fff',
        opacity: 0.06,
        edgeOpacity: 0.14,
        width: 5.9,
        height: 7.35,
        thickness: 0.12,
        y: 0.17,
        z: -0.7,
        pulseAmplitude: 0.015,
        scalePulse: 0.02
      },
      materials: {
        face: {
          color: '#b9ebff',
          emissive: '#80cbff',
          emissiveIntensity: 0.22,
          metalness: 0.04,
          roughness: 0.08,
          clearcoat: 1,
          clearcoatRoughness: 0.03,
          reflectivity: 0.92,
          transmission: 0.88,
          thickness: 1.05,
          ior: 1.33,
          transparent: true,
          opacity: 0.72,
          attenuationColor: '#7cc9ff',
          attenuationDistance: 1.9
        },
        side: {
          color: '#6aa6cc',
          emissive: '#4fa6d8',
          emissiveIntensity: 0.14,
          metalness: 0.08,
          roughness: 0.2,
          clearcoat: 0.96,
          clearcoatRoughness: 0.06,
          transmission: 0.74,
          thickness: 0.9,
          ior: 1.31,
          transparent: true,
          opacity: 0.66,
          attenuationColor: '#5fb6e0',
          attenuationDistance: 1.6
        },
        frame: {
          enabled: false
        }
      },
      logoOutline: {
        enabled: true,
        color: '#9deeff',
        secondaryColor: '#bda4ff',
        opacity: 0.22,
        secondaryOpacity: 0.14,
        thickness: 0.92,
        pulseAmplitude: 0.03,
        rotationFactor: -0.03,
        zOffset: 0.05
      },
      sweepLight: {
        enabled: true,
        color: '#d3c1ff',
        opacity: 0.05,
        width: 2.4,
        height: 9.0,
        z: 0.86,
        angle: 0.26,
        range: 5.6,
        speed: 0.4
      },
      lighting: {
        ambientSky: '#f4f6ff',
        ambientGround: '#05060d',
        ambientIntensity: 1.06,
        keyColor: '#d9f2ff',
        keyIntensity: 2.05,
        keyPosition: [4.8, 4.9, 7.2],
        rimColor: '#ccacff',
        rimIntensity: 1.74,
        rimPosition: [-5.4, 1.6, -4.4],
        lowerColor: '#7ca7d8',
        lowerIntensity: 4.4,
        lowerDistance: 18,
        lowerDecay: 2,
        lowerPosition: [0, -2.0, 4.2]
      }
    }
  },
  'mardi-gras-royal-crest': {
    label: 'Mardi Gras Royal Crest',
    category: 'display-safe',
    display_safe: true,
    style_family: 'royal-crest',
    notes: 'Regal purple/green/gold crest treatment with enamel-like segmentation and metal trim.',
    outputs: createConceptOutputs(),
    scene: {
      background: '#030104',
      logoSize: 5.72,
      camera: {
        position: [0, 0.22, 13.5],
        lookAt: [0, 0.16, 0],
        orbitXAmplitude: 0.05,
        orbitYAmplitude: 0.018,
        orbitZAmplitude: 0.022
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.1,
        turns: 1,
        tiltX: 0.16,
        driftY: 0.01,
        driftRoll: 0.006
      },
      extrusionDepth: 52,
      bevelThickness: 7.1,
      bevelSize: 4.4,
      bevelSegments: 7,
      glow: {
        enabled: true,
        haloColor: '#d0a7ff',
        innerColor: '#5ed298',
        beamColor: '#f4c66a',
        haloOpacity: 0.12,
        innerOpacity: 0.08,
        beamOpacity: 0.03,
        haloScale: 9.0,
        innerScale: 6.4,
        beamWidth: 1.9,
        beamHeight: 8.6,
        haloPosition: [0, 0.12, -1.6],
        innerPosition: [0, 0.1, -1.0],
        beamPosition: [0, 0.04, -1.85],
        pulseAmplitude: 0.03,
        innerPulseAmplitude: 0.02,
        beamPulseAmplitude: 0.01,
        rotationFactor: -0.04
      },
      baseHalo: {
        enabled: true,
        color: '#5fcf96',
        opacity: 0.06,
        width: 5.05,
        depth: 2.7,
        y: -1.28,
        z: 0,
        pulseAmplitude: 0.015,
        scalePulse: 0.02
      },
      materials: {
        face: {
          color: '#d7af58',
          emissive: '#744e14',
          emissiveIntensity: 0.2,
          metalness: 0.86,
          roughness: 0.18,
          clearcoat: 1,
          clearcoatRoughness: 0.08,
          reflectivity: 0.9
        },
        side: {
          color: '#2d1b11',
          emissive: '#1b0f08',
          emissiveIntensity: 0.08,
          metalness: 0.66,
          roughness: 0.34,
          clearcoat: 0.74,
          clearcoatRoughness: 0.19
        },
        frame: {
          enabled: false
        },
        pathPalette: [
          {
            face: '#60329c',
            faceEmissive: '#2e1257'
          },
          {
            face: '#1f8f61',
            faceEmissive: '#0a4d35'
          },
          {
            face: '#dab054',
            faceEmissive: '#7c5315'
          },
          {
            face: '#3d275f',
            faceEmissive: '#1a1033'
          }
        ],
        pathPaletteMode: 'cycle'
      },
      backplate: {
        enabled: true,
        color: '#140b1f',
        emissive: '#201030',
        emissiveIntensity: 0.06,
        metalness: 0.52,
        roughness: 0.42,
        clearcoat: 0.66,
        clearcoatRoughness: 0.2,
        opacity: 0.96,
        transparent: false,
        widthPadding: 1.02,
        heightPadding: 0.74,
        depth: 0.24,
        z: -0.78
      },
      logoOutline: {
        enabled: true,
        color: '#f0ce77',
        secondaryColor: '#5ed298',
        opacity: 0.22,
        secondaryOpacity: 0.16,
        thickness: 0.95,
        pulseAmplitude: 0.03,
        rotationFactor: -0.03,
        zOffset: 0.05
      },
      lighting: {
        ambientSky: '#f3e7ff',
        ambientGround: '#08030f',
        ambientIntensity: 0.95,
        keyColor: '#ffeec4',
        keyIntensity: 2.75,
        keyPosition: [5.6, 5.0, 7.4],
        rimColor: '#c9a4ff',
        rimIntensity: 1.75,
        rimPosition: [-5.2, 1.7, -4.3],
        lowerColor: '#41ad7f',
        lowerIntensity: 5.1,
        lowerDistance: 17,
        lowerDecay: 2,
        lowerPosition: [0, -2.0, 4.0]
      }
    }
  },
  'retro-chrome-nightlife': {
    label: 'Retro Chrome Nightlife',
    category: 'exploration',
    display_safe: false,
    style_family: 'retro-chrome',
    notes: 'Mirror-forward chrome with magenta/green club accents and moving shine sweeps.',
    outputs: createConceptOutputs(),
    scene: {
      background: '#000000',
      logoSize: 5.7,
      camera: {
        position: [0, 0.3, 13.22],
        lookAt: [0, 0.18, 0],
        orbitXAmplitude: 0.1,
        orbitYAmplitude: 0.03,
        orbitZAmplitude: 0.04
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.08,
        turns: 1,
        tiltX: 0.26,
        driftY: 0.028,
        driftRoll: 0.02
      },
      extrusionDepth: 48,
      bevelThickness: 6.4,
      bevelSize: 3.9,
      bevelSegments: 7,
      glow: {
        enabled: true,
        haloColor: '#ff56e8',
        innerColor: '#54ffb4',
        beamColor: '#aeeeff',
        haloOpacity: 0.24,
        innerOpacity: 0.16,
        beamOpacity: 0.07,
        haloScale: 9.8,
        innerScale: 7.0,
        beamWidth: 2.2,
        beamHeight: 9.4,
        haloPosition: [0, 0.16, -1.64],
        innerPosition: [0, 0.12, -1.03],
        beamPosition: [0, 0.08, -1.9],
        pulseAmplitude: 0.05,
        innerPulseAmplitude: 0.04,
        beamPulseAmplitude: 0.03,
        rotationFactor: -0.11
      },
      baseHalo: {
        enabled: true,
        color: '#54ffb4',
        opacity: 0.08,
        width: 5.3,
        depth: 2.9,
        y: -1.32,
        z: 0,
        pulseAmplitude: 0.03,
        scalePulse: 0.04
      },
      materials: {
        face: {
          color: '#d7e2ef',
          emissive: '#6df7d7',
          emissiveIntensity: 0.32,
          metalness: 1,
          roughness: 0.05,
          clearcoat: 1,
          clearcoatRoughness: 0.02,
          reflectivity: 1,
          surfacePattern: {
            mode: 'brushed-metal',
            strength: 0.28
          }
        },
        side: {
          color: '#757c8a',
          emissive: '#cb4ce8',
          emissiveIntensity: 0.24,
          metalness: 0.94,
          roughness: 0.14,
          clearcoat: 0.92,
          clearcoatRoughness: 0.08
        },
        frame: {
          enabled: false
        }
      },
      logoOutline: {
        enabled: true,
        color: '#ff58e9',
        secondaryColor: '#59ffba',
        opacity: 0.28,
        secondaryOpacity: 0.2,
        thickness: 0.9,
        pulseAmplitude: 0.05,
        rotationFactor: -0.06,
        zOffset: 0.06
      },
      sweepLight: {
        enabled: true,
        color: '#f8fbff',
        opacity: 0.14,
        width: 2.6,
        height: 9.2,
        z: 0.94,
        angle: 0.32,
        range: 7.2,
        speed: 1.35
      },
      lighting: {
        ambientSky: '#f8f8ff',
        ambientGround: '#030208',
        ambientIntensity: 0.96,
        keyColor: '#d8f6ff',
        keyIntensity: 2.8,
        keyPosition: [5.4, 4.9, 7.5],
        rimColor: '#ff73ea',
        rimIntensity: 2.25,
        rimPosition: [-5.6, 1.8, -4.4],
        lowerColor: '#5bffc3',
        lowerIntensity: 6.3,
        lowerDistance: 18,
        lowerDecay: 2,
        lowerPosition: [0, -2.05, 4.0]
      }
    }
  },
  'wireframe-reveal': {
    label: 'Wireframe Reveal',
    category: 'cinematic',
    display_safe: false,
    style_family: 'technical-reveal',
    notes: 'Blueprint-style wireframe reveal that resolves into a polished finished mark.',
    outputs: createConceptOutputs(),
    scene: {
      background: '#000206',
      logoSize: 5.68,
      camera: {
        position: [0, 0.26, 13.4],
        lookAt: [0, 0.17, 0],
        orbitXAmplitude: 0.07,
        orbitYAmplitude: 0.024,
        orbitZAmplitude: 0.034
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.1,
        turns: 1,
        tiltX: 0.21,
        driftY: 0.016,
        driftRoll: 0.011
      },
      extrusionDepth: 40,
      bevelThickness: 4.8,
      bevelSize: 3.2,
      bevelSegments: 6,
      glow: {
        enabled: true,
        haloColor: '#9ff7ff',
        innerColor: '#73d6ff',
        beamColor: '#bee8ff',
        haloOpacity: 0.26,
        innerOpacity: 0.18,
        beamOpacity: 0.08,
        haloScale: 9.6,
        innerScale: 6.9,
        beamWidth: 2.2,
        beamHeight: 9.3,
        haloPosition: [0, 0.15, -1.6],
        innerPosition: [0, 0.12, -1.0],
        beamPosition: [0, 0.05, -1.88],
        pulseAmplitude: 0.05,
        innerPulseAmplitude: 0.04,
        beamPulseAmplitude: 0.02,
        rotationFactor: -0.09
      },
      baseHalo: {
        enabled: true,
        color: '#75dfff',
        opacity: 0.11,
        width: 5.2,
        depth: 2.9,
        y: -1.3,
        z: 0,
        pulseAmplitude: 0.03,
        scalePulse: 0.04
      },
      materials: {
        face: {
          color: '#d0def4',
          emissive: '#67b5ff',
          emissiveIntensity: 0.3,
          metalness: 0.72,
          roughness: 0.2,
          clearcoat: 0.94,
          clearcoatRoughness: 0.08,
          reflectivity: 0.72
        },
        side: {
          color: '#4f6284',
          emissive: '#2d5f93',
          emissiveIntensity: 0.18,
          metalness: 0.58,
          roughness: 0.28,
          clearcoat: 0.74,
          clearcoatRoughness: 0.14
        },
        frame: {
          enabled: false
        }
      },
      sequence: {
        mode: 'wireframe-reveal',
        wireColor: '#8ef4ff',
        wireOpacity: 0.92,
        revealStart: 0,
        revealEnd: 0.58,
        settleEnd: 0.9,
        scaleStart: 0.9,
        emissiveBoost: 0.3
      }
    }
  },
  'molten-gold-formation': {
    label: 'Molten Gold Formation',
    category: 'cinematic',
    display_safe: false,
    style_family: 'molten-formation',
    notes: 'Cinematic molten-gold formation that settles into a premium final object.',
    outputs: createConceptOutputs(),
    scene: {
      background: '#060200',
      ...createGoldPalette(),
      logoSize: 5.68,
      camera: {
        position: [0, 0.24, 13.35],
        lookAt: [0, 0.16, 0],
        orbitXAmplitude: 0.07,
        orbitYAmplitude: 0.024,
        orbitZAmplitude: 0.03
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.12,
        turns: 1,
        tiltX: 0.2,
        driftY: 0.02,
        driftRoll: 0.014
      },
      extrusionDepth: 56,
      bevelThickness: 8.6,
      bevelSize: 5.2,
      bevelSegments: 7,
      glow: {
        enabled: true,
        haloColor: '#ffd77a',
        innerColor: '#ff9f45',
        beamColor: '#ffc46a',
        haloOpacity: 0.16,
        innerOpacity: 0.1,
        beamOpacity: 0.04,
        haloScale: 9.6,
        innerScale: 6.8,
        beamWidth: 2.1,
        beamHeight: 8.9,
        haloPosition: [0, 0.1, -1.64],
        innerPosition: [0, 0.08, -1.0],
        beamPosition: [0, 0.05, -1.9],
        pulseAmplitude: 0.04,
        innerPulseAmplitude: 0.03,
        beamPulseAmplitude: 0.02,
        rotationFactor: -0.06
      },
      baseHalo: {
        enabled: true,
        color: '#ffbb5d',
        opacity: 0.09,
        width: 5.2,
        depth: 2.8,
        y: -1.3,
        z: 0,
        pulseAmplitude: 0.03,
        scalePulse: 0.04
      },
      materials: {
        face: {
          color: '#f6ce74',
          emissive: '#b96e11',
          emissiveIntensity: 0.24,
          metalness: 0.94,
          roughness: 0.16,
          clearcoat: 1,
          clearcoatRoughness: 0.05,
          reflectivity: 0.94
        },
        side: {
          color: '#925f1e',
          emissive: '#744514',
          emissiveIntensity: 0.16,
          metalness: 0.86,
          roughness: 0.25,
          clearcoat: 0.9,
          clearcoatRoughness: 0.11
        },
        frame: {
          enabled: false
        }
      },
      sequence: {
        mode: 'molten-formation',
        revealStart: 0,
        revealEnd: 0.72,
        settleEnd: 0.95,
        scaleStart: 0.92,
        emissiveBoost: 0.9,
        roughnessBoost: 0.24,
        glowBoost: 0.18
      }
    }
  },
  'led-nightclub-panel': {
    label: 'LED Nightclub Panel',
    category: 'display-safe',
    display_safe: true,
    style_family: 'led-panel',
    notes: 'Hardware-native LED matrix look with dense luminance and strong center readability.',
    outputs: createConceptOutputs(),
    scene: {
      background: '#000000',
      logoSize: 5.84,
      camera: {
        position: [0, 0.24, 13.24],
        lookAt: [0, 0.18, 0],
        orbitXAmplitude: 0.05,
        orbitYAmplitude: 0.02,
        orbitZAmplitude: 0.025
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.08,
        turns: 1,
        tiltX: 0.16,
        driftY: 0.012,
        driftRoll: 0.009
      },
      extrusionDepth: 30,
      bevelThickness: 2.4,
      bevelSize: 1.3,
      bevelSegments: 4,
      glow: {
        enabled: true,
        haloColor: '#72f6ff',
        innerColor: '#3ae2ff',
        beamColor: '#77d3ff',
        haloOpacity: 0.2,
        innerOpacity: 0.16,
        beamOpacity: 0.05,
        haloScale: 9.1,
        innerScale: 6.6,
        beamWidth: 1.9,
        beamHeight: 8.4,
        haloPosition: [0, 0.14, -1.56],
        innerPosition: [0, 0.12, -0.98],
        beamPosition: [0, 0.05, -1.82],
        pulseAmplitude: 0.05,
        innerPulseAmplitude: 0.04,
        beamPulseAmplitude: 0.02,
        rotationFactor: -0.07
      },
      baseHalo: {
        enabled: true,
        color: '#4befff',
        opacity: 0.1,
        width: 5.1,
        depth: 2.8,
        y: -1.3,
        z: 0,
        pulseAmplitude: 0.03,
        scalePulse: 0.04
      },
      materials: {
        face: {
          color: '#57f4ff',
          emissive: '#5bf2ff',
          emissiveIntensity: 1.36,
          metalness: 0.14,
          roughness: 0.42,
          clearcoat: 0.24,
          clearcoatRoughness: 0.22,
          reflectivity: 0.36,
          surfacePattern: {
            mode: 'led-grid',
            cellSize: 24,
            gap: 0.42,
            contrast: 1.2
          }
        },
        side: {
          color: '#10364a',
          emissive: '#1495b8',
          emissiveIntensity: 0.44,
          metalness: 0.28,
          roughness: 0.4,
          clearcoat: 0.48,
          clearcoatRoughness: 0.26
        },
        frame: {
          enabled: false
        }
      },
      logoOutline: {
        enabled: true,
        color: '#74f8ff',
        opacity: 0.22,
        thickness: 0.76,
        pulseAmplitude: 0.03,
        rotationFactor: -0.05,
        zOffset: 0.05
      },
      lighting: {
        ambientSky: '#d4fbff',
        ambientGround: '#02070a',
        ambientIntensity: 1.08,
        keyColor: '#d9fbff',
        keyIntensity: 2.1,
        keyPosition: [4.8, 4.8, 6.8],
        rimColor: '#6cd9ff',
        rimIntensity: 1.6,
        rimPosition: [-5.1, 1.5, -4.2],
        lowerColor: '#2db1dd',
        lowerIntensity: 6.1,
        lowerDistance: 20,
        lowerDecay: 2,
        lowerPosition: [0, -2.0, 4.0]
      }
    }
  },
  'stadium-hero': {
    label: 'Stadium Hero',
    category: 'cinematic',
    display_safe: false,
    style_family: 'arena-hero',
    notes: 'Arena-scale hero reveal with premium gold mass and controlled beam framing.',
    outputs: createConceptOutputs(),
    scene: {
      background: '#030203',
      ...createGoldPalette(),
      logoSize: 5.72,
      camera: {
        position: [0, 0.3, 13.2],
        lookAt: [0, 0.18, 0],
        orbitXAmplitude: 0.08,
        orbitYAmplitude: 0.028,
        orbitZAmplitude: 0.036
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.08,
        turns: 1,
        tiltX: 0.22,
        driftY: 0.018,
        driftRoll: 0.012
      },
      extrusionDepth: 54,
      bevelThickness: 8.2,
      bevelSize: 5,
      bevelSegments: 7,
      glow: {
        enabled: true,
        haloColor: '#ffe2a3',
        innerColor: '#f6c973',
        beamColor: '#ffd698',
        haloOpacity: 0.14,
        innerOpacity: 0.1,
        beamOpacity: 0.04,
        haloScale: 9.8,
        innerScale: 7.0,
        beamWidth: 2.3,
        beamHeight: 9.5,
        haloPosition: [0, 0.16, -1.68],
        innerPosition: [0, 0.12, -1.02],
        beamPosition: [0, 0.04, -1.95],
        pulseAmplitude: 0.03,
        innerPulseAmplitude: 0.02,
        beamPulseAmplitude: 0.015,
        rotationFactor: -0.05
      },
      baseHalo: {
        enabled: true,
        color: '#ffcf77',
        opacity: 0.07,
        width: 5.3,
        depth: 3,
        y: -1.32,
        z: 0,
        pulseAmplitude: 0.02,
        scalePulse: 0.03
      },
      stadiumBeams: {
        enabled: true,
        color: '#ffe0a2',
        coreColor: '#fff7df',
        opacity: 0.14,
        coreOpacity: 0.08,
        width: 2.5,
        height: 10,
        spread: 3.2,
        y: 0.34,
        z: -1.8,
        pulseAmplitude: 0.04,
        scalePulse: 0.05
      },
      materials: {
        face: {
          color: '#f5d98f',
          emissive: '#9f661c',
          emissiveIntensity: 0.2,
          metalness: 0.98,
          roughness: 0.12,
          clearcoat: 1,
          clearcoatRoughness: 0.04,
          reflectivity: 0.95
        },
        side: {
          color: '#946424',
          emissive: '#6f4517',
          emissiveIntensity: 0.1,
          metalness: 0.9,
          roughness: 0.2,
          clearcoat: 0.9,
          clearcoatRoughness: 0.1
        },
        frame: {
          enabled: false
        }
      },
      sweepLight: {
        enabled: true,
        color: '#fff3d6',
        opacity: 0.08,
        width: 2.8,
        height: 9.6,
        z: 0.9,
        angle: 0.24,
        range: 6.8,
        speed: 0.75
      },
      lighting: {
        ambientSky: '#fff2d7',
        ambientGround: '#120a03',
        ambientIntensity: 0.9,
        keyColor: '#fff1c4',
        keyIntensity: 3.8,
        keyPosition: [5.8, 5.8, 7.8],
        rimColor: '#ffd58b',
        rimIntensity: 2.25,
        rimPosition: [-5.4, 1.8, -4.4],
        lowerColor: '#af7928',
        lowerIntensity: 5.9,
        lowerDistance: 18,
        lowerDecay: 2,
        lowerPosition: [0, -2.1, 4.0]
      }
    }
  },
  'art-deco-plaque': {
    label: 'Art Deco Plaque',
    category: 'exploration',
    display_safe: false,
    style_family: 'art-deco-plaque',
    notes: 'Brushed brass and black luxury plaque with restrained motion and geometric framing.',
    outputs: createConceptOutputs(),
    scene: {
      background: '#040302',
      logoSize: 5.58,
      camera: {
        position: [0, 0.2, 13.78],
        lookAt: [0, 0.16, 0],
        orbitXAmplitude: 0.025,
        orbitYAmplitude: 0.008,
        orbitZAmplitude: 0.014
      },
      animation: {
        mode: 'loop',
        stillProgress: 0.14,
        turns: 1,
        tiltX: 0.11,
        driftY: 0.004,
        driftRoll: 0.003
      },
      extrusionDepth: 44,
      bevelThickness: 5.8,
      bevelSize: 3.7,
      bevelSegments: 6,
      glow: {
        enabled: false
      },
      baseHalo: {
        enabled: false
      },
      materials: {
        face: {
          color: '#d3aa61',
          emissive: '#7d4f1a',
          emissiveIntensity: 0.14,
          metalness: 0.88,
          roughness: 0.22,
          clearcoat: 1,
          clearcoatRoughness: 0.08,
          reflectivity: 0.88,
          surfacePattern: {
            mode: 'brushed-metal',
            strength: 0.48
          }
        },
        side: {
          color: '#24180f',
          emissive: '#120c08',
          emissiveIntensity: 0.06,
          metalness: 0.6,
          roughness: 0.4,
          clearcoat: 0.68,
          clearcoatRoughness: 0.21
        },
        frame: {
          enabled: false
        }
      },
      backplate: {
        enabled: true,
        color: '#1a1208',
        emissive: '#2c1a0f',
        emissiveIntensity: 0.05,
        metalness: 0.76,
        roughness: 0.35,
        clearcoat: 0.9,
        clearcoatRoughness: 0.18,
        opacity: 0.98,
        transparent: false,
        widthPadding: 1.18,
        heightPadding: 0.98,
        depth: 0.34,
        z: -0.84,
        pattern: {
          mode: 'deco-frame'
        }
      },
      logoOutline: {
        enabled: true,
        color: '#e2c078',
        opacity: 0.16,
        thickness: 0.86,
        pulseAmplitude: 0.015,
        rotationFactor: -0.01,
        zOffset: 0.05
      },
      sweepLight: {
        enabled: true,
        color: '#fff1d0',
        opacity: 0.05,
        width: 2.2,
        height: 8.8,
        z: 0.86,
        angle: 0.16,
        range: 5.2,
        speed: 0.4
      },
      lighting: {
        ambientSky: '#f7edd8',
        ambientGround: '#0a0602',
        ambientIntensity: 0.88,
        keyColor: '#ffebc0',
        keyIntensity: 3,
        keyPosition: [5.6, 5.1, 7.2],
        rimColor: '#d9b06a',
        rimIntensity: 1.75,
        rimPosition: [-5.4, 1.6, -4.0],
        lowerColor: '#7c5321',
        lowerIntensity: 4.2,
        lowerDistance: 17,
        lowerDecay: 2,
        lowerPosition: [0, -2.0, 4.0]
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
  'big-eazy-new-style-families': [
    { logo: 'big-eazy', variant: 'display', preset: 'casino-neon-sign' },
    { logo: 'big-eazy', variant: 'display', preset: 'trophy-emblem' },
    { logo: 'big-eazy', variant: 'display', preset: 'crystal-glass-luxury' },
    { logo: 'big-eazy', variant: 'display', preset: 'mardi-gras-royal-crest' },
    { logo: 'big-eazy', variant: 'display', preset: 'retro-chrome-nightlife' },
    { logo: 'big-eazy', variant: 'display', preset: 'wireframe-reveal' },
    { logo: 'big-eazy', variant: 'display', preset: 'molten-gold-formation' },
    { logo: 'big-eazy', variant: 'display', preset: 'led-nightclub-panel' },
    { logo: 'big-eazy', variant: 'display', preset: 'stadium-hero' },
    { logo: 'big-eazy', variant: 'display', preset: 'art-deco-plaque' }
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
