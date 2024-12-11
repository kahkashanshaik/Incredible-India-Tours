import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';
import rewriteAll from 'vite-plugin-rewrite-all';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),rewriteAll()],
  resolve: {
    alias: {
      '@': path.relative(__dirname, 'src'),
    }
  }
})
