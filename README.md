# Lucas Martinez — Portfolio

[![Deploy to GitHub Pages](https://github.com/lucasmarjua-ui/lucasmarjua-ui.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/lucasmarjua-ui/lucasmarjua-ui.github.io/actions/workflows/deploy.yml)
[![Live site](https://img.shields.io/badge/live-lucasmarjua--ui.github.io-8A2BE2)](https://lucasmarjua-ui.github.io/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

My personal portfolio: a pixel-art, single-page site that introduces me, walks through my projects with real screenshots and hides a few secrets along the way.

**[▶ Visit the site](https://lucasmarjua-ui.github.io/)**

## Stack

| Area | Tools |
|---|---|
| UI | React 18, TypeScript |
| Styling | Tailwind CSS, self-hosted Silkscreen pixel font (`@fontsource/silkscreen`) |
| Pixel art | Hand-drawn sprites rendered as crisp SVG from text grids (`src/components/Pixel.tsx`) |
| Data | Live GitHub contributions from [github-contributions-api](https://github.com/grubersjoe/github-contributions-api) |
| Build & deploy | Vite, GitHub Actions → GitHub Pages |

## Sections

1. **Hero** — a "building" intro that types out my name (skippable with Esc), my role and links, and two pixel dogs that roam the page.
2. **Projects** — cards for [OneDay](https://github.com/lucasmarjua-ui/oneday), [RetroGames](https://github.com/lucasmarjua-ui/retrogames), [MasterCinema](https://github.com/lucasmarjua-ui/mastercinema) and [PawMatch](https://github.com/lucasmarjua-ui/pawmatch), each with a screenshot stepper, stack, live demo and code links.
3. **About me** — a "Player 1" character sheet: class, base, inventory and special move.
4. **Skill tree** — six skill areas with the tools I use.
5. **A year in blocks** — my GitHub contributions as a block grid, with a box to compare your own year.
6. **Log** — what I've shipped, newest first.
7. **Contact** — email, LinkedIn and GitHub, plus a small terminal (`help` to start).

There are 7 secrets on the page; the counter in the footer tracks the ones you've found.

## Accessibility

- Semantic landmarks (`header`, `main`, `footer`) and a skip link.
- Visible keyboard focus rings; every interactive sprite is a real button with a label.
- The intro, roaming sprites and reveal animations are switched off when the OS asks for reduced motion.

## Project structure

```
src/
├── components/   # Pixel sprites and icons, Reveal, RoamingDog, Toast
├── sections/     # One component per page section
├── assets/       # Project screenshots (WebP)
├── data.ts       # Projects, skills, log and links in one place
├── secrets.tsx   # Secrets context (persisted in localStorage)
├── App.tsx       # Page layout
└── main.tsx      # Entry point, font imports
```

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run lint      # type-check
npm run build     # production build in dist/
npm run preview   # serve the production build
```

Every push to `main` is built and deployed to GitHub Pages automatically.

## License

[MIT](LICENSE)
