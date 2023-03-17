// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      isDev: process.env.NODE_ENV === 'development',
      fauth: process.env.FAUTH
    }
  },
  modules: [
    'nuxt-icon',
    ['@pinia/nuxt', {
      autoImports: ['defineStore']
    }]
  ],
  css: ['~/assets/styles/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {}
    }
  },
  imports: {
    dirs: ['stores']
  },
  vite: {
    logLevel: 'warn'
  }
})
