<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <header>
    <vuesticNav />
  </header>

  <main class="flex justify-center mt-5">
    <RouterView />
  </main>
</template>

<style scoped></style>
