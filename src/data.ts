import onedayStart from './assets/screenshots/oneday-start.webp';
import onedayDayLoop from './assets/screenshots/oneday-day-loop.webp';
import onedaySummary from './assets/screenshots/oneday-summary.webp';
import pawmatchDiscover from './assets/screenshots/pawmatch-discover.webp';
import pawmatchMatches from './assets/screenshots/pawmatch-matches.webp';
import pawmatchChat from './assets/screenshots/pawmatch-chat.webp';
import retrogamesPortal from './assets/screenshots/retrogames-portal.webp';
import retrogamesPersonaje from './assets/screenshots/retrogames-personaje.webp';
import retrogamesTienda from './assets/screenshots/retrogames-tienda.webp';
import mcIosKeyArt from './assets/screenshots/mastercinema-ios-key-art.webp';
import mcIosModes from './assets/screenshots/mastercinema-ios-modes.webp';
import mcIosDuels from './assets/screenshots/mastercinema-ios-duels.webp';
import mcIosCollect from './assets/screenshots/mastercinema-ios-collect.webp';

export const GITHUB_USER = 'lucasmarjua-ui';
export const EMAIL = 'lucas.mar.jua@gmail.com';

export const LINKS = {
  email: `mailto:${EMAIL}`,
  linkedin: 'https://www.linkedin.com/in/lucas-martinez-a4b955406/',
  github: `https://github.com/${GITHUB_USER}`,
  appStore: 'https://apps.apple.com/app/mastercinema/id6829498680',
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
  /** Label for the live link. Defaults to "Play it". */
  liveLabel?: string;
  /** Omitted when the source is private. */
  code?: string;
  /** Shown as a badge on the card, e.g. "Live on the App Store". */
  badge?: string;
  /** Spans the full width of the grid, with the screenshots beside the text. */
  featured?: boolean;
  shots: Shot[];
}

export const PROJECTS: Project[] = [
  {
    id: 'mastercinema',
    name: 'MasterCinema',
    tagline:
      'A movie-trivia game for iPhone that I designed, built and published on my own, from a sketch on paper to approval by Apple. Four modes (Quick Match, Cinema Hunt, Guess the Movie and Ranked 1v1), asynchronous duels against players and friends, five ranks with weekly rewards and a collection of vintage cinema tickets. In English and Spanish, with new questions sent from the server without an app update.',
    stat: 'On the App Store · 5,700+ questions · EN / ES',
    stack: ['Flutter', 'Dart', 'Firebase', 'Cloud Functions', 'In-app purchases', 'Codemagic CI'],
    live: LINKS.appStore,
    liveLabel: 'App Store',
    badge: 'Live on the App Store',
    featured: true,
    shots: [
      { src: mcIosKeyArt, alt: 'MasterCinema key art: a red cinema ticket surrounded by film-category illustrations' },
      { src: mcIosModes, alt: 'MasterCinema App Store screenshots: a Quick Match question, Guess the Movie clues and Cinema Hunt' },
      { src: mcIosDuels, alt: 'MasterCinema App Store screenshots: a ranked 1v1 duel, rank points and a duel against a friend' },
      { src: mcIosCollect, alt: 'MasterCinema App Store screenshots: a completed cinema ticket and the profile banner editor' },
    ],
  },
  {
    id: 'oneday',
    name: 'OneDay',
    tagline:
      'A historical decision game: live the Great Pyramid, Tenochtitlan in 1519, D-Day, the Moon landing or the night the Berlin Wall fell as a 3D character modelled and animated in Blender, who acts out every choice. Pass the exam at nightfall, climb from Curious Visitor to Witness of the Ages, and find the real ending and the ones history missed.',
    stat: '5 historical events · Blender 3D · 247 tests',
    stack: ['Vanilla JS', 'three.js', 'Blender (bpy)', 'WebGL shaders', 'Firebase'],
    live: 'https://lucasmarjua-ui.github.io/oneday/',
    code: 'https://github.com/lucasmarjua-ui/oneday',
    shots: [
      { src: onedayStart, alt: 'OneDay title screen: the Brandenburg Gate and the Berlin Wall as a floating pixel-art diorama, with the historian rank and a timeline of five events' },
      { src: onedayDayLoop, alt: 'OneDay on Omaha Beach, 1944: a combat medic by the seawall, Belgian gates, a burning landing craft and a destroyer offshore, modelled in Blender' },
      { src: onedaySummary, alt: 'OneDay ending screen for the fall of the Berlin Wall: the historical ending, experience earned, a new rank and medals' },
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
    id: 'pawmatch',
    name: 'PawMatch',
    featured: true,
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
  { item: 'MasterCinema', value: 'On the App Store' },
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
    description: 'Cross-platform Flutter apps in layers (models, services, providers, screens), taken all the way to the App Store: in-app purchases, App Store review and iOS builds automated in the cloud.',
    stack: ['Flutter', 'Dart', 'Provider', 'App Store', 'Codemagic'],
  },
  {
    name: 'Backend & data',
    description: 'Auth, cloud saves, live leaderboards and asynchronous duels on Firebase behind Firestore security rules, server-side logic in Cloud Functions and content updated through Remote Config, plus SQL and Node.js.',
    stack: ['Firebase', 'Firestore', 'Cloud Functions', 'Remote Config', 'Node.js', 'SQL'],
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
    date: 'Nov 2026',
    title: 'MasterCinema is on the App Store',
    body: 'Approved by Apple and live, in English and Spanish: four game modes, ranked duels, friends, collectible tickets and in-app purchases. Built in Flutter on Windows, with every iOS build made in the cloud by Codemagic.',
    href: LINKS.appStore,
  },
  {
    date: 'Oct 2026',
    title: 'OneDay: the Berlin Wall, and a career',
    body: 'A fifth event, the night of 9 November 1989, with its own Blender set. Plus an exam on what each day taught, eight historian ranks, fourteen medals, an archive of every fact learned and one daily challenge for everyone.',
    href: 'https://lucasmarjua-ui.github.io/oneday/',
  },
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
    title: 'Started MasterCinema for iPhone',
    body: 'A movie-trivia game for iPhone, built from scratch in Flutter as a real product: duels, ranks, progression and a vintage cinema look, with content served from Firebase.',
    href: LINKS.appStore,
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
    date: 'Aug 2026',
    title: 'Started PawMatch',
    body: 'A Flutter app for dogs and their owners, built on repository interfaces so mock data can become Firebase.',
    href: 'https://github.com/lucasmarjua-ui/pawmatch',
  },
];
