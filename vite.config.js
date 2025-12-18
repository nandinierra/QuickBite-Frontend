import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['slick-carousel', 'react-toastify', 'aos'],
          'icons': ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons', '@fortawesome/free-brands-svg-icons']
        }
      }
    }
  }
})
