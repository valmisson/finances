import type { Auth } from 'firebase/auth'
import type { Firestore } from 'firebase/firestore'

declare module 'nuxt/schema' {
  interface AppConfigInput {
    title: string;
  }
}

declare module '#app' {
  interface NuxtApp {
    $auth: Auth;
    $firestore: Firestore;
  }
}
