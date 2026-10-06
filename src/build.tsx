import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from 'react';
import { createPortal } from 'react-dom';
import { DOG_FRAMES, PixelArt } from './components/Pixel';

// "Build" animations: sections assemble themselves when they scroll into view.
// A builder dog flies to whatever is being built and leaves a trail of green pixels.

export type Phase = 'idle' | 'active' | 'done';

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

interface BuildState {
  instant: boolean;
  point: (x: number, y: number) => void;
}

const BuildContext = createContext<BuildState>({ instant: false, point: () => {} });

export const useBuild = () => useContext(BuildContext);

export function BuildProvider({ children }: { children: ReactNode }) {
  const [instant] = useState(prefersReducedMotion);
  const layer = useRef<BuilderHandle>(null);
  const point = useCallback((x: number, y: number) => layer.current?.moveTo(x, y), []);
  const value = useMemo(() => ({ instant, point }), [instant, point]);

  return (
    <BuildContext.Provider value={value}>
      {children}
      {!instant && <Builder handle={layer} />}
    </BuildContext.Provider>
  );
}

// --- Builder dog -----------------------------------------------------------

interface BuilderHandle {
  moveTo: (x: number, y: number) => void;
}

const DOG_PALETTE = { o: '#e5804f', d: '#9a4f2c', k: '#141412', w: '#f3d9b8' };

function Builder({ handle }: { handle: RefObject<BuilderHandle> }) {
  const dogRef = useRef<HTMLDivElement>(null);
  const [frame, setFrame] = useState(0);
  const state = useRef({ x: -100, y: -100, lastTrail: 0, hideTimer: 0, facing: 1 });

  useEffect(() => {
    const id = window.setInterval(() => setFrame((f) => f + 1), 160);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    (handle as { current: BuilderHandle | null }).current = {
      moveTo(clientX, clientY) {
        const dog = dogRef.current;
        if (!dog) return;
        const s = state.current;
        // Page coordinates, so the dog stays put while the page scrolls.
        const x = clientX + window.scrollX - 30;
        const y = clientY + window.scrollY - 52;
        if (Math.abs(x - s.x) > 2) s.facing = x > s.x ? 1 : -1;
        s.x = x;
        s.y = y;
        dog.style.opacity = '1';
        dog.style.transform = `translate(${x}px, ${y}px)`;
        (dog.firstElementChild as HTMLElement).style.transform = s.facing < 0 ? 'scaleX(-1)' : '';

        const now = performance.now();
        if (now - s.lastTrail > 45) {
          s.lastTrail = now;
          spawnTrail(x + 30, y + 46);
        }
        window.clearTimeout(s.hideTimer);
        s.hideTimer = window.setTimeout(() => {
          dog.style.opacity = '0';
        }, 1600);
      },
    };
  }, [handle]);

  return createPortal(
    <div
      ref={dogRef}
      aria-hidden="true"
      className="pointer-events-none absolute left-0 top-0 z-30"
      style={{ opacity: 0, transition: 'transform 220ms steps(4), opacity 300ms steps(3)' }}
    >
      <div style={{ animation: 'bob 0.6s steps(2) infinite' }}>
        <PixelArt rows={DOG_FRAMES[frame % 2]} palette={DOG_PALETTE} size={4} />
      </div>
    </div>,
    document.body,
  );
}

function spawnTrail(x: number, y: number) {
  for (let i = 0; i < 2; i++) {
    const px = document.createElement('span');
    px.className = 'trail-pixel';
    px.style.left = `${x + (Math.random() - 0.5) * 24}px`;
    px.style.top = `${y + Math.random() * 10}px`;
    px.addEventListener('animationend', () => px.remove());
    document.body.appendChild(px);
  }
}

// --- Hooks -----------------------------------------------------------------

export function useInView<T extends Element>(ref: RefObject<T>, margin = '0px 0px -15% 0px') {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || inView) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Also start anything already scrolled past (fast scrolls, anchor jumps).
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: margin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, margin, inView]);
  return inView;
}

/** Runs `count` build steps one after another once `started` is true. */
export function useSequence(count: number, started: boolean, skip = false) {
  const { instant } = useBuild();
  const [step, setStep] = useState(instant ? count : 0);

  useEffect(() => {
    if (skip || instant) setStep(count);
  }, [skip, instant, count]);

  const next = useCallback((k: number) => setStep((s) => (s === k ? s + 1 : s)), []);
  const at = (k: number): Phase => (step > k ? 'done' : started && step === k ? 'active' : 'idle');
  const props = (k: number) => ({ phase: at(k), onDone: () => next(k) });

  return { step, at, props, done: step >= count };
}

/** Flips to true `delay` ms after `flag` does, to stagger neighbouring builds. */
export function useDelayed(flag: boolean, delay: number) {
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!flag) return;
    const t = window.setTimeout(() => setOn(true), delay);
    return () => window.clearTimeout(t);
  }, [flag, delay]);
  return on;
}

function useLatest<T>(value: T) {
  const ref = useRef(value);
  ref.current = value;
  return ref;
}

// --- TypeText ----------------------------------------------------------------

const GLITCH = '#%&*+=?<>/$@';

/** Types its text letter by letter with a glitching green cursor glyph. */
export function TypeText({
  text,
  phase,
  onDone,
  cps = 45,
  className,
}: {
  text: string;
  phase: Phase;
  onDone?: () => void;
  cps?: number;
  className?: string;
}) {
  const [n, setN] = useState(0);
  const [glyph, setGlyph] = useState('#');
  const holder = useRef<HTMLSpanElement>(null);
  const onDoneRef = useLatest(onDone);
  const { point } = useBuild();
  const chars = useMemo(() => Array.from(text), [text]);

  useEffect(() => {
    if (phase !== 'active') return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setN(i);
      setGlyph(GLITCH[Math.floor(Math.random() * GLITCH.length)]);
      const span = holder.current?.children[Math.min(i, chars.length - 1)] as HTMLElement | undefined;
      if (span) {
        const r = span.getBoundingClientRect();
        point(r.left, r.top);
      }
      if (i >= chars.length) {
        window.clearInterval(id);
        onDoneRef.current?.();
      }
    }, 1000 / cps);
    return () => window.clearInterval(id);
  }, [phase, chars, cps, point, onDoneRef]);

  if (phase === 'done') return <span className={className}>{text}</span>;

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={holder} aria-hidden="true">
        {chars.map((c, i) => {
          const shown = phase === 'active' && i < n;
          const cursor = phase === 'active' && i === n && c !== ' ';
          if (!cursor) {
            return (
              <span key={i} style={shown ? undefined : { visibility: 'hidden' }}>
                {c}
              </span>
            );
          }
          return (
            <span key={i} className="relative">
              <span style={{ visibility: 'hidden' }}>{c}</span>
              <span className="absolute left-0 top-0 text-leaf">{glyph}</span>
            </span>
          );
        })}
      </span>
    </span>
  );
}

// --- BuildFrame ----------------------------------------------------------------

/** A panel whose outline draws itself: across first, then down. */
export function BuildFrame({
  phase,
  onDone,
  className = '',
  style,
  children,
}: {
  phase: Phase;
  onDone?: () => void;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onDoneRef = useLatest(onDone);
  const { point } = useBuild();

  useEffect(() => {
    if (phase !== 'active') return;
    const el = ref.current;
    if (el) {
      const r = el.getBoundingClientRect();
      point(r.left + r.width / 2, r.top);
    }
    const t = window.setTimeout(() => onDoneRef.current?.(), 650);
    return () => window.clearTimeout(t);
  }, [phase, point, onDoneRef]);

  return (
    <div
      ref={ref}
      className={`${className} ${phase === 'active' ? 'frame-building' : ''}`}
      style={{ ...style, visibility: phase === 'idle' ? 'hidden' : undefined }}
    >
      {children}
    </div>
  );
}

// --- PixelCover ----------------------------------------------------------------

/** Covers its content with a grid of blocks that drop away in random order. */
export function PixelCover({
  phase,
  onDone,
  cols = 12,
  rows = 8,
  duration = 700,
  className = '',
  children,
}: {
  phase: Phase;
  onDone?: () => void;
  cols?: number;
  rows?: number;
  duration?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onDoneRef = useLatest(onDone);
  const { point } = useBuild();
  const delays = useMemo(
    () => Array.from({ length: cols * rows }, () => Math.round(Math.random() * duration)),
    [cols, rows, duration],
  );

  useEffect(() => {
    if (phase !== 'active') return;
    const el = ref.current;
    const started = performance.now();
    const id = window.setInterval(() => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const p = Math.min(1, (performance.now() - started) / duration);
      point(r.left + r.width * p, r.top + r.height * (0.3 + 0.4 * Math.sin(p * Math.PI * 3)));
    }, 90);
    const t = window.setTimeout(() => {
      window.clearInterval(id);
      onDoneRef.current?.();
    }, duration + 120);
    return () => {
      window.clearInterval(id);
      window.clearTimeout(t);
    };
  }, [phase, duration, point, onDoneRef]);

  return (
    <div ref={ref} className={`relative ${className}`}>
      {children}
      {phase !== 'done' && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 grid"
          style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}
        >
          {delays.map((d, i) => (
            <span
              key={i}
              className="pixel-cell"
              style={phase === 'active' ? { animation: `pixel-out 80ms steps(1) ${d}ms forwards` } : undefined}
            />
          ))}
        </div>
      )}
    </div>
  );
}

/** Fades a block of content in with a quick pixel step once it is reached. */
export function PopIn({ phase, onDone, children, className = '' }: { phase: Phase; onDone?: () => void; children: ReactNode; className?: string }) {
  const onDoneRef = useLatest(onDone);
  useEffect(() => {
    if (phase !== 'active') return;
    const t = window.setTimeout(() => onDoneRef.current?.(), 220);
    return () => window.clearTimeout(t);
  }, [phase, onDoneRef]);
  return (
    <div className={`${className} ${phase === 'active' ? 'pop-in' : ''}`} style={{ visibility: phase === 'idle' ? 'hidden' : undefined }}>
      {children}
    </div>
  );
}
