# Guía completa de personalización y despliegue en GitHub Pages 🌻
## «La mujer que siempre florece — 43 años floreciendo»

Todo el contenido personal, fotografías, recuerdos, etapa académica, acróstico, carta, audio ambiental y enlace de Spotify están centralizados en:

👉 **`src/data/birthday-content.ts`**

---

## 1. Estructura de carpetas para tus fotografías y música

Coloca tus archivos reales dentro de `public/` siguiendo esta organización:

```text
public/
├── audio/
│   └── ambient.mp3               # Música ambiental que suena al entrar al jardín
└── images/
    ├── portrait/                 # Retratos de Hilda sola
    │   ├── hilda-principal.svg   # (Reemplazar por ej. hilda-principal.jpg)
    │   └── hilda-sonrisa.svg
    ├── family/                   # Fotografías de Hilda contigo y en familia
    │   ├── hilda-con-su-hijo.svg # Foto principal junto a ti (Álbum y Carta)
    │   └── momento-familiar.svg
    ├── memories/                 # Viajes (Santa Elena), celebraciones, pétalos
    │   ├── viaje-santa-elena.svg
    │   ├── celebracion-especial.svg
    │   ├── instante-cotidiano.svg
    │   └── petalo-01.svg ... petalo-08.svg
    ├── academic/                 # Lengua Castellana, Especialización TIC y Maestría
    │   ├── vocacion-docente.svg
    │   ├── especializacion-tic.svg
    │   └── etapa-maestria.svg
    └── decorations/
```

### Cómo cambiar una fotografía
1. Copia tu foto (`.jpg`, `.jpeg`, `.png` o `.webp`) en la subcarpeta correspondiente dentro de `public/images/`.
2. En `src/data/birthday-content.ts`, actualiza la ruta relativa (sin preocuparte por la barra inicial; el sistema la adapta automáticamente para GitHub Pages):
   ```ts
   portraitSrc: 'images/portrait/mi-foto-favorita.jpg',
   ```

---

## 2. Cómo configurar la música ambiental y la canción final de Spotify

1. **Música ambiental local (`ambientAudio`)**:
   - Copia tu archivo `.mp3` en `public/audio/ambient.mp3` (puedes sobrescribir el archivo existente o cambiar el nombre en `ambientAudio.src` dentro de `src/data/birthday-content.ts`).
   - Se inicia únicamente cuando tu mamá pulsa **«Entrar a mi jardín»**.
2. **Canción final en Spotify (`scene8LetterAndFarewell.spotifyDedication.spotifyUrlOrUri`)**:
   - Abre Spotify, busca la canción que quieras dedicarle, haz clic en **Compartir → Copiar enlace de la canción** y pégalo en `spotifyUrlOrUri`:
     ```ts
     spotifyUrlOrUri: 'https://open.spotify.com/track/TU_ID_DE_CANCION',
     ```
   - El sistema convierte automáticamente cualquier enlace o URI de Spotify al formato oficial de reproductor integrado (`/embed/track/...`) y **atenúa automáticamente la música ambiental** para que jamás suenen dos canciones al mismo tiempo.

---

## 3. Cómo publicar gratis en GitHub Pages (paso a paso)

El proyecto ya incluye el flujo automático en `.github/workflows/deploy.yml` y la configuración de subdirectorio en `vite.config.ts`.

### Paso 1: Verificar el nombre del repositorio en `vite.config.ts`
Abre `vite.config.ts` y asegúrate de que `REPO_NAME` coincida exactamente con el nombre que tendrá tu repositorio en GitHub (entre barras `/`):

```ts
const REPO_NAME = '/MejorMadreDelMundo-HildaNatividadMoralesLuna/';
```

*(Por ejemplo, si creas un repositorio llamado `regalo-mama-43`, cámbialo a `'/regalo-mama-43/'`).*

### Paso 2: Crear el repositorio en GitHub y subir el proyecto
1. Entra a [github.com/new](https://github.com/new) y crea un repositorio **Público** (para usar GitHub Pages gratis) con ese mismo nombre.
2. En la terminal, dentro de la carpeta del proyecto, ejecuta:

```powershell
git init
git add .
git commit -m "Regalo 43 años Hilda Natividad - La mujer que siempre florece"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/MejorMadreDelMundo-HildaNatividadMoralesLuna.git
git push -u origin main
```

### Paso 3: Activar GitHub Pages con GitHub Actions
1. En tu repositorio de GitHub, ve a **Settings** (Configuración) → **Pages** (en el menú lateral izquierdo).
2. En la sección **Build and deployment** → **Source**, selecciona **`GitHub Actions`**.

### Paso 4: Ver el despliegue y actualizar en el futuro
1. Ve a la pestaña **Actions** de tu repositorio en GitHub: verás el flujo **"Deploy to GitHub Pages"** compilando y publicando la página en menos de 1 minuto.
2. Cuando termine en verde, ahí mismo aparecerá el enlace final:
   `https://TU_USUARIO.github.io/MejorMadreDelMundo-HildaNatividadMoralesLuna/`
3. Cada vez que agregues nuevas fotos o cambies textos en tu computador, solo ejecuta:
   ```powershell
   git add .
   git commit -m "Actualizar fotos y recuerdos"
   git push
   ```
   ¡Y GitHub actualizará la página automáticamente!
