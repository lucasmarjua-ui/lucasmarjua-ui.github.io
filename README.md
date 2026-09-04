# lucasmarjua-ui.github.io

Personal portfolio landing page, built with React, TypeScript, Tailwind CSS, and Framer Motion.

Live at [https://lucasmarjua-ui.github.io](https://lucasmarjua-ui.github.io).

## Stack

- React + TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Sections

1. **Hero** — intro, nav, contact button, magnetic avatar illustration.
2. **Marquee** — two scroll-linked rows of project screenshots.
3. **About** — bio with a scroll-revealed animated paragraph.
4. **Services** — the five things I build.
5. **Projects** — sticky, scaling cards for [OneDay](https://github.com/lucasmarjua-ui/oneday), [PawMatch](https://github.com/lucasmarjua-ui/pawmatch), and [RetroGames](https://github.com/lucasmarjua-ui/retrogames).

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

Deploys automatically to GitHub Pages via GitHub Actions on push to `main`.

## Placeholder assets

The project screenshots, marquee tiles, and hero avatar are currently placeholder
graphics (clearly labeled "Placeholder" in the UI) — see `src/components/PlaceholderImage.tsx`
and `src/components/HeroAvatar.tsx`. Swap them for real screenshots/illustration as they
become available.

## License

MIT
