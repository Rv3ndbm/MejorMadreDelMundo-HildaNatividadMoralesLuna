import { useId } from 'react';
import { motion } from 'motion/react';
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref';

interface BotanicalSunflowerProps {
  size?: number | string;
  className?: string;
  variant?: 'bloom' | 'sway' | 'still';
  withStem?: boolean;
}

// Coordenadas precalculadas con ángulo áureo (137.508°) para el centro del girasol
const SEED_POINTS = Array.from({ length: 64 }, (_, index) => {
  const n = index + 1;
  const angle = n * 2.399963229728653;
  const radius = 4.05 * Math.sqrt(n);
  return {
    cx: Number((150 + radius * Math.cos(angle)).toFixed(2)),
    cy: Number((150 + radius * Math.sin(angle)).toFixed(2)),
    r: Number((1.15 + (index % 3) * 0.36).toFixed(2)),
    opacity: Number((0.36 + (index / 64) * 0.52).toFixed(2)),
  };
});

const OUTER_ANGLES = Array.from({ length: 16 }, (_, i) => i * 22.5);
const INNER_ANGLES = Array.from({ length: 16 }, (_, i) => i * 22.5 + 11.25);

export function BotanicalSunflower({
  size = 280,
  className = '',
  variant = 'bloom',
  withStem = false,
}: BotanicalSunflowerProps) {
  const uid = useId().replace(/:/g, '');
  const reducedMotion = useReducedMotionPref();

  const viewBox = withStem ? '0 0 300 390' : '0 0 300 300';
  const shouldBloom = variant === 'bloom' && !reducedMotion;
  const shouldSway = (variant === 'bloom' || variant === 'sway') && !reducedMotion;

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={withStem ? undefined : size}
      className={className}
      aria-hidden="true"
      initial={shouldBloom ? { scale: 0.78, opacity: 0 } : false}
      whileInView={shouldBloom ? { scale: 1, opacity: 1 } : undefined}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
    >
      <defs>
        <radialGradient id={`sunGlow-${uid}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#F8E6A0" stopOpacity="0.72" />
          <stop offset="62%" stopColor="#F4C542" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFF9E9" stopOpacity="0" />
        </radialGradient>

        <linearGradient id={`petalOuter-${uid}`} x1="150" y1="20" x2="150" y2="128" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBEAA6" />
          <stop offset="46%" stopColor="#F4C542" />
          <stop offset="100%" stopColor="#D18E18" />
        </linearGradient>

        <linearGradient id={`petalInner-${uid}`} x1="150" y1="32" x2="150" y2="128" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF7D1" />
          <stop offset="52%" stopColor="#F6CF55" />
          <stop offset="100%" stopColor="#D99A22" />
        </linearGradient>

        <radialGradient id={`discCenter-${uid}`} cx="45%" cy="42%" r="58%">
          <stop offset="0%" stopColor="#8C6538" />
          <stop offset="55%" stopColor="#654522" />
          <stop offset="100%" stopColor="#442D14" />
        </radialGradient>

        <linearGradient id={`stemGrad-${uid}`} x1="150" y1="220" x2="150" y2="385" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#596B38" />
          <stop offset="100%" stopColor="#435228" />
        </linearGradient>
      </defs>

      {/* Halo cálido de luz dorada */}
      <circle cx="150" cy="150" r="144" fill={`url(#sunGlow-${uid})`} />

      {/* Tallo y hojas botánicas opcionales */}
      {withStem && (
        <g>
          <path
            d="M 150 225 Q 145 305 152 382"
            stroke={`url(#stemGrad-${uid})`}
            strokeWidth="6.5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M 148 298 C 110 278, 86 298, 102 325 C 116 340, 138 326, 148 310 Z"
            fill="#596B38"
            fillOpacity="0.9"
            stroke="#435228"
            strokeWidth="1.2"
          />
          <path
            d="M 147 305 Q 120 304 105 320"
            stroke="#FFF9E9"
            strokeOpacity="0.48"
            strokeWidth="1.1"
            fill="none"
          />
          <path
            d="M 150 322 C 188 302, 212 322, 196 348 C 182 362, 160 348, 150 334 Z"
            fill="#667A42"
            fillOpacity="0.9"
            stroke="#435228"
            strokeWidth="1.2"
          />
          <path
            d="M 151 329 Q 178 328 193 343"
            stroke="#FFF9E9"
            strokeOpacity="0.48"
            strokeWidth="1.1"
            fill="none"
          />
        </g>
      )}

      {/* Cabeza floral con brisa sutil */}
      <motion.g
        style={{ transformOrigin: '150px 150px' }}
        animate={
          shouldSway
            ? {
                rotate: [-1.4, 1.4, -1.4],
              }
            : undefined
        }
        transition={
          shouldSway
            ? {
                duration: 7.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }
            : undefined
        }
      >
        {/* Sépalos oliva discretos tras la corona */}
        {[22.5, 67.5, 112.5, 157.5, 202.5, 247.5, 292.5, 337.5].map((deg) => (
          <g key={`sepal-${deg}`} transform={`rotate(${deg} 150 150)`}>
            <path
              d="M 150 112 C 141 84, 142 52, 150 36 C 158 52, 159 84, 150 112 Z"
              fill="#596B38"
              fillOpacity="0.22"
            />
          </g>
        ))}

        {/* Corona exterior: cada pétalo se despliega radialmente desde el capullo */}
        <g>
          {OUTER_ANGLES.map((deg, idx) => (
            <g key={`outer-${deg}`} transform={`rotate(${deg} 150 150)`}>
              <motion.g
                style={{ transformOrigin: '150px 132px' }}
                initial={shouldBloom ? { scaleY: 0.32, scaleX: 0.65, opacity: 0 } : false}
                whileInView={shouldBloom ? { scaleY: 1, scaleX: 1, opacity: 1 } : undefined}
                viewport={{ once: true }}
                transition={{
                  duration: 0.85,
                  delay: 0.04 + (idx % 8) * 0.035,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <path
                  d="M 150 122 C 132 96, 130 54, 150 22 C 170 54, 168 96, 150 122 Z"
                  fill={`url(#petalOuter-${uid})`}
                  stroke="#C98A18"
                  strokeWidth="0.9"
                  strokeOpacity="0.58"
                />
                <path
                  d="M 150 116 Q 149 74 150 34"
                  stroke="#D99A22"
                  strokeWidth="0.8"
                  strokeOpacity="0.48"
                  fill="none"
                />
              </motion.g>
            </g>
          ))}
        </g>

        {/* Corona interior: despliegue escalonado con luz cálida */}
        <g>
          {INNER_ANGLES.map((deg, idx) => (
            <g key={`inner-${deg}`} transform={`rotate(${deg} 150 150)`}>
              <motion.g
                style={{ transformOrigin: '150px 134px' }}
                initial={shouldBloom ? { scaleY: 0.28, scaleX: 0.6, opacity: 0 } : false}
                whileInView={shouldBloom ? { scaleY: 1, scaleX: 1, opacity: 1 } : undefined}
                viewport={{ once: true }}
                transition={{
                  duration: 0.9,
                  delay: 0.16 + (idx % 8) * 0.04,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <path
                  d="M 150 124 C 135 100, 134 62, 150 34 C 166 62, 165 100, 150 124 Z"
                  fill={`url(#petalInner-${uid})`}
                  stroke="#D99A22"
                  strokeWidth="0.85"
                  strokeOpacity="0.52"
                />
                <path
                  d="M 150 116 Q 151 80 150 46"
                  stroke="#FFF9E9"
                  strokeWidth="0.85"
                  strokeOpacity="0.65"
                  fill="none"
                />
              </motion.g>
            </g>
          ))}
        </g>

        {/* Disco central con espiral áurea */}
        <circle
          cx="150"
          cy="150"
          r="45"
          fill={`url(#discCenter-${uid})`}
          stroke="#D99A22"
          strokeWidth="1.7"
          strokeOpacity="0.7"
        />
        <circle
          cx="150"
          cy="150"
          r="39"
          fill="none"
          stroke="#F4C542"
          strokeWidth="1"
          strokeDasharray="2 3.5"
          strokeOpacity="0.58"
        />
        {SEED_POINTS.map((pt, idx) => (
          <circle
            key={idx}
            cx={pt.cx}
            cy={pt.cy}
            r={pt.r}
            fill={idx % 4 === 0 ? '#F4C542' : '#D99A22'}
            fillOpacity={pt.opacity}
          />
        ))}
      </motion.g>
    </motion.svg>
  );
}
