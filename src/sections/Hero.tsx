import { useEffect, useState } from 'react';
import { Icon } from '../components/Pixel';
import RoamingDog from '../components/RoamingDog';
import { CONTACTS } from '../data';
import { useSecrets } from '../secrets';

const NAME = 'Lucas Martinez';
const INTRO_MS = 2000;
const BLOCKS = 20;
const SEEN_KEY = 'lm-intro-seen';

function introAlreadyDone() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  try {
    return sessionStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
}

export default function Hero() {
  const [progress, setProgress] = useState(() => (introAlreadyDone() ? 100 : 0));
  const { unlock } = useSecrets();
  const done = progress >= 100;

  useEffect(() => {
    if (done) {
      try {
        sessionStorage.setItem(SEEN_KEY, '1');
      } catch {
        // Ignore: the intro just replays next time.
      }
      return;
    }
    const startedAt = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(100, Math.round(((now - startedAt) / INTRO_MS) * 100));
      setProgress(p);
      if (p < 100) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        cancelAnimationFrame(raf);
        setProgress(100);
        unlock('skip');
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const typed = NAME.slice(0, Math.ceil((Math.min(progress, 70) / 70) * NAME.length));
  const filled = Math.round((progress / 100) * BLOCKS);
  const showRest = progress >= 70;

  return (
    <section id="top" className="relative flex min-h-[90svh] flex-col justify-center overflow-hidden pb-8 pt-32">
      <div className="pointer-events-none absolute inset-x-0 top-24 flex justify-center" aria-live="polite">
        <span
          className={`px-3 py-1.5 text-[0.65rem] uppercase tracking-[0.06em] ${
            done ? 'border border-line bg-well text-leaf' : 'bg-cream text-ink'
          }`}
        >
          {done ? (
            <span className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 bg-leaf cursor-blink" aria-hidden="true" />
              Open to junior roles
            </span>
          ) : (
            `Building ${progress}%`
          )}
        </span>
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 sm:px-8">
        <h1
          className="min-h-[1.2em] text-[clamp(2.4rem,8vw,5.5rem)] uppercase leading-none tracking-[0.08em] text-cream"
          style={{ textShadow: '6px 6px 0 #2e302b' }}
          aria-label={NAME}
        >
          <span aria-hidden="true">
            {typed}
            {!done && <span className="cursor-blink">_</span>}
          </span>
        </h1>

        <div className={`transition-opacity duration-300 ${showRest ? 'opacity-100' : 'opacity-0'}`}>
          <p className="mt-8 max-w-2xl text-sm uppercase leading-loose tracking-[0.06em] text-cream/90 sm:text-base">
            Junior software developer.
            <br />
            Web &amp; mobile apps, built end to end.
            <br />
            Based in Manchester, UK.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <a href="#projects" className="btn btn-primary">
              See projects <Icon name="arrowDown" />
            </a>
            <ul className="flex flex-wrap gap-6 text-[0.7rem] uppercase tracking-[0.06em] text-muted">
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
          </div>
        </div>

        <div className="mt-16 flex gap-1" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100} aria-label="Building the site">
          {Array.from({ length: BLOCKS }, (_, i) => (
            <span key={i} className={`h-1.5 flex-1 ${i < filled ? 'bg-cream/80' : 'bg-line/60'}`} />
          ))}
        </div>

        <div className="relative mt-6 h-16" aria-label="Pixel dogs" role="group">
          <RoamingDog top="0px" start={0.15} />
          <RoamingDog top="12px" start={0.7} speed={0.7} />
        </div>
      </div>

      {!done && (
        <button
          type="button"
          onClick={() => {
            setProgress(100);
          }}
          className="absolute bottom-8 right-4 flex items-center gap-3 border-2 border-cream/70 px-4 py-2 text-[0.65rem] uppercase tracking-[0.06em] text-cream/80 hover:text-cream sm:right-8"
        >
          Skip intro <kbd className="border border-cream/70 px-1.5 py-0.5 text-[0.6rem]">Esc</kbd>
        </button>
      )}
    </section>
  );
}
