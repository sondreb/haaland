import { defineConfig } from 'vite';

// The site is served from the root of a custom domain (haaland.brainbox.no).
// Override with VITE_BASE (e.g. "/haaland/") to deploy as a GitHub project page.
const base = process.env.VITE_BASE ?? '/';

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
