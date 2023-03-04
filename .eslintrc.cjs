module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'plugin:nuxt/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module'
  },
  ignorePatterns: ['*.cjs'],
  rules: {
    "vue/multi-word-component-names": "off",
    "vue/no-multiple-template-root": "off"
  }
}
