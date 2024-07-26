import { createIconsConfig } from 'vuestic-ui'
import {
  processedRootColors,
  processedDarkColors,
  processedPinkColors
} from '@/utils/processTailwindColors'

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
        ...processedDarkColors
      },
      pink: {
        ...processedRootColors,
        ...processedPinkColors
      }
    },
    // colors.variables is a shorcut for colors.presets[currentPresetName].
    // setting variables aswell as presets will overwrite the presets
    variables: processedRootColors
  }
}
