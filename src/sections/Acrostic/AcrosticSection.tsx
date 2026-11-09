import { useEffect, useState } from 'react';
import { Heart, Pause, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import type { BirthdayContent } from '../../types/birthday';
import { RevealOnScroll } from '../../animations/RevealOnScroll';
import { BotanicalDivider } from '../../assets/illustrations/BotanicalOrnaments';
import { BotanicalSunflower } from '../../assets/illustrations/BotanicalSunflower';
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref';
import '../PoeticAcrosticSection.css';

interface AcrosticSectionProps {
  content: BirthdayContent['scene7Acrostic'];
}

export function AcrosticSection({ content }: AcrosticSectionProps) {
  const reducedMotion = useReducedMotionPref();
  const [activeGlobalVerse, setActiveGlobalVerse] = useState<number | null>(null);
  const [isAutoReading, setIsAutoReading] = useState(false);

  const totalVerses = content.groups.reduce((acc, g) => acc + g.verses.length, 0);

  useEffect(() => {
    if (!isAutoReading) return;
    const timer = window.setInterval(() => {
      setActiveGlobalVerse((prev) => {
        if (prev === null || prev >= totalVerses - 1) {
          setIsAutoReading(false);
          return null;
        }
        return prev + 1;
      });
    }, 2400);
    return () => window.clearInterval(timer);
  }, [isAutoReading, totalVerses]);

  const handleToggleGuidedReading = () => {
    if (isAutoReading) {
      setIsAutoReading(false);
      setActiveGlobalVerse(null);
    } else {
      setActiveGlobalVerse(0);
      setIsAutoReading(true);
    }
  };

  const scrollToWord = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  return (
    <section
      id="escena-acrostico"
      className="acrostic-section section-shell"
      aria-labelledby="acrostic-section-title"
    >
      <div className="container-editorial">
        <RevealOnScroll className="section-header">
          <p className="section-eyebrow">
            <span className="section-number-tag">{content.sceneNumber}</span>
            <span>·</span>
            <span>{content.eyebrow}</span>
          </p>
          <h2 id="acrostic-section-title" className="section-title">
            {content.title}
          </h2>
          {content.subtitle && (
            <p className="acrostic-main-subtitle shimmer-gold-script">{content.subtitle}</p>
          )}
          <p className="section-intro">{content.intro}</p>

          <div className="acrostic-controls-row">
            <div className="acrostic-word-tabs" role="navigation" aria-label="Bloques de tu nombre">
              {content.groups.map((group) => (
                <button
                  key={group.id}
                  type="button"
                  className="acrostic-word-tab"
                  onClick={() => scrollToWord(group.id)}
                >
                  {group.word}
                </button>
              ))}
            </div>

            <button
              type="button"
              className={`acrostic-illuminate-btn ${isAutoReading ? 'is-active' : ''}`}
              onClick={handleToggleGuidedReading}
              aria-pressed={isAutoReading}
            >
              {isAutoReading ? (
                <>
                  <Pause size={14} aria-hidden="true" />
                  <span>Detener lectura iluminada</span>
                </>
              ) : (
                <>
                  <Sparkles size={14} aria-hidden="true" />
                  <span>Iluminar poema verso a verso</span>
                </>
              )}
            </button>
          </div>
        </RevealOnScroll>

        <div className="acrostic-folios-grid">
          {content.groups.map((group, groupIndex) => (
            <RevealOnScroll
              key={group.id}
              delay={(groupIndex % 2) * 0.08}
              className="acrostic-folio-wrap"
            >
              <article id={group.id} className="acrostic-folio">
                <span className="acrostic-folio__watermark" aria-hidden="true">
                  {group.word.charAt(0)}
                </span>

                <header className="acrostic-folio__header">
                  <span className="acrostic-folio__subtitle">{group.subtitle}</span>
                  <h3 className="acrostic-folio__word" aria-label={group.word}>
                    {group.word.split('').join(' · ')}
                  </h3>
                  <p className="acrostic-folio__theme">{group.themeDescription}</p>
                </header>

                <div className="acrostic-verses">
                  {group.verses.map((item, vIndex) => {
                    const groupOffset = content.groups
                      .slice(0, groupIndex)
                      .reduce((sum, g) => sum + g.verses.length, 0);
                    const globalIdx = groupOffset + vIndex;
                    const isHighlighted = activeGlobalVerse === globalIdx;
                    const firstChar = item.verse.charAt(0);
                    const restOfVerse = item.verse.slice(1);
                    return (
                      <motion.div
                        key={`${group.id}-${vIndex}`}
                        className={`acrostic-line ${isHighlighted ? 'is-highlighted' : ''}`}
                        onClick={() => {
                          setIsAutoReading(false);
                          setActiveGlobalVerse(isHighlighted ? null : globalIdx);
                        }}
                        initial={reducedMotion ? false : { opacity: 0, x: -10 }}
                        whileInView={reducedMotion ? undefined : { opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.4 }}
                        transition={{
                          duration: 0.55,
                          delay: vIndex * 0.06,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      >
                        <span className="acrostic-initial" aria-hidden="true">
                          {item.letter}
                        </span>
                        <p className="acrostic-verse editable-slot">
                          <strong className="acrostic-verse__dropcap">{firstChar}</strong>
                          {restOfVerse}
                        </p>
                      </motion.div>
                    );
                  })}
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        {content.closingDedication && (
          <RevealOnScroll className="acrostic-closing-dedication">
            <div className="acrostic-closing-dedication__flower" aria-hidden="true">
              <BotanicalSunflower size={74} variant="sway" />
            </div>
            <p className="acrostic-closing-dedication__text">{content.closingDedication}</p>
            <span className="acrostic-closing-dedication__tag">
              <Heart size={13} aria-hidden="true" />
              <span>Con todo el amor de tu hijo</span>
            </span>
          </RevealOnScroll>
        )}

        <div className="acrostic-bottom-ornament">
          <BotanicalDivider />
        </div>
      </div>
    </section>
  );
}
