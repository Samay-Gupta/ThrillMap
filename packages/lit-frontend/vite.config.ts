import { defineConfig } from 'vite';

export default defineConfig({
  root: './app/src',
  base: '/',
  server: {
    proxy: {
      '/api': 'http://localhost:8081',
    },
  },
});
