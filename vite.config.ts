import * as path from 'path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, './src')
    }
  },
  mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
  build: {
    target: 'es2015',
    minify: 'terser',
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1024 * 1024,
  },
  esbuild: {
    jsxFragment: 'Fragment'
  }
})
