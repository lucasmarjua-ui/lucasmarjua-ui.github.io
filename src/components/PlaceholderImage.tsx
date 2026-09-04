import type { CSSProperties } from 'react';

interface PlaceholderImageProps {
  label: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * Stand-in for a real screenshot. Renders a labeled, hazard-striped tile so it
 * is unmistakably a placeholder rather than a fabricated screenshot — swap the
 * <img> back in once a real capture exists.
 */
export default function PlaceholderImage({ label, className = '', style }: PlaceholderImageProps) {
  return (
    <div
      className={`relative flex items-end overflow-hidden ${className}`}
      style={{
        background:
          'repeating-linear-gradient(135deg, #1a1a1a, #1a1a1a 14px, #232323 14px, #232323 28px)',
        ...style,
      }}
    >
      <span className="absolute right-3 top-3 rounded-full bg-[#D7E2EA] px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-widest text-[#0C0C0C]">
        Placeholder
      </span>
      <span className="w-full bg-black/50 px-3 py-2 text-[0.7rem] font-medium uppercase tracking-wide text-[#D7E2EA] sm:text-xs">
        {label}
      </span>
    </div>
  );
}
