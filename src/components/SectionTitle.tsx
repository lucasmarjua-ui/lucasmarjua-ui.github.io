import type { ReactNode } from 'react';
import Reveal from './Reveal';

export default function SectionTitle({ id, children, sub }: { id: string; children: ReactNode; sub?: ReactNode }) {
  return (
    <Reveal className="mb-10">
      <h2 id={id} className="section-title">
        {children}
      </h2>
      {sub && <p className="mt-4 max-w-2xl text-xs uppercase leading-relaxed tracking-[0.08em] text-muted">{sub}</p>}
    </Reveal>
  );
}
