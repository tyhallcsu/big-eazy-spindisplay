# SVG Render Workflow

This repo turns logo SVGs into reusable 3D assets and public-ready example renders. The workflow is manifest-driven, supports multiple logos, and can build both faithful and display-optimized variants.

Current Big Eazy concept work is tuned first for a `22-23.6 inch` single-fan hologram display in the `MSBHZ-YY60-S4` class, assuming a clear acrylic or glass-style front cover. That means the pipeline favors center-weighted composition, thicker readable forms, safe silhouette massing, and black-background contrast over delicate decorative effects that only look good in a flat browser preview.

## Gallery

### Big Eazy Baseline

Faithful full-logo hero still:

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

Display proof contact sheet:

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

### Big Eazy Deployable Presets + Custom Color

Midnight emboss:

![Big Eazy midnight emboss](renders/big-eazy/display/midnight-emboss/preview.png)

Signal beacon:

![Big Eazy signal beacon](renders/big-eazy/display/signal-beacon/preview.png)

Glass panel hologram:

![Big Eazy glass panel hologram](renders/big-eazy/display/glass-panel-hologram/preview.png)

Amber marquee:

![Big Eazy amber marquee](renders/big-eazy/display/amber-marquee/preview.png)

Amber marquee custom color (`ff5a1f`):

![Big Eazy amber marquee custom color](renders/big-eazy/display/amber-marquee--custom-ff5a1f/preview.png)

### Earth Saving Solutions Baseline

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

### Earth Saving Solutions Deployable Presets

Midnight emboss:

![ESS midnight emboss](renders/earth-saving-solutions/display/midnight-emboss/preview.png)

Signal beacon:

![ESS signal beacon](renders/earth-saving-solutions/display/signal-beacon/preview.png)

Glass panel hologram:

![ESS glass panel hologram](renders/earth-saving-solutions/display/glass-panel-hologram/preview.png)

Amber marquee:

![ESS amber marquee](renders/earth-saving-solutions/display/amber-marquee/preview.png)

### Munchies and Mimosas Baseline

Faithful full-logo hero still:

![Munchies and Mimosas full hero still](renders/munchies-and-mimosas/full/hero-still/preview.png)

Display hero still:

![Munchies and Mimosas display hero still](renders/munchies-and-mimosas/display/hero-still/preview.png)

Display SpinDisplay still:

![Munchies and Mimosas display SpinDisplay](renders/munchies-and-mimosas/display/spindisplay-loop/preview.png)

Display animated proof pack:

![Munchies and Mimosas display proof pack](renders/munchies-and-mimosas/display/proof-pack/preview.gif)

Display contact sheet:

![Munchies and Mimosas display contact sheet](renders/munchies-and-mimosas/display/proof-pack/contact-sheet.png)

### Munchies and Mimosas Concepts + Original SVG Colors

Floating luxury hologram:

![Munchies and Mimosas floating luxury hologram](renders/munchies-and-mimosas/display/floating-luxury-hologram/preview.png)

Spinning 3D emblem:

![Munchies and Mimosas spinning 3D emblem](renders/munchies-and-mimosas/display/spinning-3d-emblem/preview.png)

Futuristic projection:

![Munchies and Mimosas futuristic projection](renders/munchies-and-mimosas/display/futuristic-projection/preview.png)

Original SVG color mode (`glass-panel-hologram--original-svg`):

![Munchies and Mimosas original SVG color mode](renders/munchies-and-mimosas/display/glass-panel-hologram--original-svg/preview.png)

### Big Eazy v2

Faithful full-logo hero still:

![Big Eazy v2 full hero still](renders/big-eazy-v2/full/hero-still/preview.png)

Display hero still:

![Big Eazy v2 display hero still](renders/big-eazy-v2/display/hero-still/preview.png)

Display SpinDisplay still:

![Big Eazy v2 display SpinDisplay](renders/big-eazy-v2/display/spindisplay-loop/preview.png)

### Big Eazy v3

Faithful full-logo hero still:

![Big Eazy v3 full hero still](renders/big-eazy-v3/full/hero-still/preview.png)

Display hero still:

![Big Eazy v3 display hero still](renders/big-eazy-v3/display/hero-still/preview.png)

Display proof animated pack:

![Big Eazy v3 display proof pack](renders/big-eazy-v3/display/proof-pack/preview.gif)

Display concept family sample:

![Big Eazy v3 floating luxury hologram](renders/big-eazy-v3/display/floating-luxury-hologram/preview.png)

## Supported Workflow

### Logos

- `big-eazy`
- `big-eazy-v2`
- `big-eazy-v3`
- `earth-saving-solutions`
- `munchies-and-mimosas`

### Variants

- `big-eazy/full`: faithful original logo
- `big-eazy/display`: removes the small tagline for display readability
- `big-eazy-v2/full`: faithful v2 wordmark
- `big-eazy-v2/display`: display-optimized v2 mark
- `big-eazy-v3/full`: faithful v3 mark
- `big-eazy-v3/display`: display-optimized v3 mark
- `earth-saving-solutions/full`: faithful full two-line mark
- `earth-saving-solutions/display`: keeps the roof mark plus `EARTH SAVING` and drops `SOLUTIONS`
- `munchies-and-mimosas/full`: faithful original logo
- `munchies-and-mimosas/display`: current display-ready build using the full transparent art

### Presets

Existing preset families remain available and unchanged (`spindisplay-loop`, `premium-turntable`, `hero-still`, `proof-pack`, and prior concept/deployable families).

- `spindisplay-loop`: black-background looping turntable for hologram-fan style playback
- `premium-turntable`: polished studio-style spin
- `hero-still`: front-facing still for README/client preview use
- `proof-pack`: loop plus GIF, contact sheet, and `ffprobe` validation metadata
- `floating-luxury-hologram`: restrained cyan/teal floating hologram treatment tuned for real single-fan readability
- `spinning-3d-emblem`: gold-forward bevel-heavy concept with the strongest real-hardware readability bias
- `futuristic-projection`: projection-in-air treatment with a controlled plate/beam system that frames the logo instead of overpowering it
- `midnight-emboss`: graphite-on-black embossed treatment with minimal motion and strong rim readability
- `signal-beacon`: cyan/white deployable hologram look with a controlled vertical beacon behind the mark
- `glass-panel-hologram`: acrylic-shield hologram treatment with a subtle panel and restrained halo
- `amber-marquee`: warm amber deployable look with stronger readability than the heavy gold emblem concept

### New Big Eazy Style Families

All 10 new families are configured with the full concept output bundle (`preview.png`, `asset.glb`, `master.mp4`, `preview.gif`, `contact-sheet.png`, `ffprobe.json`).

- `casino-neon-sign` (`display-safe`, `display_safe: true`): Bourbon/Vegas neon-sign energy with bright emissive contouring and dark tube interiors.
- `trophy-emblem` (`display-safe`, `display_safe: true`): heavy championship gold with thick bevels, dark backing, and minimal glow clutter.
- `crystal-glass-luxury` (`cinematic`, `display_safe: false`): translucent crystal/glass treatment with cyan-violet rim lighting and refined motion.
- `mardi-gras-royal-crest` (`display-safe`, `display_safe: true`): regal purple/green/gold crest direction with enamel-like material separation.
- `retro-chrome-nightlife` (`exploration`, `display_safe: false`): mirrored chrome + magenta/green nightlife accents with animated shine sweeps.
- `wireframe-reveal` (`cinematic`, `display_safe: false`): staged blueprint/wireframe-to-solid reveal sequence.
- `molten-gold-formation` (`cinematic`, `display_safe: false`): heated gold formation animation that settles into a premium finished logo.
- `led-nightclub-panel` (`display-safe`, `display_safe: true`): dense LED matrix/panel logic tuned for high fan-display readability.
- `stadium-hero` (`cinematic`, `display_safe: false`): arena-scale hero reveal with controlled beam framing and premium gold massing.
- `art-deco-plaque` (`exploration`, `display_safe: false`): brushed brass + black art-deco plaque treatment with restrained movement.

### Recommended Presets For Real Single-Fan Deployment

- `casino-neon-sign`
- `trophy-emblem`
- `mardi-gras-royal-crest`
- `led-nightclub-panel`
- `spinning-3d-emblem`
- `midnight-emboss`

### Color Modes

- `preset`: use the preset's built-in material and glow colors
- `custom`: replace the active look with a single user-selected primary color and auto-derived accents
- `original-svg`: use the SVG fill colors directly on the 3D geometry, with a readability lift for very dark fills

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
- Big Eazy v2 source SVG: [source/big-eazy-v2/big-eazy-v2.svg](source/big-eazy-v2/big-eazy-v2.svg)
- Big Eazy v2 source AI: [source/big-eazy-v2/big-eazy-v2.ai](source/big-eazy-v2/big-eazy-v2.ai)
- Big Eazy v2 source EPS: [source/big-eazy-v2/big-eazy-v2.eps](source/big-eazy-v2/big-eazy-v2.eps)
- Big Eazy v2 source PDF: [source/big-eazy-v2/big-eazy-v2.pdf](source/big-eazy-v2/big-eazy-v2.pdf)
- Big Eazy v2 source DXF: [source/big-eazy-v2/big-eazy-v2.dxf](source/big-eazy-v2/big-eazy-v2.dxf)
- Big Eazy v2 raster reference: [source/big-eazy-v2/big-eazy-v2.png](source/big-eazy-v2/big-eazy-v2.png)
- Big Eazy v2 variations sheet: [source/big-eazy-v2/big-eazy-variations.png](source/big-eazy-v2/big-eazy-variations.png)
- Big Eazy v3 source SVG: [source/big-eazy-v3/big-eazy-v3.svg](source/big-eazy-v3/big-eazy-v3.svg)
- Big Eazy v3 source AI: [source/big-eazy-v3/big-eazy-v3.ai](source/big-eazy-v3/big-eazy-v3.ai)
- Big Eazy v3 source EPS: [source/big-eazy-v3/big-eazy-v3.eps](source/big-eazy-v3/big-eazy-v3.eps)
- Big Eazy v3 source PDF: [source/big-eazy-v3/big-eazy-v3.pdf](source/big-eazy-v3/big-eazy-v3.pdf)
- Big Eazy v3 source DXF: [source/big-eazy-v3/big-eazy-v3.dxf](source/big-eazy-v3/big-eazy-v3.dxf)
- Big Eazy v3 raster reference: [source/big-eazy-v3/big-eazy-v3.png](source/big-eazy-v3/big-eazy-v3.png)
- Earth Saving Solutions original SVG: [source/ESS-LOGO-THICK-BLACK.svg](source/ESS-LOGO-THICK-BLACK.svg)
- Munchies and Mimosas transparent SVG: [source/munchies-and-mimosas/munchies-and-mimosas-transparent.svg](source/munchies-and-mimosas/munchies-and-mimosas-transparent.svg)
- Munchies and Mimosas transparent AI: [source/munchies-and-mimosas/munchies-and-mimosas-transparent.ai](source/munchies-and-mimosas/munchies-and-mimosas-transparent.ai)
- Munchies and Mimosas transparent EPS: [source/munchies-and-mimosas/munchies-and-mimosas-transparent.eps](source/munchies-and-mimosas/munchies-and-mimosas-transparent.eps)
- Munchies and Mimosas transparent PDF: [source/munchies-and-mimosas/munchies-and-mimosas-transparent.pdf](source/munchies-and-mimosas/munchies-and-mimosas-transparent.pdf)
- Munchies and Mimosas transparent PNG: [source/munchies-and-mimosas/munchies-and-mimosas-transparent.png](source/munchies-and-mimosas/munchies-and-mimosas-transparent.png)
- Munchies and Mimosas vectorized PNG: [source/munchies-and-mimosas/munchies-and-mimosas-transparent_vectorized.png](source/munchies-and-mimosas/munchies-and-mimosas-transparent_vectorized.png)
- Munchies and Mimosas base PNG: [source/munchies-and-mimosas/munchies-and-mimosas.png](source/munchies-and-mimosas/munchies-and-mimosas.png)

## Generated Assets

### Derived SVG + GLB

- Big Eazy display SVG: [source/big-eazy/display.svg](source/big-eazy/display.svg)
- Big Eazy display GLB: [source/big-eazy/display.glb](source/big-eazy/display.glb)
- Big Eazy full SVG: [source/big-eazy/full.svg](source/big-eazy/full.svg)
- Big Eazy full GLB: [source/big-eazy/full.glb](source/big-eazy/full.glb)
- Big Eazy v2 display SVG: [source/big-eazy-v2/display.svg](source/big-eazy-v2/display.svg)
- Big Eazy v2 display GLB: [source/big-eazy-v2/display.glb](source/big-eazy-v2/display.glb)
- Big Eazy v2 full SVG: [source/big-eazy-v2/full.svg](source/big-eazy-v2/full.svg)
- Big Eazy v2 full GLB: [source/big-eazy-v2/full.glb](source/big-eazy-v2/full.glb)
- Big Eazy v3 display SVG: [source/big-eazy-v3/display.svg](source/big-eazy-v3/display.svg)
- Big Eazy v3 display GLB: [source/big-eazy-v3/display.glb](source/big-eazy-v3/display.glb)
- Big Eazy v3 full SVG: [source/big-eazy-v3/full.svg](source/big-eazy-v3/full.svg)
- Big Eazy v3 full GLB: [source/big-eazy-v3/full.glb](source/big-eazy-v3/full.glb)
- ESS display SVG: [source/earth-saving-solutions/display.svg](source/earth-saving-solutions/display.svg)
- ESS display GLB: [source/earth-saving-solutions/display.glb](source/earth-saving-solutions/display.glb)
- ESS full SVG: [source/earth-saving-solutions/full.svg](source/earth-saving-solutions/full.svg)
- ESS full GLB: [source/earth-saving-solutions/full.glb](source/earth-saving-solutions/full.glb)
- Munchies and Mimosas display SVG: [source/munchies-and-mimosas/display.svg](source/munchies-and-mimosas/display.svg)
- Munchies and Mimosas display GLB: [source/munchies-and-mimosas/display.glb](source/munchies-and-mimosas/display.glb)
- Munchies and Mimosas full SVG: [source/munchies-and-mimosas/full.svg](source/munchies-and-mimosas/full.svg)
- Munchies and Mimosas full GLB: [source/munchies-and-mimosas/full.glb](source/munchies-and-mimosas/full.glb)

### Example Renders

- Big Eazy SpinDisplay loop: [renders/big-eazy/display/spindisplay-loop/master.mp4](renders/big-eazy/display/spindisplay-loop/master.mp4)
- Big Eazy premium turntable: [renders/big-eazy/display/premium-turntable/master.mp4](renders/big-eazy/display/premium-turntable/master.mp4)
- Big Eazy proof GIF: [renders/big-eazy/display/proof-pack/preview.gif](renders/big-eazy/display/proof-pack/preview.gif)
- Big Eazy proof metadata: [renders/big-eazy/display/proof-pack/ffprobe.json](renders/big-eazy/display/proof-pack/ffprobe.json)
- Big Eazy midnight emboss MP4: [renders/big-eazy/display/midnight-emboss/master.mp4](renders/big-eazy/display/midnight-emboss/master.mp4)
- Big Eazy signal beacon MP4: [renders/big-eazy/display/signal-beacon/master.mp4](renders/big-eazy/display/signal-beacon/master.mp4)
- Big Eazy glass panel hologram MP4: [renders/big-eazy/display/glass-panel-hologram/master.mp4](renders/big-eazy/display/glass-panel-hologram/master.mp4)
- Big Eazy amber marquee MP4: [renders/big-eazy/display/amber-marquee/master.mp4](renders/big-eazy/display/amber-marquee/master.mp4)
- Big Eazy amber marquee custom color MP4: [renders/big-eazy/display/amber-marquee--custom-ff5a1f/master.mp4](renders/big-eazy/display/amber-marquee--custom-ff5a1f/master.mp4)
- ESS display SpinDisplay loop: [renders/earth-saving-solutions/display/spindisplay-loop/master.mp4](renders/earth-saving-solutions/display/spindisplay-loop/master.mp4)
- ESS display proof GIF: [renders/earth-saving-solutions/display/proof-pack/preview.gif](renders/earth-saving-solutions/display/proof-pack/preview.gif)
- ESS display proof metadata: [renders/earth-saving-solutions/display/proof-pack/ffprobe.json](renders/earth-saving-solutions/display/proof-pack/ffprobe.json)
- ESS deployable preset bundle: [renders/earth-saving-solutions/display/amber-marquee/master.mp4](renders/earth-saving-solutions/display/amber-marquee/master.mp4)
- Munchies and Mimosas original SVG color render: [renders/munchies-and-mimosas/display/glass-panel-hologram--original-svg/master.mp4](renders/munchies-and-mimosas/display/glass-panel-hologram--original-svg/master.mp4)
- Big Eazy v2 SpinDisplay loop: [renders/big-eazy-v2/display/spindisplay-loop/master.mp4](renders/big-eazy-v2/display/spindisplay-loop/master.mp4)
- Big Eazy v3 proof pack MP4: [renders/big-eazy-v3/display/proof-pack/master.mp4](renders/big-eazy-v3/display/proof-pack/master.mp4)

### Complete Media Index (All Current Render Directories)

#### big-eazy / display

- `amber-marquee`: [Preview PNG](renders/big-eazy/display/amber-marquee/preview.png) · [MP4](renders/big-eazy/display/amber-marquee/master.mp4) · [GIF](renders/big-eazy/display/amber-marquee/preview.gif) · [Contact Sheet](renders/big-eazy/display/amber-marquee/contact-sheet.png)
- `amber-marquee--custom-ff5a1f`: [Preview PNG](renders/big-eazy/display/amber-marquee--custom-ff5a1f/preview.png) · [MP4](renders/big-eazy/display/amber-marquee--custom-ff5a1f/master.mp4) · [GIF](renders/big-eazy/display/amber-marquee--custom-ff5a1f/preview.gif) · [Contact Sheet](renders/big-eazy/display/amber-marquee--custom-ff5a1f/contact-sheet.png)
- `floating-luxury-hologram`: [Preview PNG](renders/big-eazy/display/floating-luxury-hologram/preview.png) · [MP4](renders/big-eazy/display/floating-luxury-hologram/master.mp4) · [GIF](renders/big-eazy/display/floating-luxury-hologram/preview.gif) · [Contact Sheet](renders/big-eazy/display/floating-luxury-hologram/contact-sheet.png)
- `futuristic-projection`: [Preview PNG](renders/big-eazy/display/futuristic-projection/preview.png) · [MP4](renders/big-eazy/display/futuristic-projection/master.mp4) · [GIF](renders/big-eazy/display/futuristic-projection/preview.gif) · [Contact Sheet](renders/big-eazy/display/futuristic-projection/contact-sheet.png)
- `glass-panel-hologram`: [Preview PNG](renders/big-eazy/display/glass-panel-hologram/preview.png) · [MP4](renders/big-eazy/display/glass-panel-hologram/master.mp4) · [GIF](renders/big-eazy/display/glass-panel-hologram/preview.gif) · [Contact Sheet](renders/big-eazy/display/glass-panel-hologram/contact-sheet.png)
- `hero-still`: [Preview PNG](renders/big-eazy/display/hero-still/preview.png)
- `midnight-emboss`: [Preview PNG](renders/big-eazy/display/midnight-emboss/preview.png) · [MP4](renders/big-eazy/display/midnight-emboss/master.mp4) · [GIF](renders/big-eazy/display/midnight-emboss/preview.gif) · [Contact Sheet](renders/big-eazy/display/midnight-emboss/contact-sheet.png)
- `premium-turntable`: [Preview PNG](renders/big-eazy/display/premium-turntable/preview.png) · [MP4](renders/big-eazy/display/premium-turntable/master.mp4)
- `proof-pack`: [Preview PNG](renders/big-eazy/display/proof-pack/preview.png) · [MP4](renders/big-eazy/display/proof-pack/master.mp4) · [GIF](renders/big-eazy/display/proof-pack/preview.gif) · [Contact Sheet](renders/big-eazy/display/proof-pack/contact-sheet.png)
- `signal-beacon`: [Preview PNG](renders/big-eazy/display/signal-beacon/preview.png) · [MP4](renders/big-eazy/display/signal-beacon/master.mp4) · [GIF](renders/big-eazy/display/signal-beacon/preview.gif) · [Contact Sheet](renders/big-eazy/display/signal-beacon/contact-sheet.png)
- `spindisplay-loop`: [Preview PNG](renders/big-eazy/display/spindisplay-loop/preview.png) · [MP4](renders/big-eazy/display/spindisplay-loop/master.mp4)
- `spinning-3d-emblem`: [Preview PNG](renders/big-eazy/display/spinning-3d-emblem/preview.png) · [MP4](renders/big-eazy/display/spinning-3d-emblem/master.mp4) · [GIF](renders/big-eazy/display/spinning-3d-emblem/preview.gif) · [Contact Sheet](renders/big-eazy/display/spinning-3d-emblem/contact-sheet.png)

#### big-eazy / full

- `floating-luxury-hologram`: [Preview PNG](renders/big-eazy/full/floating-luxury-hologram/preview.png) · [MP4](renders/big-eazy/full/floating-luxury-hologram/master.mp4) · [GIF](renders/big-eazy/full/floating-luxury-hologram/preview.gif) · [Contact Sheet](renders/big-eazy/full/floating-luxury-hologram/contact-sheet.png)
- `futuristic-projection`: [Preview PNG](renders/big-eazy/full/futuristic-projection/preview.png) · [MP4](renders/big-eazy/full/futuristic-projection/master.mp4) · [GIF](renders/big-eazy/full/futuristic-projection/preview.gif) · [Contact Sheet](renders/big-eazy/full/futuristic-projection/contact-sheet.png)
- `hero-still`: [Preview PNG](renders/big-eazy/full/hero-still/preview.png)
- `premium-turntable`: [Preview PNG](renders/big-eazy/full/premium-turntable/preview.png) · [MP4](renders/big-eazy/full/premium-turntable/master.mp4)
- `proof-pack`: [Preview PNG](renders/big-eazy/full/proof-pack/preview.png) · [MP4](renders/big-eazy/full/proof-pack/master.mp4) · [GIF](renders/big-eazy/full/proof-pack/preview.gif) · [Contact Sheet](renders/big-eazy/full/proof-pack/contact-sheet.png)
- `spindisplay-loop`: [Preview PNG](renders/big-eazy/full/spindisplay-loop/preview.png) · [MP4](renders/big-eazy/full/spindisplay-loop/master.mp4)
- `spinning-3d-emblem`: [Preview PNG](renders/big-eazy/full/spinning-3d-emblem/preview.png) · [MP4](renders/big-eazy/full/spinning-3d-emblem/master.mp4) · [GIF](renders/big-eazy/full/spinning-3d-emblem/preview.gif) · [Contact Sheet](renders/big-eazy/full/spinning-3d-emblem/contact-sheet.png)

#### big-eazy-v2 / display

- `hero-still`: [Preview PNG](renders/big-eazy-v2/display/hero-still/preview.png)
- `premium-turntable`: [Preview PNG](renders/big-eazy-v2/display/premium-turntable/preview.png)
- `proof-pack`: [Preview PNG](renders/big-eazy-v2/display/proof-pack/preview.png)
- `spindisplay-loop`: [Preview PNG](renders/big-eazy-v2/display/spindisplay-loop/preview.png) · [MP4](renders/big-eazy-v2/display/spindisplay-loop/master.mp4)

#### big-eazy-v2 / full

- `hero-still`: [Preview PNG](renders/big-eazy-v2/full/hero-still/preview.png)
- `premium-turntable`: [Preview PNG](renders/big-eazy-v2/full/premium-turntable/preview.png) · [MP4](renders/big-eazy-v2/full/premium-turntable/master.mp4)
- `proof-pack`: [Preview PNG](renders/big-eazy-v2/full/proof-pack/preview.png)
- `spindisplay-loop`: [Preview PNG](renders/big-eazy-v2/full/spindisplay-loop/preview.png) · [MP4](renders/big-eazy-v2/full/spindisplay-loop/master.mp4)

#### big-eazy-v3 / display

- `floating-luxury-hologram`: [Preview PNG](renders/big-eazy-v3/display/floating-luxury-hologram/preview.png) · [MP4](renders/big-eazy-v3/display/floating-luxury-hologram/master.mp4) · [GIF](renders/big-eazy-v3/display/floating-luxury-hologram/preview.gif) · [Contact Sheet](renders/big-eazy-v3/display/floating-luxury-hologram/contact-sheet.png)
- `futuristic-projection`: [Preview PNG](renders/big-eazy-v3/display/futuristic-projection/preview.png) · [MP4](renders/big-eazy-v3/display/futuristic-projection/master.mp4) · [GIF](renders/big-eazy-v3/display/futuristic-projection/preview.gif) · [Contact Sheet](renders/big-eazy-v3/display/futuristic-projection/contact-sheet.png)
- `hero-still`: [Preview PNG](renders/big-eazy-v3/display/hero-still/preview.png)
- `premium-turntable`: [Preview PNG](renders/big-eazy-v3/display/premium-turntable/preview.png) · [MP4](renders/big-eazy-v3/display/premium-turntable/master.mp4)
- `proof-pack`: [Preview PNG](renders/big-eazy-v3/display/proof-pack/preview.png) · [MP4](renders/big-eazy-v3/display/proof-pack/master.mp4) · [GIF](renders/big-eazy-v3/display/proof-pack/preview.gif) · [Contact Sheet](renders/big-eazy-v3/display/proof-pack/contact-sheet.png)
- `spindisplay-loop`: [Preview PNG](renders/big-eazy-v3/display/spindisplay-loop/preview.png) · [MP4](renders/big-eazy-v3/display/spindisplay-loop/master.mp4)
- `spinning-3d-emblem`: [Preview PNG](renders/big-eazy-v3/display/spinning-3d-emblem/preview.png) · [MP4](renders/big-eazy-v3/display/spinning-3d-emblem/master.mp4) · [GIF](renders/big-eazy-v3/display/spinning-3d-emblem/preview.gif) · [Contact Sheet](renders/big-eazy-v3/display/spinning-3d-emblem/contact-sheet.png)

#### big-eazy-v3 / full

- `floating-luxury-hologram`: [Preview PNG](renders/big-eazy-v3/full/floating-luxury-hologram/preview.png) · [MP4](renders/big-eazy-v3/full/floating-luxury-hologram/master.mp4) · [GIF](renders/big-eazy-v3/full/floating-luxury-hologram/preview.gif) · [Contact Sheet](renders/big-eazy-v3/full/floating-luxury-hologram/contact-sheet.png)
- `futuristic-projection`: [Preview PNG](renders/big-eazy-v3/full/futuristic-projection/preview.png) · [MP4](renders/big-eazy-v3/full/futuristic-projection/master.mp4) · [GIF](renders/big-eazy-v3/full/futuristic-projection/preview.gif) · [Contact Sheet](renders/big-eazy-v3/full/futuristic-projection/contact-sheet.png)
- `hero-still`: [Preview PNG](renders/big-eazy-v3/full/hero-still/preview.png)
- `premium-turntable`: [Preview PNG](renders/big-eazy-v3/full/premium-turntable/preview.png) · [MP4](renders/big-eazy-v3/full/premium-turntable/master.mp4)
- `proof-pack`: [Preview PNG](renders/big-eazy-v3/full/proof-pack/preview.png) · [MP4](renders/big-eazy-v3/full/proof-pack/master.mp4) · [GIF](renders/big-eazy-v3/full/proof-pack/preview.gif) · [Contact Sheet](renders/big-eazy-v3/full/proof-pack/contact-sheet.png)
- `spindisplay-loop`: [Preview PNG](renders/big-eazy-v3/full/spindisplay-loop/preview.png) · [MP4](renders/big-eazy-v3/full/spindisplay-loop/master.mp4)
- `spinning-3d-emblem`: [Preview PNG](renders/big-eazy-v3/full/spinning-3d-emblem/preview.png) · [MP4](renders/big-eazy-v3/full/spinning-3d-emblem/master.mp4) · [GIF](renders/big-eazy-v3/full/spinning-3d-emblem/preview.gif) · [Contact Sheet](renders/big-eazy-v3/full/spinning-3d-emblem/contact-sheet.png)

#### earth-saving-solutions / display

- `amber-marquee`: [Preview PNG](renders/earth-saving-solutions/display/amber-marquee/preview.png) · [MP4](renders/earth-saving-solutions/display/amber-marquee/master.mp4) · [GIF](renders/earth-saving-solutions/display/amber-marquee/preview.gif) · [Contact Sheet](renders/earth-saving-solutions/display/amber-marquee/contact-sheet.png)
- `floating-luxury-hologram`: [Preview PNG](renders/earth-saving-solutions/display/floating-luxury-hologram/preview.png) · [MP4](renders/earth-saving-solutions/display/floating-luxury-hologram/master.mp4) · [GIF](renders/earth-saving-solutions/display/floating-luxury-hologram/preview.gif) · [Contact Sheet](renders/earth-saving-solutions/display/floating-luxury-hologram/contact-sheet.png)
- `futuristic-projection`: [Preview PNG](renders/earth-saving-solutions/display/futuristic-projection/preview.png) · [MP4](renders/earth-saving-solutions/display/futuristic-projection/master.mp4) · [GIF](renders/earth-saving-solutions/display/futuristic-projection/preview.gif) · [Contact Sheet](renders/earth-saving-solutions/display/futuristic-projection/contact-sheet.png)
- `glass-panel-hologram`: [Preview PNG](renders/earth-saving-solutions/display/glass-panel-hologram/preview.png) · [MP4](renders/earth-saving-solutions/display/glass-panel-hologram/master.mp4) · [GIF](renders/earth-saving-solutions/display/glass-panel-hologram/preview.gif) · [Contact Sheet](renders/earth-saving-solutions/display/glass-panel-hologram/contact-sheet.png)
- `hero-still`: [Preview PNG](renders/earth-saving-solutions/display/hero-still/preview.png)
- `midnight-emboss`: [Preview PNG](renders/earth-saving-solutions/display/midnight-emboss/preview.png) · [MP4](renders/earth-saving-solutions/display/midnight-emboss/master.mp4) · [GIF](renders/earth-saving-solutions/display/midnight-emboss/preview.gif) · [Contact Sheet](renders/earth-saving-solutions/display/midnight-emboss/contact-sheet.png)
- `premium-turntable`: [Preview PNG](renders/earth-saving-solutions/display/premium-turntable/preview.png) · [MP4](renders/earth-saving-solutions/display/premium-turntable/master.mp4)
- `proof-pack`: [Preview PNG](renders/earth-saving-solutions/display/proof-pack/preview.png) · [MP4](renders/earth-saving-solutions/display/proof-pack/master.mp4) · [GIF](renders/earth-saving-solutions/display/proof-pack/preview.gif) · [Contact Sheet](renders/earth-saving-solutions/display/proof-pack/contact-sheet.png)
- `signal-beacon`: [Preview PNG](renders/earth-saving-solutions/display/signal-beacon/preview.png) · [MP4](renders/earth-saving-solutions/display/signal-beacon/master.mp4) · [GIF](renders/earth-saving-solutions/display/signal-beacon/preview.gif) · [Contact Sheet](renders/earth-saving-solutions/display/signal-beacon/contact-sheet.png)
- `spindisplay-loop`: [Preview PNG](renders/earth-saving-solutions/display/spindisplay-loop/preview.png) · [MP4](renders/earth-saving-solutions/display/spindisplay-loop/master.mp4)
- `spinning-3d-emblem`: [Preview PNG](renders/earth-saving-solutions/display/spinning-3d-emblem/preview.png) · [MP4](renders/earth-saving-solutions/display/spinning-3d-emblem/master.mp4) · [GIF](renders/earth-saving-solutions/display/spinning-3d-emblem/preview.gif) · [Contact Sheet](renders/earth-saving-solutions/display/spinning-3d-emblem/contact-sheet.png)

#### earth-saving-solutions / full

- `floating-luxury-hologram`: [Preview PNG](renders/earth-saving-solutions/full/floating-luxury-hologram/preview.png) · [MP4](renders/earth-saving-solutions/full/floating-luxury-hologram/master.mp4) · [GIF](renders/earth-saving-solutions/full/floating-luxury-hologram/preview.gif) · [Contact Sheet](renders/earth-saving-solutions/full/floating-luxury-hologram/contact-sheet.png)
- `futuristic-projection`: [Preview PNG](renders/earth-saving-solutions/full/futuristic-projection/preview.png) · [MP4](renders/earth-saving-solutions/full/futuristic-projection/master.mp4) · [GIF](renders/earth-saving-solutions/full/futuristic-projection/preview.gif) · [Contact Sheet](renders/earth-saving-solutions/full/futuristic-projection/contact-sheet.png)
- `hero-still`: [Preview PNG](renders/earth-saving-solutions/full/hero-still/preview.png)
- `premium-turntable`: [Preview PNG](renders/earth-saving-solutions/full/premium-turntable/preview.png) · [MP4](renders/earth-saving-solutions/full/premium-turntable/master.mp4)
- `proof-pack`: [Preview PNG](renders/earth-saving-solutions/full/proof-pack/preview.png) · [MP4](renders/earth-saving-solutions/full/proof-pack/master.mp4) · [GIF](renders/earth-saving-solutions/full/proof-pack/preview.gif) · [Contact Sheet](renders/earth-saving-solutions/full/proof-pack/contact-sheet.png)
- `spindisplay-loop`: [Preview PNG](renders/earth-saving-solutions/full/spindisplay-loop/preview.png) · [MP4](renders/earth-saving-solutions/full/spindisplay-loop/master.mp4)
- `spinning-3d-emblem`: [Preview PNG](renders/earth-saving-solutions/full/spinning-3d-emblem/preview.png) · [MP4](renders/earth-saving-solutions/full/spinning-3d-emblem/master.mp4) · [GIF](renders/earth-saving-solutions/full/spinning-3d-emblem/preview.gif) · [Contact Sheet](renders/earth-saving-solutions/full/spinning-3d-emblem/contact-sheet.png)

#### munchies-and-mimosas / display

- `floating-luxury-hologram`: [Preview PNG](renders/munchies-and-mimosas/display/floating-luxury-hologram/preview.png) · [MP4](renders/munchies-and-mimosas/display/floating-luxury-hologram/master.mp4) · [GIF](renders/munchies-and-mimosas/display/floating-luxury-hologram/preview.gif) · [Contact Sheet](renders/munchies-and-mimosas/display/floating-luxury-hologram/contact-sheet.png)
- `futuristic-projection`: [Preview PNG](renders/munchies-and-mimosas/display/futuristic-projection/preview.png) · [MP4](renders/munchies-and-mimosas/display/futuristic-projection/master.mp4) · [GIF](renders/munchies-and-mimosas/display/futuristic-projection/preview.gif) · [Contact Sheet](renders/munchies-and-mimosas/display/futuristic-projection/contact-sheet.png)
- `glass-panel-hologram--original-svg`: [Preview PNG](renders/munchies-and-mimosas/display/glass-panel-hologram--original-svg/preview.png) · [MP4](renders/munchies-and-mimosas/display/glass-panel-hologram--original-svg/master.mp4) · [GIF](renders/munchies-and-mimosas/display/glass-panel-hologram--original-svg/preview.gif) · [Contact Sheet](renders/munchies-and-mimosas/display/glass-panel-hologram--original-svg/contact-sheet.png)
- `hero-still`: [Preview PNG](renders/munchies-and-mimosas/display/hero-still/preview.png)
- `midnight-emboss`: [Preview PNG](renders/munchies-and-mimosas/display/midnight-emboss/preview.png) · [MP4](renders/munchies-and-mimosas/display/midnight-emboss/master.mp4) · [GIF](renders/munchies-and-mimosas/display/midnight-emboss/preview.gif) · [Contact Sheet](renders/munchies-and-mimosas/display/midnight-emboss/contact-sheet.png)
- `premium-turntable`: [Preview PNG](renders/munchies-and-mimosas/display/premium-turntable/preview.png) · [MP4](renders/munchies-and-mimosas/display/premium-turntable/master.mp4)
- `proof-pack`: [Preview PNG](renders/munchies-and-mimosas/display/proof-pack/preview.png) · [MP4](renders/munchies-and-mimosas/display/proof-pack/master.mp4) · [GIF](renders/munchies-and-mimosas/display/proof-pack/preview.gif) · [Contact Sheet](renders/munchies-and-mimosas/display/proof-pack/contact-sheet.png)
- `signal-beacon`: [Preview PNG](renders/munchies-and-mimosas/display/signal-beacon/preview.png) · [MP4](renders/munchies-and-mimosas/display/signal-beacon/master.mp4) · [GIF](renders/munchies-and-mimosas/display/signal-beacon/preview.gif) · [Contact Sheet](renders/munchies-and-mimosas/display/signal-beacon/contact-sheet.png)
- `spindisplay-loop`: [Preview PNG](renders/munchies-and-mimosas/display/spindisplay-loop/preview.png) · [MP4](renders/munchies-and-mimosas/display/spindisplay-loop/master.mp4)
- `spinning-3d-emblem`: [Preview PNG](renders/munchies-and-mimosas/display/spinning-3d-emblem/preview.png) · [MP4](renders/munchies-and-mimosas/display/spinning-3d-emblem/master.mp4) · [GIF](renders/munchies-and-mimosas/display/spinning-3d-emblem/preview.gif) · [Contact Sheet](renders/munchies-and-mimosas/display/spinning-3d-emblem/contact-sheet.png)

#### munchies-and-mimosas / full

- `floating-luxury-hologram`: [Preview PNG](renders/munchies-and-mimosas/full/floating-luxury-hologram/preview.png) · [MP4](renders/munchies-and-mimosas/full/floating-luxury-hologram/master.mp4) · [GIF](renders/munchies-and-mimosas/full/floating-luxury-hologram/preview.gif) · [Contact Sheet](renders/munchies-and-mimosas/full/floating-luxury-hologram/contact-sheet.png)
- `futuristic-projection`: [Preview PNG](renders/munchies-and-mimosas/full/futuristic-projection/preview.png) · [MP4](renders/munchies-and-mimosas/full/futuristic-projection/master.mp4) · [GIF](renders/munchies-and-mimosas/full/futuristic-projection/preview.gif) · [Contact Sheet](renders/munchies-and-mimosas/full/futuristic-projection/contact-sheet.png)
- `hero-still`: [Preview PNG](renders/munchies-and-mimosas/full/hero-still/preview.png)
- `premium-turntable`: [Preview PNG](renders/munchies-and-mimosas/full/premium-turntable/preview.png) · [MP4](renders/munchies-and-mimosas/full/premium-turntable/master.mp4)
- `proof-pack`: [Preview PNG](renders/munchies-and-mimosas/full/proof-pack/preview.png) · [MP4](renders/munchies-and-mimosas/full/proof-pack/master.mp4) · [GIF](renders/munchies-and-mimosas/full/proof-pack/preview.gif) · [Contact Sheet](renders/munchies-and-mimosas/full/proof-pack/contact-sheet.png)
- `spindisplay-loop`: [Preview PNG](renders/munchies-and-mimosas/full/spindisplay-loop/preview.png) · [MP4](renders/munchies-and-mimosas/full/spindisplay-loop/master.mp4)
- `spinning-3d-emblem`: [Preview PNG](renders/munchies-and-mimosas/full/spinning-3d-emblem/preview.png) · [MP4](renders/munchies-and-mimosas/full/spinning-3d-emblem/master.mp4) · [GIF](renders/munchies-and-mimosas/full/spinning-3d-emblem/preview.gif) · [Contact Sheet](renders/munchies-and-mimosas/full/spinning-3d-emblem/contact-sheet.png)

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

Build the public example set from the manifest's shared examples:

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

Build one of the new Big Eazy style families:

```bash
npm run build:logo -- --logo big-eazy --variant display --preset casino-neon-sign
npm run build:logo -- --logo big-eazy --variant display --preset trophy-emblem
npm run build:logo -- --logo big-eazy --variant display --preset crystal-glass-luxury
npm run build:logo -- --logo big-eazy --variant display --preset mardi-gras-royal-crest
npm run build:logo -- --logo big-eazy --variant display --preset retro-chrome-nightlife
npm run build:logo -- --logo big-eazy --variant display --preset wireframe-reveal
npm run build:logo -- --logo big-eazy --variant display --preset molten-gold-formation
npm run build:logo -- --logo big-eazy --variant display --preset led-nightclub-panel
npm run build:logo -- --logo big-eazy --variant display --preset stadium-hero
npm run build:logo -- --logo big-eazy --variant display --preset art-deco-plaque
```

Build the full Big Eazy concept batch:

```bash
npm run build:all-concepts
```

Build the full new style-family batch:

```bash
npm run build:new-style-families
npm run build:concept -- --job-set big-eazy-new-style-families
```

Build the shared deployable preset batch for all `display` variants:

```bash
npm run build:deployable-presets
```

Build with a custom runtime color:

```bash
npm run build:logo -- --logo big-eazy --variant display --preset amber-marquee --color-mode custom --primary-color ff5a1f
```

Build using original SVG fill colors:

```bash
npm run build:logo -- --logo munchies-and-mimosas --variant display --preset glass-panel-hologram --color-mode original-svg
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
renders/<logo-id>/<variant>/<preset>--custom-<hex>/...
renders/<logo-id>/<variant>/<preset>--original-svg/...
```

Variant-level GLBs stay in `source/<logo-id>/<variant>.glb` for backward compatibility when using default preset colors. Concept presets that alter bevel/depth also write a deterministic preset-specific GLB to `renders/<logo-id>/<variant>/<preset>/asset.glb`.

When `--color-mode` is anything other than `preset`, outputs go to a suffixed render directory so alternate colorways do not overwrite the default preset render. Those non-default color runs also export their GLB into the suffixed render directory instead of `source/<logo-id>/<variant>.glb`.

## Viewer Controls

Open `viewer/index.html` in the browser or through the render server and use the built-in controls to switch:

- logo
- variant
- preset
- `Color Mode`
- `Primary Color` when `Color Mode` is `custom`

The viewer stores color choices in the URL via `colorMode` and `primaryColor`, so scenes are shareable and render exports can reuse the same settings.

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
- add style metadata (`category`, `display_safe`, `style_family`, `notes`) so filtering and deployment choices stay explicit
- decide whether the preset should enable `baseHalo`, `projectionPlate`, `lightColumn`, or `shieldPanel`
- optionally use extended style controls when needed (`logoOutline`, `backplate`, `sweepLight`, `stadiumBeams`, `sequence`)
- keep source SVG geometry clean/extrusion-friendly and push styling into preset/material/render logic
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
