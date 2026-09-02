import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import legacy from '@vitejs/plugin-legacy';

export default defineConfig({
  plugins: [
    react(),
    legacy({
      targets: ['firefox 45'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
    })
  ],
  build: {
    target: 'es2015',
  },
});