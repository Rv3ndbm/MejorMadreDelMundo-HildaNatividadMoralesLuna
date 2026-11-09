import { Sparkles, Volume2 } from 'lucide-react';
import { motion } from 'motion/react';
import type { BirthdayContent } from '../../types/birthday';
import { BotanicalSunflower } from '../../assets/illustrations/BotanicalSunflower';
import {
  BotanicalBranchCorner,
  BotanicalDivider,
} from '../../assets/illustrations/BotanicalOrnaments';
import { useReducedMotionPref } from '../../hooks/useReducedMotionPref';
import '../WelcomeSection.css';

interface WelcomeSectionProps {
  content: BirthdayContent['scene1Welcome'];
  onEnterGarden: () => void;
}

export function WelcomeSection({ content, onEnterGarden }: WelcomeSectionProps) {
  const reducedMotion = useReducedMotionPref();

  return (
    <section className="welcome-screen" aria-labelledby="welcome-heading">
      <div className="welcome-ambient-orb welcome-ambient-orb--1" aria-hidden="true" />
      <div className="welcome-ambient-orb welcome-ambient-orb--2" aria-hidden="true" />

      <BotanicalBranchCorner className="welcome-corner welcome-corner--tl" />
      <BotanicalBranchCorner className="welcome-corner welcome-corner--br" />

      <div className="welcome-sunflower-decor welcome-sunflower-decor--left" aria-hidden="true">
        <BotanicalSunflower size={260} variant="sway" withStem />
      </div>
      <div className="welcome-sunflower-decor welcome-sunflower-decor--right" aria-hidden="true">
        <BotanicalSunflower size={245} variant="sway" withStem />
      </div>

      <motion.div
        className="welcome-card-frame"
        initial={reducedMotion ? false : { opacity: 0, y: 20, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Halo botánico astrolabio giratorio detrás del girasol central */}
        <div className="welcome-emblem-stage">
          <svg
            className="welcome-astrolabe botanical-halo-ring"
            viewBox="0 0 220 220"
            width="206"
            height="206"
            aria-hidden="true"
          >
            <circle
              cx="110"
              cy="110"
              r="102"
              fill="none"
              stroke="#D99A22"
              strokeOpacity="0.32"
              strokeWidth="1"
              strokeDasharray="3 5"
            />
            <circle
              cx="110"
              cy="110"
              r="88"
              fill="none"
              stroke="#596B38"
              strokeOpacity="0.22"
              strokeWidth="0.9"
            />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <circle
                key={deg}
                cx="110"
                cy="8"
                r="2.4"
                fill="#D99A22"
                fillOpacity="0.65"
                transform={`rotate(${deg} 110 110)`}
              />
            ))}
          </svg>

          <motion.div
            className="welcome-emblem"
            initial={reducedMotion ? false : { opacity: 0, scale: 0.48, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            whileHover={reducedMotion ? undefined : { scale: 1.07, rotate: 6 }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={onEnterGarden}
            style={{ cursor: 'pointer' }}
            title="Entrar a mi jardín"
          >
            <BotanicalSunflower size={146} variant="bloom" />
          </motion.div>
        </div>

        <motion.p
          className="welcome-eyebrow"
          initial={reducedMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
        >
          <Sparkles size={13} aria-hidden="true" style={{ color: 'var(--color-honey)' }} />
          <span>{content.sceneLabel}</span>
          <Sparkles size={13} aria-hidden="true" style={{ color: 'var(--color-honey)' }} />
        </motion.p>

        <motion.h1
          id="welcome-heading"
          className="welcome-title"
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}
        >
          «{content.title}»
        </motion.h1>

        <motion.p
          className="welcome-subtitle-script shimmer-gold-script"
          initial={reducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.38, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.subtitle}
        </motion.p>

        <motion.div
          initial={reducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.75, delay: 0.46 }}
        >
          <BotanicalDivider className="welcome-divider" />
        </motion.div>

        <motion.p
          className="welcome-phrase"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.54, ease: [0.22, 1, 0.36, 1] }}
        >
          {content.invitationText}
        </motion.p>

        <motion.div
          className="welcome-actions"
          initial={reducedMotion ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            type="button"
            className="btn-primary-garden welcome-enter-btn"
            onClick={onEnterGarden}
          >
            <Sparkles size={18} aria-hidden="true" />
            <span>{content.enterButtonLabel}</span>
          </button>

          <p className="welcome-audio-hint">
            <Volume2 size={14} aria-hidden="true" />
            <span>{content.audioHint}</span>
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
