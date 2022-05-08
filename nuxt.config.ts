import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({

  runtimeConfig: {
    public: {
      apiBaseUrl: '/api'
    }
  },

  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          tailwindcss: {},
          autoprefixer: {},
        }
      }
    },
  },

  vite: {
    optimizeDeps: {
      exclude: [
        'tailwind.config.js'
      ]
    }
  }
  
})
