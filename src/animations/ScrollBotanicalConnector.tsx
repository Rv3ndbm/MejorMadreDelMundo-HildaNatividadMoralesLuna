import { motion } from 'motion/react';
import { useReducedMotionPref } from '../hooks/useReducedMotionPref';

interface ScrollBotanicalConnectorProps {
  label?: string;
}

/**
 * Conector botánico animado al hacer scroll entre escenas:
 * dibuja progresivamente un tallo dorado con hojas de olivo y un pequeño girasol que florece.
 */
export function ScrollBotanicalConnector({ label }: ScrollBotanicalConnectorProps) {
  const reducedMotion = useReducedMotionPref();

  return (
    <div
      className="scroll-botanical-connector"
      aria-hidden="true"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginBlock: '-1.2rem',
        zIndex: 4,
        pointerEvents: 'none',
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 120 116"
        width="92"
        height="88"
        fill="none"
      >
        <motion.path
          d="M 60 4 C 54 34, 66 64, 60 94"
          stroke="#D99A22"
          strokeOpacity="0.55"
          strokeWidth="1.6"
          strokeLinecap="round"
          initial={reducedMotion ? false : { pathLength: 0, opacity: 0 }}
          whileInView={reducedMotion ? undefined : { pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
        />

        <motion.path
          d="M 59 42 C 42 32, 32 38, 38 50 C 44 56, 54 50, 59 42 Z"
          fill="#596B38"
          fillOpacity="0.52"
          initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
          whileInView={reducedMotion ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55, delay: 0.25 }}
          style={{ transformOrigin: '59px 42px' }}
        />

        <motion.path
          d="M 61 60 C 78 50, 88 56, 82 68 C 76 74, 66 68, 61 60 Z"
          fill="#596B38"
          fillOpacity="0.52"
          initial={reducedMotion ? false : { scale: 0, opacity: 0 }}
          whileInView={reducedMotion ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.55, delay: 0.38 }}
          style={{ transformOrigin: '61px 60px' }}
        />

        {/* Pequeño girasol que se abre al llegar al final del tallo */}
        <motion.g
          style={{ transformOrigin: '60px 96px' }}
          initial={reducedMotion ? false : { scale: 0, rotate: -45, opacity: 0 }}
          whileInView={reducedMotion ? undefined : { scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.48, ease: [0.22, 1, 0.36, 1] }}
        >
          {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
            <ellipse
              key={a}
              cx="60"
              cy="86"
              rx="2.8"
              ry="6.5"
              fill="#F4C542"
              stroke="#D99A22"
              strokeWidth="0.6"
              transform={`rotate(${a} 60 96)`}
            />
          ))}
          <circle cx="60" cy="96" r="5" fill="#76552F" />
          <circle cx="60" cy="96" r="2.2" fill="#D99A22" />
        </motion.g>
      </svg>

      {label && (
        <span
          style={{
            fontFamily: 'var(--font-serif)',
            fontStyle: 'italic',
            fontSize: '0.86rem',
            letterSpacing: '0.08em',
            color: 'var(--color-ink-soft)',
            marginTop: '-0.25rem',
          }}
        >
          {label}
        </span>
      )}
    </div>
  );
}

