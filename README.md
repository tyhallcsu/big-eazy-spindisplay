# SVG Render Workflow

This repo turns logo SVGs into reusable 3D assets and public-ready example renders. The workflow is now manifest-driven, supports multiple logos, and can build both faithful and display-optimized variants.

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

Compatibility alias for the original Big Eazy SpinDisplay loop:

```bash
npm run build:spin
```

## Output Layout

```text
source/<logo-id>/<variant>.svg
source/<logo-id>/<variant>.glb
renders/<logo-id>/<variant>/<preset>/preview.png
renders/<logo-id>/<variant>/<preset>/master.mp4
renders/<logo-id>/<variant>/<preset>/preview.gif
renders/<logo-id>/<variant>/<preset>/contact-sheet.png
renders/<logo-id>/<variant>/<preset>/ffprobe.json
```

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

## More Ideas

- transparent PNG hero pack
- white-background catalog still
- matte-black emboss render
- neon signage render
- simple environment/mockup render
