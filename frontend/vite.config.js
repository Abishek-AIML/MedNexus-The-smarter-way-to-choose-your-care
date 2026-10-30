import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')

  return {
    plugins: [react()],
    build: {
      chunkSizeWarningLimit: 1000, // Increase limit to 1000KB
      rollupOptions: {
        output: {
          manualChunks: {
            // Split vendor libraries
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'icons': ['react-icons'],
            'utils': ['axios']
          }
        }
      }
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:3000',
          changeOrigin: true
        }
      }
    }
  }
})