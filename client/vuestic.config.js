import cssVariables from './cssVariables'
import { createIconsConfig } from 'vuestic-ui'
// Import the Tailwind CSS configuration
// This also contins the renamed colours so we are resolving an empty config instead
// import defaultColors from 'tailwindcss/colors'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from './tailwind.config'
const customColours = tailwindConfig.theme.extend.colors
const defaultColors = resolveConfig({}).theme.colors

const processTailwindConfigColors = (colors, preset) => {
  const flattenColors = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
      const value = obj[key]
      const newPrefix = key === 'DEFAULT' ? prefix : `${prefix}${prefix ? '-' : ''}${key}`

      if (typeof value === 'string') {
        if (!value.startsWith('rgb') && !value.startsWith('#')) return acc
        let resolvedValue = value

        // Resolve variables
        if (resolvedValue.includes('var(--')) {
          const varMatches = resolvedValue.match(/var\(--(.*?)\)/g)
          if (varMatches) {
            for (const match of varMatches) {
              const varName = match.replace(/var\(--(.*?)\)/, '$1')
              const varValue = cssVariables[preset]?.[`--${varName}`]
              if (varValue) {
                resolvedValue = resolvedValue.replace(`var(--${varName})`, varValue)
              } else return acc
            }
          }
        }

        // Add commas to rgb values since vuestic doesn't support the new syntax
        if (resolvedValue.startsWith('rgb(')) {
          resolvedValue = resolvedValue.replace(/ /g, ', ')
        }

        // Convert rgb to rgba syntax since vuestic doesn't support the new syntax
        if (resolvedValue.includes('/')) {
          const [rgbPart, opacityPart] = resolvedValue.split('/')
          const rgbaPart = rgbPart.replace('rgb', 'rgba')
          resolvedValue = `${rgbaPart.trim()}, ${opacityPart.trim()}`
        }

        acc[newPrefix] = resolvedValue
      } else if (typeof value === 'object') {
        Object.assign(acc, flattenColors(value, newPrefix))
      }
      return acc
    }, {})
  }

  return flattenColors(colors)
}

const processedRootColors = processTailwindConfigColors(
  { ...defaultColors, ...customColours },
  'root'
)
const processedDarkColors = processTailwindConfigColors(customColours, 'dark')

export default {
  // These seem to be the default values and the defaults in Tailwind
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
        ...processedDarkColors
      }
    },
    // colors.variables is a shorcut for colors.presets[currentPresetName].
    // setting variables aswell as presets will overwrite the presets
    variables: processedRootColors
  }
}
