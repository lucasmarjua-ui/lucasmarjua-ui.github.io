import avatarImage from '../assets/lucas-avatar.webp';

/**
 * Hero portrait — a 3D clay-render style illustration, not a photo.
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
