import { AuthErrorCodes } from 'firebase/auth'

const enum GLOBAL_ERRORS {
  FIREBASE_ERROR = 'any internal firebase error occurred'
}

const enum AUTH_ERRORS {
  PASSWORD_OR_EMAIL_ERROR = 'Email or password invalid',
  MANY_LOGIN_ERROR = 'Too many attempts login, try later.',
  LOGIN_ERROR = 'Internal firebase login erro'
}

function getErroCode (text: string, code: string): string | undefined {
  return text.split(/[()]/g).find(textCode => textCode.includes(code))
}

export function handleAuthErros (errorMessage: string): string {
  if (!errorMessage.includes('auth/')) {
    return GLOBAL_ERRORS.FIREBASE_ERROR
  }

  let message: string

  switch (getErroCode(errorMessage, 'auth')) {
    case AuthErrorCodes.INVALID_EMAIL:
      message = AUTH_ERRORS.PASSWORD_OR_EMAIL_ERROR
      break
    case AuthErrorCodes.USER_DELETED:
      message = AUTH_ERRORS.PASSWORD_OR_EMAIL_ERROR
      break
    case AuthErrorCodes.INVALID_PASSWORD:
      message = AUTH_ERRORS.PASSWORD_OR_EMAIL_ERROR
      break
    case AuthErrorCodes.TOO_MANY_ATTEMPTS_TRY_LATER:
      message = AUTH_ERRORS.MANY_LOGIN_ERROR
      break
    default:
      message = AUTH_ERRORS.LOGIN_ERROR
  }

  return message
}
