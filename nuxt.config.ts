// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  runtimeConfig: {
    public: {
      fauth: process.env.FAUTH
    }
  },
  vite: {
    logLevel: 'warn'
  }
})
