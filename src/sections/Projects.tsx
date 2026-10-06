import { useRef, useState } from 'react';
import { BuildFrame, PixelCover, PopIn, TypeText, useDelayed, useInView, useSequence } from '../build';
import { Icon } from '../components/Pixel';
import SectionTitle from '../components/SectionTitle';
import { PROJECTS, type Project } from '../data';

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const seq = useSequence(7, useDelayed(inView, (index % 2) * 350));
  const [shot, setShot] = useState(0);
  const current = project.shots[shot];
  const step = (delta: number) => setShot((s) => (s + delta + project.shots.length) % project.shots.length);

  return (
    <article ref={ref} className="h-full">
      <BuildFrame {...seq.props(0)} className="panel flex h-full flex-col p-3 sm:p-4">
        <PixelCover {...seq.props(1)} className="aspect-[16/10] overflow-hidden border border-line bg-well">
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
        </PixelCover>

        <div className="flex flex-1 flex-col px-1 pb-2 pt-6 sm:px-2">
          <h3 className="text-lg uppercase tracking-[0.12em]">
            <TypeText text={project.name} cps={18} {...seq.props(2)} />
          </h3>
          <p className="mt-4 text-xs uppercase leading-loose tracking-[0.06em] text-cream/80">
            <TypeText text={project.tagline} cps={90} {...seq.props(3)} />
          </p>
          <p className="mt-4 text-xs uppercase tracking-[0.08em] text-leaf">
            <TypeText text={project.stat} cps={45} {...seq.props(4)} />
          </p>
          <PopIn {...seq.props(5)}>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.name} tech stack`}>
              {project.stack.map((t) => (
                <li key={t} className="tag">
                  {t}
                </li>
              ))}
            </ul>
          </PopIn>
          <PopIn {...seq.props(6)} className="mt-auto">
            <div className="flex flex-wrap gap-6 pt-6 text-xs uppercase tracking-[0.1em]">
              {project.live && (
                <a href={project.live} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2">
                  Play it <Icon name="arrowUpRight" />
                </a>
              )}
              <a href={project.code} target="_blank" rel="noopener noreferrer" className="link-underline inline-flex items-center gap-2">
                Code <Icon name="arrowUpRight" />
              </a>
            </div>
          </PopIn>
        </div>
      </BuildFrame>
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
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
