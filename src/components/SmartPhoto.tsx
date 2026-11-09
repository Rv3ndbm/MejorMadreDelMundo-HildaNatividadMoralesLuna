import { useState } from 'react';
import { resolvePublicPath } from '../utils/assetPath';
import './SmartPhoto.css';

interface SmartPhotoProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  eager?: boolean;
  fallbackLabel?: string;
}

export function SmartPhoto({
  src,
  alt,
  className = '',
  imgClassName = '',
  eager = false,
  fallbackLabel = 'Espacio para fotografía',
}: SmartPhotoProps) {
  const [hasError, setHasError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const resolvedSrc = resolvePublicPath(src);

  if (hasError || !resolvedSrc) {
    return (
      <div className={`smart-photo-fallback ${className}`} role="img" aria-label={alt}>
        <div className="smart-photo-fallback__inner">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 64 64"
            width="42"
            height="42"
            aria-hidden="true"
          >
            <g transform="translate(32, 32)">
              {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
                <ellipse
                  key={deg}
                  cx="0"
                  cy="-15"
                  rx="4"
                  ry="10"
                  fill="#F4C542"
                  fillOpacity="0.65"
                  stroke="#D99A22"
                  strokeWidth="0.8"
                  transform={`rotate(${deg})`}
                />
              ))}
              <circle cx="0" cy="0" r="8" fill="#76552F" />
            </g>
          </svg>
          <span className="smart-photo-fallback__title">{fallbackLabel}</span>
          <span className="smart-photo-fallback__hint">Coloca tu fotografía en public/images</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`smart-photo-wrap ${loaded ? 'is-loaded' : ''} ${className}`}>
      <img
        ref={(node) => {
          if (node && node.complete && node.naturalWidth > 0 && !loaded) {
            setLoaded(true);
          }
        }}
        src={resolvedSrc}
        alt={alt}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className={`smart-photo-img ${imgClassName}`}
        onLoad={() => setLoaded(true)}
        onError={() => setHasError(true)}
      />
    </div>
  );
}
