import { useEffect, useRef, useState } from 'react';
import {
  ArrowUp,
  Disc3,
  Heart,
  MailOpen,
  Minimize2,
  Music,
  Pause,
  Play,
  RotateCcw,
  SkipBack,
  SkipForward,
  Sparkles,
  Volume2,
  VolumeX,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { BirthdayContent } from '../../types/birthday';
import type { AudioCoordinator } from '../../hooks/useAudioCoordinator';
import { RevealOnScroll } from '../../animations/RevealOnScroll';
import { BotanicalSunflower } from '../../assets/illustrations/BotanicalSunflower';
import {
  BotanicalBranchCorner,
  BotanicalDivider,
  SunflowerWaxSeal,
} from '../../assets/illustrations/BotanicalOrnaments';
import { SmartPhoto } from '../../components/SmartPhoto';
import { resolvePublicPath } from '../../utils/assetPath';
import '../SonLetterSection.css';
import './LetterSection.css';

interface LetterSectionProps {
  content: BirthdayContent['scene8LetterAndFarewell'];
  audioCoordinator: AudioCoordinator;
  onReturnToWelcome: () => void;
}

const TARGET_BLESSINGS = 43;

const EQUALIZER_BARS = [
  0.42, 0.75, 0.58, 0.92, 0.64, 0.86, 0.48, 0.96, 0.7, 0.54, 0.88, 0.62,
  0.94, 0.52, 0.8, 0.68, 0.9, 0.46, 0.78, 0.6, 0.84, 0.5, 0.72, 0.44,
];

interface ClickBurst {
  id: number;
  count: number;
  offsetX: number;
}

function formatAudioTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const totalSeconds = Math.floor(seconds);
  const mins = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
}

export function LetterSection({
  content,
  audioCoordinator,
  onReturnToWelcome,
}: LetterSectionProps) {
  const [isOpened, setIsOpened] = useState(false);
  const [blessingCount, setBlessingCount] = useState(0);
  const [bloom43Open, setBloom43Open] = useState(false);
  const [bloomReplayKey, setBloomReplayKey] = useState(0);
  const [clickBursts, setClickBursts] = useState<ClickBurst[]>([]);
  const burstIdRef = useRef(0);

  const handleBlessingClick = () => {
    const next = blessingCount + 1;
    setBlessingCount(next);

    // Crear partícula flotante de girasol en cada clic
    const id = ++burstIdRef.current;
    const offsetX = ((id * 37) % 160) - 80;
    setClickBursts((prev) => [...prev.slice(-8), { id, count: next, offsetX }]);

    // Al llegar exactamente a 43 (o en múltiplos de 43) se despliega el girasol especial
    if (next === TARGET_BLESSINGS) {
      setBloomReplayKey((k) => k + 1);
      setBloom43Open(true);
    }
  };

  const handleOpenBloomModal = () => {
    setBloomReplayKey((k) => k + 1);
    setBloom43Open(true);
  };

  useEffect(() => {
    if (!bloom43Open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setBloom43Open(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [bloom43Open]);

  // Estado del reproductor dedicado de girasoles (Ricardo Arjona)
  const dedicationAudioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlayingDedication, setIsPlayingDedication] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [dedicationVolume, setDedicationVolume] = useState(0.88);
  const [isDedicationMuted, setIsDedicationMuted] = useState(false);
  const [isAudioReady, setIsAudioReady] = useState(false);

  const dedication = content.spotifyDedication;
  const resolvedAudioSrc = resolvePublicPath(dedication.audioSrc);

  // Registrar el elemento <audio> de la dedicatoria con el coordinador ambiental
  useEffect(() => {
    const audioEl = dedicationAudioRef.current;
    audioCoordinator.registerDedicationAudio(audioEl);
    if (audioEl) {
      audioEl.volume = dedicationVolume;
    }
    return () => {
      audioCoordinator.registerDedicationAudio(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audioCoordinator]);

  const handleTogglePlayDedication = () => {
    const audioEl = dedicationAudioRef.current;
    if (!audioEl) return;

    if (audioEl.paused) {
      // Frenamos inmediatamente la canción de fondo (Coldplay - Clocks) antes de sonar Ricardo Arjona
      audioCoordinator.attenuateForSpotify();
      audioEl
        .play()
        .then(() => {
          setIsPlayingDedication(true);
        })
        .catch(() => {
          setIsPlayingDedication(false);
        });
    } else {
      audioEl.pause();
      setIsPlayingDedication(false);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextTime = Number(e.target.value);
    setCurrentTime(nextTime);
    if (dedicationAudioRef.current) {
      dedicationAudioRef.current.currentTime = nextTime;
    }
  };

  const handleSkipSeconds = (delta: number) => {
    const audioEl = dedicationAudioRef.current;
    if (!audioEl) return;
    const maxTime = Number.isFinite(audioEl.duration) ? audioEl.duration : duration || 0;
    const next = Math.max(0, Math.min(maxTime || Infinity, audioEl.currentTime + delta));
    audioEl.currentTime = next;
    setCurrentTime(next);
  };

  const handleRestartDedication = () => {
    const audioEl = dedicationAudioRef.current;
    if (!audioEl) return;
    audioEl.currentTime = 0;
    setCurrentTime(0);
    if (audioEl.paused) {
      audioCoordinator.attenuateForSpotify();
      audioEl
        .play()
        .then(() => setIsPlayingDedication(true))
        .catch(() => {});
    }
  };

  const handleDedicationVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nextVol = Math.max(0, Math.min(1, Number(e.target.value)));
    setDedicationVolume(nextVol);
    const audioEl = dedicationAudioRef.current;
    if (audioEl) {
      audioEl.volume = nextVol;
      if (nextVol === 0) {
        audioEl.muted = true;
        setIsDedicationMuted(true);
      } else if (isDedicationMuted) {
        audioEl.muted = false;
        setIsDedicationMuted(false);
      }
    }
  };

  const handleToggleDedicationMute = () => {
    const audioEl = dedicationAudioRef.current;
    if (!audioEl) return;
    const nextMuted = !isDedicationMuted;
    audioEl.muted = nextMuted;
    setIsDedicationMuted(nextMuted);
  };

  const handleSwitchBackToAmbient = () => {
    const audioEl = dedicationAudioRef.current;
    if (audioEl && !audioEl.paused) {
      audioEl.pause();
    }
    setIsPlayingDedication(false);
    audioCoordinator.restoreFromSpotify();
  };

  const handleBackToTop = () => {
    if (!isPlayingDedication) {
      audioCoordinator.restoreFromSpotify();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progressPercent =
    duration > 0 ? Math.min(100, Math.max(0, (currentTime / duration) * 100)) : 0;

  return (
    <section
      id="escena-carta"
      className="letter-section section-shell"
      aria-labelledby="letter-section-title"
    >
      <div className="container-editorial">
        <RevealOnScroll className="section-header">
          <p className="section-eyebrow">
            <span className="section-number-tag">{content.sceneNumber}</span>
            <span>·</span>
            <Heart size={13} aria-hidden="true" />
            <span>{content.eyebrow}</span>
          </p>
          <h2 id="letter-section-title" className="section-title">
            {content.title}
          </h2>
        </RevealOnScroll>

        {/* PARTE 1: LA CARTA PERSONAL DE SU HIJO */}
        <div className="letter-stage-container">
          <AnimatePresence mode="wait">
            {!isOpened ? (
              <motion.div
                key="sealed-envelope"
                className="envelope-card"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96, y: -12 }}
                transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="envelope-flap-lines" aria-hidden="true" />

                {/* Estampilla postal botánica artesanal */}
                <div className="envelope-postage-stamp" aria-hidden="true">
                  <span className="envelope-postage-stamp__top">CORREO DEL JARDÍN</span>
                  <strong className="envelope-postage-stamp__age">43 AÑOS</strong>
                  <span className="envelope-postage-stamp__sub">DE TU HIJO</span>
                </div>

                <span className="envelope-eyebrow-tag">Correspondencia personal sellada</span>
                <p className="envelope-recipient">{content.envelopeLabel}</p>

                <div
                  className="envelope-seal-btn"
                  onClick={() => setIsOpened(true)}
                  aria-hidden="true"
                >
                  <span className="envelope-seal-halo" />
                  <SunflowerWaxSeal className="envelope-wax-svg" />
                </div>

                <button
                  type="button"
                  className="btn-primary-garden envelope-open-cta"
                  onClick={() => setIsOpened(true)}
                >
                  <MailOpen size={18} aria-hidden="true" />
                  <span>{content.openLetterButton}</span>
                </button>
              </motion.div>
            ) : (
              <motion.article
                key="opened-letter"
                className="stationery-sheet"
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 14, scale: 0.98 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              >
                <BotanicalBranchCorner className="stationery-corner stationery-corner--tr" />
                <BotanicalBranchCorner className="stationery-corner stationery-corner--bl" />

                <div className="stationery-top-actions">
                  <span className="stationery-date-note">
                    Con todo mi amor de hijo · 43 años floreciendo
                  </span>
                  <button
                    type="button"
                    className="stationery-fold-btn"
                    onClick={() => setIsOpened(false)}
                  >
                    <Minimize2 size={14} aria-hidden="true" />
                    <span>{content.foldLetterButton}</span>
                  </button>
                </div>

                <div className="stationery-layout">
                  <aside className="stationery-polaroid-aside">
                    <figure className="stationery-polaroid">
                      <span className="stationery-tape" aria-hidden="true" />
                      <div className="stationery-polaroid__photo">
                        <SmartPhoto
                          src={content.photoSrc}
                          alt={content.photoAlt}
                          eager
                          fallbackLabel="Mamá y yo juntos"
                        />
                      </div>
                      <figcaption className="stationery-polaroid__caption editable-slot">
                        {content.photoCaption}
                      </figcaption>
                      <span className="stationery-polaroid__badge">
                        Una fotografía juntos · Mamá y su hijo
                      </span>
                    </figure>
                  </aside>

                  <div className="stationery-body">
                    <h3 className="stationery-salutation">{content.salutation}</h3>

                    <div className="stationery-paragraphs">
                      {content.letterParagraphs.map((paragraph, idx) => (
                        <motion.p
                          key={idx}
                          className="stationery-paragraph editable-slot"
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.48,
                            delay: 0.1 + idx * 0.08,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                        >
                          {paragraph}
                        </motion.p>
                      ))}
                    </div>

                    <div className="stationery-signature-block">
                      <p className="stationery-closing">{content.signatureClosing}</p>
                      <p className="stationery-signature shimmer-gold-script editable-slot">
                        {content.signatureName}
                      </p>
                    </div>

                    <div className="stationery-divider">
                      <BotanicalDivider />
                    </div>
                  </div>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>

        {/* PARTE 2: REPRODUCTOR DE GIRASOLES DEDICADO — RICARDO ARJONA */}
        <RevealOnScroll className="sunflower-player-wrapper">
          <div
            className={`sunflower-player-card ${isPlayingDedication ? 'is-playing' : ''}`}
          >
            {/* Audio nativo oculto para la canción dedicada */}
            <audio
              ref={dedicationAudioRef}
              src={resolvedAudioSrc}
              preload="metadata"
              onPlay={() => {
                audioCoordinator.attenuateForSpotify();
                setIsPlayingDedication(true);
              }}
              onPause={() => setIsPlayingDedication(false)}
              onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
              onLoadedMetadata={(e) => {
                const dur = e.currentTarget.duration;
                if (Number.isFinite(dur) && dur > 0) {
                  setDuration(dur);
                }
                setIsAudioReady(true);
              }}
              onDurationChange={(e) => {
                const dur = e.currentTarget.duration;
                if (Number.isFinite(dur) && dur > 0) {
                  setDuration(dur);
                }
              }}
              onCanPlay={() => setIsAudioReady(true)}
              onEnded={() => {
                setIsPlayingDedication(false);
                setCurrentTime(0);
              }}
            />

            {/* Ornamentos botánicos de girasoles en las esquinas */}
            <BotanicalBranchCorner className="sunflower-player-corner sunflower-player-corner--tl" />
            <BotanicalBranchCorner className="sunflower-player-corner sunflower-player-corner--br" />

            <div className="sunflower-player-bg-bloom sunflower-player-bg-bloom--left" aria-hidden="true">
              <BotanicalSunflower size={140} variant="sway" />
            </div>
            <div className="sunflower-player-bg-bloom sunflower-player-bg-bloom--right" aria-hidden="true">
              <BotanicalSunflower size={125} variant="sway" />
            </div>

            {/* Cabecera del reproductor */}
            <div className="sunflower-player-header">
              <span className="section-eyebrow sunflower-player-eyebrow">
                <Music size={14} aria-hidden="true" />
                <span>{dedication.sectionEyebrow}</span>
              </span>
              <h3 className="sunflower-player-title">{dedication.title}</h3>
              <p className="sunflower-player-intro">{dedication.introNote}</p>

              {/* Indicador dinámico de coordinación entre Coldplay y Ricardo Arjona */}
              <div className="sunflower-player-status-row">
                {isPlayingDedication ? (
                  <span className="sunflower-status-pill is-dedication-active">
                    <span className="sunflower-status-dot is-pulsing" aria-hidden="true" />
                    <Sparkles size={14} aria-hidden="true" />
                    <span>
                      Sonando tu dedicatoria · «{dedication.ambientTrackName || 'Coldplay — Clocks'}» en pausa
                    </span>
                  </span>
                ) : audioCoordinator.isAmbientPlaying && !audioCoordinator.isMuted ? (
                  <span className="sunflower-status-pill is-ambient-active">
                    <Volume2 size={14} aria-hidden="true" />
                    <span>
                      Sonando de fondo: «{dedication.ambientTrackName || 'Coldplay — Clocks'}» · Se detendrá al reproducir tu canción
                    </span>
                  </span>
                ) : (
                  <span className="sunflower-status-pill">
                    <Disc3 size={14} aria-hidden="true" />
                    <span>Reproductor listo · Pulsa reproducir para escuchar tu canción dedicada</span>
                  </span>
                )}
              </div>
            </div>

            {/* Escenario principal del reproductor: Tocadiscos de Girasol + Controles */}
            <div className="sunflower-player-deck">
              {/* Columna Izquierda: Tocadiscos de Vinilo y Corona de Girasol */}
              <div className="sunflower-turntable-stage">
                <div className="sunflower-turntable-frame">
                  {/* Corona de girasol botánico detrás del disco */}
                  <div className="sunflower-turntable-crown" aria-hidden="true">
                    <BotanicalSunflower size={248} variant="still" />
                  </div>

                  {/* Halo astrolabio dorado exterior */}
                  <svg
                    className="sunflower-turntable-halo botanical-halo-ring"
                    viewBox="0 0 260 260"
                    aria-hidden="true"
                  >
                    <circle
                      cx="130"
                      cy="130"
                      r="122"
                      fill="none"
                      stroke="#D99A22"
                      strokeOpacity="0.42"
                      strokeWidth="1.1"
                      strokeDasharray="4 6"
                    />
                    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                      <circle
                        key={deg}
                        cx="130"
                        cy="8"
                        r="3"
                        fill="#F4C542"
                        stroke="#9B6810"
                        strokeWidth="0.6"
                        transform={`rotate(${deg} 130 130)`}
                      />
                    ))}
                  </svg>

                  {/* Disco de vinilo artesanal con medallón de girasol y foto */}
                  <div
                    className={`sunflower-vinyl-record ${isPlayingDedication ? 'is-spinning' : ''}`}
                    onClick={handleTogglePlayDedication}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleTogglePlayDedication();
                      }
                    }}
                    aria-label={
                      isPlayingDedication
                        ? `Pausar ${dedication.songTitle}`
                        : `Reproducir ${dedication.songTitle}`
                    }
                  >
                    <div className="sunflower-vinyl-grooves" aria-hidden="true" />
                    <div className="sunflower-vinyl-sheen" aria-hidden="true" />

                    {/* Corona interna de pétalos dorados alrededor del sello central */}
                    <svg
                      className="sunflower-vinyl-petals-ring"
                      viewBox="0 0 140 140"
                      aria-hidden="true"
                    >
                      <g transform="translate(70, 70)">
                        {Array.from({ length: 16 }, (_, idx) => idx * 22.5).map((angle) => (
                          <ellipse
                            key={angle}
                            cx="0"
                            cy="-46"
                            rx="5.2"
                            ry="13"
                            fill="#F4C542"
                            stroke="#C98A18"
                            strokeWidth="0.7"
                            transform={`rotate(${angle})`}
                          />
                        ))}
                      </g>
                    </svg>

                    {/* Medallón fotográfico central */}
                    <div className="sunflower-vinyl-label">
                      {dedication.coverImageSrc ? (
                        <SmartPhoto
                          src={dedication.coverImageSrc}
                          alt={dedication.coverImageAlt || dedication.songTitle}
                          className="sunflower-vinyl-photo"
                          eager
                          fallbackLabel="Mamá y yo"
                        />
                      ) : null}
                      <span className="sunflower-vinyl-spindle" aria-hidden="true" />
                    </div>
                  </div>

                  {/* Brazo fonocaptor dorado con flor de girasol */}
                  <div
                    className={`sunflower-tonearm ${isPlayingDedication ? 'is-engaged' : ''}`}
                    aria-hidden="true"
                  >
                    <div className="sunflower-tonearm__pivot">
                      <span className="sunflower-tonearm__pivot-core" />
                    </div>
                    <div className="sunflower-tonearm__rod" />
                    <div className="sunflower-tonearm__headshell" />
                  </div>

                  {/* Notas musicales doradas flotantes al reproducir */}
                  <div
                    className={`sunflower-floating-notes ${isPlayingDedication ? 'is-active' : ''}`}
                    aria-hidden="true"
                  >
                    <span className="sunflower-note sunflower-note--1">♪</span>
                    <span className="sunflower-note sunflower-note--2">♫</span>
                    <span className="sunflower-note sunflower-note--3">🌻</span>
                  </div>
                </div>

                <span className="sunflower-turntable-caption">
                  {isPlayingDedication
                    ? 'Girando al compás de tu canción · Pulsa el disco para pausar'
                    : 'Pulsa sobre el girasol o el botón para escuchar tu dedicatoria'}
                </span>
              </div>

              {/* Columna Derecha: Información de la canción, verso y controles */}
              <div className="sunflower-controls-stage">
                {dedication.dedicationBadge && (
                  <div className="sunflower-dedication-badge">
                    <span className="sunflower-dedication-badge__flower" aria-hidden="true">
                      🌻
                    </span>
                    <span>{dedication.dedicationBadge}</span>
                  </div>
                )}

                <div className="sunflower-track-meta">
                  <h4 className="sunflower-track-title">{dedication.songTitle}</h4>
                  <p className="sunflower-track-artist">
                    <strong>{dedication.artist}</strong>
                    {dedication.albumOrYear ? (
                      <>
                        <span className="sunflower-track-sep">·</span>
                        <span>{dedication.albumOrYear}</span>
                      </>
                    ) : null}
                  </p>
                </div>

                {dedication.poeticQuote && (
                  <blockquote className="sunflower-lyric-quote">
                    <p>{dedication.poeticQuote}</p>
                  </blockquote>
                )}

                {/* Ecualizador botánico animado */}
                <div
                  className={`sunflower-equalizer ${isPlayingDedication ? 'is-active' : ''}`}
                  aria-hidden="true"
                >
                  {EQUALIZER_BARS.map((heightRatio, index) => (
                    <span
                      key={index}
                      className="sunflower-equalizer__bar"
                      style={
                        {
                          '--bar-scale': heightRatio,
                          '--bar-delay': `${(index % 8) * 0.11}s`,
                        } as React.CSSProperties
                      }
                    />
                  ))}
                </div>

                {/* Barra de progreso interactiva con estética dorada */}
                <div className="sunflower-scrubber-group">
                  <div className="sunflower-scrubber-track-wrap">
                    <div
                      className="sunflower-scrubber-fill"
                      style={{ width: `${progressPercent}%` }}
                      aria-hidden="true"
                    />
                    <input
                      type="range"
                      min={0}
                      max={duration > 0 ? duration : 100}
                      step={0.1}
                      value={currentTime}
                      onChange={handleSeek}
                      disabled={!isAudioReady && duration === 0}
                      className="sunflower-scrubber-input"
                      aria-label="Posición de reproducción de Mi Novia Se Me Está Poniendo Vieja"
                    />
                  </div>
                  <div className="sunflower-scrubber-times">
                    <span>{formatAudioTime(currentTime)}</span>
                    <span>{duration > 0 ? formatAudioTime(duration) : '5:12'}</span>
                  </div>
                </div>

                {/* Botonera principal de reproducción */}
                <div className="sunflower-transport-row">
                  <button
                    type="button"
                    className="sunflower-transport-btn sunflower-transport-btn--aux"
                    onClick={handleRestartDedication}
                    title="Reiniciar canción desde el principio"
                    aria-label="Reiniciar canción desde el principio"
                  >
                    <RotateCcw size={17} aria-hidden="true" />
                  </button>

                  <button
                    type="button"
                    className="sunflower-transport-btn sunflower-transport-btn--skip"
                    onClick={() => handleSkipSeconds(-10)}
                    title="Retroceder 10 segundos"
                    aria-label="Retroceder 10 segundos"
                  >
                    <SkipBack size={17} aria-hidden="true" />
                    <span>-10s</span>
                  </button>

                  <button
                    type="button"
                    className={`sunflower-play-cta ${isPlayingDedication ? 'is-playing' : ''}`}
                    onClick={handleTogglePlayDedication}
                    aria-label={
                      isPlayingDedication
                        ? 'Pausar Mi Novia Se Me Está Poniendo Vieja de Ricardo Arjona'
                        : 'Reproducir Mi Novia Se Me Está Poniendo Vieja de Ricardo Arjona'
                    }
                  >
                    <span className="sunflower-play-cta__icon">
                      {isPlayingDedication ? (
                        <Pause size={22} fill="currentColor" aria-hidden="true" />
                      ) : (
                        <Play
                          size={22}
                          fill="currentColor"
                          style={{ marginLeft: '2px' }}
                          aria-hidden="true"
                        />
                      )}
                    </span>
                    <span className="sunflower-play-cta__label">
                      {isPlayingDedication ? 'Pausar dedicatoria' : 'Escuchar canción'}
                    </span>
                  </button>

                  <button
                    type="button"
                    className="sunflower-transport-btn sunflower-transport-btn--skip"
                    onClick={() => handleSkipSeconds(10)}
                    title="Adelantar 10 segundos"
                    aria-label="Adelantar 10 segundos"
                  >
                    <span>+10s</span>
                    <SkipForward size={17} aria-hidden="true" />
                  </button>
                </div>

                {/* Control de volumen de la canción dedicada */}
                <div className="sunflower-volume-bar">
                  <button
                    type="button"
                    className="sunflower-volume-mute-btn"
                    onClick={handleToggleDedicationMute}
                    aria-label={
                      isDedicationMuted ? 'Activar sonido de la dedicatoria' : 'Silenciar dedicatoria'
                    }
                  >
                    {isDedicationMuted || dedicationVolume === 0 ? (
                      <VolumeX size={17} aria-hidden="true" />
                    ) : (
                      <Volume2 size={17} aria-hidden="true" />
                    )}
                  </button>
                  <input
                    type="range"
                    min={0}
                    max={1}
                    step={0.02}
                    value={isDedicationMuted ? 0 : dedicationVolume}
                    onChange={handleDedicationVolumeChange}
                    className="sunflower-volume-slider"
                    aria-label="Volumen de la canción dedicada"
                  />
                  <span className="sunflower-volume-pct">
                    {Math.round((isDedicationMuted ? 0 : dedicationVolume) * 100)}%
                  </span>
                </div>
              </div>
            </div>

            {/* Barra inferior para alternar suavemente con la música de fondo (Coldplay - Clocks) */}
            <div className="sunflower-player-footer">
              <p className="sunflower-player-footer__note">
                {isPlayingDedication
                  ? '«Clocks» de Coldplay se detuvo automáticamente para que escuches a Ricardo Arjona con total claridad.'
                  : 'Cuando quieras volver a escuchar la música ambiental del jardín («Clocks» de Coldplay), puedes activarla aquí:'}
              </p>

              {(isPlayingDedication ||
                audioCoordinator.isSuppressedBySpotify ||
                !audioCoordinator.isAmbientPlaying) && (
                <button
                  type="button"
                  className="sunflower-restore-ambient-btn"
                  onClick={handleSwitchBackToAmbient}
                >
                  <Volume2 size={15} aria-hidden="true" />
                  <span>
                    Volver a escuchar «{dedication.ambientTrackName || 'Coldplay — Clocks'}» de fondo
                  </span>
                </button>
              )}
            </div>
          </div>
        </RevealOnScroll>

        {/* PARTE 3: CIERRE EMOCIONAL Y DESPEDIDA */}
        <RevealOnScroll className="final-farewell-stage">
          <div className="final-farewell-flower">
            <svg
              className="final-farewell-halo botanical-halo-ring"
              viewBox="0 0 280 280"
              aria-hidden="true"
            >
              <circle
                cx="140"
                cy="140"
                r="128"
                stroke="#D99A22"
                strokeOpacity="0.32"
                strokeWidth="1"
                strokeDasharray="4 8"
                fill="none"
              />
              <circle cx="140" cy="12" r="3.5" fill="#F4C542" />
              <circle cx="268" cy="140" r="3.5" fill="#D99A22" />
              <circle cx="12" cy="140" r="3.5" fill="#D99A22" />
            </svg>
            <BotanicalSunflower size={220} variant="bloom" withStem />
          </div>

          <blockquote className="final-farewell-quote">
            {content.finalClosingQuote}
          </blockquote>

          {/* Botón mágico interactivo de 43 girasoles de luz para mamá */}
          <div className="final-blessing-box">
            <div className="final-blessing-btn-wrap">
              {/* Destellos flotantes de girasol al hacer clic */}
              <div className="final-blessing-bursts" aria-hidden="true">
                {clickBursts.map((burst) => (
                  <span
                    key={burst.id}
                    className="final-blessing-burst-item"
                    style={{ '--burst-x': `${burst.offsetX}px` } as React.CSSProperties}
                  >
                    🌻 +{burst.count}
                  </span>
                ))}
              </div>

              <button
                type="button"
                className="btn-primary-garden final-blessing-btn"
                onClick={handleBlessingClick}
              >
                <Sparkles size={17} aria-hidden="true" />
                <span>
                  {blessingCount === 0
                    ? 'Hacer florecer un deseo para tus 43 años'
                    : `¡${blessingCount} ${
                        blessingCount === 1
                          ? 'girasol de luz encendido'
                          : 'girasoles de luz encendidos'
                      } para ti, mami! 🌻`}
                </span>
              </button>
            </div>

            {/* Progreso hacia los 43 girasoles y constelación de 43 flores */}
            <div className="blessing-progress-wrap">
              <div className="blessing-progress-track" aria-hidden="true">
                <div
                  className="blessing-progress-fill"
                  style={{
                    width: `${Math.min(100, (blessingCount / TARGET_BLESSINGS) * 100)}%`,
                  }}
                />
              </div>

              <p className="blessing-progress-hint">
                {blessingCount < TARGET_BLESSINGS
                  ? `${blessingCount} / ${TARGET_BLESSINGS} girasoles encendidos · Llega a 43 para descubrir tu sorpresa especial 🌻`
                  : '¡Encendiste los 43 girasoles de luz para celebrar tu vida! 🌻✨'}
              </p>

              {/* Guirnalda interactiva de los 43 pequeños girasoles que se van encendiendo */}
              <div
                className="blessing-sunflowers-grid"
                aria-label={`${Math.min(blessingCount, TARGET_BLESSINGS)} de 43 girasoles encendidos`}
              >
                {Array.from({ length: TARGET_BLESSINGS }, (_, idx) => {
                  const isLit = idx < blessingCount;
                  const isLatest = idx === blessingCount - 1;
                  return (
                    <span
                      key={idx}
                      className={`blessing-mini-sunflower ${isLit ? 'is-lit' : ''} ${
                        isLatest ? 'is-latest' : ''
                      }`}
                      title={`Girasol ${idx + 1} de 43`}
                      aria-hidden="true"
                    >
                      🌻
                    </span>
                  );
                })}
              </div>

              {blessingCount >= TARGET_BLESSINGS && (
                <button
                  type="button"
                  className="blessing-replay-special-btn"
                  onClick={handleOpenBloomModal}
                >
                  <Sparkles size={14} aria-hidden="true" />
                  <span>Ver florecer tu girasol «Te amo» otra vez 🌻</span>
                </button>
              )}
            </div>
          </div>

          <BotanicalDivider className="final-farewell-divider" />

          <div className="final-farewell-actions">
            <button
              type="button"
              className="btn-secondary-botanical"
              onClick={handleBackToTop}
            >
              <ArrowUp size={16} aria-hidden="true" />
              <span>{content.backToTopLabel}</span>
            </button>

            <button
              type="button"
              className="final-farewell-replay-link"
              onClick={onReturnToWelcome}
            >
              {content.replayWelcomeLabel}
            </button>
          </div>

          <p className="final-farewell-colophon">
            Hilda Natividad Morales Luna · La mujer que siempre florece · Con amor, tu hijo
          </p>
        </RevealOnScroll>
      </div>

      {/* MODAL ESPECIAL A LOS 43 CLICS: GIRASOL FLORECIENDO DICIENDO «¡TE AMO, MAMÁ!» */}
      <AnimatePresence>
        {bloom43Open && (
          <motion.div
            className="bloom43-overlay"
            role="dialog"
            aria-modal="true"
            aria-labelledby="bloom43-title"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setBloom43Open(false)}
          >
            {/* Lluvia de 43 destellos y girasoles dorados flotando en el fondo */}
            <div className="bloom43-ambient-sparks" aria-hidden="true">
              {Array.from({ length: 24 }, (_, idx) => (
                <span
                  key={idx}
                  className="bloom43-floating-spark"
                  style={
                    {
                      left: `${4 + ((idx * 41) % 92)}%`,
                      top: `${6 + ((idx * 29) % 86)}%`,
                      animationDelay: `${(idx % 7) * 0.25}s`,
                    } as React.CSSProperties
                  }
                >
                  {idx % 3 === 0 ? '🌻' : '✨'}
                </span>
              ))}
            </div>

            <motion.div
              key={bloomReplayKey}
              className="bloom43-modal-card"
              initial={{ opacity: 0, scale: 0.88, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 18 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="bloom43-close-btn"
                onClick={() => setBloom43Open(false)}
                aria-label="Cerrar animación especial"
              >
                <X size={20} aria-hidden="true" />
              </button>

              <span className="bloom43-badge">
                <Sparkles size={14} aria-hidden="true" />
                <span>43 girasoles de luz encendidos para ti</span>
              </span>

              {/* Escenario del Girasol Floreciendo paso a paso (compatible con Firefox/Chrome/Safari) */}
              <div className="bloom43-flower-stage" aria-hidden="true">
                <div className="bloom43-glow-aura" />

                <svg
                  className="bloom43-svg"
                  viewBox="0 0 360 390"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <radialGradient id="bloom43PetalOuter" cx="50%" cy="20%" r="80%">
                      <stop offset="0%" stopColor="#FFF6C2" />
                      <stop offset="48%" stopColor="#F4C542" />
                      <stop offset="100%" stopColor="#C88212" />
                    </radialGradient>
                    <radialGradient id="bloom43PetalInner" cx="50%" cy="25%" r="75%">
                      <stop offset="0%" stopColor="#FFFDF0" />
                      <stop offset="55%" stopColor="#F8D562" />
                      <stop offset="100%" stopColor="#D99A22" />
                    </radialGradient>
                    <radialGradient id="bloom43HeartGrad" cx="50%" cy="42%" r="60%">
                      <stop offset="0%" stopColor="#7C562C" />
                      <stop offset="65%" stopColor="#4A3116" />
                      <stop offset="100%" stopColor="#2B1B0B" />
                    </radialGradient>
                  </defs>

                  {/* Halo astrolabio exterior */}
                  <circle
                    cx="180"
                    cy="155"
                    r="136"
                    stroke="#F4C542"
                    strokeOpacity="0.45"
                    strokeWidth="1.3"
                    strokeDasharray="5 7"
                    className="bloom43-orbit-ring"
                  />

                  {/* Tallo botánico que crece desde la base */}
                  <path
                    d="M180 378 C178 322 183 255 180 185"
                    stroke="#596B38"
                    strokeWidth="8.5"
                    strokeLinecap="round"
                    className="bloom43-stem-path"
                  />

                  {/* Hoja izquierda que se despliega */}
                  <g className="bloom43-leaf bloom43-leaf--left">
                    <path
                      d="M179 296 C136 286 102 252 94 218 C132 224 164 252 179 282 Z"
                      fill="#596B38"
                      stroke="#415026"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M176 288 C148 272 124 248 104 226"
                      stroke="#DCE6C3"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeOpacity="0.7"
                    />
                  </g>

                  {/* Hoja derecha que se despliega */}
                  <g className="bloom43-leaf bloom43-leaf--right">
                    <path
                      d="M181 272 C224 262 258 228 266 194 C228 200 196 228 181 258 Z"
                      fill="#6A7E44"
                      stroke="#415026"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M184 264 C212 248 236 224 256 202"
                      stroke="#DCE6C3"
                      strokeWidth="1.3"
                      strokeLinecap="round"
                      strokeOpacity="0.7"
                    />
                  </g>

                  {/* Corona de 16 pétalos exteriores que se abren uno por uno */}
                  <g transform="translate(180, 155)">
                    {Array.from({ length: 16 }, (_, idx) => {
                      const angle = idx * 22.5;
                      return (
                        <g key={`outer-${angle}`} transform={`rotate(${angle})`}>
                          <g
                            className="bloom43-petal-anim"
                            style={
                              {
                                '--petal-delay': `${0.32 + idx * 0.045}s`,
                              } as React.CSSProperties
                            }
                          >
                            <path
                              d="M0 -42 C-17 -72 -15 -114 0 -132 C15 -114 17 -72 0 -42 Z"
                              fill="url(#bloom43PetalOuter)"
                              stroke="#B8760E"
                              strokeWidth="1"
                            />
                          </g>
                        </g>
                      );
                    })}

                    {/* Corona de 16 pétalos interiores desfasados */}
                    {Array.from({ length: 16 }, (_, idx) => {
                      const angle = idx * 22.5 + 11.25;
                      return (
                        <g key={`inner-${angle}`} transform={`rotate(${angle})`}>
                          <g
                            className="bloom43-petal-anim"
                            style={
                              {
                                '--petal-delay': `${0.68 + idx * 0.04}s`,
                              } as React.CSSProperties
                            }
                          >
                            <path
                              d="M0 -36 C-13 -62 -11 -96 0 -112 C11 -96 13 -62 0 -36 Z"
                              fill="url(#bloom43PetalInner)"
                              stroke="#C98818"
                              strokeWidth="0.9"
                            />
                          </g>
                        </g>
                      );
                    })}

                    {/* Corazón del girasol con mensaje «Te amo» */}
                    <g className="bloom43-heart-group">
                      <circle
                        cx="0"
                        cy="0"
                        r="54"
                        fill="url(#bloom43HeartGrad)"
                        stroke="#F4C542"
                        strokeWidth="3"
                      />
                      <circle
                        cx="0"
                        cy="0"
                        r="45"
                        fill="none"
                        stroke="#F8E6A0"
                        strokeOpacity="0.65"
                        strokeWidth="1.2"
                        strokeDasharray="3 4"
                      />
                      <text
                        x="0"
                        y="-4"
                        textAnchor="middle"
                        fill="#FFFDF4"
                        fontFamily="var(--font-script)"
                        fontSize="27"
                        fontWeight="700"
                      >
                        Te amo
                      </text>
                      <text
                        x="0"
                        y="17"
                        textAnchor="middle"
                        fill="#F4C542"
                        fontFamily="var(--font-sans)"
                        fontSize="9.5"
                        fontWeight="700"
                        letterSpacing="1.8"
                      >
                        43 AÑOS 🌻
                      </text>
                    </g>
                  </g>
                </svg>
              </div>

              <div className="bloom43-message-block">
                <h3 id="bloom43-title" className="bloom43-love-title shimmer-gold-script">
                  ¡Te amo, mamá!
                </h3>
                <p className="bloom43-love-subtitle">
                  43 girasoles han florecido para celebrar cada año de tu vida, tu luz, tu ternura y
                  el privilegio inmenso de ser tu hijo. Eres la mejor madre del mundo, Hilda
                  Natividad.
                </p>

                <div className="bloom43-actions">
                  <button
                    type="button"
                    className="btn-secondary-botanical bloom43-replay-btn"
                    onClick={() => setBloomReplayKey((k) => k + 1)}
                  >
                    <RotateCcw size={15} aria-hidden="true" />
                    <span>Ver florecer de nuevo</span>
                  </button>
                  <button
                    type="button"
                    className="btn-primary-garden"
                    onClick={() => setBloom43Open(false)}
                  >
                    <Heart size={16} aria-hidden="true" />
                    <span>Guardar en mi corazón</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
