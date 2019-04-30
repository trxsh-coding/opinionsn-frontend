
export const authentication = {
  namespaced: true,
  state: {

    isAuthenticated:false,
    userLogged:false

  },
  getters: {

    isAuthenticated (state, getters, rootState, rootGetters) {
      return state.isAuthenticated

    },

    testGetter(){
      return "Ya"
    }
  },

  mutations: {

    setAuthenticated (state, e) {

      state.isAuthenticated = e
    }

  },
  actions: {

  }
};
