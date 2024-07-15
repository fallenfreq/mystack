<script setup lang="ts">
import { ref } from 'vue'
import type { SelectButtonChangeEvent } from 'primevue/selectbutton'
// Dark mode starts using the os preference
window.matchMedia('(prefers-color-scheme: dark)').matches &&
  document.documentElement.classList.add('dark')

const light = { icon: 'pi pi-sun', value: 'Light' }
const dark = { icon: 'pi pi-moon', value: 'Dark' }
const value = ref(document.documentElement.classList.contains('dark') ? dark : light)
const options = ref([light, dark])

function darkModeHandler(event: SelectButtonChangeEvent) {
  if (event.value.value === 'Dark') {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>

<template>
  <div class="card flex">
    <SelectButton
      class="text-xs"
      v-model="value"
      :options="options"
      optionLabel="value"
      dataKey="value"
      aria-labelledby="custom"
      @change="darkModeHandler"
    >
      <template #option="slotProps">
        <i :class="slotProps.option.icon"></i>
      </template>
    </SelectButton>
  </div>
</template>
