import type { ComponentCustomProperties } from 'vue'

declare module '@vue/runtime-core' {
  // Declare augmentation for the `ComponentCustomProperties` interface
  interface ComponentCustomProperties {
    $addKeyCombo: (keyCombo: string, func: () => void) => void
    $removeKeyCombo: (keyCombo: string) => void
  }
}
