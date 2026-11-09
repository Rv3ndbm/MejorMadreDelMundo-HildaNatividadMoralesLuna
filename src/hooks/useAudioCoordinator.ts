import { useCallback, useEffect, useRef, useState } from 'react';
import { resolvePublicPath } from '../utils/assetPath';

interface UseAudioCoordinatorOptions {
  ambientSrc: string;
  fallbackSrc?: string;
  initialVolume: number;
}

export interface AudioCoordinator {
  isAmbientPlaying: boolean;
  isMuted: boolean;
  isSuppressedBySpotify: boolean;
  ambientVolume: number;
  ambientAvailable: boolean;
  startAmbientFromGesture: () => void;
  toggleAmbient: () => void;
  toggleMute: () => void;
  setAmbientVolume: (nextVolume: number) => void;
  attenuateForSpotify: () => void;
  restoreFromSpotify: () => void;
  registerDedicationAudio: (el: HTMLAudioElement | null) => void;
}

export function useAudioCoordinator({
  ambientSrc,
  fallbackSrc,
  initialVolume,
}: UseAudioCoordinatorOptions): AudioCoordinator {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const dedicationAudioRef = useRef<HTMLAudioElement | null>(null);
  const fadeRafRef = useRef<number | null>(null);
  const userDesiredPlayingRef = useRef<boolean>(false);
  const suppressedRef = useRef<boolean>(false);
  const targetVolumeRef = useRef<number>(initialVolume);

  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isSuppressedBySpotify, setIsSuppressedBySpotify] = useState(false);
  const [ambientVolume, setAmbientVolumeState] = useState(initialVolume);
  const [ambientAvailable, setAmbientAvailable] = useState(true);

  const cancelFade = useCallback(() => {
    if (fadeRafRef.current !== null) {
      cancelAnimationFrame(fadeRafRef.current);
      fadeRafRef.current = null;
    }
  }, []);

  const pauseDedicationIfPlaying = useCallback(() => {
    const dedicationEl = dedicationAudioRef.current;
    if (dedicationEl && !dedicationEl.paused) {
      dedicationEl.pause();
    }
  }, []);

  const registerDedicationAudio = useCallback((el: HTMLAudioElement | null) => {
    dedicationAudioRef.current = el;
  }, []);

  const fadeVolumeTo = useCallback(
    (audio: HTMLAudioElement, target: number, durationMs: number, onComplete?: () => void) => {
      cancelFade();
      const startVol = audio.volume;
      const clampedTarget = Math.max(0, Math.min(1, target));
      if (durationMs <= 0 || Math.abs(clampedTarget - startVol) < 0.005) {
        audio.volume = clampedTarget;
        onComplete?.();
        return;
      }

      const startTime = performance.now();
      const step = (now: number) => {
        if (suppressedRef.current && clampedTarget > 0) {
          fadeRafRef.current = null;
          return;
        }
        const progress = Math.min(1, (now - startTime) / durationMs);
        const eased = 1 - Math.pow(1 - progress, 2);
        audio.volume = Math.max(0, Math.min(1, startVol + (clampedTarget - startVol) * eased));
        if (progress < 1) {
          fadeRafRef.current = requestAnimationFrame(step);
        } else {
          fadeRafRef.current = null;
          onComplete?.();
        }
      };
      fadeRafRef.current = requestAnimationFrame(step);
    },
    [cancelFade]
  );

  useEffect(() => {
    const audio = new Audio();
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = 0;

    const primaryUrl = resolvePublicPath(ambientSrc);
    const fallbackUrl = fallbackSrc ? resolvePublicPath(fallbackSrc) : '';
    let triedFallback = false;

    const handlePlay = () => setIsAmbientPlaying(true);
    const handlePause = () => setIsAmbientPlaying(false);
    const handleCanPlay = () => setAmbientAvailable(true);
    const handleError = () => {
      if (!triedFallback && fallbackUrl && audio.src !== fallbackUrl) {
        triedFallback = true;
        audio.src = fallbackUrl;
        audio.load();
        if (userDesiredPlayingRef.current && !suppressedRef.current) {
          audio
            .play()
            .then(() => fadeVolumeTo(audio, targetVolumeRef.current, 1000))
            .catch(() => setIsAmbientPlaying(false));
        }
        return;
      }
      setAmbientAvailable(false);
      setIsAmbientPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audio.addEventListener('canplay', handleCanPlay);

    audio.src = primaryUrl;
    audio.load();
    audioRef.current = audio;

    return () => {
      cancelFade();
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.removeEventListener('canplay', handleCanPlay);
      audio.pause();
      audioRef.current = null;
    };
  }, [ambientSrc, fallbackSrc, cancelFade, fadeVolumeTo]);

  const startAmbientFromGesture = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    pauseDedicationIfPlaying();
    userDesiredPlayingRef.current = true;
    suppressedRef.current = false;
    setIsSuppressedBySpotify(false);
    setIsMuted(false);
    audio.muted = false;
    audio.volume = 0.04;

    const playPromise = audio.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          fadeVolumeTo(audio, targetVolumeRef.current, 1200);
        })
        .catch(() => {
          setIsAmbientPlaying(false);
        });
    }
  }, [fadeVolumeTo, pauseDedicationIfPlaying]);

  const toggleAmbient = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (suppressedRef.current) {
      pauseDedicationIfPlaying();
      suppressedRef.current = false;
      setIsSuppressedBySpotify(false);
      userDesiredPlayingRef.current = true;
      setIsMuted(false);
      audio.muted = false;
      audio.volume = 0.04;
      audio
        .play()
        .then(() => fadeVolumeTo(audio, targetVolumeRef.current, 750))
        .catch(() => setIsAmbientPlaying(false));
      return;
    }

    if (!audio.paused) {
      userDesiredPlayingRef.current = false;
      fadeVolumeTo(audio, 0, 380, () => {
        audio.pause();
      });
    } else {
      pauseDedicationIfPlaying();
      userDesiredPlayingRef.current = true;
      setIsMuted(false);
      audio.muted = false;
      const target = targetVolumeRef.current > 0.02 ? targetVolumeRef.current : initialVolume;
      if (targetVolumeRef.current <= 0.02) {
        targetVolumeRef.current = target;
        setAmbientVolumeState(target);
      }
      audio.volume = 0.04;
      audio
        .play()
        .then(() => {
          fadeVolumeTo(audio, target, 650);
        })
        .catch(() => {
          setIsAmbientPlaying(false);
        });
    }
  }, [fadeVolumeTo, initialVolume, pauseDedicationIfPlaying]);

  const toggleMute = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    audio.muted = nextMuted;
  }, [isMuted]);

  const setAmbientVolume = useCallback(
    (nextVolume: number) => {
      const clamped = Math.max(0, Math.min(1, nextVolume));
      targetVolumeRef.current = clamped;
      setAmbientVolumeState(clamped);

      const audio = audioRef.current;
      if (!audio) return;

      cancelFade();
      if (clamped === 0) {
        audio.volume = 0;
        setIsMuted(true);
      } else {
        setIsMuted(false);
        audio.muted = false;
        if (!audio.paused && !suppressedRef.current) {
          audio.volume = clamped;
        } else if (
          audio.paused &&
          !suppressedRef.current &&
          userDesiredPlayingRef.current
        ) {
          pauseDedicationIfPlaying();
          audio
            .play()
            .then(() => {
              audio.volume = clamped;
            })
            .catch(() => {});
        }
      }
    },
    [cancelFade, pauseDedicationIfPlaying]
  );

  // Detiene de inmediato la canción ambiental (Coldplay - Clocks) cuando mamá reproduce la canción de Ricardo Arjona
  const attenuateForSpotify = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    cancelFade();
    suppressedRef.current = true;
    setIsSuppressedBySpotify(true);
    if (!audio.paused) {
      audio.volume = 0;
      audio.pause();
    }
    setIsAmbientPlaying(false);
  }, [cancelFade]);

  // Restaura la canción ambiental (Coldplay - Clocks) y detiene la de Ricardo Arjona si estaba activa
  const restoreFromSpotify = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    pauseDedicationIfPlaying();
    suppressedRef.current = false;
    setIsSuppressedBySpotify(false);
    userDesiredPlayingRef.current = true;
    if (targetVolumeRef.current > 0.01 && !isMuted) {
      audio.muted = false;
      audio.volume = 0.04;
      audio
        .play()
        .then(() => {
          fadeVolumeTo(audio, targetVolumeRef.current, 900);
        })
        .catch(() => {});
    }
  }, [fadeVolumeTo, isMuted, pauseDedicationIfPlaying]);

  return {
    isAmbientPlaying,
    isMuted,
    isSuppressedBySpotify,
    ambientVolume,
    ambientAvailable,
    startAmbientFromGesture,
    toggleAmbient,
    toggleMute,
    setAmbientVolume,
    attenuateForSpotify,
    restoreFromSpotify,
    registerDedicationAudio,
  };
}
