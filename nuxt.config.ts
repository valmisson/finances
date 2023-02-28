// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      fauth: process.env.FAUTH
    }
  },
  modules: [
    'nuxt-icon'
  ],
  css: ['~/assets/styles/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {}
    }
  },
  vite: {
    logLevel: 'warn'
  }
})
