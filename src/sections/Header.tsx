import { useEffect, useState } from 'react';
import { Dog } from '../components/Pixel';
import { LINKS } from '../data';

const NAV = [
  { label: 'Projects', href: '#projects' },
  { label: 'About', href: '#about' },
  { label: 'Log', href: '#log' },
  { label: 'Contact', href: '#contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors ${
        scrolled ? 'border-line bg-ink/90 backdrop-blur' : 'border-transparent'
      }`}
    >
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-8">
        <a href="#top" className="flex items-center gap-3 text-sm tracking-[0.06em]" aria-label="Lucas Martinez, back to top">
          <Dog size={2} />
          <span className="hidden sm:inline">LM</span>
        </a>
        <ul className="flex items-center gap-4 text-[0.65rem] uppercase tracking-[0.05em] text-muted sm:gap-8 sm:text-xs">
          {NAV.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="transition-colors hover:text-cream">
                {link.label}
              </a>
            </li>
          ))}
          <li className="hidden sm:block">
            <a href={LINKS.github} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-cream">
              GitHub
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
