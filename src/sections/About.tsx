import { useState } from 'react';
import { Dog } from '../components/Pixel';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import { INVENTORY } from '../data';
import { useSecrets } from '../secrets';

const LEVELS = ['Junior', 'Junior+', 'Hire me'];

export default function About() {
  const [level, setLevel] = useState(0);
  const { unlock } = useSecrets();

  return (
    <section aria-labelledby="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20">
      <SectionTitle id="about">About me</SectionTitle>

      <Reveal>
        <div className="panel grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <div
            className="flex min-h-[260px] items-end justify-center border-b border-line p-8 md:border-b-0 md:border-r"
            style={{
              backgroundImage: 'radial-gradient(#2e302b 1px, transparent 1px)',
              backgroundSize: '14px 14px',
            }}
          >
            <figure className="flex flex-col items-center gap-4">
              <Dog size={12} className="max-w-full" />
              <figcaption className="label">Sidekick: Byte</figcaption>
            </figure>
          </div>

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="label">Player 1</span>
              <span className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.06em]">
                <span className="border border-line px-1.5 py-0.5 text-cream/80">EN</span>
                <span className="border border-line px-1.5 py-0.5 text-cream/80">ES</span>
                <button
                  type="button"
                  onClick={() => {
                    const next = Math.min(level + 1, LEVELS.length - 1);
                    setLevel(next);
                    if (next === LEVELS.length - 1) unlock('levelUp');
                  }}
                  className="text-leaf hover:underline"
                  title="Level up"
                >
                  Lvl: {LEVELS[level]}
                </button>
              </span>
            </div>

            <h3 className="mt-6 text-2xl uppercase tracking-[0.08em] sm:text-4xl" style={{ textShadow: '4px 4px 0 #2e302b' }}>
              Lucas Martinez
            </h3>
            <p className="mt-3 text-xs uppercase tracking-[0.06em] text-cream/80">Class: Multiplatform developer</p>
            <p className="mt-1 text-xs uppercase tracking-[0.06em] text-cream/80">
              Base: Manchester, UK · Status: <span className="text-leaf">available now</span>
            </p>

            <hr className="my-6 border-line" />

            <p className="label">Inventory</p>
            <dl className="mt-4 grid gap-x-10 gap-y-3 text-[0.7rem] uppercase tracking-[0.08em] sm:grid-cols-2">
              {INVENTORY.map(({ item, value }) => (
                <div key={item} className="flex justify-between gap-4">
                  <dt className="text-cream/80">{item}</dt>
                  <dd className="text-leaf">{value}</dd>
                </div>
              ))}
            </dl>

            <hr className="my-6 border-line" />

            <p className="label">Special move</p>
            <p className="mt-3 text-xs uppercase leading-loose tracking-[0.08em]">
              Give me a feature and I&apos;ll ship it end to end: code, tests, CI and deploy.
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal className="mt-12 grid gap-8 text-xs uppercase leading-loose tracking-[0.06em] text-cream/80 md:grid-cols-2">
        <p>
          I&apos;m a recent graduate in Multiplatform Application Development (DAM, UK equivalent: RQF Level 5 / HND),
          fully bilingual in English and Spanish. I learn best by building real products end to end instead of
          following isolated tutorials.
        </p>
        <p>
          I&apos;m looking for my first full-time Junior Developer role in the UK: front-end, full-stack or mobile.
          I work in small focused commits, automate CI and deploys, write clear READMEs and leave code a teammate can
          pick up.
        </p>
      </Reveal>
    </section>
  );
}
