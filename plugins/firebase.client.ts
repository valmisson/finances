import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  const fauth = JSON.parse(config.public.fauth)

  const app = initializeApp(fauth)

  const auth = getAuth(app)
  const database = getFirestore(app)

  nuxtApp.provide('auth', auth)
  nuxtApp.provide('database', database)
})
