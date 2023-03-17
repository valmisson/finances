export default defineStore('loading', {
  state: () => ({ loading: true }),
  actions: {
    startLoading () {
      this.loading = true
    },
    endLoading () {
      this.loading = false
    }
  }
})
