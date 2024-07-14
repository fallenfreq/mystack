<template>
  <div class="card">
    <Menubar :model="items">
      <template #start>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="35" height="35" />
      </template>
      <template #end>
        <DarkModeSwitch />
      </template>
    </Menubar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import zitadelAuth from '@/services/zitadelAuth'
import router from '@/router'

const items = ref([
  {
    label: 'Home',
    icon: 'pi pi-home',
    // url: '/',
    command: async () => await router.push('/')
  },
  {
    label: 'About',
    icon: 'pi pi-info-circle',
    // url: '/about',
    command: async () => await router.push('/about')
  },
  {
    label: 'Demos',
    icon: 'pi pi-objects-column',
    items: [
      {
        label: 'Vuestic',
        icon: 'pi pi-bolt',
        // url: '/vuestic-demo'
        command: async () => await router.push('/vuestic-demo')
      },
      {
        label: 'Primevue',
        icon: 'pi pi-prime',
        // url: '/primevue-demo',
        command: async () => await router.push('/primevue-demo')
      }
    ]
  },
  { label: 'Admin', icon: 'pi pi-cog', url: '/admin', visible: () => zitadelAuth.hasRole('admin') },
  {
    label: 'Signout',
    icon: 'pi pi-sign-out',
    command: () => zitadelAuth.oidcAuth.signOut(),
    visible: () => zitadelAuth.oidcAuth.isAuthenticated
  },
  {
    label: 'Login',
    icon: 'pi pi-user',
    login: '/primevue-demo'
  }
])
</script>
<!-- 
<script lang="ts">
//
</script>
<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/login">Login</RouterLink>
    <RouterLink to="/vuestic-demo">Vuestic</RouterLink>
    <RouterLink to="/primevue-demo">Primevue</RouterLink>
    <RouterLink to="/admin" v-if="$zitadel.hasRole('admin')">Admin</RouterLink>
    <a href="#" @click.prevent="$zitadel.oidcAuth.signOut" v-if="$zitadel.oidcAuth.isAuthenticated"
      >Signout
    </a>
  </nav>
</template>
<style scoped lang="css">
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style> -->
