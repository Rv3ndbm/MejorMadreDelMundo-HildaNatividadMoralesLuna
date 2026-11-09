interface OrnamentProps {
  className?: string;
}

export function BotanicalDivider({ className = '' }: OrnamentProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 260 32"
      width="220"
      height="28"
      className={className}
      aria-hidden="true"
      style={{ marginInline: 'auto' }}
    >
      <line x1="12" y1="16" x2="104" y2="16" stroke="#D99A22" strokeOpacity="0.4" strokeWidth="1" />
      <line x1="156" y1="16" x2="248" y2="16" stroke="#D99A22" strokeOpacity="0.4" strokeWidth="1" />
      {/* Hojas de olivo delicadas */}
      <path
        d="M 114 16 C 106 10, 96 11, 93 16 C 96 21, 106 22, 114 16 Z"
        fill="#596B38"
        fillOpacity="0.65"
      />
      <path
        d="M 146 16 C 154 10, 164 11, 167 16 C 164 21, 154 22, 146 16 Z"
        fill="#596B38"
        fillOpacity="0.65"
      />
      {/* Pequeño girasol central */}
      <g transform="translate(130, 16)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <ellipse
            key={angle}
            cx="0"
            cy="-7.5"
            rx="2.3"
            ry="5"
            fill="#F4C542"
            stroke="#D99A22"
            strokeWidth="0.5"
            transform={`rotate(${angle})`}
          />
        ))}
        <circle cx="0" cy="0" r="4.2" fill="#76552F" />
        <circle cx="0" cy="0" r="2" fill="#D99A22" fillOpacity="0.7" />
      </g>
    </svg>
  );
}

export function SunflowerWaxSeal({ className = '' }: OrnamentProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 96 96"
      width="78"
      height="78"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="waxGold" cx="38%" cy="32%" r="65%">
          <stop offset="0%" stopColor="#F6D36B" />
          <stop offset="52%" stopColor="#D99A22" />
          <stop offset="100%" stopColor="#9B6810" />
        </radialGradient>
      </defs>
      {/* Contorno orgánico de lacre artesanal */}
      <path
        d="M48 6 C61 5, 74 11, 82 21 C90 31, 92 45, 89 58 C86 71, 77 82, 65 87 C53 92, 38 91, 26 85 C14 79, 7 67, 6 53 C5 39, 10 24, 21 15 C30 8, 39 7, 48 6 Z"
        fill="url(#waxGold)"
        stroke="#8B5B0C"
        strokeWidth="1.2"
      />
      <circle
        cx="48"
        cy="48"
        r="32"
        fill="none"
        stroke="#FFF9E9"
        strokeOpacity="0.45"
        strokeWidth="1.2"
      />
      <circle
        cx="48"
        cy="48"
        r="28.5"
        fill="none"
        stroke="#76552F"
        strokeOpacity="0.35"
        strokeWidth="0.9"
        strokeDasharray="2 2.5"
      />
      {/* Relieve de girasol en el sello */}
      <g transform="translate(48, 48)">
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
          <path
            key={deg}
            d="M 0 -7 C -3 -13, -2.5 -20, 0 -24 C 2.5 -20, 3 -13, 0 -7 Z"
            fill="#FFF3C4"
            fillOpacity="0.78"
            stroke="#8B5B0C"
            strokeWidth="0.6"
            transform={`rotate(${deg})`}
          />
        ))}
        <circle cx="0" cy="0" r="8.2" fill="#76552F" stroke="#FFF3C4" strokeWidth="0.8" />
        <circle cx="0" cy="0" r="4" fill="#D99A22" />
      </g>
    </svg>
  );
}

export function BotanicalBranchCorner({ className = '' }: OrnamentProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 180 180"
      width="150"
      height="150"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M 14 162 C 32 108, 76 58, 154 22"
        stroke="#596B38"
        strokeOpacity="0.42"
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M 42 122 C 26 112, 22 92, 34 84 C 46 92, 48 110, 42 122 Z"
        fill="#596B38"
        fillOpacity="0.26"
      />
      <path
        d="M 68 94 C 84 102, 102 96, 108 84 C 94 78, 78 82, 68 94 Z"
        fill="#596B38"
        fillOpacity="0.24"
      />
      <path
        d="M 94 66 C 82 52, 82 34, 94 28 C 104 38, 102 54, 94 66 Z"
        fill="#596B38"
        fillOpacity="0.26"
      />
      <g transform="translate(148, 26)">
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a) => (
          <ellipse
            key={a}
            cx="0"
            cy="-9"
            rx="2.8"
            ry="6"
            fill="#F4C542"
            fillOpacity="0.65"
            transform={`rotate(${a})`}
          />
        ))}
        <circle cx="0" cy="0" r="4.8" fill="#76552F" fillOpacity="0.75" />
      </g>
    </svg>
  );
}

