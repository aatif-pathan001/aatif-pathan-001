import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [
      {
        name: 'serve-new-portfolio-raw',
        configureServer(server) {
          server.middlewares.use('/new_portfolio', (req, res, next) => {
            const reqPath = decodeURIComponent((req.url || '/').split('?')[0]);
            const pubFilePath = path.join(__dirname, 'public', 'new_portfolio', reqPath);
            const rootFilePath = path.join(__dirname, 'new_portfolio', reqPath);
            const filePath = fs.existsSync(pubFilePath) ? pubFilePath : rootFilePath;
            if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
              const ext = path.extname(filePath).toLowerCase();
              const mimeMap: Record<string, string> = {
                '.html': 'text/html; charset=utf-8',
                '.js': 'application/javascript; charset=utf-8',
                '.jsx': 'text/plain; charset=utf-8',
                '.css': 'text/css; charset=utf-8',
                '.json': 'application/json; charset=utf-8',
                '.png': 'image/png',
                '.jpg': 'image/jpeg',
                '.jpeg': 'image/jpeg',
                '.svg': 'image/svg+xml',
              };
              res.setHeader('Content-Type', mimeMap[ext] || 'application/octet-stream');
              fs.createReadStream(filePath).pipe(res);
              return;
            }
            next();
          });
        },
      },
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
