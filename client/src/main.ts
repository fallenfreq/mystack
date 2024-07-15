import { createVuestic } from 'vuestic-ui'
// import 'vuestic-ui/css'
// Vuestic css used when tailwind is used to stop confilcts
import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/typography.css'
import config from '../vuestic.config.js'
const vuestic = createVuestic({ config })

import PrimeVue from 'primevue/config'
import Lara from './presets/lara'

import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import zitadelAuth from '@/services/zitadelAuth'

declare module 'vue' {
  interface ComponentCustomProperties {
    $zitadel: typeof zitadelAuth
  }
}

zitadelAuth.oidcAuth.startup().then((ok: boolean) => {
  if (ok) {
    const app = createApp(App)
    app.config.globalProperties.$zitadel = zitadelAuth
    app.use(router)
    app.use(vuestic)
    app.use(PrimeVue, {
      unstyled: true,
      pt: Lara
    })
    app.mount('#app')
  } else {
    console.error('Startup was not ok')
  }
})
