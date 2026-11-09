import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { GalleryPhotoItem } from '../types/birthday';
import { SmartPhoto } from './SmartPhoto';
import './GalleryLightbox.css';

interface GalleryLightboxProps {
  photos: GalleryPhotoItem[];
  activeIndex: number | null;
  onClose: () => void;
  onSelectIndex: (nextIndex: number) => void;
}

export function GalleryLightbox({
  photos,
  activeIndex,
  onClose,
  onSelectIndex,
}: GalleryLightboxProps) {
  const touchStartXRef = useRef<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  const isOpen = activeIndex !== null && activeIndex >= 0 && activeIndex < photos.length;
  const currentPhoto = isOpen ? photos[activeIndex] : null;

  const goPrev = () => {
    if (activeIndex === null) return;
    onSelectIndex((activeIndex - 1 + photos.length) % photos.length);
  };

  const goNext = () => {
    if (activeIndex === null) return;
    onSelectIndex((activeIndex + 1) % photos.length);
  };

  useEffect(() => {
    if (!isOpen) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButtonRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        onSelectIndex(((activeIndex ?? 0) - 1 + photos.length) % photos.length);
      } else if (e.key === 'ArrowRight') {
        onSelectIndex(((activeIndex ?? 0) + 1) % photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, activeIndex, photos.length, onClose, onSelectIndex]);

  return (
    <AnimatePresence>
      {isOpen && currentPhoto && activeIndex !== null && (
        <motion.div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label={`Vista ampliada: fotografía ${activeIndex + 1} de ${photos.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
        >
          <div
            className="lightbox-stage"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={(e) => {
              touchStartXRef.current = e.changedTouches[0]?.clientX ?? null;
            }}
            onTouchEnd={(e) => {
              if (touchStartXRef.current === null) return;
              const deltaX = (e.changedTouches[0]?.clientX ?? 0) - touchStartXRef.current;
              if (deltaX > 45) goPrev();
              else if (deltaX < -45) goNext();
              touchStartXRef.current = null;
            }}
          >
            <div className="lightbox-top">
              <span className="lightbox-counter">
                Fotografía {activeIndex + 1} de {photos.length}
              </span>
              <button
                ref={closeButtonRef}
                type="button"
                className="lightbox-close-btn"
                onClick={onClose}
                aria-label="Cerrar fotografía ampliada"
              >
                <X size={20} aria-hidden="true" />
                <span>Cerrar</span>
              </button>
            </div>

            <div className="lightbox-frame-row">
              <button
                type="button"
                className="lightbox-nav-btn lightbox-nav-btn--prev"
                onClick={goPrev}
                aria-label="Fotografía anterior"
              >
                <ChevronLeft size={24} aria-hidden="true" />
              </button>

              <AnimatePresence mode="wait">
                <motion.figure
                  key={currentPhoto.id}
                  className="lightbox-figure"
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="lightbox-photo-box">
                    <SmartPhoto
                      src={currentPhoto.src}
                      alt={currentPhoto.alt}
                      eager
                      imgClassName="lightbox-photo-img"
                    />
                  </div>
                  <figcaption className="lightbox-caption">
                    <span className="lightbox-tag">
                      {currentPhoto.category}
                      {currentPhoto.dateOrPlace ? ` · ${currentPhoto.dateOrPlace}` : ''}
                    </span>
                    <p
                      style={{
                        fontFamily: 'var(--font-serif)',
                        fontWeight: 600,
                        fontSize: '1.28rem',
                        color: 'var(--color-warm-brown)',
                        marginBottom: currentPhoto.caption ? '0.2rem' : '0',
                      }}
                    >
                      {currentPhoto.title}
                    </p>
                    {currentPhoto.caption && (
                      <p className="lightbox-caption-text">{currentPhoto.caption}</p>
                    )}
                  </figcaption>
                </motion.figure>
              </AnimatePresence>

              <button
                type="button"
                className="lightbox-nav-btn lightbox-nav-btn--next"
                onClick={goNext}
                aria-label="Fotografía siguiente"
              >
                <ChevronRight size={24} aria-hidden="true" />
              </button>
            </div>

            {/* Controles móviles inferiores cómodos para el pulgar */}
            <div className="lightbox-mobile-controls">
              <button
                type="button"
                className="lightbox-mobile-btn"
                onClick={goPrev}
                aria-label="Fotografía anterior"
              >
                <ChevronLeft size={18} aria-hidden="true" />
                <span>Anterior</span>
              </button>
              <button
                type="button"
                className="lightbox-mobile-btn"
                onClick={goNext}
                aria-label="Fotografía siguiente"
              >
                <span>Siguiente</span>
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

