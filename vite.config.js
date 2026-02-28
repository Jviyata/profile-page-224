// GitHub Pages Configuration

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/profile-page-224/',  // MUST match repo name exactly
})