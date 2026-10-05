import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';

const EMAIL = 'lucas.mar.jua@gmail.com';

const LINKS = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, Icon: Mail },
  {
    label: 'LinkedIn',
    value: 'in/lucas-martinez-a4b955406',
    href: 'https://www.linkedin.com/in/lucas-martinez-a4b955406/',
    Icon: Linkedin,
  },
  { label: 'GitHub', value: 'github.com/lucasmarjua-ui', href: 'https://github.com/lucasmarjua-ui', Icon: Github },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative bg-[#0C0C0C] px-5 pb-10 pt-24 sm:px-8 md:px-10 md:pt-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
        <FadeIn y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 11vw, 150px)' }}
          >
            Let&apos;s talk
          </h2>
        </FadeIn>

        <FadeIn delay={0.1}>
          <p
            className="mt-8 max-w-xl font-light leading-relaxed text-[#D7E2EA]/80"
            style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)' }}
          >
            I&apos;m available immediately for full-time Junior Developer roles. If you think I&apos;d be a good fit
            for your team, I&apos;d love to hear from you.
          </p>
        </FadeIn>

        <FadeIn delay={0.2}>
          <div className="mt-10">
            <ContactButton label="Email me" href={`mailto:${EMAIL}`} />
          </div>
        </FadeIn>

        <FadeIn delay={0.3} className="w-full">
          <ul className="mt-16 grid w-full gap-3 sm:grid-cols-3">
            {LINKS.map(({ label, value, href, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex h-full items-center gap-4 rounded-3xl border border-[#D7E2EA]/20 p-5 text-left transition-colors hover:border-[#D7E2EA]/60 hover:bg-[#D7E2EA]/5"
                >
                  <Icon className="h-6 w-6 shrink-0 text-[#D7E2EA]" strokeWidth={1.5} aria-hidden="true" />
                  <span className="min-w-0">
                    <span className="block text-xs font-medium uppercase tracking-widest text-[#D7E2EA]/60">
                      {label}
                    </span>
                    <span className="block truncate text-sm text-[#D7E2EA] group-hover:underline">{value}</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </FadeIn>
      </div>

      <footer className="mx-auto mt-20 flex max-w-5xl flex-col items-center justify-between gap-3 border-t border-[#D7E2EA]/15 pt-6 text-xs uppercase tracking-widest text-[#D7E2EA]/50 sm:flex-row">
        <span>© {new Date().getFullYear()} Lucas Martinez</span>
        <span className="flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5" aria-hidden="true" /> Manchester, UK · English / Spanish
        </span>
      </footer>
    </section>
  );
}
