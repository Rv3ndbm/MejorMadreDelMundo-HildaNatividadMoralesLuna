import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useReducedMotionPref } from '../hooks/useReducedMotionPref';

interface RevealOnScrollProps {
  children: ReactNode;
  delay?: number;
  yOffset?: number;
  scaleFrom?: number;
  blur?: boolean;
  className?: string;
}

export function RevealOnScroll({
  children,
  delay = 0,
  yOffset = 26,
  scaleFrom = 0.985,
  blur = true,
  className = '',
}: RevealOnScrollProps) {
  const reducedMotion = useReducedMotionPref();

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{
        opacity: 0,
        y: yOffset,
        scale: scaleFrom,
        filter: blur ? 'blur(5px)' : 'blur(0px)',
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
      }}
      viewport={{ once: true, amount: 0.14 }}
      transition={{
        duration: 0.86,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
