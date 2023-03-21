import { Auth } from 'firebase/auth'
import { Firestore } from 'firebase/firestore'

declare module '#app' {
  interface NuxtApp {
    $auth: Auth;
    $firestore: Firestore;
  }
}
