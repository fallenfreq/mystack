import { createZITADELAuth } from '@zitadel/vue'
import { jwtDecode } from 'jwt-decode'

// zitadelAuth ts(2742)
// The inferred type of 'zitadelAuth' cannot be named without a reference to '.pnpm/vue-oidc-client@1.0.0-alpha.5/node_modules/vue-oidc-client/vue3'. This is likely not portable. A type annotation is necessary.ts(2742)
import type { OidcAuth } from 'vue-oidc-client/vue3'

// REDIRECT SETTINGS need to be set in the zitadel app correctly for login page to work
const zitadelAuth = createZITADELAuth(
  {
    project_resource_id: import.meta.env.VITE_API_PROJECT_RESOURCE_ID,
    client_id: import.meta.env.VITE_API_CLIENT_ID,
    issuer: import.meta.env.VITE_API_ISSUER
  },
  undefined,
  undefined,
  undefined,
  {
    scope: [
      'openid',
      'profile',
      'email',
      'offline_access',
      `urn:zitadel:iam:org:project:id:${import.meta.env.VITE_API_PROJECT_RESOURCE_ID}:aud`,
      'urn:zitadel:iam:org:projects:roles',
      'urn:zitadel:iam:user:metadata'
    ].join(' ')
  }
)

// handle events
zitadelAuth.oidcAuth.events.addAccessTokenExpiring(function () {
  // eslint-disable-next-line no-console
  console.log('access token expiring')
})

zitadelAuth.oidcAuth.events.addAccessTokenExpired(function () {
  // eslint-disable-next-line no-console
  console.log('access token expired')
})

zitadelAuth.oidcAuth.events.addSilentRenewError(function (err) {
  // eslint-disable-next-line no-console
  console.error('silent renew error', err)
})

zitadelAuth.oidcAuth.events.addUserLoaded(function (user) {
  // eslint-disable-next-line no-console
  console.log('Decoded jwt id_token', jwtDecode(user.id_token))
  console.log('user loaded', user)
})

zitadelAuth.oidcAuth.events.addUserUnloaded(function () {
  // eslint-disable-next-line no-console
  console.log('user unloaded')
})

zitadelAuth.oidcAuth.events.addUserSignedOut(function () {
  // eslint-disable-next-line no-console
  console.log('user signed out')
})

zitadelAuth.oidcAuth.events.addUserSessionChanged(function () {
  // eslint-disable-next-line no-console
  console.log('user session changed')
})

export default zitadelAuth
