import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const page = (name: string) => resolve(here, name, 'index.html');

// The build writes straight into the repository root, which is what GitHub Pages
// serves. emptyOutDir stays false so the committed index.html, assets/, research/
// and docs/ survive a rebuild. assetsDir is "static" so the hashed bundles never
// collide with the hand-curated assets/ folder.
export default defineConfig({
  root: here,
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: resolve(here, '..'),
    emptyOutDir: false,
    assetsDir: 'static',
    rollupOptions: {
      input: {
        world: page('world'),
        day: page('day'),
        try: page('try'),
        member: page('member'),
        next: page('next'),
      },
    },
  },
});
