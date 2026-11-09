import { useRef } from 'react';
import { Award, BookOpen, GraduationCap, Sparkles } from 'lucide-react';
import { motion, useScroll, useSpring } from 'motion/react';
import type { BirthdayContent } from '../../types/birthday';
import { RevealOnScroll } from '../../animations/RevealOnScroll';
import { BotanicalSunflower } from '../../assets/illustrations/BotanicalSunflower';
import {
  BotanicalBranchCorner,
  BotanicalDivider,
} from '../../assets/illustrations/BotanicalOrnaments';
import { SmartPhoto } from '../../components/SmartPhoto';
import './AcademicJourneySection.css';

interface AcademicJourneySectionProps {
  content: BirthdayContent['scene5Academic'];
}

export function AcademicJourneySection({ content }: AcademicJourneySectionProps) {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 80%', 'end 30%'],
  });
  const lineScaleY = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    restDelta: 0.001,
  });

  const getStageIcon = (index: number) => {
    if (index === 0) return <BookOpen size={20} aria-hidden="true" />;
    if (index === 1) return <Award size={20} aria-hidden="true" />;
    return <GraduationCap size={20} aria-hidden="true" />;
  };

  return (
    <section
      id="escena-vocacion"
      className="academic-scene section-shell"
      aria-labelledby="academic-scene-title"
    >
      <div className="container-editorial">
        <RevealOnScroll className="section-header">
          <p className="section-eyebrow">
            <span className="section-number-tag">{content.sceneNumber}</span>
            <span>·</span>
            <span>{content.eyebrow}</span>
          </p>
          <h2 id="academic-scene-title" className="section-title">
            {content.title}
          </h2>
          <p className="section-intro">{content.intro}</p>
        </RevealOnScroll>

        {/* Cita insignia de homenaje a su vocación y constante aprendizaje */}
        <RevealOnScroll className="academic-featured-banner">
          <BotanicalBranchCorner className="academic-banner-corner academic-banner-corner--tl" />
          <BotanicalBranchCorner className="academic-banner-corner academic-banner-corner--br" />
          <div className="academic-featured-banner__flower" aria-hidden="true">
            <BotanicalSunflower size={94} variant="sway" />
          </div>
          <blockquote className="academic-featured-banner__quote">
            {content.featuredQuote}
          </blockquote>
          <span className="academic-featured-banner__ribbon">
            Orgullo de tu hijo
          </span>
        </RevealOnScroll>

        {/* Los 3 momentos narrativos conectados por un tallo dorado que crece con el scroll */}
        <div ref={timelineRef} className="academic-timeline">
          <div className="academic-timeline__rail" aria-hidden="true">
            <motion.div
              className="academic-timeline__progress"
              style={{ scaleY: lineScaleY }}
            />
          </div>

          {content.stages.map((stage, index) => {
            const isReversed = index % 2 === 1;
            const roman = index === 0 ? 'I' : index === 1 ? 'II' : 'III';
            return (
              <RevealOnScroll
                key={stage.id}
                delay={0.08}
                className={`academic-stage-row ${isReversed ? 'is-reversed' : ''}`}
              >
                <div className="academic-stage-medallion" aria-hidden="true">
                  <span>{roman}</span>
                </div>

                <div className="academic-stage-copy">
                  <div className="academic-stage-header">
                    <span className="academic-stage-icon">{getStageIcon(index)}</span>
                    <span className="academic-stage-step">{stage.stepNumber}</span>
                    <span className="academic-stage-badge">{stage.badge}</span>
                  </div>

                  <h3 className="academic-stage-title">{stage.title}</h3>
                  <p className="academic-stage-subtitle">{stage.subtitle}</p>
                  <p className="academic-stage-narrative">{stage.narrative}</p>

                  <div className="academic-stage-highlight">
                    <Sparkles size={16} aria-hidden="true" />
                    <span>{stage.highlightNote}</span>
                  </div>
                </div>

                <figure className="academic-stage-figure">
                  <span className="academic-figure-tape" aria-hidden="true" />
                  <div className="academic-stage-photo">
                    <SmartPhoto
                      src={stage.imageSrc}
                      alt={stage.imageAlt}
                      fallbackLabel={stage.title}
                    />
                  </div>
                  <figcaption className="academic-stage-caption editable-slot">
                    {stage.imageCaption}
                  </figcaption>
                </figure>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Frase de reconocimiento final */}
        <RevealOnScroll className="academic-closing-card">
          <BotanicalDivider className="academic-closing-card__divider" />
          <blockquote className="academic-closing-card__quote">
            {content.closingQuote}
          </blockquote>
        </RevealOnScroll>
      </div>
    </section>
  );
}
