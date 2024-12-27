import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const PORT =  3000; // Use environment variable for PORT if available

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Development server configuration
  server: {
    port: PORT,       // Set the port for the dev server
    host: '0.0.0.0',  // Allow connections from external hosts (useful for Docker or Railway)
    hmr: {
      overlay: false, // Disable the HMR overlay (optional)
    },
  },

  // Preview server configuration for `npm run build`
  preview: {
    port: PORT,       // Preview server port
    host: '0.0.0.0',  // Allow external access
  },
});
