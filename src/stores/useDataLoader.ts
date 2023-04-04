export default defineStore('loading', {
  state: () => ({ pending: true }),
  actions: {
    startLoading () {
      this.pending = true
    },
    endLoading () {
      this.pending = false
    }
  }
})
