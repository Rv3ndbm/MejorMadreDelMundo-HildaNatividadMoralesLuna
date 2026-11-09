export type GalleryAspect = 'portrait' | 'landscape' | 'editorial';

export type MemoryCategory =
  | 'Hilda sola'
  | 'Hilda conmigo'
  | 'Momentos familiares'
  | 'Viajes y aventuras'
  | 'Celebraciones'
  | 'Momentos cotidianos';

export interface EssencePillar {
  id: string;
  keyword: string;
  virtues: string;
  description: string;
}

export interface GalleryPhotoItem {
  id: string;
  src: string;
  alt: string;
  category: MemoryCategory;
  title: string;
  caption?: string;
  dateOrPlace?: string;
  aspect: GalleryAspect;
}

export interface AcademicStageItem {
  id: string;
  stepNumber: string;
  badge: string;
  title: string;
  subtitle: string;
  narrative: string;
  highlightNote: string;
  imageSrc: string;
  imageAlt: string;
  imageCaption?: string;
}

export interface SunflowerPetalMemory {
  id: string;
  petalLabel: string;
  facetTag: string;
  title: string;
  message?: string;
  imageSrc: string;
  imageAlt: string;
}

export interface AcrosticVerse {
  letter: string;
  verse: string;
}

export interface AcrosticWordGroup {
  id: string;
  word: string;
  subtitle: string;
  themeDescription: string;
  verses: AcrosticVerse[];
}

export interface AmbientAudioConfig {
  src: string;
  fallbackSrc?: string;
  initialVolume: number;
  label: string;
}

export interface SpotifyDedicationConfig {
  sectionEyebrow: string;
  title: string;
  introNote: string;
  /**
   * Ruta del archivo de audio dedicado dentro de `public/`
   * (por ejemplo: 'canciones/Ricardo Arjona - Mi Novia Se Me Está Poniendo Vieja.mp3')
   */
  audioSrc: string;
  songTitle: string;
  artist: string;
  albumOrYear?: string;
  dedicationBadge?: string;
  coverImageSrc?: string;
  coverImageAlt?: string;
  poeticQuote?: string;
  ambientTrackName?: string;
  spotifyUrlOrUri?: string;
  songTitlePlaceholder?: string;
  artistPlaceholder?: string;
  openInSpotifyLabel?: string;
  fallbackMessage?: string;
}

export interface BirthdayContent {
  meta: {
    fullName: string;
    shortName: string;
    age: number;
    conceptTitle: string;
    conceptSubtitle: string;
    birthdayDateDisplay: string;
    fromLabel: string;
  };
  ambientAudio: AmbientAudioConfig;
  scene1Welcome: {
    sceneLabel: string;
    title: string;
    subtitle: string;
    invitationText: string;
    enterButtonLabel: string;
    audioHint: string;
  };
  scene2Birthday: {
    sceneNumber: string;
    eyebrow: string;
    greetingTitle: string;
    conceptSubtitle: string;
    celebrationLead: string;
    celebrationBody: string;
    portraitSrc: string;
    portraitAlt: string;
    portraitCaption: string;
  };
  scene3Essence: {
    sceneNumber: string;
    eyebrow: string;
    title: string;
    leadParagraph: string;
    storyParagraph: string;
    pillars: EssencePillar[];
    motherhoodTribute: {
      eyebrow: string;
      title: string;
      paragraphs: string[];
      specialQuote: string;
      specialQuoteContext: string;
      specialQuoteImageSrc?: string;
      specialQuoteImageAlt?: string;
    };
  };
  scene4Memories: {
    sceneNumber: string;
    eyebrow: string;
    title: string;
    intro: string;
    photos: GalleryPhotoItem[];
  };
  scene5Academic: {
    sceneNumber: string;
    eyebrow: string;
    title: string;
    featuredQuote: string;
    intro: string;
    stages: AcademicStageItem[];
    closingQuote: string;
  };
  scene6InteractiveGarden: {
    sceneNumber: string;
    eyebrow: string;
    title: string;
    instructions: string;
    closeMemoryLabel: string;
    nextPetalLabel: string;
    allVisitedMessage: string;
    petals: SunflowerPetalMemory[];
  };
  scene7Acrostic: {
    sceneNumber: string;
    eyebrow: string;
    title: string;
    subtitle?: string;
    intro: string;
    groups: AcrosticWordGroup[];
    closingDedication?: string;
  };
  scene8LetterAndFarewell: {
    sceneNumber: string;
    eyebrow: string;
    title: string;
    envelopeLabel: string;
    openLetterButton: string;
    foldLetterButton: string;
    salutation: string;
    letterParagraphs: string[];
    signatureClosing: string;
    signatureName: string;
    photoSrc: string;
    photoAlt: string;
    photoCaption: string;
    spotifyDedication: SpotifyDedicationConfig;
    finalClosingQuote: string;
    backToTopLabel: string;
    replayWelcomeLabel: string;
  };
}
