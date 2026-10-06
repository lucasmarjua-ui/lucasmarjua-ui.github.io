import { Icon } from '../components/Pixel';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import { LOG } from '../data';

export default function Log() {
  return (
    <section aria-labelledby="log" className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20">
      <SectionTitle id="log" sub="What I've shipped, newest first.">
        Log
      </SectionTitle>
      <ol className="border-l-2 border-line">
        {LOG.map((entry, i) => (
          <li key={entry.title} className="relative pb-10 pl-8 last:pb-0">
            <span className={`absolute -left-[7px] top-1 h-3 w-3 ${i === 0 ? 'bg-leaf' : 'bg-cream/70'}`} aria-hidden="true" />
            <Reveal>
              <p className="label">{entry.date}</p>
              <h3 className="mt-2 text-sm uppercase tracking-[0.06em]">
                <a href={entry.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-leaf">
                  {entry.title} <Icon name="arrowUpRight" />
                </a>
              </h3>
              <p className="mt-3 max-w-2xl text-[0.7rem] uppercase leading-loose tracking-[0.06em] text-cream/75">{entry.body}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </section>
  );
}
