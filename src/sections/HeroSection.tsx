import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function HeroSection() {
  return (
    <section className="relative flex min-h-[100svh] flex-col" style={{ overflowX: 'clip' }}>
      <FadeIn delay={0} y={-20}>
        <nav
          aria-label="Main"
          className="flex items-center justify-between px-6 pt-6 md:px-10 md:pt-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium uppercase tracking-wider text-[#D7E2EA] transition-opacity duration-200 hover:opacity-70 md:text-lg lg:text-[1.4rem]"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </FadeIn>

      <div className="relative flex flex-1 flex-col justify-center overflow-hidden px-4 md:px-8">
        <FadeIn delay={0.1} y={20}>
          <p className="mb-4 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.25em] text-[#D7E2EA]/80 sm:text-sm md:mb-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Open to Junior Developer roles · Manchester, UK
          </p>
        </FadeIn>
        <FadeIn delay={0.15} y={40}>
          <h1 className="hero-heading w-full whitespace-nowrap text-[15vw] font-black uppercase leading-none tracking-tight lg:text-[16vw]">
            Hi, i&apos;m lucas
          </h1>
        </FadeIn>
      </div>

      <div className="flex items-end justify-between gap-6 px-6 pb-7 sm:pb-8 md:px-10 md:pb-10">
        <FadeIn delay={0.35} y={20}>
          <p
            className="max-w-[200px] font-light uppercase leading-snug tracking-wide text-[#D7E2EA] sm:max-w-[300px] md:max-w-[380px]"
            style={{ fontSize: 'clamp(0.75rem, 1.4vw, 1.5rem)' }}
          >
            Junior software developer building clean, functional web &amp; mobile apps
          </p>
        </FadeIn>

        <FadeIn delay={0.5} y={20}>
          <ContactButton />
        </FadeIn>
      </div>
    </section>
  );
}
