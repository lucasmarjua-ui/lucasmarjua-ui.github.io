import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Root user page (lucasmarjua-ui.github.io) is served from the domain root.
export default defineConfig({
  base: '/',
  plugins: [react()],
});
