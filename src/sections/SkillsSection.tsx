import FadeIn from '../components/FadeIn';

const SKILLS = [
  {
    number: '01',
    name: 'Web Development',
    description:
      'Responsive, accessible web apps in modern JavaScript and TypeScript — from zero-dependency vanilla builds to React components bundled with Vite.',
    stack: ['JavaScript', 'TypeScript', 'React', 'HTML', 'CSS', 'Tailwind'],
  },
  {
    number: '02',
    name: 'Mobile Development',
    description:
      'Cross-platform apps with Flutter, structured in layers (models, services, providers, screens) so the backend can be swapped without touching the UI.',
    stack: ['Flutter', 'Dart', 'Provider'],
  },
  {
    number: '03',
    name: 'Backend & Data',
    description:
      'Authentication, cloud saves and live leaderboards on Firebase, protected by Firestore security rules — plus SQL and Node.js fundamentals.',
    stack: ['Firebase', 'Firestore', 'Node.js', 'SQL'],
  },
  {
    number: '04',
    name: 'Game Development',
    description:
      'Browser games on the Canvas API and data-driven game engines where new content is a JSON file away, plus Unity projects in C#.',
    stack: ['Canvas API', 'Unity', 'C#'],
  },
  {
    number: '05',
    name: 'Testing & Delivery',
    description:
      'Unit tests for game logic and data, CI on every push, and automatic deploys to GitHub Pages with GitHub Actions.',
    stack: ['Git', 'GitHub Actions', 'Node test runner', 'flutter test'],
  },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="rounded-t-[40px] bg-white px-5 py-20 sm:rounded-t-[50px] sm:px-8 sm:py-24 md:rounded-t-[60px] md:px-10 md:py-32"
    >
      <h2
        className="mb-16 text-center font-black uppercase text-[#0C0C0C] sm:mb-20 md:mb-28"
        style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
      >
        What I do
      </h2>

      <div className="mx-auto max-w-5xl">
        {SKILLS.map((skill, i) => (
          <FadeIn key={skill.number} delay={i * 0.1}>
            <div
              className={`flex items-start gap-6 border-t py-8 sm:gap-10 sm:py-10 md:gap-14 md:py-12 ${
                i === SKILLS.length - 1 ? 'border-b' : ''
              }`}
              style={{ borderColor: 'rgba(12,12,12,0.15)' }}
            >
              <span
                className="shrink-0 font-black text-[#0C0C0C]"
                style={{ fontSize: 'clamp(3rem, 10vw, 140px)' }}
                aria-hidden="true"
              >
                {skill.number}
              </span>
              <div className="flex flex-col gap-3 pt-2 sm:pt-4 md:pt-6">
                <h3
                  className="font-medium uppercase text-[#0C0C0C]"
                  style={{ fontSize: 'clamp(1rem, 2.2vw, 2.1rem)' }}
                >
                  {skill.name}
                </h3>
                <p
                  className="max-w-2xl font-light leading-relaxed text-[#0C0C0C]/70"
                  style={{ fontSize: 'clamp(0.85rem, 1.6vw, 1.25rem)' }}
                >
                  {skill.description}
                </p>
                <ul className="mt-1 flex flex-wrap gap-2" aria-label={`${skill.name} tools`}>
                  {skill.stack.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-full border border-[#0C0C0C]/20 px-3 py-1 text-xs font-medium uppercase tracking-wider text-[#0C0C0C]/80"
                    >
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
