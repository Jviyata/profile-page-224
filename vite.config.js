// Lab 13 - GitHub Pages Configuration

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/profile-page.2/',
})