interface LiveProjectButtonProps {
  href: string;
  label?: string;
  variant?: 'outline' | 'solid';
  className?: string;
}

export default function LiveProjectButton({
  href,
  label = 'Live Project',
  variant = 'outline',
  className = '',
}: LiveProjectButtonProps) {
  const look =
    variant === 'solid'
      ? 'bg-[#D7E2EA] text-[#0C0C0C] hover:bg-white'
      : 'text-[#D7E2EA] hover:bg-[#D7E2EA]/10';
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block whitespace-nowrap rounded-full border-2 border-[#D7E2EA] px-5 py-2 text-xs font-medium uppercase tracking-widest transition-colors sm:px-7 sm:py-2.5 sm:text-sm ${look} ${className}`}
    >
      {label}
    </a>
  );
}
