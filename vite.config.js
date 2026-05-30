import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // During local development, proxy API calls to the PHP dev server
  // so you can run `php -S localhost:8080` in the project root
  server: {
    proxy: {
      '/api': {
        target:      'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },

  build: {
    // Output goes into /dist — this is what you upload to public_html
    outDir:    'dist',
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Chunk vendor libs separately for better caching
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
});
