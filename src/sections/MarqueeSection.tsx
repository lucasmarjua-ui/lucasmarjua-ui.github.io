import { useEffect, useRef } from 'react';
import PlaceholderImage from '../components/PlaceholderImage';

import onedayStart from '../assets/screenshots/oneday-start.webp';
import onedayDayLoop from '../assets/screenshots/oneday-day-loop.webp';
import retrogamesCabinetSelect from '../assets/screenshots/retrogames-cabinet-select.webp';
import retrogamesLeaderboard from '../assets/screenshots/retrogames-leaderboard.webp';
import mastercinemaTrivia from '../assets/screenshots/mastercinema-trivia.webp';
import mastercinemaResults from '../assets/screenshots/mastercinema-results.webp';

type Shot = { src: string; alt: string } | { label: string };

const PROJECT_SHOTS: Shot[] = [
  { src: onedayStart, alt: 'OneDay era-selection start screen' },
  { label: 'PawMatch — match feed' },
  { src: retrogamesCabinetSelect, alt: 'RetroGames cabinet-selection screen' },
  { src: mastercinemaTrivia, alt: 'MasterCinema trivia round' },
  { label: 'Antonio Valencia Estilistas — booking' },
  { label: 'Trivia (Unity) — gameplay' },
  { src: onedayDayLoop, alt: 'OneDay day loop with the recurring NPC Kleon' },
  { label: 'PawMatch — profile' },
  { src: retrogamesLeaderboard, alt: 'RetroGames Hall of Fame leaderboard' },
  { src: mastercinemaResults, alt: 'MasterCinema trivia results screen' },
];

const half = Math.ceil(PROJECT_SHOTS.length / 2);
const row1 = Array(3).fill(PROJECT_SHOTS.slice(0, half)).flat();
const row2 = Array(3).fill(PROJECT_SHOTS.slice(half)).flat();

function MarqueeTile({ shot }: { shot: Shot }) {
  const className = 'h-[270px] w-[420px] shrink-0 rounded-2xl';
  if ('src' in shot) {
    return <img src={shot.src} alt={shot.alt} className={`${className} block object-cover`} loading="lazy" />;
  }
  return <PlaceholderImage label={shot.label} className={className} />;
}

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
          {row1.map((shot, i) => (
            <MarqueeTile key={`row1-${i}`} shot={shot} />
          ))}
        </div>
        <div ref={row2Ref} className="flex gap-3" style={{ willChange: 'transform' }}>
          {row2.map((shot, i) => (
            <MarqueeTile key={`row2-${i}`} shot={shot} />
          ))}
        </div>
      </div>
    </section>
  );
}
