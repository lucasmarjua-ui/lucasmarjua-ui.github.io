import type { CSSProperties } from 'react';

// Tiny pixel-art renderer: each string is a row, each character a palette key ('.' is empty).
type Palette = Record<string, string>;

export function PixelArt({
  rows,
  palette,
  size = 4,
  className,
  style,
  title,
}: {
  rows: string[];
  palette: Palette;
  size?: number;
  className?: string;
  style?: CSSProperties;
  title?: string;
}) {
  const width = Math.max(...rows.map((r) => r.length));
  const rects = [];
  for (let y = 0; y < rows.length; y++) {
    for (let x = 0; x < rows[y].length; x++) {
      const fill = palette[rows[y][x]];
      if (fill) rects.push(<rect key={`${x}-${y}`} x={x} y={y} width={1.02} height={1.02} fill={fill} />);
    }
  }
  return (
    <svg
      viewBox={`0 0 ${width} ${rows.length}`}
      width={width * size}
      height={rows.length * size}
      shapeRendering="crispEdges"
      className={className}
      style={style}
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
    >
      {title && <title>{title}</title>}
      {rects}
    </svg>
  );
}

const DOG_PALETTE: Palette = {
  o: '#e5804f',
  d: '#9a4f2c',
  k: '#141412',
  w: '#f3d9b8',
  t: '#4ade80',
};

const DOG_HEAD = [
  '...........dd...',
  '..........dooo..',
  '..........ooko..',
  '..........oooook',
  'o.........oooo..',
  'oo..oooooooooo..',
  '.ooooooooooooo..',
  '..oowwwwwwwooo..',
  '..oooooooooooo..',
];

export const DOG_FRAMES = [
  [...DOG_HEAD, '..o.o......o.o..', '..k.k......k.k..'],
  [...DOG_HEAD, '...o.o....o.o...', '...k.k....k.k...'],
];

export function Dog({ frame = 0, size = 4, className, style }: { frame?: number; size?: number; className?: string; style?: CSSProperties }) {
  return <PixelArt rows={DOG_FRAMES[frame % 2]} palette={DOG_PALETTE} size={size} className={className} style={style} />;
}

const ICONS: Record<string, string[]> = {
  arrowUpRight: ['..kkkkk', '....kkk', '...k.kk', '..k...k', '.k.....', 'k......'],
  arrowDown: ['..k..', '..k..', '..k..', 'k.k.k', '.kkk.', '..k..'],
  arrowRight: ['...k..', '....k.', 'kkkkkk', '....k.', '...k..'],
  arrowLeft: ['..k...', '.k....', 'kkkkkk', '.k....', '..k...'],
};

export function Icon({ name, size = 2, className }: { name: keyof typeof ICONS; size?: number; className?: string }) {
  return <PixelArt rows={ICONS[name]} palette={{ k: 'currentColor' }} size={size} className={className} />;
}
