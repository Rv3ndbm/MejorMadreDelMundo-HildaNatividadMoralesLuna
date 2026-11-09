import type { BirthdayContent } from '../types/birthday';

/**
 * ============================================================================
 * CONFIGURACIÓN CENTRAL DEL JARDÍN DIGITAL — HILDA NATIVIDAD MORALES LUNA
 * «La mujer que siempre florece · 43 años floreciendo»
 * ============================================================================
 *
 * Desde este único archivo puedes personalizar:
 *   1. Fotografías reales dentro de `public/images/{portrait,family,memories,academic}/`
 *   2. Música ambiental en `public/audio/ambient.mp3`
 *   3. Enlace o URI de la canción final de Spotify en `spotifyDedication.spotifyUrlOrUri`
 *   4. Cualquier frase, descripción de recuerdo, pétalo, verso o párrafo de la carta.
 */
export const birthdayContent: BirthdayContent = {
  meta: {
    fullName: 'Hilda Natividad Morales Luna',
    shortName: 'Hilda Natividad',
    age: 43,
    conceptTitle: 'La mujer que siempre florece',
    conceptSubtitle: '43 años floreciendo',
    birthdayDateDisplay: '9 de noviembre · 43 años',
    fromLabel: 'Un universo creado con amor por tu hijo',
  },

  // MÚSICA AMBIENTAL LOCAL (Se inicia al pulsar «Entrar a mi jardín»: Coldplay - Clocks)
  ambientAudio: {
    src: 'canciones/Coldplay - Clocks.mp3',
    fallbackSrc: 'audio/ambient.mp3',
    initialVolume: 0.32,
    label: 'Coldplay — Clocks',
  },

  // ESCENA 1 — Bienvenida: «Un jardín preparado para ti»
  scene1Welcome: {
    sceneLabel: 'Un jardín preparado para ti',
    title: 'La mujer que siempre florece',
    subtitle: 'Hilda Natividad Morales Luna · 43 años floreciendo',
    invitationText:
      'Hay personas cuya luz hace que todo a su alrededor crezca más bonito. Este pequeño universo de girasoles guarda la historia, la admiración y el amor de tu hijo para celebrar tu vida.',
    enterButtonLabel: 'Entrar a mi jardín',
    audioHint:
      'Al entrar sonará suavemente de fondo «Clocks» de Coldplay para acompañar tu recorrido',
  },

  // ESCENA 2 — Celebración: «43 años floreciendo»
  scene2Birthday: {
    sceneNumber: 'Escena I',
    eyebrow: 'Celebración de tu vida',
    greetingTitle: '¡Feliz cumpleaños, Hilda Natividad!',
    conceptSubtitle: '43 años floreciendo.',
    celebrationLead:
      'Hoy celebramos 43 años de una mujer extraordinaria: tu sonrisa, tu carisma, tu ternura y la hermosa manera en que iluminas nuestras vidas.',
    celebrationBody:
      'Este jardín esta hecho especialmente para tí mami, porque mereces lo mejor de lo mejor. Porque cumplir años en ti no es solo sumar tiempo: es seguir abriendo pétalos de sabiduría, bondad, sueños cumplidos y nuevos caminos por recorrer, espero te guste mucho. Con muchisimo amor y cariño: Tu Hijo Rubén',
    portraitSrc: 'imagenesmom/inicio.jpeg',
    portraitAlt: 'Retrato principal de Hilda Natividad Morales Luna',
    portraitCaption: 'La mujer que siempre florece · 43 años de luz y autenticidad',
  },

  // ESCENA 3 — Su esencia: «La luz que hace especial a Hilda»
  scene3Essence: {
    sceneNumber: 'Escena II',
    eyebrow: 'Su esencia y su papel como madre',
    title: 'La luz que hace especial a Hilda',
    leadParagraph:
      'Más allá de todos los caminos que recorres cada día, lo que más admiro de ti es la mujer que eres en tu esencia: amorosa, alegre, luchadora y con un brillo que se hace notar.',
    storyParagraph:
      'Has atravesado momentos difíciles y circunstancias que no siempre fueron favorables, pero nunca permitiste que eso apagara tu corazón. Supiste construir tu propio camino con dignidad, seguir adelante y convertirte en una mujer que no deja de crecer. En esta seccion encontrarás partes te tu esencia que todos admiramos.',
    pillars: [
      {
        id: 'esencia-resiliencia',
        keyword: 'Resiliencia y perseverancia',
        virtues: 'Fortaleza que florece',
        description:
          'Tu capacidad para levantarte, transformar los días complejos en aprendizaje y construir tu propio camino con valentía.',
      },
      {
        id: 'esencia-responsabilidad',
        keyword: 'Responsabilidad y disciplina',
        virtues: 'Compromiso constante',
        description:
          'La constancia con la que cuidas cada meta, cada clase, cada proyecto y cada promesa que haces a quienes amas.',
      },
      {
        id: 'esencia-empatia',
        keyword: 'Empatía, compasión y solidaridad',
        virtues: 'Corazón que acompaña',
        description:
          'Tu sensibilidad para ponerte en el lugar del otro, tender la mano sin esperar nada a cambio y abrazar con calidez.',
      },
      {
        id: 'esencia-bondad',
        keyword: 'Bondad, tolerancia y paciencia',
        virtues: 'Ternura cotidiana',
        description:
          'Esa calma armoniosa con la que sabes escuchar, comprender procesos y brindar paz incluso en medio del ruido.',
      },
      {
        id: 'esencia-honestidad',
        keyword: 'Honestidad, respeto e integridad',
        virtues: 'Verdad y rectitud',
        description:
          'Tu autenticidad: hacer las cosas bien, dando todo de ti, con actitud, y enseñar con todo el amor de tu corazón.',
      },
      {
        id: 'esencia-gratitud',
        keyword: 'Gratitud y humildad',
        virtues: 'Grandeza sencilla',
        description:
          'La nobleza de valorar cada paso, la manera en que celebras las cosas sencillas de la vida y conservas siempre la calidez y raices de tu origen.',
      },
    ],
    motherhoodTribute: {
      eyebrow: 'Gracias por ser mi mamá',
      title: 'Tu presencia en cada etapa de mi vida',
      paragraphs: [
        'Es inefable la cantidad de palabras que le debo a la vida en agradecimiento a tenerte como madre. Siempre has estado ahí para mí: en las buenas y en las malas. Y quiero que sepas que siempre estaré para ti, no importa lo que suceda o lo que torne el camino, gracias por ser esa luz que me guía, me ilumina el camino y que siempre me impulsa a ser una mejor persona.',
        'No existe en el mundo una mujer más especial que tú, y amo que estes en cada etapa de mi vida, me verás convertirme en un adulto, un profesional que va a conformar una familia, y siempre estarás en el proceso junto a papá, compartiendo tiempo, riéndonos hasta cansarnos, conversar de todo, escuchando tus historias y recordar nuestras aventuras juntos y cada momento vivido en familia.',
      ],
      specialQuote: '«En el afán de ser hombre no olvides la magia de ser niño».',
      specialQuoteContext:
        'Esta frase tuya vive guardada en mí como una brújula en esta etapa de mi vida: me recuerda disfrutar las pequeñas cosas, vivir cada etapa con plenitud y jamás perder la alegría ni la autenticidad.',
      specialQuoteImageSrc: 'imagenesmom/enelafan.jpeg',
      specialQuoteImageAlt: 'Hilda jugando con su hijo pequeño en la piscina',
    },
  },

  // ESCENA 4 — Recuerdos: «Pequeños momentos, grandes historias»
  scene4Memories: {
    sceneNumber: 'Escena III',
    eyebrow: 'Álbum fotográfico interactivo',
    title: 'Pequeños momentos, grandes historias',
    intro:
      'Cada fotografía guarda una risa, un viaje o un abrazo que forma parte de nuestra historia. Puedes filtrar por categoría o tocar cualquier recuerdo para verlo en grande.',
    photos: [
      {
        id: 'memoria-01',
        src: 'imagenesmom/hildasola1.jpeg',
        alt: 'Hilda Natividad sonriendo frente al mar',
        category: 'Hilda sola',
        title: 'Tu luz propia',
        dateOrPlace: 'Retrato de mamá',
        aspect: 'landscape',
      },
      {
        id: 'memoria-02',
        src: 'imagenesmom/hildaconmigomamayyojuntos.jpeg',
        alt: 'Fotografía de Hilda junto a su hijo',
        category: 'Hilda conmigo',
        title: 'Cómplices de vida · Siempre juntos',
        dateOrPlace: 'Mamá y yo juntos',
        aspect: 'landscape',
      },
      {
        id: 'memoria-03',
        src: 'imagenesmom/aventurasensantaelena.jpeg',
        alt: 'Recuerdo de viaje y aventura en Santa Elena',
        category: 'Viajes y aventuras',
        title: 'Aventuras en Santa Elena',
        dateOrPlace: 'Santa Elena · Aventuras',
        aspect: 'portrait',
      },
      {
        id: 'memoria-04',
        src: 'imagenesmom/calordehogar.jpeg',
        alt: 'Momento compartido en familia',
        category: 'Momentos familiares',
        title: 'Calor de hogar',
        dateOrPlace: 'En familia',
        aspect: 'portrait',
      },
      {
        id: 'memoria-05',
        src: 'imagenesmom/motivoparabrindar.jpeg',
        alt: 'Fotografía de una celebración especial de Hilda',
        category: 'Celebraciones',
        title: 'Motivos para brindar',
        dateOrPlace: 'Celebraciones',
        aspect: 'landscape',
      },
      {
        id: 'memoria-06',
        src: 'imagenesmom/tardesdeconversacion.jpeg',
        alt: 'Momento cotidiano paseando y sonriendo con mamá',
        category: 'Momentos cotidianos',
        title: 'Nuestras tardes de conversación',
        dateOrPlace: 'Instantes cotidianos',
        aspect: 'portrait',
      },
      {
        id: 'memoria-07',
        src: 'imagenesmom/extra-montana-amarillo.jpeg',
        alt: 'Hilda vestida de amarillo entre las montañas',
        category: 'Hilda sola',
        title: 'Radiante entre las montañas',
        dateOrPlace: 'Hilda sola',
        aspect: 'portrait',
      },
      {
        id: 'memoria-08',
        src: 'imagenesmom/extra-beso-piscina.jpeg',
        alt: 'Su hijo dándole un beso en la mejilla en la piscina',
        category: 'Hilda conmigo',
        title: 'Amor infinito de hijo y mamá',
        dateOrPlace: 'Mamá y yo juntos',
        aspect: 'landscape',
      },
      {
        id: 'memoria-09',
        src: 'imagenesmom/extra-dia-madre.jpeg',
        alt: 'Celebrando el Día de la Madre juntos en casa',
        category: 'Hilda conmigo',
        title: 'Celebrando tu día juntos',
        dateOrPlace: 'Mamá y yo juntos',
        aspect: 'portrait',
      },
      {
        id: 'memoria-10',
        src: 'imagenesmom/extra-mar-familia.jpeg',
        alt: 'Atardecer en el mar en familia',
        category: 'Viajes y aventuras',
        title: 'Atardeceres junto al mar',
        dateOrPlace: 'Viajes y aventuras',
        aspect: 'editorial',
      },
      {
        id: 'memoria-11',
        src: 'imagenesmom/extra-abuela-dia.jpeg',
        alt: 'Hilda junto a su mamá al aire libre',
        category: 'Momentos familiares',
        title: 'Abrazos llenos de raíces',
        dateOrPlace: 'En familia',
        aspect: 'portrait',
      },
      {
        id: 'memoria-12',
        src: 'imagenesmom/extra-abuela-luces.jpeg',
        alt: 'Hilda junto a su mamá bajo luces navideñas',
        category: 'Momentos familiares',
        title: 'Noches de luz en familia',
        dateOrPlace: 'En familia',
        aspect: 'landscape',
      },
      {
        id: 'memoria-13',
        src: 'imagenesmom/extra-cumple-familia.jpeg',
        alt: 'Celebración familiar con pastel y globos',
        category: 'Celebraciones',
        title: 'Celebración rodeada de amor',
        dateOrPlace: 'Celebraciones',
        aspect: 'landscape',
      },
      {
        id: 'memoria-14',
        src: 'imagenesmom/extra-cumple-salon.jpeg',
        alt: 'Sorpresa de feliz cumpleaños en el tablero del salón',
        category: 'Celebraciones',
        title: 'El cariño de tu salón de clases',
        dateOrPlace: 'Celebraciones',
        aspect: 'landscape',
      },
      {
        id: 'memoria-15',
        src: 'imagenesmom/extra-colegio-estudiantes.jpeg',
        alt: 'Hilda sonriendo junto a sus estudiantes',
        category: 'Momentos cotidianos',
        title: 'Sonrisas que dejan huella',
        dateOrPlace: 'Instantes cotidianos',
        aspect: 'landscape',
      },
    ],
  },

  // ESCENA 5 — Una mujer que nunca deja de florecer (Vocación docente y crecimiento académico)
  scene5Academic: {
    sceneNumber: 'Escena IV',
    eyebrow: 'Vocación, disciplina y superación',
    title: 'Una mujer que nunca deja de florecer',
    featuredQuote:
      '«Hay personas que dedican su vida a enseñar a otros y nunca dejan de aprender ellas mismas. Tú eres una de ellas, mami».',
    intro:
      'Tu camino como docente de Lengua Castellana y como estudiante es uno de mis mayores orgullos. No es solo una trayectoria académica: es la prueba viva de tu amor por el conocimiento y de tu valentía para seguir creciendo.',
    stages: [
      {
        id: 'etapa-vocacion',
        stepNumber: 'Momento I',
        badge: 'Lengua Castellana · Vocación',
        title: 'Una vocación que transforma',
        subtitle: 'Sembrar desde la palabra y la enseñanza',
        narrative:
          'Ser docente de Lengua Castellana en ti va mucho más allá de enseñar el lenguaje: significa escuchar, acompañar procesos, despertar el pensamiento y dejar una huella humana en cada estudiante que pasa por tu aula.',
        highlightNote: 'Enseñar con el corazón, guiar con la palabra e inspirar con el ejemplo.',
        imageSrc: 'imagenesmom/docentelenguacastellana.jpeg',
        imageAlt: 'Hilda en su labor como docente de Lengua Castellana',
        imageCaption: 'Vocación docente que deja huella en el aula',
      },
      {
        id: 'etapa-especializacion',
        stepNumber: 'Momento II',
        badge: 'Especialización · Docencia y TIC',
        title: 'Un logro construido con esfuerzo',
        subtitle: 'Innovar y abrir nuevas puertas en la educación',
        narrative:
          'Cada hora de estudio, cada trabajo y cada desvelo dieron fruto en tu especialización. Un triunfo alcanzado con disciplina propia que demostró tu compromiso por dar siempre lo mejor.',
        highlightNote: 'Especialista en Aplicación de TIC para la Enseñanza · Universidad de Santander (UDES).',
        imageSrc: 'imagenesmom/logroconstruidoesfuerzo.jpeg',
        imageAlt: 'Diploma de Especialista en Aplicación de TIC para la Enseñanza de Hilda Natividad Morales Luna',
        imageCaption: 'Especialista en Aplicación de TIC para la Enseñanza · UDES',
      },
      {
        id: 'etapa-maestria',
        stepNumber: 'Momento III',
        badge: 'Presente · Estudiante de Maestría',
        title: 'Una historia que sigue escribiéndose',
        subtitle: 'La valentía de volver a estudiar y soñar en grande',
        narrative:
          'Después de haber pasado un largo periodo sin estudiar formalmente, tomaste la decisión valiente de iniciar tu maestría. Verte retomar tus estudios con tanta disciplina, ilusión y perseverancia me llena de una admiración inmensa.',
        highlightNote: 'Porque tus sueños no tienen fecha de vencimiento y tu mente sigue floreciendo.',
        imageSrc: 'imagenesmom/historiaquesigueescribiendose.jpg',
        imageAlt: 'Etapa actual de Hilda cursando su maestría',
        imageCaption: 'Presente académico · Estudiante de Maestría',
      },
    ],
    closingQuote:
      '«Tu historia no se detiene en lo que has conseguido. También florece en todo lo que todavía sueñas, aprendes y construyes».',
  },

  // ESCENA 6 — El jardín de sus recuerdos (Girasol interactivo SVG)
  scene6InteractiveGarden: {
    sceneNumber: 'Escena V',
    eyebrow: 'Girasol interactivo',
    title: 'El jardín de sus recuerdos',
    instructions:
      'Cada pétalo de este girasol guarda una fotografía muy especial de tu vida y de quienes te amamos. Toca cualquier pétalo para iluminarlo y descubrir su recuerdo.',
    closeMemoryLabel: 'Volver al girasol',
    nextPetalLabel: 'Siguiente pétalo',
    allVisitedMessage: 'Has hecho florecer los 8 pétalos de este girasol de recuerdos 🌻',
    petals: [
      {
        id: 'petalo-01',
        petalLabel: 'Pétalo I',
        facetTag: 'Tu enseñanza favorita',
        title: 'La magia de ser niño',
        imageSrc: 'imagenesmom/petalo1.jpeg',
        imageAlt: 'La magia de ser niño — Hilda con su hijo en la piscina',
      },
      {
        id: 'petalo-02',
        petalLabel: 'Pétalo II',
        facetTag: 'Nuestras aventuras',
        title: 'Días felices en Santa Elena',
        imageSrc: 'imagenesmom/petalo2.jpeg',
        imageAlt: 'Días felices en Santa Elena',
      },
      {
        id: 'petalo-03',
        petalLabel: 'Pétalo III',
        facetTag: 'Amor incondicional',
        title: 'Tu cuidado y ternura siempre',
        imageSrc: 'imagenesmom/petalo3.jpeg',
        imageAlt: 'Hilda cuidando y compartiendo con su hijo en el mar',
      },
      {
        id: 'petalo-04',
        petalLabel: 'Pétalo IV',
        facetTag: 'Cómplices de vida',
        title: 'Siempre juntos, mamá y yo',
        imageSrc: 'imagenesmom/petalo4.jpeg',
        imageAlt: 'Hilda y su hijo abrazados en la playa de noche',
      },
      {
        id: 'petalo-05',
        petalLabel: 'Pétalo V',
        facetTag: 'Un día inolvidable',
        title: 'Tu boda',
        imageSrc: 'imagenesmom/petalo5.jpeg',
        imageAlt: 'El día de la boda de Hilda Natividad',
      },
      {
        id: 'petalo-06',
        petalLabel: 'Pétalo VI',
        facetTag: 'Amor de madre e hija',
        title: 'Con tu mamá · Mi abuela',
        imageSrc: 'imagenesmom/petalo6.jpeg',
        imageAlt: 'Hilda Natividad junto a su madre (mi abuela)',
      },
      {
        id: 'petalo-07',
        petalLabel: 'Pétalo VII',
        facetTag: 'Amor de padre e hija',
        title: 'Con tu papá · Mi abuelo',
        imageSrc: 'imagenesmom/petalo7.jpeg',
        imageAlt: 'Hilda Natividad junto a su padre (mi abuelo)',
      },
      {
        id: 'petalo-08',
        petalLabel: 'Pétalo VIII',
        facetTag: 'Raíces y hogar',
        title: 'Siempre te van a acompañar',
        imageSrc: 'imagenesmom/petalo8.jpeg',
        imageAlt: 'Hilda junto a su familia paterna que la crió en su adolescencia',
      },
    ],
  },

  // ESCENA 7 — Un acróstico para ti (25 versos: HILDA NATIVIDAD MORALES LUNA)
  scene7Acrostic: {
    sceneNumber: 'Escena VI',
    eyebrow: 'Acróstico en 25 versos',
    title: 'HILDA NATIVIDAD MORALES LUNA',
    subtitle: 'Una vida que siempre encuentra la manera de florecer.',
    intro:
      'Las veinticinco letras de tu nombre completo entrelazan este poema dedicado a tu luz, tu valentía, tu vocación y el privilegio inmenso de tenerte como mamá.',
    closingDedication: 'Te amo, mamá. Eres la mejor madre del mundo.',
    groups: [
      {
        id: 'acrostico-hilda',
        word: 'HILDA',
        subtitle: 'Movimiento I · 5 versos',
        themeDescription: 'Tu luz propia, tu alegría, tu bondad y la mujer que admiro',
        verses: [
          {
            letter: 'H',
            verse: 'Hay personas que tienen una luz que brilla por sí sola, y tú eres una de ellas.',
          },
          {
            letter: 'I',
            verse:
              'Irradias una alegría que se siente en lo más profundo del ser de quienes tienen la fortuna de conocerte.',
          },
          {
            letter: 'L',
            verse:
              'Llevas en tu esencia una bondad hermosa que hace del mundo un lugar un poquito mejor.',
          },
          {
            letter: 'D',
            verse:
              'Detrás de cada paso que has dado hay una mujer que ha sabido levantarse, aprender y continuar.',
          },
          {
            letter: 'A',
            verse: 'Admiro profundamente a la persona, mujer, esposa y madre que eres.',
          },
        ],
      },
      {
        id: 'acrostico-natividad',
        word: 'NATIVIDAD',
        subtitle: 'Movimiento II · 9 versos',
        themeDescription: 'Tu valentía, tu huella docente, tu disciplina y la magia de tu esencia',
        verses: [
          {
            letter: 'N',
            verse: 'Nunca has permitido que las dificultades escriban el final de tu historia.',
          },
          {
            letter: 'A',
            verse:
              'A tu propia manera construiste un camino lleno de aprendizajes, historias, esperanza y muchísima valentía.',
          },
          {
            letter: 'T',
            verse:
              'Tu manera de enseñar y las huellas que has dejado a lo largo de los años han marcado la vida de miles de niños.',
          },
          {
            letter: 'I',
            verse:
              'Incluso en los momentos más difíciles, y después de tantas cosas complicadas, siempre sigues encontrando motivos para crecer y aprender.',
          },
          {
            letter: 'V',
            verse:
              'Veo en cada uno de tus logros el trabajo duro, el esfuerzo, la disciplina y la perseverancia que tanto te caracterizan.',
          },
          {
            letter: 'I',
            verse:
              'Inspiración es lo que encuentro al verte perseguir nuevos sueños, sin importar cuánto tiempo haya pasado.',
          },
          {
            letter: 'D',
            verse: 'Demuestras al mundo que nunca es tarde para comenzar una nueva etapa.',
          },
          {
            letter: 'A',
            verse:
              'Aún tienes muchas cosas por descubrir, sueños por cumplir y muchísimas razones para sentirte orgullosa de la persona tan linda que eres.',
          },
          {
            letter: 'D',
            verse:
              'Deseo que nunca pierdas esa magia de tu esencia que tanto llena nuestros corazones; que, a pesar de lo que pase, sigas siendo tú y que nadie te cambie, porque eres una persona magnífica.',
          },
        ],
      },
      {
        id: 'acrostico-morales',
        word: 'MORALES',
        subtitle: 'Movimiento III · 7 versos',
        themeDescription: 'Tus enseñanzas, tus valores y todo lo que compartimos juntos',
        verses: [
          {
            letter: 'M',
            verse:
              'Me has enseñado que ser una buena persona es una de las mayores grandezas que podemos alcanzar.',
          },
          {
            letter: 'O',
            verse:
              'Orientas al mundo con tu ejemplo, tus valores y esa forma única de comprender a los demás.',
          },
          {
            letter: 'R',
            verse:
              'Resiliencia, generosidad, autenticidad, solidaridad, compromiso, dedicación, respeto y felicidad son algunas de las cualidades que veo en ti día a día.',
          },
          {
            letter: 'A',
            verse:
              'Agradezco a la vida por cada segundo que paso a tu lado, cada risa, cada conversación y cada aventura que hemos compartido y que seguiremos viviendo.',
          },
          {
            letter: 'L',
            verse:
              'La tranquilidad de saber que estás ahí ha sido uno de los regalos más grandes que me has podido dar, madre mía.',
          },
          {
            letter: 'E',
            verse:
              'Enseñarme a disfrutar las pequeñas cosas es una de las lecciones que siempre llevaré conmigo.',
          },
          {
            letter: 'S',
            verse:
              'Siempre serás una de las razones por las cuales sigo mejorando día a día, una parte del motor de mi vida.',
          },
        ],
      },
      {
        id: 'acrostico-luna',
        word: 'LUNA',
        subtitle: 'Movimiento IV · 4 versos',
        themeDescription: 'Gratitud eterna y celebración de cada flor en tu camino',
        verses: [
          {
            letter: 'L',
            verse: 'Le doy gracias a la vida por darme la fortuna de tenerte como madre.',
          },
          {
            letter: 'U',
            verse:
              'Una mujer que, aun en los días difíciles, ha encontrado fuerzas para seguir adelante.',
          },
          {
            letter: 'N',
            verse:
              'No dejes nunca de perseguir aquello que te hace feliz ni de descubrir todo lo que eres capaz de lograr.',
          },
          {
            letter: 'A',
            verse:
              'Aquí estaré, celebrando tus pasos, tus sueños y cada nueva flor que nazca en tu camino.',
          },
        ],
      },
    ],
  },

  // ESCENA 8 — Carta de su hijo, dedicatoria musical en Spotify y despedida
  scene8LetterAndFarewell: {
    sceneNumber: 'Escena VII · VIII',
    eyebrow: 'De tu hijo para ti',
    title: 'Una carta desde el corazón',
    envelopeLabel: 'Para mi mamá · Hilda Natividad Morales Luna',
    openLetterButton: 'Abrir la carta de tu hijo',
    foldLetterButton: 'Guardar carta en su sobre',
    salutation: 'Querida mami:',
    letterParagraphs: [
      'Hoy, al celebrar tus 43 años, quería regalarte algo que pudiera guardar aunque sea una pequeña parte de todo lo que siento por ti, y siento que en este jardín que construí podrás ver en cualquier momento lo mucho que vales como persona y lo mucho que te amo. A veces la rutina pasa rápido y no siempre nos detenemos a decir en voz alta cuánto admiramos a las personas que más amamos, pero hoy quiero que cada palabra de este jardín te recuerde lo extraordinaria que eres.',
      'Gracias, mami, por estar siempre presente. Gracias por cuidarme cuando he estado enfermo, por sostenerme cuando he atravesado dificultades y por tenerme tanta paciencia incluso cuando mis cambios de ánimo propios de la adolescencia no han sido para nada fáciles. Cada día que comparto contigo veo tu esfuerzo genuino por ser una mejor madre, una mejor persona, tu preocupación por mi bienestar y el cariño con el que acompañas la persona en la que me estoy convirtiendo.',
      'No sabes cuánto disfruto el tiempo que compartimos: nuestras conversaciones largas, nuestras risas, escuchar tus historias y recordar nuestras aventuras juntos, como aquellos viajes a Santa Elena y tantos momentos en familia que llevo grabados en el alma. Siempre llevo conmigo aquello que me dijiste: «En el afán de ser hombre no olvides la magia de ser niño». Gracias por enseñarme a valorar lo sencillo, a vivir cada etapa sin prisa y nunca perder la alegría.',
      'Me llena de un orgullo inmenso ver a la mujer inteligente, luchadora, íntegra y resiliente que eres, sé que el camino no siempre fue sencillo, pero construiste tu camino con disciplina y valentía. Verte como docente de Lengua Castellana, haber alcanzado tu especialización en TICs, y hoy verte cursar tu maestría después de tanto tiempo sin estudiar formalmente es el ejemplo más grande que podrías darme, tu eres mi mayor ejemplo a seguir.',
      'Deseo que estos 43 años te traigan serenidad, salud, sueños cumplidos y motivos infinitos para sonreír. Que nunca dejes de aprender, de soñar ni de florecer como los girasoles que tanto te gustan.',
    ],
    signatureClosing: 'Con todo mi orgullo, mi gratitud y mi amor,',
    signatureName: 'Tu hijo',
    photoSrc: 'imagenesmom/cartahijo.png',
    photoAlt: 'Fotografía de Hilda Natividad junto a su hijo recién nacido',
    photoCaption: 'Siempre juntos · Mamá y yo',

    // DEDICATORIA FINAL: REPRODUCTOR DE GIRASOLES — RICARDO ARJONA
    spotifyDedication: {
      sectionEyebrow: 'Dedicatoria musical final · De tu hijo para ti',
      title: 'Una canción dedicada a la mujer de mi vida',
      introNote:
        'Para acompañar el final de esta carta, elegí esta canción que te dedique hace tiempo pero no esta de más recordartela, te amo mucho madre mía.',
      audioSrc: 'canciones/Ricardo Arjona - Mi Novia Se Me Está Poniendo Vieja.mp3',
      songTitle: 'Mi Novia Se Me Está Poniendo Vieja',
      artist: 'Ricardo Arjona',
      albumOrYear: 'Dedicatoria especial · 43 años floreciendo',
      dedicationBadge: 'Para mi mamá · Hilda Natividad Morales Luna',
      coverImageSrc: 'imagenesmom/hildaconmigomamayyojuntos.jpeg',
      coverImageAlt: 'Hilda Natividad junto a su hijo',
      poeticQuote:
        '«Mi novia se me está poniendo vieja, y yo que empezaba a enamorarme del peso de las cosas que aconseja, de su don universal de perdonarme…»',
      ambientTrackName: 'Coldplay — Clocks',
    },

    finalClosingQuote:
      '«Gracias por enseñarme que la vida, incluso después de los días difíciles, siempre encuentra una manera de florecer. Te quiero, mami».',
    backToTopLabel: 'Volver a recorrer el jardín',
    replayWelcomeLabel: 'Ver la floración inicial otra vez',
  },
};
