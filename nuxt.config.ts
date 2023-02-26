// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      fauth: process.env.FAUTH
    }
  },
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
