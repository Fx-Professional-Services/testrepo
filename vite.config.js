// File: vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/frontend',
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:4000',
        changeOrigin: true
      }
    }
  },
  build: {
    outDir: '../../dist'
  }
});