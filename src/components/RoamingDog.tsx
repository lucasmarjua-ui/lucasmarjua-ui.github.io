import { useEffect, useRef, useState } from 'react';
import { Dog } from './Pixel';
import { useSecrets } from '../secrets';

const STEP = 6;
const TICK = 140;
const DOG_WIDTH = 64;

const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function RoamingDog({ top, start = 0.2, speed = 1 }: { top: string; start?: number; speed?: number }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [pose, setPose] = useState({ x: 0, dir: 1, frame: 0 });
  const [barking, setBarking] = useState(false);
  const { unlock } = useSecrets();

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const state = { x: Math.round(parent.clientWidth * start), dir: 1, frame: 0 };
    setPose({ ...state });
    if (prefersReducedMotion()) return;

    const id = window.setInterval(() => {
      const max = parent.clientWidth - DOG_WIDTH;
      // Occasionally turn around on a whim, always at the edges.
      if (Math.random() < 0.01) state.dir = -state.dir;
      if (state.x + state.dir * STEP * speed > max) state.dir = -1;
      if (state.x + state.dir * STEP * speed < 0) state.dir = 1;
      state.x += state.dir * STEP * speed;
      state.frame += 1;
      setPose({ ...state });
    }, TICK);
    return () => window.clearInterval(id);
  }, [start, speed]);

  useEffect(() => {
    if (!barking) return;
    const t = window.setTimeout(() => setBarking(false), 1200);
    return () => window.clearTimeout(t);
  }, [barking]);

  return (
    <button
      ref={ref}
      type="button"
      aria-label="Pet the pixel dog"
      onClick={() => {
        setBarking(true);
        unlock('dog');
      }}
      className="absolute z-10 cursor-pointer"
      style={{ top, left: 0, transform: `translateX(${pose.x}px)` }}
    >
      {barking && (
        <span className="absolute -top-7 left-1/2 -translate-x-1/2 whitespace-nowrap bg-cream px-2 py-1 text-[0.6rem] text-ink">
          Woof!
        </span>
      )}
      <Dog frame={pose.frame} size={4} style={{ transform: pose.dir < 0 ? 'scaleX(-1)' : undefined }} />
    </button>
  );
}
