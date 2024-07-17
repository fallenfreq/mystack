import { createVuestic } from 'vuestic-ui'

// import 'vuestic-ui/css'
// Vuestic css used when tailwind is used to stop confilcts
import 'vuestic-ui/styles/essential.css'
import 'vuestic-ui/styles/typography.css'
import config from '../vuestic.config'
const vuestic = createVuestic({ config })

import PrimeVue from 'primevue/config'
// Pass Aura or Lara as a theme to PrimeVue's pt property
// import Lara from './presets/lara'
import Aura from './presets/aura'

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
      pt: Aura
    })
    app.mount('#app')
  } else {
    console.error('Startup was not ok')
  }
})
