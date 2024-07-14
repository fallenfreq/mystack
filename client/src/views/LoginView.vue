<script lang="ts" setup>
import { computed } from 'vue'
import zitadelAuth from '@/services/zitadelAuth'

const user = computed(() => zitadelAuth.oidcAuth.userProfile)

const claims = computed(() => {
  if (user.value) {
    return Object.keys(user.value).map(key => ({
      key,
      value: user.value[key]
    }))
  }
  return []
})
</script>
<template>
  <div>
    <h1>
      This is a login-protected page
    </h1>
    <h2>
      The following profile data is extended by information from ZITADELs userinfo endpoint.
    </h2>
    <p>
      <ul class="claims">
        <li v-for="c in claims" :key="c.key">
          <strong>{{ c.key }}</strong
          >: {{ c.value }}
        </li>
      </ul>
    </p>
  </div>
</template>
