import { fileURLToPath, URL } from 'node:url'
import fs from 'fs'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // optimizeDeps: {
  //   include: ['@vue-app/api']
  // },
  server: {
    // host: true,
    // port: 5173,
    https: {
      cert: fs.readFileSync('../certs/fullchain.pem'),
      key: fs.readFileSync('../certs/privkey.pem')
    }
  },
  resolve: {
    // attempt to get workspace imports to work
    // preserveSymlinks: true,
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
