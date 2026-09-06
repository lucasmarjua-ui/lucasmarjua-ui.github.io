import { useRef, type CSSProperties } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import LiveProjectButton from '../components/LiveProjectButton';
import PlaceholderImage from '../components/PlaceholderImage';

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

type ProjectImage = { src: string; alt: string; position?: string } | { label: string };

interface Project {
  number: string;
  category: string;
  name: string;
  buttonLabel: string;
  href: string;
  images: [ProjectImage, ProjectImage, ProjectImage];
}

const PROJECTS: Project[] = [
  {
    number: '01',
    category: 'Game',
    name: 'OneDay',
    buttonLabel: 'Live Project',
    href: 'https://lucasmarjua-ui.github.io/oneday/',
    images: [
      { src: onedayStart, alt: 'OneDay era-selection start screen' },
      { src: onedayDayLoop, alt: 'OneDay day loop — encounter with the recurring NPC Kleon' },
      { src: onedaySummary, alt: 'OneDay end-of-day summary screen with stats and daily objectives' },
    ],
  },
  {
    number: '02',
    category: 'Mobile App',
    name: 'PawMatch',
    buttonLabel: 'View Code',
    href: 'https://github.com/lucasmarjua-ui/pawmatch',
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
    buttonLabel: 'Live Project',
    href: 'https://lucasmarjua-ui.github.io/retrogames/',
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
    buttonLabel: 'Live Project',
    href: 'https://lucasmarjua-ui.github.io/mastercinema/',
    images: [
      { src: mastercinemaResumen, alt: 'MasterCinema marathon results screen with score' },
      { src: mastercinemaMaraton, alt: 'MasterCinema trivia question in Marathon mode' },
      { src: mastercinemaVestibulo, alt: 'MasterCinema landing screen with category selection', position: 'top' },
    ],
  },
];

function ProjectImageTile({ image, className, style }: { image: ProjectImage; className: string; style?: CSSProperties }) {
  if ('src' in image) {
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
  return <PlaceholderImage label={image.label} className={className} style={style} />;
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <span className="font-black text-[#D7E2EA]" style={{ fontSize: 'clamp(2rem, 5vw, 4rem)' }}>
              {project.number}
            </span>
            <div>
              <p className="text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
                {project.category}
              </p>
              <h3
                className="font-black uppercase leading-none text-[#D7E2EA]"
                style={{ fontSize: 'clamp(1.5rem, 4vw, 3rem)' }}
              >
                {project.name}
              </h3>
            </div>
          </div>
          <LiveProjectButton href={project.href} label={project.buttonLabel} />
        </div>

        <div className="mt-6 grid grid-cols-[40%_60%] gap-3 sm:mt-8">
          <div className="flex flex-col gap-3">
            <ProjectImageTile
              image={project.images[0]}
              className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(130px, 16vw, 230px)' }}
            />
            <ProjectImageTile
              image={project.images[1]}
              className="rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
              style={{ height: 'clamp(160px, 22vw, 340px)' }}
            />
          </div>
          <ProjectImageTile
            image={project.images[2]}
            className="h-full rounded-[40px] sm:rounded-[50px] md:rounded-[60px]"
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
        Project
      </h2>

      <div className="mx-auto mt-16 max-w-5xl">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.number} project={project} index={i} total={PROJECTS.length} />
        ))}
      </div>
    </section>
  );
}
