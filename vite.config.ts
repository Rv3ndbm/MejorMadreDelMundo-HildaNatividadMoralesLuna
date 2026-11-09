import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

/**
 * ============================================================================
 * CONFIGURACIÓN DE RUTA BASE PARA GITHUB PAGES Y DESARROLLO LOCAL
 * ============================================================================
 * Si tu repositorio en GitHub se llama distinto a
 * "MejorMadreDelMundo-HildaNatividadMoralesLuna", reemplaza únicamente el texto
 * entre barras en `REPO_NAME` por el nombre exacto de tu repositorio:
 *
 * Ejemplo: const REPO_NAME = '/mi-regalo-para-mama/';
 */
const REPO_NAME = '/MejorMadreDelMundo-HildaNatividadMoralesLuna/';

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    {
      name: 'dev-subpath-compatibility',
      configureServer(server) {
        server.middlewares.use((req, _res, next) => {
          if (req.url && req.url.startsWith(REPO_NAME)) {
            req.url = '/' + req.url.slice(REPO_NAME.length);
          } else if (req.url === REPO_NAME.slice(0, -1)) {
            req.url = '/';
          }
          next();
        });
      },
    },
  ],
  // En compilación de producción (`npm run build`) usa la subruta de GitHub Pages;
  // en desarrollo local (`npm run dev`) usa `/` y acepta también la subruta gracias al middleware.
  base: command === 'build' ? REPO_NAME : '/',
}));
