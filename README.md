# Color the Animal

A simple, no-pressure browser coloring app built for a 6-year-old. Tap a color, tap a region on an animal, and watch it fill. There are no wrong answers — a green dog is the whole point.

## Features

- 8 animals: Lion, Elephant, Giraffe, Dog, Shark, T-Rex, Octopus, Dragon
- 20-color palette (standard + fun colors), with a clear selected-swatch ring
- Tap-to-fill regions on each animal SVG
- Undo button (remembers last 10 actions per animal)
- Clear button with an "are you sure?" confirmation
- Animal picker grid with live thumbnails
- Gallery view showing your saved version of every animal
- Auto-save to `localStorage` — close the tab, reopen, everything is still there
- Confetti burst when every region of an animal is filled
- Touch-first design, responsive from phone to laptop

## Stack

- React 19 + Vite
- Plain CSS (no framework)
- `canvas-confetti` for the celebration
- All animals are inline SVG — no images, no backend

## Install & run

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Then open the URL Vite prints (usually `http://localhost:5173/`).

### Production build

```bash
npm run build
npm run preview
```

The built site is fully static — drop `dist/` on any static host.

## Project layout

```
src/
  App.jsx                  top-level orchestration + state
  animalData.jsx           SVG path data + named regions for the 8 animals
  colors.js                the 20-color palette
  storage.js               localStorage helpers
  index.css                all styles
  components/
    AnimalCanvas.jsx       renders the active animal's SVG
    ColorPalette.jsx       horizontal-scroll swatch picker
    Toolbar.jsx            top bar (animal name + undo/clear/gallery/picker)
    AnimalPicker.jsx       modal grid of all 8 animals
    Gallery.jsx            modal grid of saved animal states
    ConfirmModal.jsx       generic yes/no modal (used by Clear)
```

## Notes for future tweaks

- **Adding an animal**: append a new object to the `ANIMALS` array in `src/animalData.jsx`. Each animal needs `{ id, name, viewBox, regions, render }`. The `render` function gets `{ fills, onRegionClick, interactive }` — region elements use `id={regionId}` so the click handler resolves to the right region.
- **Swapping the palette**: edit the `COLORS` array in `src/colors.js`.
- **Storage keys**: prefixed `cta-` in `localStorage`. Bumping the version suffix (`-v1`) wipes saved state on next load.
