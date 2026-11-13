import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import viteReact from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [tailwindcss(), viteReact()],
  server: {
    host: '0.0.0.0',
    port: 3000,
  },
})
