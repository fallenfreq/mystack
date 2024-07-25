import cssVariables from './cssVariables'
import { createIconsConfig } from 'vuestic-ui'
// Import the Tailwind CSS configuration
// This also contins the renamed colours so we are resolving an empty config instead
// import defaultColors from 'tailwindcss/colors'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config'
const customColours = (tailwindConfig?.theme?.extend?.colors || {}) as Record<string, string>
const defaultColors = resolveConfig({ content: { files: [] } }).theme.colors

type ColorValue = string
type ColorObject = { [key: string]: ColorValue | ColorObject }
type CssVariables = { [key: string]: { [key: string]: string } }

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
  { ...defaultColors, ...customColours },
  'root',
  cssVariables
)

export default {
  // These are the Vuestic default values and the defaults in Tailwind
  // if these are changed in Tailwind, they should be updated here too
  breakpoints: {
    thresholds: {
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      '2xl': 1536
    }
  },

  components: {
    VaSidebarItem: {
      activeColor: 'primary-highlight-hover',
      hoverColor: 'primary-highlight-hover'
    }
  },

  icons: createIconsConfig({
    // va-arrow-down and va-arrow-up were using a deprecated icon from material-icons
    aliases: [
      {
        name: 'va-arrow-down',
        to: 'keyboard_arrow_down'
      },
      {
        name: 'va-arrow-up',
        to: 'keyboard_arrow_up'
      }
    ],
    fonts: [
      // mi- icons are used by vustic to set some va- icons
      // This makes sure that the mi- icons also use the rounded material icons
      {
        name: 'mi-{icon}',
        resolve: ({ icon }) => ({
          content: icon,
          class: 'material-symbols-rounded'
        })
      },
      {
        name: '{icon}',
        resolve: ({ icon }) => ({
          content: icon,
          class: 'material-symbols-rounded'
        })
      }
    ]
  }),
  // The || hex value is the default value that Vuestic uses
  // its here more for reference than anything else
  // primary is also a root colour so it's overriden by the root colours
  colors: {
    presets: {
      light: {
        ...processedRootColors
      },
      dark: {
        ...processedRootColors,
        ...processTailwindConfigColors(customColours, 'dark', cssVariables)
      },
      pink: {
        ...processedRootColors,
        ...processTailwindConfigColors(customColours, 'pink', cssVariables)
      }
    },
    // colors.variables is a shorcut for colors.presets[currentPresetName].
    // setting variables aswell as presets will overwrite the presets
    variables: processedRootColors
  }
}
