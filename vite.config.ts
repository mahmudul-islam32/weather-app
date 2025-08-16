import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({
    jsxImportSource: 'react',
    babel: {
      plugins: [],
    },
  })],
  // Set the base path for GitHub Pages deployment
  base: process.env.NODE_ENV === 'production' ? '/weather-app/' : '/',
  server: {
    host: '0.0.0.0',
    port: 5173,
    watch: {
      usePolling: true,
    },
    hmr: {
      port: 5173,
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
