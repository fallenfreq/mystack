<template>
  <VaSwitch
    v-model="switchValue"
    color="BackgroundSecondary"
    style="--va-switch-checker-background-color: #252723"
    @input="darkModeHandler"
    :indeterminate="pinkMode"
    :disabled="pinkMode"
  >
    <template #innerLabel>
      <div class="va-text-center">
        <VaIcon :name="switchValue == null ? '' : switchValue ? 'dark_mode' : 'light_mode'" />
      </div>
    </template>
  </VaSwitch>
</template>

<script setup lang="ts">
import { type Ref, ref, onMounted, getCurrentInstance } from 'vue'
import { useColors, useGlobalConfig } from 'vuestic-ui'
const { applyPreset, currentPresetName } = useColors()

const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary')
const { globalConfig } = useGlobalConfig()
// Set the primary color to the value of the CSS variable used by other components
globalConfig.value.colors.presets.light.primary = `rgb(${primaryColor.replace(new RegExp(' ', 'g'), ', ')})`

// Dark mode starts using the os preference
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  applyPreset('dark')
  document.documentElement.classList.add('dark')
}

let switchValue: Ref<boolean | null> = ref(document.documentElement.classList.contains('dark'))
let pinkMode = ref(false)

function darkModeHandler(event: any) {
  if (event.target['checked']) {
    applyPreset('dark')
    document.documentElement.classList.add('dark')
  } else {
    applyPreset('light')
    document.documentElement.classList.remove('dark')
  }
}

let previousMode = currentPresetName.value

// Secret pink mode
function myFunction(): void {
  if (currentPresetName.value === 'pink') {
    applyPreset(previousMode)
    document.documentElement.classList.remove('pink')
    document.documentElement.classList.add(previousMode)
    pinkMode.value = false
    switchValue.value = document.documentElement.classList.contains('dark')
    console.log('Secret pink mode deactivated')
  } else {
    previousMode = currentPresetName.value
    applyPreset('pink')
    document.documentElement.classList.add('pink')
    pinkMode.value = true
    switchValue.value = null
    document.documentElement.classList.remove(previousMode)
    console.log('Secret pink mode activated')
  }
}

const instance = getCurrentInstance()

onMounted(() => {
  // Register the key combo and function
  console.log('Mounting dark mode switch')
  instance?.proxy?.$addKeyCombo('Cmd+k', myFunction)
})
</script>
