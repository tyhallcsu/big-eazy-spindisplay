# SVG Render Workflow

This repo turns logo SVGs into reusable 3D assets and public-ready example renders. The workflow is manifest-driven, supports multiple logos, and can build both faithful and display-optimized variants.

Current Big Eazy concept work is tuned first for a `22-23.6 inch` single-fan hologram display in the `MSBHZ-YY60-S4` class, assuming a clear acrylic or glass-style front cover. That means the pipeline favors center-weighted composition, thicker readable forms, safe silhouette massing, and black-background contrast over delicate decorative effects that only look good in a flat browser preview.

## Gallery

### Big Eazy

Full faithful hero still:

![Big Eazy full hero still](renders/big-eazy/full/hero-still/preview.png)

Display SpinDisplay still:

![Big Eazy display SpinDisplay preview](renders/big-eazy/display/spindisplay-loop/preview.png)

Display premium turntable still:

![Big Eazy premium turntable preview](renders/big-eazy/display/premium-turntable/preview.png)

Display hero still:

![Big Eazy hero still](renders/big-eazy/display/hero-still/preview.png)

Display proof still:

![Big Eazy proof still](renders/big-eazy/display/proof-pack/preview.png)

Display animated proof pack:

![Big Eazy animated proof pack](renders/big-eazy/display/proof-pack/preview.gif)

Contact sheet:

![Big Eazy contact sheet](renders/big-eazy/display/proof-pack/contact-sheet.png)

### Big Eazy Concept Families

Floating luxury hologram:

![Big Eazy floating luxury hologram](renders/big-eazy/display/floating-luxury-hologram/preview.png)

Spinning 3D emblem:

![Big Eazy spinning 3D emblem](renders/big-eazy/display/spinning-3d-emblem/preview.png)

Futuristic projection:

![Big Eazy futuristic projection](renders/big-eazy/display/futuristic-projection/preview.png)

Concept rotation contact sheets:

![Big Eazy floating luxury hologram contact sheet](renders/big-eazy/display/floating-luxury-hologram/contact-sheet.png)

![Big Eazy spinning 3D emblem contact sheet](renders/big-eazy/display/spinning-3d-emblem/contact-sheet.png)

![Big Eazy futuristic projection contact sheet](renders/big-eazy/display/futuristic-projection/contact-sheet.png)

### Earth Saving Solutions

Faithful full-logo hero still:

![Earth Saving Solutions full hero still](renders/earth-saving-solutions/full/hero-still/preview.png)

Faithful full-logo premium turntable still:

![Earth Saving Solutions full premium turntable preview](renders/earth-saving-solutions/full/premium-turntable/preview.png)

Display SpinDisplay still:

![Earth Saving Solutions display SpinDisplay preview](renders/earth-saving-solutions/display/spindisplay-loop/preview.png)

Display proof still:

![Earth Saving Solutions display proof still](renders/earth-saving-solutions/display/proof-pack/preview.png)

Display-optimized animated proof pack:

![Earth Saving Solutions display proof pack](renders/earth-saving-solutions/display/proof-pack/preview.gif)

Display contact sheet:

![Earth Saving Solutions display contact sheet](renders/earth-saving-solutions/display/proof-pack/contact-sheet.png)

## Supported Workflow

### Logos

- `big-eazy`
- `earth-saving-solutions`

### Variants

- `big-eazy/full`: faithful original logo
- `big-eazy/display`: removes the small tagline for display readability
- `earth-saving-solutions/full`: faithful full two-line mark
- `earth-saving-solutions/display`: keeps the roof mark plus `EARTH SAVING` and drops `SOLUTIONS`

### Presets

- `spindisplay-loop`: black-background looping turntable for hologram-fan style playback
- `premium-turntable`: polished studio-style spin
- `hero-still`: front-facing still for README/client preview use
- `proof-pack`: loop plus GIF, contact sheet, and `ffprobe` validation metadata
- `floating-luxury-hologram`: restrained cyan/teal floating hologram treatment tuned for real single-fan readability
- `spinning-3d-emblem`: gold-forward bevel-heavy concept with the strongest real-hardware readability bias
- `futuristic-projection`: projection-in-air treatment with a controlled plate/beam system that frames the logo instead of overpowering it

## Key Files

- Render manifest: [scripts/render-manifest.mjs](scripts/render-manifest.mjs)
- Variant derivation CLI: [scripts/derive-simplified-svg.mjs](scripts/derive-simplified-svg.mjs)
- Render CLI: [scripts/build-logo-renders.mjs](scripts/build-logo-renders.mjs)
- Viewer runtime: [viewer/app.js](viewer/app.js)

## Source Assets

- Big Eazy original SVG: [547227273_122137993856924986_8556302376693794118_n.svg](547227273_122137993856924986_8556302376693794118_n.svg)
- Big Eazy original AI: [547227273_122137993856924986_8556302376693794118_n.ai](547227273_122137993856924986_8556302376693794118_n.ai)
- Big Eazy original EPS: [547227273_122137993856924986_8556302376693794118_n.eps](547227273_122137993856924986_8556302376693794118_n.eps)
- Big Eazy original PDF: [547227273_122137993856924986_8556302376693794118_n.pdf](547227273_122137993856924986_8556302376693794118_n.pdf)
- Big Eazy original DXF: [547227273_122137993856924986_8556302376693794118_n.dxf](547227273_122137993856924986_8556302376693794118_n.dxf)
- Big Eazy raster reference: [source/big-eazy-v2/21D66EE7-CC25-4BE6-B043-1DE31E235C76.png](source/big-eazy-v2/21D66EE7-CC25-4BE6-B043-1DE31E235C76.png)
- Earth Saving Solutions original SVG: [source/ESS-LOGO-THICK-BLACK.svg](source/ESS-LOGO-THICK-BLACK.svg)

## Generated Assets

### Derived SVG + GLB

- Big Eazy display SVG: [source/big-eazy/display.svg](source/big-eazy/display.svg)
- Big Eazy display GLB: [source/big-eazy/display.glb](source/big-eazy/display.glb)
- Big Eazy full SVG: [source/big-eazy/full.svg](source/big-eazy/full.svg)
- Big Eazy full GLB: [source/big-eazy/full.glb](source/big-eazy/full.glb)
- ESS display SVG: [source/earth-saving-solutions/display.svg](source/earth-saving-solutions/display.svg)
- ESS display GLB: [source/earth-saving-solutions/display.glb](source/earth-saving-solutions/display.glb)
- ESS full SVG: [source/earth-saving-solutions/full.svg](source/earth-saving-solutions/full.svg)
- ESS full GLB: [source/earth-saving-solutions/full.glb](source/earth-saving-solutions/full.glb)

### Example Renders

- Big Eazy SpinDisplay loop: [renders/big-eazy/display/spindisplay-loop/master.mp4](renders/big-eazy/display/spindisplay-loop/master.mp4)
- Big Eazy premium turntable: [renders/big-eazy/display/premium-turntable/master.mp4](renders/big-eazy/display/premium-turntable/master.mp4)
- Big Eazy proof GIF: [renders/big-eazy/display/proof-pack/preview.gif](renders/big-eazy/display/proof-pack/preview.gif)
- Big Eazy proof metadata: [renders/big-eazy/display/proof-pack/ffprobe.json](renders/big-eazy/display/proof-pack/ffprobe.json)
- Big Eazy floating luxury hologram MP4: [renders/big-eazy/display/floating-luxury-hologram/master.mp4](renders/big-eazy/display/floating-luxury-hologram/master.mp4)
- Big Eazy floating luxury hologram GLB: [renders/big-eazy/display/floating-luxury-hologram/asset.glb](renders/big-eazy/display/floating-luxury-hologram/asset.glb)
- Big Eazy spinning 3D emblem MP4: [renders/big-eazy/display/spinning-3d-emblem/master.mp4](renders/big-eazy/display/spinning-3d-emblem/master.mp4)
- Big Eazy spinning 3D emblem GLB: [renders/big-eazy/display/spinning-3d-emblem/asset.glb](renders/big-eazy/display/spinning-3d-emblem/asset.glb)
- Big Eazy futuristic projection MP4: [renders/big-eazy/display/futuristic-projection/master.mp4](renders/big-eazy/display/futuristic-projection/master.mp4)
- Big Eazy futuristic projection GLB: [renders/big-eazy/display/futuristic-projection/asset.glb](renders/big-eazy/display/futuristic-projection/asset.glb)
- ESS display SpinDisplay loop: [renders/earth-saving-solutions/display/spindisplay-loop/master.mp4](renders/earth-saving-solutions/display/spindisplay-loop/master.mp4)
- ESS display proof GIF: [renders/earth-saving-solutions/display/proof-pack/preview.gif](renders/earth-saving-solutions/display/proof-pack/preview.gif)
- ESS display proof metadata: [renders/earth-saving-solutions/display/proof-pack/ffprobe.json](renders/earth-saving-solutions/display/proof-pack/ffprobe.json)
- ESS full premium turntable: [renders/earth-saving-solutions/full/premium-turntable/master.mp4](renders/earth-saving-solutions/full/premium-turntable/master.mp4)

## Build

Install dependencies:

```bash
npm install
npx playwright install chromium
```

Generate all derived variants:

```bash
npm run derive:svg
```

Build the public example set for both logos:

```bash
npm run build:examples
```

Build one logo/variant/preset combination:

```bash
npm run build:logo -- --logo earth-saving-solutions --variant display --preset spindisplay-loop
```

Build one Big Eazy concept family:

```bash
npm run build:concept -- --logo big-eazy --variant display --preset floating-luxury-hologram
npm run build:concept -- --logo big-eazy --variant display --preset spinning-3d-emblem
npm run build:concept -- --logo big-eazy --variant display --preset futuristic-projection
```

Build the full Big Eazy concept batch:

```bash
npm run build:all-concepts
```

Compatibility alias for the original Big Eazy SpinDisplay loop:

```bash
npm run build:spin
```

## Output Layout

```text
source/<logo-id>/<variant>.svg
source/<logo-id>/<variant>.glb
renders/<logo-id>/<variant>/<preset>/asset.glb
renders/<logo-id>/<variant>/<preset>/preview.png
renders/<logo-id>/<variant>/<preset>/master.mp4
renders/<logo-id>/<variant>/<preset>/preview.gif
renders/<logo-id>/<variant>/<preset>/contact-sheet.png
renders/<logo-id>/<variant>/<preset>/ffprobe.json
```

Variant-level GLBs stay in `source/<logo-id>/<variant>.glb` for backward compatibility. Concept presets that alter bevel/depth also write a deterministic preset-specific GLB to `renders/<logo-id>/<variant>/<preset>/asset.glb`.

## Hardware Target

- Default target is a `22-23.6 inch` single-fan hologram display in the `MSBHZ-YY60-S4` family
- Assume a clear acrylic or glass-style front shield is present during playback
- Keep critical logo mass centered and away from the outer circumference
- Favor thicker forms, clean negative space, and strong silhouette contrast against black
- Avoid hairline borders, glitter noise, fragile outer-edge details, or subtle dark-on-dark metallic reads
- Use glow, beams, plates, and halos only when they reinforce readability

## Recommended SpinDisplay Workflow

1. Build from `big-eazy/display` unless you intentionally want the full brand lockup.
2. Review `preview.png` first for centered massing and safe silhouette.
3. Check `contact-sheet.png` and `preview.gif` for readability through rotation.
4. Validate `ffprobe.json` before deployment packaging.
5. Use the black-background `master.mp4` for fan testing.

## Adding Presets

Add or tune future looks in [scripts/render-manifest.mjs](scripts/render-manifest.mjs):

- define a new preset under `presetDefinitions`
- decide whether the preset should export a variant-level or preset-level GLB
- add any reusable job batch under `jobSets`
- keep new effects compatible with the existing viewer config shape before extending [viewer/app.js](viewer/app.js)

## Defaults

- `1024x1024`
- `30 fps`
- `8 seconds`
- black or near-black background depending on preset
- H.264 MP4
- no audio

## Notes

- The workflow is config-driven through the manifest, not hardcoded to one logo.
- The public repo includes non-sensitive source logos and generated render assets.
- Display variants are optimized for motion readability and are not intended to replace the original brand assets.
- Big Eazy concept presets are tuned for real hologram-fan playback first, not just flat-screen preview aesthetics.

## More Ideas

- transparent PNG hero pack
- white-background catalog still
- matte-black emboss render
- neon signage render
- simple environment/mockup render
