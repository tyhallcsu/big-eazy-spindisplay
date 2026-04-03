# Big Eazy SpinDisplay Asset Pipeline

This workspace turns the original Big Eazy logo vector into a simplified SpinDisplay-ready 3D asset and a looping square master render.

## Outputs

- Simplified motion SVG: [source/big-eazy-spindisplay.svg](/Users/tylerhall/Desktop/JOBS/Big%20Eazy%20Party%20Bus/SVG/source/big-eazy-spindisplay.svg)
- Reusable 3D asset: [source/big-eazy-spindisplay.glb](/Users/tylerhall/Desktop/JOBS/Big%20Eazy%20Party%20Bus/SVG/source/big-eazy-spindisplay.glb)
- Preview still: [renders/big-eazy-spindisplay-preview.png](/Users/tylerhall/Desktop/JOBS/Big%20Eazy%20Party%20Bus/SVG/renders/big-eazy-spindisplay-preview.png)
- Master loop: [renders/big-eazy-spindisplay-master.mp4](/Users/tylerhall/Desktop/JOBS/Big%20Eazy%20Party%20Bus/SVG/renders/big-eazy-spindisplay-master.mp4)
- Preview GIF: [renders/big-eazy-spindisplay-preview.gif](/Users/tylerhall/Desktop/JOBS/Big%20Eazy%20Party%20Bus/SVG/renders/big-eazy-spindisplay-preview.gif)
- Contact sheet: [renders/big-eazy-spindisplay-contact-sheet.png](/Users/tylerhall/Desktop/JOBS/Big%20Eazy%20Party%20Bus/SVG/renders/big-eazy-spindisplay-contact-sheet.png)
- ffprobe metadata: [renders/big-eazy-spindisplay-master.ffprobe.json](/Users/tylerhall/Desktop/JOBS/Big%20Eazy%20Party%20Bus/SVG/renders/big-eazy-spindisplay-master.ffprobe.json)

## Build

Install dependencies:

```bash
npm install
npx playwright install chromium
```

Generate the simplified SVG only:

```bash
npm run derive:svg
```

Generate the `.glb`, preview still, MP4 loop, GIF, and contact sheet:

```bash
npm run build:spin
```

## Render Defaults

- `1024x1024`
- `30 fps`
- `8 seconds`
- black background
- H.264 MP4
- no audio

## Notes

- The original SVG is left untouched.
- The SpinDisplay version intentionally drops the small tagline for readability on hologram fan displays.
- The build script captures a square master render that can be transcoded later for a specific SpinDisplay model.
