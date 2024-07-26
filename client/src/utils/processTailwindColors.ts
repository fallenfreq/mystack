import cssVariables from '@/../cssVariables'
// Import the Tailwind CSS configuration
// This also contins the renamed colours so we are resolving an empty config instead
// import defaultColors from 'tailwindcss/colors'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/../tailwind.config'

type ColorValue = string
type ColorObject = { [key: string]: ColorValue | ColorObject }
type CssVariables = { [key: string]: { [key: string]: string } }

const customColors = (tailwindConfig?.theme?.extend?.colors || {}) as ColorObject
const defaultColors = resolveConfig({ content: { files: [] } }).theme.colors

const processTailwindConfigColors = (
  colors: ColorObject,
  preset: string,
  cssVariables: CssVariables
) => {
  const flattenColors = (colorObject: ColorObject, prefix = ''): ColorObject => {
    return Object.keys(colorObject).reduce((accumulator, key) => {
      const colorValue = colorObject[key]
      const newPrefix = key === 'DEFAULT' ? prefix : `${prefix}${prefix ? '-' : ''}${key}`

      if (typeof colorValue === 'string') {
        if (!colorValue.startsWith('rgb') && !colorValue.startsWith('#')) {
          return accumulator
        }

        let resolvedValue = colorValue

        // Resolve CSS variable references
        if (resolvedValue.includes('var(--')) {
          const variableMatches = resolvedValue.match(/var\(--(.*?)\)/g)
          if (variableMatches) {
            for (const match of variableMatches) {
              const variableName = match.replace(/var\(--(.*?)\)/, '$1')
              const variableValue = cssVariables[preset]?.[`--${variableName}`]
              if (variableValue) {
                resolvedValue = resolvedValue.replace(`var(--${variableName})`, variableValue)
              } else {
                return accumulator
              }
            }
          }
        }

        // Replace spaces with commas in rgb values for compatibility
        if (resolvedValue.startsWith('rgb(')) {
          resolvedValue = resolvedValue.replace(/ /g, ', ')
        }

        // Convert rgb to rgba syntax for compatibility
        if (resolvedValue.includes('/')) {
          const [rgbPart, opacityPart] = resolvedValue.split('/')
          const rgbaPart = rgbPart.replace('rgb', 'rgba')
          resolvedValue = `${rgbaPart.trim()}, ${opacityPart.trim()}`
        }

        accumulator[newPrefix] = resolvedValue
      } else if (typeof colorValue === 'object') {
        Object.assign(accumulator, flattenColors(colorValue, newPrefix))
      }

      return accumulator
    }, {} as ColorObject)
  }

  return flattenColors(colors) as Record<string, string>
}

const processedRootColors = processTailwindConfigColors(
  { ...defaultColors, ...customColors },
  'root',
  cssVariables
)

const processedDarkColors = processTailwindConfigColors(customColors, 'dark', cssVariables)
const processedPinkColors = processTailwindConfigColors(customColors, 'pink', cssVariables)

export {
  processTailwindConfigColors,
  processedRootColors,
  processedDarkColors,
  processedPinkColors
}
