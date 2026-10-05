# Lucas Martinez — Portfolio

[![Deploy to GitHub Pages](https://github.com/lucasmarjua-ui/lucasmarjua-ui.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/lucasmarjua-ui/lucasmarjua-ui.github.io/actions/workflows/deploy.yml)
[![Live site](https://img.shields.io/badge/live-lucasmarjua--ui.github.io-8A2BE2)](https://lucasmarjua-ui.github.io/)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

My personal portfolio: a single-page site that introduces me, lists what I work with, and walks through my projects with real screenshots.

**[▶ Visit the site](https://lucasmarjua-ui.github.io/)**

## Stack

| Area | Tools |
|---|---|
| UI | React 18, TypeScript |
| Styling | Tailwind CSS, self-hosted Kanit font (`@fontsource/kanit`) |
| Motion | Framer Motion (scroll-linked text reveal, stacked project cards) |
| Icons | Lucide React |
| Build & deploy | Vite, GitHub Actions → GitHub Pages |

## Sections

1. **Hero** — name, role, availability and a contact call-to-action.
2. **Marquee** — two scroll-linked rows of project screenshots (decorative, hidden from screen readers).
3. **About** — background and what I'm looking for, revealed character by character on scroll.
4. **What I do** — five skill areas, each with the tools I use.
5. **Projects** — sticky, scaling cards for [OneDay](https://github.com/lucasmarjua-ui/oneday), [PawMatch](https://github.com/lucasmarjua-ui/pawmatch), [RetroGames](https://github.com/lucasmarjua-ui/retrogames) and [MasterCinema](https://github.com/lucasmarjua-ui/mastercinema), each with a description, tech stack, live demo and code links.
6. **Contact** — email, LinkedIn and GitHub.

## Accessibility

- Semantic landmarks (`header`, `nav`, `main`, `footer`) and a skip link.
- Visible keyboard focus rings.
- Animated text keeps its full content in an `aria-label`.
- Animations and smooth scrolling are reduced when the OS asks for reduced motion.

## Project structure

```
src/
├── components/   # Reusable UI: buttons, FadeIn, AnimatedText
├── sections/     # One component per page section
├── assets/       # Project screenshots (WebP)
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
