import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const PORT = 3000;

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: {
      overlay: false // Try disabling the HMR overlay
    }
  },

  server: { port: PORT, host: true },
  preview: { port: PORT, host: true },
})