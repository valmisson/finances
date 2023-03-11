import { signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { getExpiresDate } from '~/utils/cookie'
import { handleAuthErros } from '~/utils/firebaseErrors'
import { Authentication } from '~/types/composables/auth'

export default function () {
  const { $auth } = useNuxtApp()

  const authentication: Authentication = {
    async login (email: string, password: string) {
      try {
        const { user } = await signInWithEmailAndPassword($auth, email, password)

        const accessToken = await user.getIdToken()

        this._setToken(accessToken)
      } catch (error) {
        if (error instanceof Error) {
          const errorMessage = handleAuthErros(error.message)

          throw createError({ statusCode: 401, message: errorMessage })
        }
      }
    },

    async logout () {
      await signOut($auth)

      this._removeToken()

      await navigateTo('/login', { redirectCode: 301 })
    },

    isLogged (): boolean {
      const localToken = useCookie<string>('localToken').value

      if (!localToken) {
        return false
      }

      return true
    },

    _setToken (token: string): void {
      const localToken = useCookie<string>('localToken', { expires: getExpiresDate(5), secure: true })

      localToken.value = token
    },

    _removeToken (): void {
      const localToken = useCookie<null>('localToken', { expires: getExpiresDate(0), secure: true })

      localToken.value = null
    }
  }

  return authentication
}
