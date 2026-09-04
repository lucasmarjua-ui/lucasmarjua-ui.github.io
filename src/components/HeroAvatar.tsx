/**
 * Original, abstract geometric avatar — not a photo or likeness of any real
 * person. Built from simple line/shape primitives in the site's own palette.
 */
export default function HeroAvatar({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 440 520"
      className={className}
      role="img"
      aria-label="Abstract geometric developer avatar"
    >
      <defs>
        <linearGradient id="avatarGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#646973" />
          <stop offset="100%" stopColor="#BBCCD7" />
        </linearGradient>
        <linearGradient id="avatarGradientSoft" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#646973" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#BBCCD7" stopOpacity="0.15" />
        </linearGradient>
      </defs>

      <circle cx="220" cy="470" r="150" fill="url(#avatarGradientSoft)" />

      <polygon
        points="220,60 330,150 300,420 140,420 110,150"
        fill="none"
        stroke="url(#avatarGradient)"
        strokeWidth="3"
      />

      <circle cx="220" cy="150" r="78" fill="none" stroke="url(#avatarGradient)" strokeWidth="4" />

      <path
        d="M142 150 a78 78 0 0 1 156 0"
        fill="url(#avatarGradientSoft)"
        stroke="url(#avatarGradient)"
        strokeWidth="3"
      />

      <path
        d="M120 300 C 160 340, 280 340, 320 300 L 336 430 C 300 470, 140 470, 104 430 Z"
        fill="none"
        stroke="url(#avatarGradient)"
        strokeWidth="3"
      />

      <line x1="150" y1="150" x2="290" y2="150" stroke="url(#avatarGradient)" strokeWidth="2" opacity="0.5" />
      <line x1="220" y1="60" x2="220" y2="240" stroke="url(#avatarGradient)" strokeWidth="1.5" opacity="0.35" />

      <circle cx="110" cy="150" r="5" fill="#BBCCD7" />
      <circle cx="330" cy="150" r="5" fill="#BBCCD7" />
      <circle cx="220" cy="60" r="5" fill="#BBCCD7" />
    </svg>
  );
}
