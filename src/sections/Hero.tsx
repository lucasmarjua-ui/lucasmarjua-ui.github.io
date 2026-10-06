import { useEffect, useState } from 'react';
import { PopIn, TypeText, useBuild, useSequence } from '../build';
import { Icon } from '../components/Pixel';
import RoamingDog from '../components/RoamingDog';
import { CONTACTS } from '../data';
import { useSecrets } from '../secrets';

const NAME = 'Lucas Martinez';
const LINES = ['Junior software developer.', 'Web & mobile apps, built end to end.', 'Based in Manchester, UK.'];
const STEPS = 2 + LINES.length + 1; // name, lines, button, links
const BLOCKS = 20;
// Roughly how long the typing takes, used to run the percentage counter smoothly.
const INTRO_MS = 4200;
const SEEN_KEY = 'lm-intro-seen';

function introSeen() {
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

export default function Hero() {
  const [skipped, setSkipped] = useState(introSeen);
  const [started, setStarted] = useState(false);
  const { instant } = useBuild();
  const { unlock } = useSecrets();
  const seq = useSequence(STEPS, started, skipped);
  const done = seq.done;
  const [elapsed, setElapsed] = useState(0);
  const progress = done ? 100 : Math.min(99, Math.max(Math.round((seq.step / STEPS) * 100), Math.round((elapsed / INTRO_MS) * 100)));

  // A short "loading" beat before the builder starts typing.
  useEffect(() => {
    const t = window.setTimeout(() => setStarted(true), 500);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!started || done) return;
    const startedAt = performance.now();
    const id = window.setInterval(() => setElapsed(performance.now() - startedAt), 80);
    return () => window.clearInterval(id);
  }, [started, done]);

  useEffect(() => {
    if (done) {
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {
        // Ignore: the intro just replays next time.
      }
      return;
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSkipped(true);
        unlock('skip');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [done, unlock]);

  const filled = Math.round((progress / 100) * BLOCKS);

  return (
    <section id="top" className="relative flex min-h-[90svh] flex-col justify-center overflow-hidden pb-8 pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-center" aria-hidden="true">
        <span
          className={`px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.12em] ${
            done ? 'border border-line bg-well text-leaf' : 'bg-cream text-ink'
          }`}
        >
          {done ? (
            <span className="flex items-center gap-2">
              <span className="cursor-blink inline-block h-2 w-2 bg-leaf" />
              Open to junior roles
            </span>
          ) : started ? (
            `Building ${progress}%`
          ) : (
            'Loading…'
          )}
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-8">
        <h1
          className="text-[clamp(2.4rem,8vw,5.5rem)] uppercase leading-none tracking-[0.08em] text-cream"
          style={{ textShadow: '6px 6px 0 #2e302b' }}
        >
          <TypeText text={NAME} cps={11} {...seq.props(0)} />
        </h1>

        <p className="mt-8 max-w-2xl text-sm uppercase leading-loose tracking-[0.12em] text-cream/90 sm:text-base">
          {LINES.map((line, i) => (
            <span key={line} className="block">
              <TypeText text={line} cps={40} {...seq.props(1 + i)} />
            </span>
          ))}
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-6">
          <PopIn {...seq.props(1 + LINES.length)}>
            <a href="#projects" className="btn btn-primary">
              See projects <Icon name="arrowDown" />
            </a>
          </PopIn>
          <PopIn {...seq.props(2 + LINES.length)}>
            <ul className="flex flex-wrap gap-6 text-[0.7rem] uppercase tracking-[0.12em] text-muted">
              {CONTACTS.map((c) => (
                <li key={c.label}>
                  <a
                    href={c.href}
                    {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="transition-colors hover:text-cream"
                  >
                    {c.label}
                  </a>
                </li>
              ))}
            </ul>
          </PopIn>
        </div>

        <div className="mt-16 flex gap-1" aria-hidden="true">
          {Array.from({ length: BLOCKS }, (_, i) => (
            <span key={i} className={`h-1.5 flex-1 ${i < filled ? 'bg-cream/80' : 'bg-line/60'}`} />
          ))}
        </div>

        <div className="relative mt-6 h-16" role="group" aria-label="Pixel dogs">
          <RoamingDog top="0px" start={0.15} />
          <RoamingDog top="12px" start={0.7} speed={0.7} />
        </div>
      </div>

      {!done && !instant && (
        <button
          type="button"
          onClick={() => setSkipped(true)}
          className="absolute bottom-8 right-4 flex items-center gap-3 border-2 border-cream/70 px-4 py-2 text-[0.65rem] uppercase tracking-[0.12em] text-cream/80 hover:text-cream sm:right-8"
        >
          Skip intro <kbd className="border border-cream/70 px-1.5 py-0.5 text-[0.6rem]">Esc</kbd>
        </button>
      )}
    </section>
  );
}
