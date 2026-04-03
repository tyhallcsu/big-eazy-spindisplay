function createOutputs(overrides = {}) {
  return {
    preview: true,
    glb: false,
    mp4: false,
    gif: false,
    contactSheet: false,
    metadata: false,
    ...overrides
  };
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
        z: -0.45
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
        z: -0.4
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
