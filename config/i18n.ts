import { NuxtConfig } from 'nuxt/schema'

export default {
  defualtLocale: 'pt-BR',
  locales: [
    {
      code: 'pt-BR',
      file: 'pt-BR.ts',
      name: 'Português'
    }
  ],
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'locale'
  },
  lazy: true,
  langDir: 'lang',
  strategy: 'no_prefix',
  experimental: {
    jsTsFormatResource: true
  }
} as NuxtConfig['i18n']
