// GitHub Pages Configuration

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/profile-page.2/',  // Replace 'profile-page.2' with your actual repo name
})