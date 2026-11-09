import { useState } from 'react';
import { Camera, Expand, Sparkles } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import type { BirthdayContent, MemoryCategory } from '../../types/birthday';
import { RevealOnScroll } from '../../animations/RevealOnScroll';
import { SmartPhoto } from '../../components/SmartPhoto';
import { GalleryLightbox } from '../../components/GalleryLightbox';
import '../PhotoGallerySection.css';

interface MemoriesSectionProps {
  content: BirthdayContent['scene4Memories'];
}

const CATEGORIES: Array<'Todos' | MemoryCategory> = [
  'Todos',
  'Hilda sola',
  'Hilda conmigo',
  'Momentos familiares',
  'Viajes y aventuras',
  'Celebraciones',
  'Momentos cotidianos',
];

export function MemoriesSection({ content }: MemoriesSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'Todos' | MemoryCategory>('Todos');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const visiblePhotos =
    selectedCategory === 'Todos'
      ? content.photos
      : content.photos.filter((p) => p.category === selectedCategory);

  const getCategoryCount = (cat: 'Todos' | MemoryCategory) => {
    if (cat === 'Todos') return content.photos.length;
    return content.photos.filter((p) => p.category === cat).length;
  };

  return (
    <section
      id="escena-recuerdos"
      className="gallery-section section-shell"
      aria-labelledby="memories-section-title"
    >
      <div className="container-editorial">
        <RevealOnScroll className="section-header">
          <p className="section-eyebrow">
            <span className="section-number-tag">{content.sceneNumber}</span>
            <span>·</span>
            <Camera size={13} aria-hidden="true" />
            <span>{content.eyebrow}</span>
          </p>
          <h2 id="memories-section-title" className="section-title">
            {content.title}
          </h2>
          <p className="section-intro">{content.intro}</p>

          {/* Barra interactiva de filtros del álbum familiar con contadores */}
          <div
            className="memories-category-bar"
            role="group"
            aria-label="Filtrar recuerdos por categoría"
          >
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setSelectedIndex(null);
                  }}
                  aria-pressed={isActive}
                  className={`memories-filter-pill ${isActive ? 'is-active' : ''}`}
                >
                  <span>{cat}</span>
                  <span className="memories-filter-count" aria-hidden="true">
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </RevealOnScroll>

        <motion.div layout className="gallery-editorial-grid">
          <AnimatePresence mode="popLayout">
            {visiblePhotos.map((photo, index) => (
              <motion.div
                layout
                key={photo.id}
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: -14 }}
                transition={{
                  duration: 0.48,
                  delay: (index % 3) * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={`gallery-item gallery-item--${photo.aspect} ${
                  selectedCategory === 'Todos' ? `gallery-item--pos-${(index % 6) + 1}` : ''
                }`}
              >
                <button
                  type="button"
                  className="gallery-card-btn"
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Ampliar recuerdo: ${photo.title} (${photo.category})`}
                >
                  <div className={`gallery-card-mat gallery-card-mat--tilt-${(index % 3) + 1}`}>
                    {/* Cinta adhesiva botánica Washi Tape */}
                    <span className="gallery-washi-tape" aria-hidden="true" />

                    {/* Esquinas de álbum fotográfico clásico */}
                    <span className="photo-corner photo-corner--tl" aria-hidden="true" />
                    <span className="photo-corner photo-corner--tr" aria-hidden="true" />
                    <span className="photo-corner photo-corner--bl" aria-hidden="true" />
                    <span className="photo-corner photo-corner--br" aria-hidden="true" />

                    <div className={`gallery-photo-frame gallery-photo-frame--${photo.aspect}`}>
                      <SmartPhoto
                        src={photo.src}
                        alt={photo.alt}
                        fallbackLabel={photo.title}
                        imgClassName="gallery-card-img"
                      />
                      <span className="gallery-film-number" aria-hidden="true">
                        N.º 0{index + 1}
                      </span>
                      <span className="gallery-zoom-pill" aria-hidden="true">
                        <Expand size={14} />
                        <span>Abrir recuerdo</span>
                      </span>
                    </div>

                    <div className="gallery-card-meta">
                      <div className="gallery-card-tag-row">
                        <span className="gallery-card-tag">
                          <Sparkles size={11} aria-hidden="true" />
                          <span>
                            {photo.category}
                            {photo.dateOrPlace ? ` · ${photo.dateOrPlace}` : ''}
                          </span>
                        </span>
                      </div>
                      <h3 className="gallery-card-title">{photo.title}</h3>
                    </div>
                  </div>
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <GalleryLightbox
        photos={visiblePhotos}
        activeIndex={selectedIndex}
        onClose={() => setSelectedIndex(null)}
        onSelectIndex={setSelectedIndex}
      />
    </section>
  );
}
