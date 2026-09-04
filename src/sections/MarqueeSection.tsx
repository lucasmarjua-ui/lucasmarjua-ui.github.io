import { useEffect, useRef } from 'react';
import PlaceholderImage from '../components/PlaceholderImage';

const PROJECT_SHOTS = [
  'OneDay — start screen',
  'PawMatch — match feed',
  'RetroGames — cabinet select',
  'MasterCinema — trivia round',
  'Antonio Valencia Estilistas — booking',
  'Trivia (Unity) — gameplay',
  'OneDay — day loop',
  'PawMatch — profile',
  'RetroGames — leaderboard',
  'MasterCinema — results',
];

const half = Math.ceil(PROJECT_SHOTS.length / 2);
const row1 = Array(3).fill(PROJECT_SHOTS.slice(0, half)).flat();
const row2 = Array(3).fill(PROJECT_SHOTS.slice(half)).flat();

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const row1Ref = useRef<HTMLDivElement>(null);
  const row2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const offset = (window.scrollY - sectionTop + window.innerHeight) * 0.3;

      if (row1Ref.current) {
        row1Ref.current.style.transform = `translateX(${offset - 200}px)`;
      }
      if (row2Ref.current) {
        row2Ref.current.style.transform = `translateX(${-(offset - 200)}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} className="overflow-hidden bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40">
      <div className="flex flex-col gap-3">
        <div ref={row1Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
          {row1.map((label, i) => (
            <PlaceholderImage
              key={`row1-${i}`}
              label={label}
              className="h-[270px] w-[420px] shrink-0 rounded-2xl"
            />
          ))}
        </div>
        <div ref={row2Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
          {row2.map((label, i) => (
            <PlaceholderImage
              key={`row2-${i}`}
              label={label}
              className="h-[270px] w-[420px] shrink-0 rounded-2xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
