import { useRef, type ReactNode } from 'react';
import { TypeText, useInView, useSequence } from '../build';

export default function SectionTitle({ id, children, sub }: { id: string; children: string; sub?: string }): ReactNode {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const seq = useSequence(sub ? 2 : 1, inView);

  return (
    <div ref={ref} className="mb-10">
      <h2 id={id} className="section-title">
        <TypeText text={children} cps={22} {...seq.props(0)} />
      </h2>
      {sub && (
        <p className="mt-4 max-w-2xl text-xs uppercase leading-relaxed tracking-[0.08em] text-muted">
          <TypeText text={sub} cps={70} {...seq.props(1)} />
        </p>
      )}
    </div>
  );
}
