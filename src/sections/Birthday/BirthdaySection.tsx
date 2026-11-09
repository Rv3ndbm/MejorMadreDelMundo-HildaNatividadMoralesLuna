import { useState } from 'react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import type { BirthdayContent } from '../../types/birthday';
import { BotanicalSunflower } from '../../assets/illustrations/BotanicalSunflower';
import { BotanicalDivider } from '../../assets/illustrations/BotanicalOrnaments';
import { SmartPhoto } from '../../components/SmartPhoto';
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref';
import './BirthdaySection.css';

interface BirthdaySectionProps {
  content: BirthdayContent['scene2Birthday'];
}

export function BirthdaySection({ content }: BirthdaySectionProps) {
  const reducedMotion = useReducedMotionPref();
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0 });

  const scrollToNext = () => {
    document.getElementById('escena-esencia')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (reducedMotion) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({
      rotateX: Number((-y * 8).toFixed(2)),
      rotateY: Number((x * 8).toFixed(2)),
    });
  };

  const resetTilt = () => setTilt({ rotateX: 0, rotateY: 0 });

  return (
    <section
      id="escena-celebracion"
      className="birthday-scene section-shell"
      aria-labelledby="birthday-scene-title"
    >
      <div className="birthday-scene__halo" aria-hidden="true" />
      <span className="birthday-scene__watermark" aria-hidden="true">
        43
      </span>

      <div className="container-editorial birthday-scene__container">
        <div className="birthday-scene__grid">
          {/* Columna narrativa y tipográfica protagonista */}
          <div className="birthday-scene__copy">
            <motion.p
              className="section-eyebrow"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.48, delay: 0.02 }}
            >
              <span className="section-number-tag">{content.sceneNumber}</span>
              <span>·</span>
              <span>{content.eyebrow}</span>
            </motion.p>

            <motion.div
              className="birthday-scene__sunflower-badge"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, delay: 0.05 }}
            >
              <BotanicalSunflower size={156} variant="bloom" />
            </motion.div>

            <motion.h2
              id="birthday-scene-title"
              className="birthday-scene__title"
              initial={reducedMotion ? false : { opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.08 }}
            >
              {content.greetingTitle}
            </motion.h2>

            <motion.p
              className="birthday-scene__subtitle shimmer-gold-script"
              initial={reducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.12 }}
            >
              {content.conceptSubtitle}
            </motion.p>

            <div className="birthday-scene__divider">
              <BotanicalDivider />
            </div>

            <motion.div
              className="birthday-scene__lead-card"
              initial={reducedMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16 }}
            >
              <p className="birthday-scene__lead">{content.celebrationLead}</p>
              <p className="birthday-scene__body">{content.celebrationBody}</p>
            </motion.div>
          </div>

          {/* Retrato editorial enmarcado con inclinación 3D sutil y sello de 43 años */}
          <motion.div
            className="birthday-scene__portrait-col"
            initial={reducedMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <div
              className="birthday-portrait-stage"
              onMouseMove={handleMouseMove}
              onMouseLeave={resetTilt}
            >
              <div className="birthday-portrait-stage__sunflower-mini" aria-hidden="true">
                <BotanicalSunflower size={86} variant="sway" />
              </div>

              <span className="birthday-portrait-seal">
                <Sparkles size={13} aria-hidden="true" />
                <span>43 primaveras de luz</span>
              </span>

              <figure
                className="birthday-portrait-frame"
                style={{
                  transform: `perspective(900px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                }}
              >
                <span className="birthday-portrait-frame__corner birthday-portrait-frame__corner--tl" />
                <span className="birthday-portrait-frame__corner birthday-portrait-frame__corner--tr" />
                <span className="birthday-portrait-frame__corner birthday-portrait-frame__corner--bl" />
                <span className="birthday-portrait-frame__corner birthday-portrait-frame__corner--br" />

                <div className="birthday-portrait-frame__photo">
                  <SmartPhoto
                    src={content.portraitSrc}
                    alt={content.portraitAlt}
                    eager
                    fallbackLabel="Retrato de Hilda Natividad"
                  />
                </div>
                <figcaption className="birthday-portrait-frame__caption">
                  {content.portraitCaption}
                </figcaption>
              </figure>
            </div>
          </motion.div>
        </div>

        <div className="birthday-scene__scroll-wrap">
          <button
            type="button"
            className="birthday-scene__scroll-btn"
            onClick={scrollToNext}
            aria-label="Continuar hacia la escena de su esencia"
          >
            <span>Descubrir la luz que te hace única</span>
            <ChevronDown size={18} className="birthday-scene__chevron" aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
