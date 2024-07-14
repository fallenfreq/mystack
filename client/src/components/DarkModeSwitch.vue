<script setup lang="ts">
const light = { icon: 'pi pi-sun', value: 'Light' }
const dark = { icon: 'pi pi-moon', value: 'Dark' }
import { ref } from 'vue'
import type { SelectButtonChangeEvent } from 'primevue/selectbutton'
const value = ref(light)
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
