import { useEffect, useRef, useState, type FormEvent } from 'react';
import { useBuild, useInView } from '../build';
import RoamingDog from '../components/RoamingDog';
import SectionTitle from '../components/SectionTitle';
import { GITHUB_USER } from '../data';

type Day = { date: string; count: number; level: number };
type Year = { total: number; days: Day[] };
type Load = { status: 'loading' } | { status: 'error' } | { status: 'ok'; year: Year };

const LEVEL_COLORS = ['#1c1d1a', '#14532d', '#1d7a3f', '#2bb05a', '#4ade80'];
const HANDLE = /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i;

async function fetchYear(user: string): Promise<Year> {
  const res = await fetch(`https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(user)}?y=last`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const data = (await res.json()) as { total: Record<string, number>; contributions: Day[] };
  return { total: data.total.lastYear ?? 0, days: data.contributions };
}

function useYear(user: string | null): Load | null {
  const [state, setState] = useState<Load | null>(null);
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    setState({ status: 'loading' });
    fetchYear(user)
      .then((year) => !cancelled && setState({ status: 'ok', year }))
      .catch(() => !cancelled && setState({ status: 'error' }));
    return () => {
      cancelled = true;
    };
  }, [user]);
  return state;
}

function Grid({ load, label, start }: { load: Load; label: string; start: boolean }) {
  const { instant, point } = useBuild();
  const gridRef = useRef<HTMLDivElement>(null);
  const [lit, setLit] = useState(instant ? Infinity : 0);
  const ready = load.status === 'ok' && start;

  // Light the grid up one week (column) at a time, with the builder dog painting it.
  useEffect(() => {
    if (!ready || lit === Infinity) return;
    let col = 0;
    const id = window.setInterval(() => {
      col += 1;
      setLit(col);
      const cell = gridRef.current?.children[Math.min(col * 7, gridRef.current.children.length - 1)] as HTMLElement | undefined;
      if (cell) {
        const r = cell.getBoundingClientRect();
        point(r.left, r.top + 30);
      }
      if (col > 54) {
        window.clearInterval(id);
        setLit(Infinity);
      }
    }, 28);
    return () => window.clearInterval(id);
  }, [ready]);

  // Pad the first week so rows line up with weekdays (Sunday on top), like GitHub.
  const days = load.status === 'ok' ? load.year.days : [];
  const pad = days.length ? new Date(`${days[0].date}T00:00:00`).getDay() : 0;
  const cells: (Day | null)[] = load.status === 'ok' ? [...Array(pad).fill(null), ...days] : Array(371).fill(null);

  return (
    <div className="overflow-x-auto pb-2">
      <div
        ref={gridRef}
        className="grid w-max grid-flow-col grid-rows-7 gap-[3px]"
        role="img"
        aria-label={load.status === 'ok' ? `${label}: ${load.year.total} contributions in the last year` : `${label}: loading`}
      >
        {cells.map((day, i) => (
          <span
            key={i}
            title={day ? `${day.count} on ${day.date}` : undefined}
            className={`h-[11px] w-[11px] sm:h-[14px] sm:w-[14px] ${load.status === 'loading' ? 'animate-pulse' : ''}`}
            style={{ background: day ? LEVEL_COLORS[Math.floor(i / 7) < lit ? day.level : 0] ?? LEVEL_COLORS[0] : load.status === 'ok' ? 'transparent' : LEVEL_COLORS[0] }}
          />
        ))}
      </div>
    </div>
  );
}

function Caption({ load, user }: { load: Load; user: string }) {
  return (
    <p className="mt-4 text-[0.65rem] uppercase tracking-[0.05em] text-muted">
      <a href={`https://github.com/${user}`} target="_blank" rel="noopener noreferrer" className="text-cream hover:text-leaf">
        @{user}
      </a>{' '}
      ·{' '}
      {load.status === 'ok' && `${load.year.total.toLocaleString('en-GB')} contributions in the last year`}
      {load.status === 'loading' && 'counting blocks…'}
      {load.status === 'error' && "couldn't load the blocks right now"}
    </p>
  );
}

export default function Contributions() {
  const mine = useYear(GITHUB_USER);
  const [input, setInput] = useState('');
  const [rival, setRival] = useState<string | null>(null);
  const [error, setError] = useState('');
  const theirs = useYear(rival);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const handle = input.trim().replace(/^@/, '');
    if (!HANDLE.test(handle)) {
      setError('That does not look like a GitHub handle.');
      return;
    }
    setError('');
    setRival(handle);
  };

  return (
    <section aria-labelledby="blocks" className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20">
      <SectionTitle id="blocks" sub="Every day I committed is a block. The greener, the more I shipped.">
        A year in blocks
      </SectionTitle>

      <div ref={ref}>
        <div className="relative h-14">
          <RoamingDog top="8px" start={0.4} speed={0.8} />
        </div>
        {mine && <Grid load={mine} label={`@${GITHUB_USER}`} start={inView} />}
        {mine && <Caption load={mine} user={GITHUB_USER} />}

        {theirs && rival && (
          <div className="mt-10">
            <Grid load={theirs} label={`@${rival}`} start />
            <Caption load={theirs} user={rival} />
          </div>
        )}

        <form onSubmit={onSubmit} className="mt-12 max-w-lg">
          <label htmlFor="rival" className="label text-cream">
            Put your year next to mine
          </label>
          <div className="mt-4 flex border-2 border-cream/80 bg-well">
            <input
              id="rival"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="@ GitHub handle"
              autoComplete="off"
              spellCheck={false}
              className="min-w-0 flex-1 bg-transparent px-4 py-3 text-xs uppercase tracking-[0.08em] text-cream placeholder:text-muted focus:outline-none"
            />
            <button type="submit" className="border-l-2 border-cream/80 bg-panel px-5 text-xs uppercase tracking-[0.05em] text-cream hover:bg-cream hover:text-ink">
              Compare
            </button>
          </div>
          {error && (
            <p role="alert" className="mt-3 text-[0.65rem] uppercase tracking-[0.08em] text-ember">
              {error}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
