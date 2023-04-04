export default defineNuxtRouteMiddleware((to) => {
  const authentication = useAuth()
  const isLogged = authentication.isLogged()
  const loginPath = '/login'

  if (isLogged && to.path === loginPath) {
    return navigateTo('/')
  }

  if (!isLogged && to.path !== loginPath) {
    return navigateTo(loginPath)
  }
})
