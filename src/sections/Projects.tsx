import { useState } from 'react';
import { Icon } from '../components/Pixel';
import Reveal from '../components/Reveal';
import SectionTitle from '../components/SectionTitle';
import { PROJECTS, type Project } from '../data';

function ProjectCard({ project }: { project: Project }) {
  const [shot, setShot] = useState(0);
  const current = project.shots[shot];
  const step = (delta: number) => setShot((s) => (s + delta + project.shots.length) % project.shots.length);

  return (
    <article className="panel flex h-full flex-col p-3 sm:p-4">
      <div className="relative aspect-[16/10] overflow-hidden border border-line bg-well">
        <img
          src={current.src}
          alt={current.alt}
          loading="lazy"
          className={`h-full w-full ${current.contain ? 'object-contain py-3' : 'object-cover'}`}
          style={{ objectPosition: current.position ?? 'center' }}
        />
        <div className="absolute bottom-2 right-2 flex gap-1">
          <button type="button" onClick={() => step(-1)} className="bg-ink/90 p-2 text-cream hover:bg-cream hover:text-ink" aria-label={`Previous ${project.name} screenshot`}>
            <Icon name="arrowLeft" />
          </button>
          <span className="flex items-center bg-ink/90 px-2 text-[0.6rem] text-muted" aria-live="polite">
            {shot + 1}/{project.shots.length}
          </span>
          <button type="button" onClick={() => step(1)} className="bg-ink/90 p-2 text-cream hover:bg-cream hover:text-ink" aria-label={`Next ${project.name} screenshot`}>
            <Icon name="arrowRight" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-1 pb-2 pt-6 sm:px-2">
        <h3 className="text-lg uppercase tracking-[0.06em]">{project.name}</h3>
        <p className="mt-4 text-xs uppercase leading-loose tracking-[0.06em] text-cream/80">{project.tagline}</p>
        <p className="mt-4 text-xs uppercase tracking-[0.08em] text-leaf">{project.stat}</p>
        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.name} tech stack`}>
          {project.stack.map((t) => (
            <li key={t} className="tag">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex flex-wrap gap-6 pt-6 text-xs uppercase tracking-[0.05em]">
          {project.live && (
            <a href={project.live} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2">
              Play it <Icon name="arrowUpRight" />
            </a>
          )}
          <a href={project.code} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2">
            Code <Icon name="arrowUpRight" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section aria-labelledby="projects" className="mx-auto max-w-6xl px-4 py-16 sm:px-8 sm:py-20">
      <SectionTitle id="projects" sub="Every one designed, coded, tested and shipped by me. Most are live and playable right now.">
        Projects
      </SectionTitle>
      <div className="grid gap-8 md:grid-cols-2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 120} className="h-full">
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
