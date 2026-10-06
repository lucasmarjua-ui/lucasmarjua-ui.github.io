import { useRef, type CSSProperties } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import LiveProjectButton from '../components/LiveProjectButton';

import onedayStart from '../assets/screenshots/oneday-start.webp';
import onedayDayLoop from '../assets/screenshots/oneday-day-loop.webp';
import onedaySummary from '../assets/screenshots/oneday-summary.webp';
import pawmatchDiscover from '../assets/screenshots/pawmatch-discover.webp';
import pawmatchOnboarding from '../assets/screenshots/pawmatch-onboarding.webp';
import pawmatchMatches from '../assets/screenshots/pawmatch-matches.webp';
import retrogamesPortal from '../assets/screenshots/retrogames-portal.webp';
import retrogamesPersonaje from '../assets/screenshots/retrogames-personaje.webp';
import retrogamesTienda from '../assets/screenshots/retrogames-tienda.webp';
import mastercinemaVestibulo from '../assets/screenshots/mastercinema-vestibulo.webp';
import mastercinemaMaraton from '../assets/screenshots/mastercinema-maraton.webp';
import mastercinemaResumen from '../assets/screenshots/mastercinema-resumen.webp';

type ProjectImage = { src: string; alt: string; position?: string };

interface Project {
  number: string;
  category: string;
  name: string;
  description: string;
  stack: string[];
  live?: string;
  code: string;
  images: [ProjectImage, ProjectImage, ProjectImage];
}

const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'Game',
    name: 'OneDay',
    description:
      'A data-driven decision game: pick one of six eras and live a single day one card at a time. New eras are pure JSON, covered by a unit-test suite and CI.',
    stack: ['Vanilla JS', 'ES modules', 'Firebase', 'Node tests'],
    live: 'https://lucasmarjua-ui.github.io/oneday/',
    code: 'https://github.com/lucasmarjua-ui/oneday',
    images: [
      { src: onedayStart, alt: 'OneDay almanac-style home screen listing the six playable eras' },
      { src: onedayDayLoop, alt: 'OneDay decision screen in Córdoba, 961 — three narrative choices' },
      { src: onedaySummary, alt: 'OneDay end-of-day persona reveal in Edo, 1750, with stats and objectives' },
    ],
  },
  {
    number: '02',
    category: 'Mobile App',
    name: 'PawMatch',
    description:
      'A Flutter app that matches dogs and their owners for playdates, walks and breeding, built on swappable repository interfaces ready for Firebase.',
    stack: ['Flutter', 'Dart', 'Provider', 'Firebase'],
    code: 'https://github.com/lucasmarjua-ui/pawmatch',
    images: [
      { src: pawmatchOnboarding, alt: 'PawMatch onboarding screen', position: 'top' },
      { src: pawmatchMatches, alt: 'PawMatch matches and messages list', position: 'top' },
      { src: pawmatchDiscover, alt: 'PawMatch discover feed with a dog profile card' },
    ],
  },
  {
    number: '03',
    category: 'Web Games',
    name: 'RetroGames',
    description:
      'An 80s arcade portal with six classics on the Canvas API, plus coins, achievements, a custom character, cloud saves and a global leaderboard.',
    stack: ['Vanilla JS', 'Canvas API', 'Firebase'],
    live: 'https://lucasmarjua-ui.github.io/retrogames/',
    code: 'https://github.com/lucasmarjua-ui/retrogames',
    images: [
      { src: retrogamesPersonaje, alt: 'RetroGames character customization screen' },
      { src: retrogamesTienda, alt: 'RetroGames cabinet skins shop', position: 'top' },
      { src: retrogamesPortal, alt: 'RetroGames arcade landing screen with game selection' },
    ],
  },
  {
    number: '04',
    category: 'Trivia Game',
    name: 'MasterCinema',
    description:
      'Film trivia with five categories, a timed Marathon mode with streaks and lifelines, unlockable themes, accounts and per-category leaderboards.',
    stack: ['Vanilla JS', 'React', 'TypeScript', 'Tailwind', 'Firebase'],
    live: 'https://lucasmarjua-ui.github.io/mastercinema/',
    code: 'https://github.com/lucasmarjua-ui/mastercinema',
    images: [
      { src: mastercinemaResumen, alt: 'MasterCinema marathon results screen with score' },
      { src: mastercinemaMaraton, alt: 'MasterCinema trivia question in Marathon mode' },
      { src: mastercinemaVestibulo, alt: 'MasterCinema landing screen with category selection', position: 'top' },
    ],
  },
];

function ProjectImageTile({ image, className, style }: { image: ProjectImage; className: string; style?: CSSProperties }) {
  return (
    <img
      src={image.src}
      alt={image.alt}
      className={`${className} block w-full object-cover`}
      style={{ objectPosition: image.position ?? 'center', ...style }}
      loading="lazy"
    />
  );
}

function ProjectCard({ project, index, total }: { project: Project; index: number; total: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start start'],
  });

  const targetScale = 1 - (total - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div
      ref={cardRef}
      className="sticky top-[calc(6rem+var(--stack-offset))] h-[85vh] md:top-[calc(8rem+var(--stack-offset))]"
      style={{ '--stack-offset': `${index * 28}px` } as CSSProperties}
    >
      <motion.div
        style={{ scale }}
        className="h-full origin-top rounded-[40px] border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="flex items-start gap-4 sm:gap-6">
            <span className="font-black leading-none text-[#D7E2EA]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              {project.number}
            </span>
            <div className="min-w-0">
              <p className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
                {project.category}
              </p>
              <h3
                className="font-black uppercase leading-none text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
              >
                {project.name}
              </h3>
              <p className="mt-2 hidden max-w-xl text-sm font-light leading-snug text-[#D7E2EA]/75 sm:block md:text-base">
                {project.description}
              </p>
              <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`${project.name} tech stack`}>
                {project.stack.map((tool) => (
                  <li
                    key={tool}
                    className="rounded-full border border-[#D7E2EA]/30 px-2.5 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-[#D7E2EA]/80 sm:text-xs"
                  >
                    {tool}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="flex shrink-0 gap-2">
            {project.live && <LiveProjectButton href={project.live} label="Live demo" variant="solid" />}
            <LiveProjectButton href={project.code} label="Code" />
          </div>
        </div>

        <div
          className="mt-6 grid grid-cols-[40%_60%] gap-3 sm:mt-8"
          style={{ height: 'clamp(240px, calc(32vw + 12px), 480px)', gridTemplateRows: '1fr' }}
        >
          <div className="flex min-h-0 flex-col gap-3">
            <ProjectImageTile
              image={project.images[0]}
              className="rounded-[24px] sm:rounded-[32px] md:rounded-[40px]"
              style={{ height: 'clamp(100px, 13vw, 190px)' }}
            />
            <ProjectImageTile
              image={project.images[1]}
              className="rounded-[24px] sm:rounded-[32px] md:rounded-[40px]"
              style={{ height: 'clamp(128px, 19vw, 278px)' }}
            />
          </div>
          <ProjectImageTile
            image={project.images[2]}
            className="h-full min-h-0 rounded-[24px] sm:rounded-[32px] md:rounded-[40px]"
          />
        </div>
      </motion.div>
    </div>
  );
}

export default function ProjectsSection() {
  return (
    <section
      id="projects"
      className="relative z-10 -mt-10 rounded-t-[40px] bg-[#0C0C0C] px-5 py-20 sm:-mt-12 sm:rounded-t-[50px] sm:px-8 md:-mt-14 md:rounded-t-[60px] md:px-10"
    >
      <h2 className="hero-heading text-center font-black uppercase leading-none tracking-tight" style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}>
        Projects
      </h2>

      <div className="mx-auto mt-16 max-w-5xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
}
