import onedayStart from './assets/screenshots/oneday-start.webp';
import onedayDayLoop from './assets/screenshots/oneday-day-loop.webp';
import onedaySummary from './assets/screenshots/oneday-summary.webp';
import pawmatchDiscover from './assets/screenshots/pawmatch-discover.webp';
import pawmatchMatches from './assets/screenshots/pawmatch-matches.webp';
import pawmatchChat from './assets/screenshots/pawmatch-chat.webp';
import retrogamesPortal from './assets/screenshots/retrogames-portal.webp';
import retrogamesPersonaje from './assets/screenshots/retrogames-personaje.webp';
import retrogamesTienda from './assets/screenshots/retrogames-tienda.webp';
import mastercinemaVestibulo from './assets/screenshots/mastercinema-vestibulo.webp';
import mastercinemaMaraton from './assets/screenshots/mastercinema-maraton.webp';
import mastercinemaResumen from './assets/screenshots/mastercinema-resumen.webp';

export const GITHUB_USER = 'lucasmarjua-ui';
export const EMAIL = 'lucas.mar.jua@gmail.com';

export const LINKS = {
  email: `mailto:${EMAIL}`,
  linkedin: 'https://www.linkedin.com/in/lucas-martinez-a4b955406/',
  github: `https://github.com/${GITHUB_USER}`,
};

export const CONTACTS = [
  { label: 'Email', handle: EMAIL, href: LINKS.email },
  { label: 'LinkedIn', handle: 'in/lucas-martinez', href: LINKS.linkedin },
  { label: 'GitHub', handle: `@${GITHUB_USER}`, href: LINKS.github },
];

export type Shot = { src: string; alt: string; position?: string; contain?: boolean };

export interface Project {
  id: string;
  name: string;
  tagline: string;
  stat: string;
  stack: string[];
  live?: string;
  code: string;
  shots: Shot[];
}

export const PROJECTS: Project[] = [
  {
    id: 'oneday',
    name: 'OneDay',
    tagline:
      'A historical decision game: live the Moon landing, the Great Pyramid, Tenochtitlan in 1519 or D-Day as a 3D character modelled and animated in Blender, who acts out every choice. Learn as you play, and find the real ending and the ones history missed.',
    stat: '4 historical events · Blender 3D · 219 tests',
    stack: ['Vanilla JS', 'three.js', 'Blender (bpy)', 'WebGL shaders', 'Firebase'],
    live: 'https://lucasmarjua-ui.github.io/oneday/',
    code: 'https://github.com/lucasmarjua-ui/oneday',
    shots: [
      { src: onedayStart, alt: 'OneDay title screen: the Great Pyramid of Giza under construction as a floating pixel-art diorama' },
      { src: onedayDayLoop, alt: 'OneDay on Omaha Beach, 1944: a combat medic by the seawall, Belgian gates, a burning landing craft and a destroyer offshore, modelled in Blender' },
      { src: onedaySummary, alt: 'OneDay ending screen for Tenochtitlan, 1519: the historical ending and what really happened' },
    ],
  },
  {
    id: 'retrogames',
    name: 'RetroGames',
    tagline:
      'An 80s arcade portal with six classics on the Canvas API, plus coins, achievements, a custom character and cloud saves.',
    stat: '6 arcade classics · global leaderboard',
    stack: ['Vanilla JS', 'Canvas API', 'Firebase'],
    live: 'https://lucasmarjua-ui.github.io/retrogames/',
    code: 'https://github.com/lucasmarjua-ui/retrogames',
    shots: [
      { src: retrogamesPortal, alt: 'RetroGames arcade landing screen with game selection' },
      { src: retrogamesPersonaje, alt: 'RetroGames character customization screen' },
      { src: retrogamesTienda, alt: 'RetroGames cabinet skins shop', position: 'top' },
    ],
  },
  {
    id: 'mastercinema',
    name: 'MasterCinema',
    tagline:
      'Film trivia with five categories, a timed Marathon mode with streaks and lifelines, unlockable themes and leaderboards.',
    stat: '5 categories · marathon mode · accounts',
    stack: ['Vanilla JS', 'React', 'TypeScript', 'Tailwind', 'Firebase'],
    live: 'https://lucasmarjua-ui.github.io/mastercinema/',
    code: 'https://github.com/lucasmarjua-ui/mastercinema',
    shots: [
      { src: mastercinemaVestibulo, alt: 'MasterCinema landing screen with category selection', position: 'top' },
      { src: mastercinemaMaraton, alt: 'MasterCinema trivia question in Marathon mode' },
      { src: mastercinemaResumen, alt: 'MasterCinema marathon results screen with score' },
    ],
  },
  {
    id: 'pawmatch',
    name: 'PawMatch',
    tagline:
      'A Flutter app that matches dogs and their owners for playdates, walks and breeding, on swappable repositories ready for Firebase.',
    stat: 'Cross-platform · layered architecture',
    stack: ['Flutter', 'Dart', 'Provider', 'Firebase'],
    code: 'https://github.com/lucasmarjua-ui/pawmatch',
    shots: [
      { src: pawmatchDiscover, alt: 'PawMatch discover feed with a dog profile card', contain: true },
      { src: pawmatchMatches, alt: 'PawMatch matches and messages list', position: 'top', contain: true },
      { src: pawmatchChat, alt: 'PawMatch conversation with a match', position: 'top', contain: true },
    ],
  },
];

export const INVENTORY = [
  { item: 'OneDay', value: '4 events in history' },
  { item: 'RetroGames', value: '6 games' },
  { item: 'MasterCinema', value: '5 categories' },
  { item: 'PawMatch', value: 'Flutter app' },
  { item: 'Languages', value: 'EN / ES' },
  { item: 'This site', value: 'React + TS' },
];

export const SKILLS = [
  {
    name: 'Web',
    description: 'Responsive, accessible web apps — from zero-dependency vanilla builds to React components bundled with Vite.',
    stack: ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'Tailwind'],
  },
  {
    name: 'Mobile',
    description: 'Cross-platform Flutter apps in layers (models, services, providers, screens), so the backend swaps without touching the UI.',
    stack: ['Flutter', 'Dart', 'Provider'],
  },
  {
    name: 'Backend & data',
    description: 'Auth, cloud saves and live leaderboards on Firebase behind Firestore security rules, plus SQL and Node.js.',
    stack: ['Firebase', 'Firestore', 'Node.js', 'SQL'],
  },
  {
    name: 'Games',
    description: 'A 3D pixel-art stage in three.js with custom shaders, characters and sets modelled and animated in Blender, Canvas API games and data-driven engines, plus Unity projects in C#.',
    stack: ['three.js', 'Blender', 'Canvas API', 'WebAudio', 'Unity', 'C#'],
  },
  {
    name: 'Testing & delivery',
    description: 'Unit tests for logic and data, CI on every push, and automatic deploys to GitHub Pages with GitHub Actions.',
    stack: ['Git', 'GitHub Actions', 'Node test runner', 'flutter test'],
  },
  {
    name: 'Also speaks',
    description: 'Languages from the DAM course and side projects, ready to pick up whatever stack the team uses.',
    stack: ['Java', 'Python', 'C / C++', 'PostgreSQL'],
  },
];

// Dates come from each repository's first commit.
export const LOG = [
  {
    date: 'Oct 2026',
    title: 'Rebuilt every OneDay set',
    body: 'Event by event, every scene remodelled in Blender from the history: Columbia and Eagle cut away, the workers\' town at Giza, the palace of Axayacatl, the hold of a troopship and Rommel\'s beach obstacles. Each day rebalanced so no turn is filler.',
    href: 'https://lucasmarjua-ui.github.io/oneday/',
  },
  {
    date: 'Oct 2026',
    title: 'Modelled OneDay in Blender',
    body: 'A 3D character with 30 animations and the scene sets, built by Python scripts in headless Blender. Every choice is acted out, characters path around obstacles, and every dialogue carries a historical note.',
    href: 'https://lucasmarjua-ui.github.io/oneday/',
  },
  {
    date: 'Oct 2026',
    title: 'Turned OneDay into history',
    body: 'Eras became real historical days: Apollo 11, the Great Pyramid, Tenochtitlan 1519 and Omaha Beach. Historical notes on every choice, one real ending and many alternative ones.',
    href: 'https://lucasmarjua-ui.github.io/oneday/',
  },
  {
    date: 'Oct 2026',
    title: 'Took OneDay to 3D',
    body: 'Pixel-art dioramas in three.js with an outline shader, a character who acts out every choice, a day-night cycle and generative music.',
    href: 'https://lucasmarjua-ui.github.io/oneday/',
  },
  {
    date: 'Oct 2026',
    title: 'Rebuilt this site in pixels',
    body: 'A new portfolio, block by block: pixel type, a live contributions grid, a terminal and a few secrets.',
    href: 'https://github.com/lucasmarjua-ui/lucasmarjua-ui.github.io',
  },
  {
    date: 'Sep 2026',
    title: 'Shipped OneDay',
    body: 'A decision game built on one idea: live a single day, one choice at a time. Content is pure JSON, checked by a unit-test suite that runs in CI on every push.',
    href: 'https://lucasmarjua-ui.github.io/oneday/',
  },
  {
    date: 'Sep 2026',
    title: 'Opened the RetroGames arcade',
    body: 'Six Canvas classics behind one portal, with Firebase accounts, cloud saves and a global ranking.',
    href: 'https://lucasmarjua-ui.github.io/retrogames/',
  },
  {
    date: 'Sep 2026',
    title: 'Rolled the MasterCinema credits',
    body: 'Film trivia with a timed Marathon mode, lifelines, unlockable themes and per-category leaderboards.',
    href: 'https://lucasmarjua-ui.github.io/mastercinema/',
  },
  {
    date: 'Aug 2026',
    title: 'Started PawMatch',
    body: 'A Flutter app for dogs and their owners, built on repository interfaces so mock data can become Firebase.',
    href: 'https://github.com/lucasmarjua-ui/pawmatch',
  },
];
