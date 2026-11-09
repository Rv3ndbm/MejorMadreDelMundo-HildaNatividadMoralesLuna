import { useState } from 'react';
import {
  Compass,
  Feather,
  Heart,
  ShieldCheck,
  Sparkles,
  Sun,
  Users,
} from 'lucide-react';
import { motion } from 'motion/react';
import type { BirthdayContent } from '../../types/birthday';
import { RevealOnScroll } from '../../animations/RevealOnScroll';
import { BotanicalSunflower } from '../../assets/illustrations/BotanicalSunflower';
import {
  BotanicalBranchCorner,
  BotanicalDivider,
} from '../../assets/illustrations/BotanicalOrnaments';
import { SmartPhoto } from '../../components/SmartPhoto';
import './EssenceSection.css';

interface EssenceSectionProps {
  content: BirthdayContent['scene3Essence'];
}

export function EssenceSection({ content }: EssenceSectionProps) {
  const [activePillarId, setActivePillarId] = useState<string>(
    content.pillars[0]?.id ?? ''
  );
  const [quoteGlowActive, setQuoteGlowActive] = useState(false);

  const getPillarIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Sun size={18} aria-hidden="true" />;
      case 1:
        return <Compass size={18} aria-hidden="true" />;
      case 2:
        return <Users size={18} aria-hidden="true" />;
      case 3:
        return <Heart size={18} aria-hidden="true" />;
      case 4:
        return <ShieldCheck size={18} aria-hidden="true" />;
      default:
        return <Feather size={18} aria-hidden="true" />;
    }
  };

  return (
    <section
      id="escena-esencia"
      className="essence-scene section-shell"
      aria-labelledby="essence-scene-title"
    >
      <div className="container-editorial">
        <RevealOnScroll className="section-header">
          <p className="section-eyebrow">
            <span className="section-number-tag">{content.sceneNumber}</span>
            <span>·</span>
            <span>{content.eyebrow}</span>
          </p>
          <h2 id="essence-scene-title" className="section-title">
            {content.title}
          </h2>
          <p className="essence-scene__lead">{content.leadParagraph}</p>
          <p className="section-intro">{content.storyParagraph}</p>
        </RevealOnScroll>

        {/* Constelación botánica de sus valores y cualidades */}
        <div className="essence-constellation">
          <div className="essence-constellation__center" aria-hidden="true">
            <div className="essence-constellation__medallion">
              <svg
                className="essence-mandala-ring botanical-halo-ring--reverse"
                viewBox="0 0 220 220"
                width="200"
                height="200"
              >
                <circle
                  cx="110"
                  cy="110"
                  r="102"
                  fill="none"
                  stroke="#D99A22"
                  strokeOpacity="0.34"
                  strokeWidth="1"
                  strokeDasharray="4 5"
                />
              </svg>
              <BotanicalSunflower size={138} variant="sway" />
              <span className="essence-constellation__center-label shimmer-gold-script">
                Tu esencia
              </span>
            </div>
          </div>

          <div className="essence-pillars-grid">
            {content.pillars.map((pillar, idx) => {
              const isHighlighted = pillar.id === activePillarId;
              return (
                <RevealOnScroll key={pillar.id} delay={(idx % 3) * 0.08}>
                  <motion.article
                    className={`essence-pillar-card ${isHighlighted ? 'is-highlighted' : ''}`}
                    onClick={() => setActivePillarId(pillar.id)}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <div className="essence-pillar-card__top">
                      <span className="essence-pillar-card__icon-badge">
                        {getPillarIcon(idx)}
                      </span>
                      <span className="essence-pillar-card__virtue">{pillar.virtues}</span>
                      <span className="essence-pillar-card__num">0{idx + 1}</span>
                    </div>
                    <h3 className="essence-pillar-card__title">{pillar.keyword}</h3>
                    <p className="essence-pillar-card__desc">{pillar.description}</p>
                  </motion.article>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>

        {/* Homenaje a su papel como madre + Frase inolvidable */}
        <RevealOnScroll className="motherhood-tribute-box">
          <BotanicalBranchCorner className="motherhood-corner motherhood-corner--tl" />
          <BotanicalBranchCorner className="motherhood-corner motherhood-corner--br" />

          <div className="motherhood-tribute__grid">
            <div className="motherhood-tribute__narrative">
              <span className="section-eyebrow">{content.motherhoodTribute.eyebrow}</span>
              <h3 className="motherhood-tribute__title">{content.motherhoodTribute.title}</h3>
              {content.motherhoodTribute.paragraphs.map((p, idx) => (
                <p key={idx} className="motherhood-tribute__paragraph">
                  {p}
                </p>
              ))}
            </div>

            {/* Rincón especial emotivo e interactivo para su frase insignia */}
            <aside
              className={`magic-child-quote-card ${quoteGlowActive ? 'is-illuminated' : ''}`}
              aria-label="Enseñanza especial de mamá"
            >
              <div className="magic-child-quote-card__badge">
                <Sparkles size={15} aria-hidden="true" />
                <span>Una enseñanza tuya que llevo en el alma</span>
              </div>

              {content.motherhoodTribute.specialQuoteImageSrc && (
                <div className="magic-child-quote-card__photo">
                  <SmartPhoto
                    src={content.motherhoodTribute.specialQuoteImageSrc}
                    alt={
                      content.motherhoodTribute.specialQuoteImageAlt ||
                      'La magia de ser niño junto a mamá'
                    }
                    fallbackLabel="La magia de ser niño"
                  />
                </div>
              )}

              <blockquote className="magic-child-quote-card__quote">
                {content.motherhoodTribute.specialQuote}
              </blockquote>

              <BotanicalDivider className="magic-child-quote-card__divider" />

              <p className="magic-child-quote-card__context">
                {content.motherhoodTribute.specialQuoteContext}
              </p>

              <button
                type="button"
                className="magic-child-quote-card__spark-btn"
                onClick={() => setQuoteGlowActive((prev) => !prev)}
                aria-pressed={quoteGlowActive}
              >
                <Sparkles size={14} aria-hidden="true" />
                <span>
                  {quoteGlowActive
                    ? 'La magia sigue brillando en nosotros ✨'
                    : 'Hacer brillar esta enseñanza'}
                </span>
              </button>
            </aside>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
