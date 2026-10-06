import { useRef } from 'react';
import { PopIn, TypeText, useInView, useSequence } from '../build';
import { Icon } from '../components/Pixel';
import SectionTitle from '../components/SectionTitle';
import { LOG } from '../data';

function Entry({ entry, first }: { entry: (typeof LOG)[number]; first: boolean }) {
  const ref = useRef<HTMLLIElement>(null);
  const seq = useSequence(4, useInView(ref));

  return (
    <li ref={ref} className="relative pb-10 pl-8 last:pb-0">
      <PopIn {...seq.props(0)}>
        <span className={`absolute -left-[7px] top-1 h-3 w-3 ${first ? 'bg-leaf' : 'bg-cream/70'}`} aria-hidden="true" />
      </PopIn>
      <p className="label">
        <TypeText text={entry.date} cps={40} {...seq.props(1)} />
      </p>
      <h3 className="mt-2 text-sm uppercase tracking-[0.12em]">
        <a href={entry.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-leaf">
          <TypeText text={entry.title} cps={40} {...seq.props(2)} />
          {seq.at(2) === 'done' && <Icon name="arrowUpRight" />}
        </a>
      </h3>
      <p className="mt-3 max-w-2xl text-[0.7rem] uppercase leading-loose tracking-[0.06em] text-cream/75">
        <TypeText text={entry.body} cps={120} {...seq.props(3)} />
      </p>
    </li>
  );
}

export default function Log() {
  return (
    <section aria-labelledby="log" className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20">
      <SectionTitle id="log" sub="What I've shipped, newest first.">
        Log
      </SectionTitle>
      <ol className="border-l-2 border-line">
        {LOG.map((entry, i) => (
          <Entry key={entry.title} entry={entry} first={i === 0} />
        ))}
      </ol>
    </section>
  );
}
