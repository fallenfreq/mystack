<template>
  <Menubar :model="items">
    <template #start>
      <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="35" height="35" />
    </template>
    <template #end>
      <DarkModeSwitch />
    </template>
  </Menubar>
</template>

<script setup>
import { ref } from 'vue'
import zitadelAuth from '@/services/zitadelAuth'
import router from '@/router'
const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    command: async () => await router.push('/')
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    command: async () => await router.push('/about')
  },
  {
    label: 'Demos',
    icon: 'pi pi-objects-column',
    items: [
      {
        label: 'Vuestic',
        icon: 'pi pi-bolt',
        command: async () => await router.push('/vuestic-demo')
      },
      {
        label: 'Primevue',
        icon: 'pi pi-prime',
        command: async () => await router.push('/primevue-demo')
      }
    ]
  },
  { label: 'Admin', icon: 'pi pi-cog', url: '/admin', visible: () => zitadelAuth.hasRole('admin') },
  {
    label: 'Profile',
    icon: 'pi pi-user',
    command: async () => await router.push('/profile'),
    visible: () => zitadelAuth.oidcAuth.isAuthenticated
  },
  {
    label: 'Signout',
    icon: 'pi pi-sign-out',
    command: () => zitadelAuth.oidcAuth.signOut(),
    visible: () => zitadelAuth.oidcAuth.isAuthenticated
  },
  {
    label: 'Login',
    icon: 'pi pi-user',
    command: async () => await router.push('/login'),
    visible: () => !zitadelAuth.oidcAuth.isAuthenticated
  }
])
</script>
