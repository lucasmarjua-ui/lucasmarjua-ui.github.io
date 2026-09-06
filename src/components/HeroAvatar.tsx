import avatarImage from '../assets/lucas-avatar.png';

/**
 * Hero portrait — a stylized duotone treatment of a real photo, recolored into
 * the site's own gradient palette (#646973 → #BBCCD7) and cut out so it floats
 * on the dark background, matching the composition of the abstract version it
 * replaces. Not a raw photo: it's color-treated and background-removed.
 */
export default function HeroAvatar({ className = '' }: { className?: string }) {
  return (
    <img
      src={avatarImage}
      alt="Lucas Martinez"
      className={className}
      draggable={false}
    />
  );
}
