import * as path from 'path'
import { build, defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

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
  },
  
  esbuild: {
    jsxFragment: 'Fragment'
  }
})
