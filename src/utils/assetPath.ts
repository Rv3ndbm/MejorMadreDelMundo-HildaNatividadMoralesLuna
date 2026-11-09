/**
 * Resuelve rutas de archivos estáticos dentro de `public/` respetando siempre
 * la propiedad `base` configurada en `vite.config.ts` (indispensable para GitHub Pages).
 */
export function resolvePublicPath(assetPath: string): string {
  if (!assetPath) return '';
  if (/^(https?:|data:|blob:)/i.test(assetPath)) {
    return assetPath;
  }

  const baseUrl = import.meta.env.BASE_URL || '/';
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
  const normalizedAsset = assetPath.replace(/^\/+/, '');
  try {
    return encodeURI(`${normalizedBase}${decodeURI(normalizedAsset)}`);
  } catch {
    return `${normalizedBase}${normalizedAsset}`;
  }
}

export interface ResolvedSpotifyLinks {
  embedUrl: string;
  externalUrl: string;
}

/**
 * Convierte cualquier enlace o URI de Spotify (track, playlist o album)
 * tanto en la URL oficial para `<iframe>` (`/embed/...`) como en el enlace externo directo.
 */
export function resolveSpotifyLinks(rawUrlOrUri: string): ResolvedSpotifyLinks {
  const trimmed = (rawUrlOrUri || '').trim();

  // Caso 1: URI tipo spotify:track:ID
  const uriMatch = trimmed.match(/^spotify:(track|album|playlist):([a-zA-Z0-9]+)$/i);
  if (uriMatch) {
    const [, kind, id] = uriMatch;
    return {
      embedUrl: `https://open.spotify.com/embed/${kind.toLowerCase()}/${id}?utm_source=generator`,
      externalUrl: `https://open.spotify.com/${kind.toLowerCase()}/${id}`,
    };
  }

  // Caso 2: URL de open.spotify.com (con o sin /intl-es/ o /embed/)
  const urlMatch = trimmed.match(
    /open\.spotify\.com\/(?:intl-[a-z-]+\/)?(?:embed\/)?(track|album|playlist)\/([a-zA-Z0-9]+)/i
  );
  if (urlMatch) {
    const [, kind, id] = urlMatch;
    return {
      embedUrl: `https://open.spotify.com/embed/${kind.toLowerCase()}/${id}?utm_source=generator`,
      externalUrl: `https://open.spotify.com/${kind.toLowerCase()}/${id}`,
    };
  }

  // Fallback seguro si el usuario pega una URL de embed personalizada
  return {
    embedUrl: trimmed,
    externalUrl: trimmed.replace('/embed/', '/'),
  };
}

