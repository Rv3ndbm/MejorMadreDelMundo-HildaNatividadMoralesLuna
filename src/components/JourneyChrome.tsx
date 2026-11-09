import { useEffect, useState } from 'react';
import { Compass, Music, Volume2, VolumeX, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { AudioCoordinator } from '../hooks/useAudioCoordinator';
import './JourneyChrome.css';

interface NavChapter {
  id: string;
  numeral: string;
  label: string;
}

const CHAPTERS: NavChapter[] = [
  { id: 'escena-celebracion', numeral: 'I', label: '43 años floreciendo' },
  { id: 'escena-esencia', numeral: 'II', label: 'Su esencia y enseñanzas' },
  { id: 'escena-recuerdos', numeral: 'III', label: 'Álbum de recuerdos' },
  { id: 'escena-vocacion', numeral: 'IV', label: 'Docente y maestría' },
  { id: 'escena-jardin', numeral: 'V', label: 'El jardín interactivo' },
  { id: 'escena-acrostico', numeral: 'VI', label: 'Acróstico en 25 versos' },
  { id: 'escena-carta', numeral: 'VII', label: 'Carta y canción final' },
];

interface JourneyChromeProps {
  audio: AudioCoordinator;
}

export function JourneyChrome({ audio }: JourneyChromeProps) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeChapterId, setActiveChapterId] = useState(CHAPTERS[0].id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [volumePanelOpen, setVolumePanelOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const updateScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = docHeight > 0 ? Math.min(1, Math.max(0, scrollTop / docHeight)) : 0;
      setScrollProgress(ratio);

      const probeY = scrollTop + window.innerHeight * 0.36;
      for (let i = CHAPTERS.length - 1; i >= 0; i--) {
        const el = document.getElementById(CHAPTERS[i].id);
        if (el && el.offsetTop <= probeY) {
          setActiveChapterId(CHAPTERS[i].id);
          break;
        }
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScroll);
        ticking = true;
      }
    };

    updateScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const handleNavigate = (id: string) => {
    setMenuOpen(false);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const soundActive = audio.isAmbientPlaying && !audio.isMuted && audio.ambientVolume > 0.01;

  return (
    <>
      <div
        className="journey-progress-track"
        role="progressbar"
        aria-label="Progreso del recorrido por el jardín"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(scrollProgress * 100)}
      >
        <div
          className="journey-progress-bar"
          style={{ transform: `scaleX(${scrollProgress})` }}
        />
      </div>

      <header className="journey-topbar" aria-label="Controles del recorrido">
        <button
          type="button"
          className="journey-pill journey-pill--chapters"
          onClick={() => {
            setMenuOpen((prev) => !prev);
            setVolumePanelOpen(false);
          }}
          aria-expanded={menuOpen}
          aria-controls="chapters-drawer"
        >
          {menuOpen ? <X size={16} aria-hidden="true" /> : <Compass size={16} aria-hidden="true" />}
          <span>Escenas</span>
        </button>

        <div className="journey-audio-group">
          <button
            type="button"
            className={`journey-pill journey-pill--audio ${soundActive ? 'is-playing' : ''}`}
            onClick={audio.toggleAmbient}
            aria-pressed={soundActive}
            aria-label={
              audio.isSuppressedBySpotify
                ? 'Música de fondo (Clocks) en pausa por la canción dedicada. Pulsa para volver a escuchar Clocks de Coldplay'
                : soundActive
                  ? 'Pausar música de fondo (Coldplay - Clocks)'
                  : 'Reanudar música de fondo (Coldplay - Clocks)'
            }
          >
            {audio.isSuppressedBySpotify ? (
              <>
                <Music size={16} aria-hidden="true" />
                <span className="journey-audio-text">Canción dedicada</span>
              </>
            ) : soundActive ? (
              <>
                <span className="sound-bars" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </span>
                <span className="journey-audio-text">Clocks · Activa</span>
              </>
            ) : (
              <>
                <VolumeX size={16} aria-hidden="true" />
                <span className="journey-audio-text">Melodía en pausa</span>
              </>
            )}
          </button>

          <button
            type="button"
            className="journey-pill journey-pill--icon"
            onClick={() => {
              setVolumePanelOpen((prev) => !prev);
              setMenuOpen(false);
            }}
            aria-expanded={volumePanelOpen}
            aria-label="Ajustar volumen o silenciar melodía ambiental"
          >
            {audio.isMuted ? (
              <VolumeX size={16} aria-hidden="true" />
            ) : (
              <Volume2 size={16} aria-hidden="true" />
            )}
          </button>

          <AnimatePresence>
            {volumePanelOpen && (
              <motion.div
                className="journey-volume-popover"
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.2 }}
              >
                <div className="journey-volume-popover__row">
                  <label htmlFor="ambient-volume-slider" className="journey-volume-label">
                    Volumen ({Math.round((audio.isMuted ? 0 : audio.ambientVolume) * 100)}%)
                  </label>
                  <button
                    type="button"
                    className="journey-volume-close"
                    onClick={() => setVolumePanelOpen(false)}
                    aria-label="Cerrar control de volumen"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                </div>
                <input
                  id="ambient-volume-slider"
                  type="range"
                  min={0}
                  max={1}
                  step={0.02}
                  value={audio.isMuted ? 0 : audio.ambientVolume}
                  onChange={(e) => audio.setAmbientVolume(Number(e.target.value))}
                  className="journey-volume-slider"
                />
                <div style={{ marginTop: '0.55rem', display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    type="button"
                    className="journey-mute-inline"
                    onClick={audio.toggleMute}
                    style={{
                      fontSize: '0.76rem',
                      color: 'var(--color-olive)',
                      fontWeight: 600,
                      padding: '0.2rem 0',
                    }}
                  >
                    {audio.isMuted ? 'Reactivar sonido' : 'Silenciar temporalmente'}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="journey-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.nav
              id="chapters-drawer"
              aria-label="Escenas de la experiencia"
              className="journey-drawer"
              initial={{ opacity: 0, y: -12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.98 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="journey-drawer__title">Escenas del jardín</p>
              <ul className="journey-drawer__list">
                {CHAPTERS.map((chap) => {
                  const isActive = chap.id === activeChapterId;
                  return (
                    <li key={chap.id}>
                      <button
                        type="button"
                        className={`journey-drawer__link ${isActive ? 'is-active' : ''}`}
                        onClick={() => handleNavigate(chap.id)}
                        aria-current={isActive ? 'true' : undefined}
                      >
                        <span className="journey-drawer__num">{chap.numeral}</span>
                        <span>{chap.label}</span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
