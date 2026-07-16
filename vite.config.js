import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

import { cloudflare } from "@cloudflare/vite-plugin";

export default defineConfig({
  plugins: [react(), tailwindcss(), cloudflare()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('framer-motion')) return 'motion'
            if (id.includes('react-scroll') || id.includes('lenis')) return 'scroll'
            if (id.includes('react') || id.includes('react-dom')) return 'vendor'
            if (id.includes('react-icons')) return 'icons'
          }
        },
      },
    },
  },
})