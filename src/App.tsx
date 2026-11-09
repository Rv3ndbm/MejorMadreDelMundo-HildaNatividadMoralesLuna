import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { birthdayContent } from './data/birthday-content';
import { useAudioCoordinator } from './hooks/useAudioCoordinator';
import { useReducedMotionPref } from './hooks/useReducedMotionPref';
import { FloatingPetalsCanvas } from './animations/FloatingPetalsCanvas';
import { ScrollBotanicalConnector } from './animations/ScrollBotanicalConnector';
import { JourneyChrome } from './components/JourneyChrome';
import { WelcomeSection } from './sections/Welcome/WelcomeSection';
import { BirthdaySection } from './sections/Birthday/BirthdaySection';
import { EssenceSection } from './sections/Essence/EssenceSection';
import { MemoriesSection } from './sections/Memories/MemoriesSection';
import { AcademicJourneySection } from './sections/AcademicJourney/AcademicJourneySection';
import { InteractiveGardenSection } from './sections/InteractiveGarden/InteractiveGardenSection';
import { AcrosticSection } from './sections/Acrostic/AcrosticSection';
import { LetterSection } from './sections/Letter/LetterSection';

export function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const reducedMotion = useReducedMotionPref();

  const audio = useAudioCoordinator({
    ambientSrc: birthdayContent.ambientAudio.src,
    fallbackSrc: birthdayContent.ambientAudio.fallbackSrc,
    initialVolume: birthdayContent.ambientAudio.initialVolume,
  });

  const handleEnterGarden = () => {
    audio.startAmbientFromGesture();
    setHasEntered(true);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  const handleReturnToWelcome = () => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
    setHasEntered(false);
  };

  return (
    <>
      <FloatingPetalsCanvas intensity="celebration" />

      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <motion.div
            key="welcome-gate"
            initial={false}
            animate={{ opacity: 1 }}
            exit={
              reducedMotion
                ? { opacity: 0 }
                : { opacity: 0, scale: 1.03, filter: 'blur(6px)' }
            }
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <WelcomeSection
              content={birthdayContent.scene1Welcome}
              onEnterGarden={handleEnterGarden}
            />
          </motion.div>
        ) : (
          <motion.div
            key="main-garden-journey"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <JourneyChrome audio={audio} />

            <main id="contenido-principal">
              <BirthdaySection content={birthdayContent.scene2Birthday} />
              <ScrollBotanicalConnector />

              <EssenceSection content={birthdayContent.scene3Essence} />
              <ScrollBotanicalConnector />

              <MemoriesSection content={birthdayContent.scene4Memories} />
              <ScrollBotanicalConnector />

              <AcademicJourneySection content={birthdayContent.scene5Academic} />
              <ScrollBotanicalConnector />

              <InteractiveGardenSection content={birthdayContent.scene6InteractiveGarden} />
              <ScrollBotanicalConnector />

              <AcrosticSection content={birthdayContent.scene7Acrostic} />
              <ScrollBotanicalConnector />

              <LetterSection
                content={birthdayContent.scene8LetterAndFarewell}
                audioCoordinator={audio}
                onReturnToWelcome={handleReturnToWelcome}
              />
            </main>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
