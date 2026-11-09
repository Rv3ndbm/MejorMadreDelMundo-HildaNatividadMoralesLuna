import { useEffect, useId, useState } from 'react';
import { ArrowRight, Check, RotateCcw, Sparkles, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { BirthdayContent } from '../../types/birthday';
import { RevealOnScroll } from '../../animations/RevealOnScroll';
import { SmartPhoto } from '../../components/SmartPhoto';
import '../MemorySunflowerSection.css';

interface InteractiveGardenSectionProps {
  content: BirthdayContent['scene6InteractiveGarden'];
}

const CENTER_SEEDS = Array.from({ length: 78 }, (_, index) => {
  const n = index + 1;
  const angle = n * 2.399963229728653;
  const radius = 6.2 * Math.sqrt(n);
  return {
    cx: Number((280 + radius * Math.cos(angle)).toFixed(2)),
    cy: Number((280 + radius * Math.sin(angle)).toFixed(2)),
    r: Number((1.7 + (index % 3) * 0.5).toFixed(2)),
    gold: index % 4 === 0,
  };
});

export function InteractiveGardenSection({ content }: InteractiveGardenSectionProps) {
  const uid = useId().replace(/:/g, '');
  const petals = content.petals;
  const totalPetals = petals.length;

  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [visitedIds, setVisitedIds] = useState<Set<string>>(() => new Set());
  const [isMobileModal, setIsMobileModal] = useState<boolean>(() =>
    typeof window !== 'undefined' ? window.innerWidth < 940 : true
  );

  useEffect(() => {
    const checkViewport = () => {
      setIsMobileModal(window.innerWidth < 940);
    };
    window.addEventListener('resize', checkViewport, { passive: true });
    return () => window.removeEventListener('resize', checkViewport);
  }, []);

  useEffect(() => {
    if (selectedIdx === null || !isMobileModal) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedIdx(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedIdx, isMobileModal]);

  const handleSelectPetal = (idx: number) => {
    const petal = petals[idx];
    if (!petal) return;
    setSelectedIdx(idx);
    setVisitedIds((prev) => {
      const next = new Set(prev);
      next.add(petal.id);
      return next;
    });
  };

  const handleNextPetal = () => {
    if (selectedIdx === null) {
      handleSelectPetal(0);
      return;
    }
    const nextIdx = (selectedIdx + 1) % totalPetals;
    handleSelectPetal(nextIdx);
  };

  const activePetal = selectedIdx !== null ? petals[selectedIdx] : null;
  const stepAngle = 360 / Math.max(totalPetals, 1);
  const progressRatio = totalPetals > 0 ? visitedIds.size / totalPetals : 0;

  return (
    <section
      id="escena-jardin"
      className="memory-sunflower-section section-shell"
      aria-labelledby="interactive-garden-title"
    >
      <div className="container-editorial">
        <RevealOnScroll className="section-header">
          <p className="section-eyebrow">
            <span className="section-number-tag">{content.sceneNumber}</span>
            <span>·</span>
            <Sparkles size={13} aria-hidden="true" />
            <span>{content.eyebrow}</span>
          </p>
          <h2 id="interactive-garden-title" className="section-title">
            {content.title}
          </h2>
          <p className="section-intro">{content.instructions}</p>
        </RevealOnScroll>

        <div className="sunflower-experience-layout">
          <RevealOnScroll className="sunflower-stage-column">
            <div className="sunflower-svg-wrapper">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 560 590"
                className="interactive-sunflower-svg"
                role="group"
                aria-label="Girasol interactivo de los recuerdos. Selecciona cada pétalo para descubrir su mensaje."
              >
                <defs>
                  <radialGradient id={`halo-${uid}`} cx="50%" cy="48%" r="50%">
                    <stop offset="0%" stopColor="#F8E6A0" stopOpacity="0.72" />
                    <stop offset="68%" stopColor="#F4C542" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#FFF9E9" stopOpacity="0" />
                  </radialGradient>

                  <linearGradient id={`bgPetal-${uid}`} x1="280" y1="42" x2="280" y2="220" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#F6E094" />
                    <stop offset="60%" stopColor="#E6B235" />
                    <stop offset="100%" stopColor="#C48619" />
                  </linearGradient>

                  <linearGradient id={`fgPetal-${uid}`} x1="280" y1="26" x2="280" y2="218" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFF3BD" />
                    <stop offset="48%" stopColor="#F4C542" />
                    <stop offset="100%" stopColor="#D99A22" />
                  </linearGradient>

                  <linearGradient id={`fgPetalActive-${uid}`} x1="280" y1="20" x2="280" y2="218" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFFEF8" />
                    <stop offset="38%" stopColor="#FBE38E" />
                    <stop offset="100%" stopColor="#E5A220" />
                  </linearGradient>

                  <linearGradient id={`fgPetalVisited-${uid}`} x1="280" y1="28" x2="280" y2="218" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#FFF8D8" />
                    <stop offset="52%" stopColor="#F5CE5B" />
                    <stop offset="100%" stopColor="#D99A22" />
                  </linearGradient>

                  <radialGradient id={`centerDisc-${uid}`} cx="44%" cy="40%" r="58%">
                    <stop offset="0%" stopColor="#855E34" />
                    <stop offset="58%" stopColor="#634321" />
                    <stop offset="100%" stopColor="#432C14" />
                  </radialGradient>
                </defs>

                {/* Tallo botánico y hojas en la base del girasol */}
                <g aria-hidden="true">
                  <path
                    d="M 280 390 Q 274 495 280 582"
                    stroke="#596B38"
                    strokeWidth="6.5"
                    strokeLinecap="round"
                    fill="none"
                  />
                  <path
                    d="M 277 485 C 218 446, 178 492, 232 532 C 254 548, 272 522, 278 504 Z"
                    fill="#596B38"
                    fillOpacity="0.82"
                  />
                  <path
                    d="M 283 512 C 342 472, 382 518, 328 556 C 306 572, 288 548, 282 528 Z"
                    fill="#6E8248"
                    fillOpacity="0.82"
                  />
                </g>

                <circle cx="280" cy="280" r="268" fill={`url(#halo-${uid})`} />

                {/* Anillo astrolabio botánico giratorio */}
                <g className="botanical-halo-ring" style={{ transformOrigin: '280px 280px' }} aria-hidden="true">
                  <circle
                    cx="280"
                    cy="280"
                    r="254"
                    stroke="#D99A22"
                    strokeOpacity="0.28"
                    strokeWidth="1"
                    strokeDasharray="5 9"
                    fill="none"
                  />
                  <circle cx="280" cy="26" r="3.5" fill="#F4C542" />
                  <circle cx="534" cy="280" r="3.5" fill="#D99A22" />
                  <circle cx="26" cy="280" r="3.5" fill="#D99A22" />
                </g>

                {[45, 135, 225, 315].map((leafDeg) => (
                  <g key={`leaf-${leafDeg}`} transform={`rotate(${leafDeg} 280 280)`} aria-hidden="true">
                    <path
                      d="M 280 180 C 242 135, 246 76, 280 52 C 314 76, 318 135, 280 180 Z"
                      fill="#596B38"
                      fillOpacity="0.26"
                    />
                  </g>
                ))}

                <g aria-hidden="true">
                  {petals.map((petal, idx) => {
                    const bgAngle = idx * stepAngle + stepAngle / 2;
                    return (
                      <g key={`bg-${petal.id}`} transform={`rotate(${bgAngle} 280 280)`}>
                        <path
                          d="M 280 214 C 244 170, 242 98, 280 46 C 318 98, 316 170, 280 214 Z"
                          fill={`url(#bgPetal-${uid})`}
                          fillOpacity="0.76"
                          stroke="#B97D16"
                          strokeWidth="1"
                          strokeOpacity="0.45"
                        />
                      </g>
                    );
                  })}
                </g>

                {petals.map((petal, idx) => {
                  const angle = idx * stepAngle;
                  const isSelected = selectedIdx === idx;
                  const isVisited = visitedIds.has(petal.id);

                  const fillUrl = isSelected
                    ? `url(#fgPetalActive-${uid})`
                    : isVisited
                      ? `url(#fgPetalVisited-${uid})`
                      : `url(#fgPetal-${uid})`;

                  return (
                    <g
                      key={petal.id}
                      transform={`rotate(${angle} 280 280)`}
                      className={`interactive-petal ${isSelected ? 'is-selected' : ''} ${
                        isVisited ? 'is-visited' : ''
                      }`}
                      role="button"
                      tabIndex={0}
                      aria-label={`${petal.petalLabel}: ${petal.title}`}
                      aria-pressed={isSelected}
                      onClick={() => handleSelectPetal(idx)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleSelectPetal(idx);
                        }
                      }}
                    >
                      <g className="interactive-petal__inner">
                        <path
                          d="M 280 218 C 230 168, 228 82, 280 22 C 332 82, 330 168, 280 218 Z"
                          fill="transparent"
                        />
                        <path
                          d="M 280 216 C 238 168, 236 86, 280 28 C 324 86, 322 168, 280 216 Z"
                          fill={fillUrl}
                          stroke={isSelected ? '#76552F' : '#C98918'}
                          strokeWidth={isSelected ? '2.2' : '1.25'}
                        />
                        <path
                          d="M 280 202 Q 278 126 280 50"
                          stroke={isSelected ? '#D99A22' : '#FFF9E9'}
                          strokeOpacity={isSelected ? '0.85' : '0.62'}
                          strokeWidth="1.3"
                          fill="none"
                        />
                        <g transform={`translate(280, 94) rotate(${-angle})`}>
                          <circle
                            cx="0"
                            cy="0"
                            r={isSelected ? '15.5' : '13.5'}
                            fill={
                              isSelected
                                ? '#596B38'
                                : isVisited
                                  ? '#FFFDF5'
                                  : 'rgba(255, 254, 248, 0.9)'
                            }
                            stroke={isSelected ? '#FFFEF8' : '#D99A22'}
                            strokeWidth="1.2"
                          />
                          <text
                            x="0"
                            y="4.5"
                            textAnchor="middle"
                            fill={isSelected ? '#FFFEF8' : '#76552F'}
                            fontFamily="var(--font-serif)"
                            fontWeight="700"
                            fontSize="13.5"
                          >
                            {idx + 1}
                          </text>
                        </g>
                      </g>
                    </g>
                  );
                })}

                <g aria-hidden="true">
                  <circle
                    cx="280"
                    cy="280"
                    r="82"
                    fill={`url(#centerDisc-${uid})`}
                    stroke="#D99A22"
                    strokeWidth="2.4"
                  />
                  <circle
                    cx="280"
                    cy="280"
                    r="72"
                    fill="none"
                    stroke="#F4C542"
                    strokeOpacity="0.5"
                    strokeWidth="1.2"
                    strokeDasharray="3 4"
                  />
                  {CENTER_SEEDS.map((s, idx) => (
                    <circle
                      key={idx}
                      cx={s.cx}
                      cy={s.cy}
                      r={s.r}
                      fill={s.gold ? '#F4C542' : '#D99A22'}
                      fillOpacity="0.34"
                    />
                  ))}
                  <circle
                    cx="280"
                    cy="280"
                    r="44"
                    fill="rgba(67, 44, 20, 0.86)"
                    stroke="rgba(248, 230, 160, 0.45)"
                    strokeWidth="1"
                  />
                  <text
                    x="280"
                    y="275"
                    textAnchor="middle"
                    fill="#FFF9E9"
                    fontFamily="var(--font-serif)"
                    fontSize="19"
                    fontWeight="600"
                  >
                    {visitedIds.size} / {totalPetals}
                  </text>
                  <text
                    x="280"
                    y="294"
                    textAnchor="middle"
                    fill="#F8E6A0"
                    fontFamily="var(--font-sans)"
                    fontSize="9.5"
                    letterSpacing="1.4"
                  >
                    PÉTALOS
                  </text>
                </g>
              </svg>
            </div>

            {/* Barra de progreso dorada de floración */}
            <div className="sunflower-bloom-meter" aria-hidden="true">
              <div className="sunflower-bloom-meter__labels">
                <span>Pétalos descubiertos</span>
                <strong>
                  {visitedIds.size} de {totalPetals}
                </strong>
              </div>
              <div className="sunflower-bloom-meter__track">
                <div
                  className="sunflower-bloom-meter__fill"
                  style={{ width: `${Math.round(progressRatio * 100)}%` }}
                />
              </div>
            </div>

            <div className="petal-pills-bar" role="group" aria-label="Acceso rápido a los pétalos">
              {petals.map((petal, idx) => {
                const isSelected = selectedIdx === idx;
                const isVisited = visitedIds.has(petal.id);
                return (
                  <button
                    key={petal.id}
                    type="button"
                    className={`petal-quick-pill ${isSelected ? 'is-selected' : ''} ${
                      isVisited ? 'is-visited' : ''
                    }`}
                    onClick={() => handleSelectPetal(idx)}
                  >
                    {isVisited && !isSelected && <Check size={13} aria-hidden="true" />}
                    <span>{petal.petalLabel}</span>
                  </button>
                );
              })}
            </div>

            {visitedIds.size === totalPetals && (
              <motion.p
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                className="sunflower-all-visited-banner"
              >
                <Sparkles size={15} aria-hidden="true" />
                <span>{content.allVisitedMessage}</span>
              </motion.p>
            )}
          </RevealOnScroll>

          <div className="sunflower-detail-desktop">
            <AnimatePresence mode="wait">
              {activePetal && selectedIdx !== null ? (
                <motion.article
                  key={activePetal.id}
                  className="petal-memory-card"
                  initial={{ opacity: 0, y: 14, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.98 }}
                  transition={{ duration: 0.34, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="petal-memory-card__top">
                    <span className="petal-memory-card__badge">
                      {activePetal.petalLabel} · {activePetal.facetTag}
                    </span>
                    <button
                      type="button"
                      className="petal-memory-card__close"
                      onClick={() => setSelectedIdx(null)}
                    >
                      <RotateCcw size={15} aria-hidden="true" />
                      <span>{content.closeMemoryLabel}</span>
                    </button>
                  </div>

                  <div className="petal-memory-card__photo">
                    <SmartPhoto
                      src={activePetal.imageSrc}
                      alt={activePetal.imageAlt}
                      fallbackLabel={activePetal.petalLabel}
                    />
                  </div>

                  <h3 className="petal-memory-card__title editable-slot">{activePetal.title}</h3>

                  <div className="petal-memory-card__footer">
                    <button
                      type="button"
                      className="btn-secondary-botanical"
                      onClick={() => setSelectedIdx(null)}
                    >
                      <span>{content.closeMemoryLabel}</span>
                    </button>
                    <button
                      type="button"
                      className="btn-primary-garden petal-next-btn"
                      onClick={handleNextPetal}
                    >
                      <span>{content.nextPetalLabel}</span>
                      <ArrowRight size={16} aria-hidden="true" />
                    </button>
                  </div>
                </motion.article>
              ) : (
                <motion.div
                  key="empty-prompt"
                  className="petal-empty-invitation"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <Sparkles size={26} className="petal-empty-invitation__icon" aria-hidden="true" />
                  <h3 className="petal-empty-invitation__title">Cada pétalo guarda una parte de ti</h3>
                  <p className="petal-empty-invitation__text">
                    Selecciona cualquiera de los pétalos numerados del girasol para iluminarlo y revelar
                    nuestros recuerdos juntos, tus enseñanzas y todo lo que admiro de ti.
                  </p>
                  <button
                    type="button"
                    className="btn-primary-garden"
                    onClick={() => handleSelectPetal(0)}
                  >
                    <span>Descubrir el Pétalo I</span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileModal && activePetal && selectedIdx !== null && (
          <motion.div
            className="petal-mobile-overlay"
            role="dialog"
            aria-modal="true"
            aria-label={`${activePetal.petalLabel}: ${activePetal.title}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIdx(null)}
          >
            <motion.article
              className="petal-mobile-sheet"
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="petal-memory-card__top">
                <span className="petal-memory-card__badge">
                  {activePetal.petalLabel} · {activePetal.facetTag}
                </span>
                <button
                  type="button"
                  className="petal-mobile-close-icon"
                  onClick={() => setSelectedIdx(null)}
                  aria-label={content.closeMemoryLabel}
                >
                  <X size={18} aria-hidden="true" />
                </button>
              </div>

              <div className="petal-memory-card__photo">
                <SmartPhoto
                  src={activePetal.imageSrc}
                  alt={activePetal.imageAlt}
                  eager
                  fallbackLabel={activePetal.petalLabel}
                />
              </div>

              <h3 className="petal-memory-card__title editable-slot">{activePetal.title}</h3>

              <div className="petal-mobile-actions">
                <button
                  type="button"
                  className="btn-secondary-botanical petal-mobile-back"
                  onClick={() => setSelectedIdx(null)}
                >
                  <RotateCcw size={15} aria-hidden="true" />
                  <span>{content.closeMemoryLabel}</span>
                </button>
                <button
                  type="button"
                  className="btn-primary-garden petal-mobile-next"
                  onClick={handleNextPetal}
                >
                  <span>{content.nextPetalLabel}</span>
                  <ArrowRight size={16} aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
