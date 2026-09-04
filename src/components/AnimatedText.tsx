import { useRef, type CSSProperties, type ReactElement } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  style?: CSSProperties;
}

function Char({
  char,
  index,
  total,
  progress,
}: {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = index / total;
  const end = (index + 1) / total;
  const opacity = useTransform(progress, [start, end], [0.2, 1]);

  return (
    <span className="relative inline-block">
      <span className="invisible">{char}</span>
      <motion.span className="absolute left-0 top-0" style={{ opacity }}>
        {char}
      </motion.span>
    </span>
  );
}

export default function AnimatedText({ text, className, style }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  });

  const total = text.length;
  let charIndex = 0;
  const words = text.split(' ');
  const nodes: ReactElement[] = [];

  words.forEach((word, wi) => {
    const wordChars = Array.from(word);
    const startIndex = charIndex;
    charIndex += wordChars.length + 1; // + 1 for the space that follows

    nodes.push(
      <span key={`w-${wi}`} className="inline-block whitespace-nowrap">
        {wordChars.map((char, ci) => (
          <Char key={ci} char={char} index={startIndex + ci} total={total} progress={scrollYProgress} />
        ))}
      </span>,
    );
    if (wi < words.length - 1) {
      nodes.push(<span key={`s-${wi}`}> </span>);
    }
  });

  return (
    <p ref={ref} className={className} style={style}>
      {nodes}
    </p>
  );
}
