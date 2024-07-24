<script lang="ts" setup>
import { computed } from 'vue'
import zitadelAuth from '@/services/zitadelAuth'
import { trpc } from '../trpc'
import axios from 'axios'

const user = computed(() => zitadelAuth.oidcAuth.userProfile)

// This is just here temporarily to test calling a secured ZITADEL endpoint
axios
  .request({
    method: 'GET',
    maxBodyLength: Infinity,
    url: `${import.meta.env.VITE_API_ISSUER}oidc/v1/userinfo`,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: 'Bearer ' + zitadelAuth.oidcAuth.accessToken
    }
  })
  .then((response) => {
    console.log('Zitadel response.data', response.data)
  })
  .catch((error) => {
    console.log(error)
  })

// This is just here temporarily to test calling a secure endpoint on our tRPC API
// The endpoint just returns a secure property and echos the input
trpc.secure.test
  .query('Sending data to tRPC secure endpoint from Vue client')
  .then((response) => {
    console.log('tRPC secure response', response)
  })
  .catch((error) => {
    console.log(error)
  })

const claims = computed(() => {
  if (user.value) {
    return Object.keys(user.value).map((key) => ({
      key,
      value:
        key === 'urn:zitadel:iam:user:metadata'
          ? user.value[key].map((obj: Record<string, string>) => {
              const decodedObj: Record<string, string> = {}
              for (const [key, value] of Object.entries(obj)) {
                decodedObj[key] = atob(value as string)
              }
              return decodedObj
            })
          : user.value[key]
    }))
  }
  return []
})
</script>
<template>
  <div>
    <h1>This is a login-protected page</h1>
    <h2>The following profile data is extended by information from ZITADELs userinfo endpoint.</h2>
    <ul class="claims">
      <li v-for="c in claims" :key="c.key">
        <strong>{{ c.key }}</strong
        >: {{ c.value }}
      </li>
    </ul>
  </div>
</template>
