// GitHub Pages Configuration

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/profile-page-224/',  // Change this to match your actual repo name
})