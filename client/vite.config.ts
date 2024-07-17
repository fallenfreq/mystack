import { fileURLToPath, URL } from 'node:url'
import fs from 'node:fs'
import extractCssVars from './plugins/extractCssVars'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    {
      name: 'postbuild-commands',
      buildStart: async () => {
        // TODO: Need to make it so this only runs if ./src/assets/base.css has changed
        console.log('Compiling css variables for Vuestic')
        extractCssVars('./src/assets/base.css', './cssVariables')
      }
    },
    vue(),
    Components({
      resolvers: [PrimeVueResolver()]
    })
  ],
  server: {
    https: {
      cert: fs.readFileSync('../certs/fullchain.pem'),
      key: fs.readFileSync('../certs/privkey.pem')
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
