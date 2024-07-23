import type { App, Plugin } from 'vue'

interface KeyFunctionMap {
  [key: string]: () => void
}

const keyFunctionMap: KeyFunctionMap = {}

const handleKeydown = (event: KeyboardEvent): void => {
  const keyCombo = `${event.metaKey ? 'Cmd+' : ''}${event.ctrlKey ? 'Ctrl+' : ''}${event.shiftKey ? 'Shift+' : ''}${event.altKey ? 'Alt+' : ''}${event.key}`

  if (keyFunctionMap[keyCombo]) {
    keyFunctionMap[keyCombo]()
  }
}

const addKeyCombo = (keyCombo: string, func: () => void): void => {
  keyFunctionMap[keyCombo] = func
}

const removeKeyCombo = (keyCombo: string): void => {
  delete keyFunctionMap[keyCombo]
}

const globalKeyPlugin: Plugin = {
  install(app: App) {
    app.config.globalProperties.$addKeyCombo = addKeyCombo
    app.config.globalProperties.$removeKeyCombo = removeKeyCombo

    window.addEventListener('keydown', handleKeydown)
    app.mixin({
      beforeUnmount() {
        window.removeEventListener('keydown', handleKeydown)
      }
    })
  }
}

export default globalKeyPlugin
export { addKeyCombo, removeKeyCombo }
