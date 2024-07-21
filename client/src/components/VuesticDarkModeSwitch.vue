<template>
  <VaSwitch
    v-model="switchValue"
    color="BackgroundSecondary"
    style="--va-switch-checker-background-color: #252723"
    @input="darkModeHandler"
    class=""
  >
    <template #innerLabel>
      <div class="va-text-center">
        <VaIcon :name="switchValue ? 'dark_mode' : 'light_mode'" />
      </div>
    </template>
  </VaSwitch>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useColors, useGlobalConfig } from 'vuestic-ui'

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary')
const { globalConfig } = useGlobalConfig()
// Set the primary color to the value of the CSS variable used by other components
globalConfig.value.colors.presets.light.primary = `rgb(${primaryColor.replace(new RegExp(' ', 'g'), ', ')})`

// Dark mode starts using the os preference
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  useColors().applyPreset('dark')
  document.documentElement.classList.add('dark')
}

let switchValue = ref(document.documentElement.classList.contains('dark'))

function darkModeHandler(event: any) {
  if (event.target['checked']) {
    useColors().applyPreset('dark')
    document.documentElement.classList.add('dark')
  } else {
    useColors().applyPreset('light')
    document.documentElement.classList.remove('dark')
  }
}
</script>
