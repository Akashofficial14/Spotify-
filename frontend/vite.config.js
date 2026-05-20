import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  build: {
    // Explicitly set output directory to 'dist'
    outDir: 'dist',
    // Helps with large Spotify clones by increasing the warning limit
    chunkSizeWarningLimit: 1600, 
  },
  // Ensures paths are relative, which is safer for Vercel deployments
  base: '/',
})