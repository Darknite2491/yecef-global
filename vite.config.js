import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Absolute so asset URLs resolve correctly on nested routes like /about.
  base: '/',
  build: { outDir: 'dist', assetsDir: 'assets' },
})
