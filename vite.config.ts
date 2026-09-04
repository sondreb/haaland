import { defineConfig } from 'vite';

// GitHub Pages serves project sites from /<repo>/. Override with VITE_BASE
// (e.g. "/") when deploying to a custom domain or user site.
const base = process.env.VITE_BASE ?? (process.env.NODE_ENV === 'production' ? '/haaland/' : '/');

export default defineConfig({
  base,
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 5173,
    open: false,
  },
});
