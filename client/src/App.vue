<script setup lang="ts">
import { RouterView } from 'vue-router'
import DarkModeSwitch from './components/DarkModeSwitch.vue'
// import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <header>
    <DarkModeSwitch />
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="50" height="50" />

    <div class="wrapper">
      <!-- <HelloWorld msg="You did it!" /> -->
      <NavBar />
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }
}
</style>
