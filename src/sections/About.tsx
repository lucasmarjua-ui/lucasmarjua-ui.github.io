import { useRef, useState } from 'react';
import { BuildFrame, PixelCover, PopIn, TypeText, useInView, useSequence } from '../build';
import { Dog } from '../components/Pixel';
import SectionTitle from '../components/SectionTitle';
import { INVENTORY } from '../data';
import { useSecrets } from '../secrets';

const LEVELS = ['Junior', 'Junior+', 'Hire me'];

const BIO = [
  "I'm a recent graduate in Multiplatform Application Development (DAM, UK equivalent: RQF Level 5 / HND), fully bilingual in English and Spanish. I learn best by building real products end to end instead of following isolated tutorials.",
  "I'm looking for my first full-time Junior Developer role in the UK: front-end, full-stack or mobile. I work in small focused commits, automate CI and deploys, write clear READMEs and leave code a teammate can pick up.",
];

// Build steps, in order.
const S = {
  frame: 0,
  dog: 1,
  player: 2,
  badges: 3,
  name: 4,
  klass: 5,
  base: 6,
  status: 7,
  invLabel: 8,
  inv: 9, // one step per inventory row
  moveLabel: 9 + INVENTORY.length,
  move: 10 + INVENTORY.length,
  bio: 11 + INVENTORY.length, // one step per paragraph
};
const STEPS = S.bio + BIO.length;

export default function About() {
  const [level, setLevel] = useState(0);
  const { unlock } = useSecrets();
  const ref = useRef<HTMLDivElement>(null);
  const seq = useSequence(STEPS, useInView(ref));

  return (
    <section aria-labelledby="about" className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20">
      <SectionTitle id="about">About me</SectionTitle>

      <div ref={ref}>
        <BuildFrame {...seq.props(S.frame)} className="panel grid md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
          <PixelCover
            {...seq.props(S.dog)}
            cols={10}
            rows={8}
            className="flex min-h-[260px] items-end justify-center border-b border-line p-8 md:border-b-0 md:border-r"
          >
            <div
              className="absolute inset-0"
              style={{ backgroundImage: 'radial-gradient(#2e302b 1px, transparent 1px)', backgroundSize: '14px 14px' }}
              aria-hidden="true"
            />
            <figure className="relative flex flex-col items-center gap-4">
              <Dog size={12} className="max-w-full" />
              <figcaption className="label">Sidekick: Byte</figcaption>
            </figure>
          </PixelCover>

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="label">
                <TypeText text="Player 1" cps={30} {...seq.props(S.player)} />
              </span>
              <PopIn {...seq.props(S.badges)}>
                <span className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.12em]">
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
              </PopIn>
            </div>

            <h3 className="mt-6 text-2xl uppercase tracking-[0.1em] sm:text-4xl" style={{ textShadow: '4px 4px 0 #2e302b' }}>
              <TypeText text="Lucas Martinez" cps={16} {...seq.props(S.name)} />
            </h3>
            <p className="mt-3 text-xs uppercase tracking-[0.12em] text-cream/80">
              <TypeText text="Class: Multiplatform developer" cps={50} {...seq.props(S.klass)} />
            </p>
            <p className="mt-1 text-xs uppercase tracking-[0.12em] text-cream/80">
              <TypeText text="Base: Manchester, UK · Status: " cps={50} {...seq.props(S.base)} />
              <TypeText text="available now" cps={30} className="text-leaf" {...seq.props(S.status)} />
            </p>

            <hr className="my-6 border-line" />

            <p className="label">
              <TypeText text="Inventory" cps={30} {...seq.props(S.invLabel)} />
            </p>
            <dl className="mt-4 grid gap-x-10 gap-y-3 text-[0.7rem] uppercase tracking-[0.08em] sm:grid-cols-2">
              {INVENTORY.map(({ item, value }, i) => (
                <div key={item} className="flex justify-between gap-4">
                  <dt className="text-cream/80">
                    <TypeText text={item} cps={45} {...seq.props(S.inv + i)} />
                  </dt>
                  <dd className="text-leaf">
                    {/* The value lands as soon as its row is done. */}
                    <TypeText text={value} cps={60} phase={seq.at(S.inv + i) === 'done' ? 'done' : 'idle'} />
                  </dd>
                </div>
              ))}
            </dl>

            <hr className="my-6 border-line" />

            <p className="label">
              <TypeText text="Special move" cps={30} {...seq.props(S.moveLabel)} />
            </p>
            <p className="mt-3 text-xs uppercase leading-loose tracking-[0.08em]">
              <TypeText text="Give me a feature and I'll ship it end to end: code, tests, CI and deploy." cps={60} {...seq.props(S.move)} />
            </p>
          </div>
        </BuildFrame>

        <div className="mt-12 grid gap-8 text-xs uppercase leading-loose tracking-[0.06em] text-cream/80 md:grid-cols-2">
          {BIO.map((para, i) => (
            <p key={i}>
              <TypeText text={para} cps={160} {...seq.props(S.bio + i)} />
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
