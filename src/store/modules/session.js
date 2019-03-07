export default  {
  state: {
  },
  mutations: {
    beforeCreate: function () {
    if (!this.$session.exists()) {
      this.$router.push('/')
      }
    },
  },
  actions: {

  },
  getters: {

  }
}
