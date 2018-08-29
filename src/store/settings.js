export default {
  state: {
    onlyNew: false
  },
  mutations: {
    getOnlyNew (state, payload) {
      state.onlyNew = payload
    }
  },
  actions: {

  },
  getters: {
    settings (state) {
      return {
        onlyNew: state.onlyNew
      }
    },
    onlyNew (state) {
      return state.onlyNew
    }
  }
}
