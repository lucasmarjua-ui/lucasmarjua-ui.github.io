import { useState } from 'react';
import { SECRETS, useSecrets, type SecretId } from '../secrets';

export default function Footer() {
  const { found } = useSecrets();
  const [open, setOpen] = useState(false);
  const total = Object.keys(SECRETS).length;

  return (
    <footer className="mx-auto max-w-6xl px-4 pb-12 pt-8 sm:px-8">
      <div className="flex flex-col gap-6 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[0.65rem] uppercase tracking-[0.05em] text-muted">
          Built block by block. © {new Date().getFullYear()} Lucas Martinez
        </p>
        <div className="relative self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="panel px-4 py-2 text-[0.65rem] uppercase tracking-[0.06em] hover:border-cream"
          >
            Secrets <span className="text-leaf">{found.size}/{total}</span>
          </button>
          {open && (
            <ul className="panel absolute bottom-full right-0 mb-3 w-64 p-4 text-[0.6rem] uppercase leading-loose tracking-[0.06em]">
              {(Object.keys(SECRETS) as SecretId[]).map((id) => (
                <li key={id} className={found.has(id) ? 'text-leaf' : 'text-muted'}>
                  {found.has(id) ? `✓ ${SECRETS[id]}` : '? ? ? ? ?'}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </footer>
  );
}
