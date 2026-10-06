import { useRef } from 'react';
import { BuildFrame, PopIn, TypeText, useDelayed, useInView, useSequence } from '../build';
import SectionTitle from '../components/SectionTitle';
import { SKILLS } from '../data';

function SkillCard({ skill, index }: { skill: (typeof SKILLS)[number]; index: number }) {
  const ref = useRef<HTMLLIElement>(null);
  const seq = useSequence(5, useDelayed(useInView(ref), (index % 3) * 250));

  return (
    <li ref={ref}>
      <BuildFrame {...seq.props(0)} className="panel flex h-full flex-col p-6">
        <span className="text-[0.65rem] tracking-[0.12em] text-ember">
          <TypeText text={String(index + 1).padStart(2, '0')} cps={20} {...seq.props(1)} />
        </span>
        <h3 className="mt-3 text-sm uppercase tracking-[0.12em]">
          <TypeText text={skill.name} cps={30} {...seq.props(2)} />
        </h3>
        <p className="mt-4 flex-1 text-[0.7rem] uppercase leading-loose tracking-[0.05em] text-cream/75">
          <TypeText text={skill.description} cps={110} {...seq.props(3)} />
        </p>
        <PopIn {...seq.props(4)}>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${skill.name} tools`}>
            {skill.stack.map((t) => (
              <li key={t} className="tag">
                {t}
              </li>
            ))}
          </ul>
        </PopIn>
      </BuildFrame>
    </li>
  );
}

export default function Skills() {
  return (
    <section aria-labelledby="skills" className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20">
      <SectionTitle id="skills" sub="What I reach for, and where I've used it.">
        Skill tree
      </SectionTitle>
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SKILLS.map((skill, i) => (
          <SkillCard key={skill.name} skill={skill} index={i} />
        ))}
      </ul>
    </section>
  );
}
