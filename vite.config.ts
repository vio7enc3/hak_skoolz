import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { viteSingleFile } from 'vite-plugin-singlefile';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr(), viteSingleFile()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    manifest: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        entryFileNames: '[name]_[hash].js',
      },
    },
  },
});
