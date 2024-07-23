import type { InjectionKey } from 'vue'
const AddKeyCombo: InjectionKey<(keyCombo: string, func: () => void) => void> =
  Symbol('AddKeyCombo')

const RemoveKeyCombo: InjectionKey<(keyCombo: string) => void> = Symbol('RemoveKeyCombo')

export { AddKeyCombo, RemoveKeyCombo }
