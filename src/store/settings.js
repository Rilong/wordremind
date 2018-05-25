export default {
  state: {
    onlyNew: false
  },
  mutations: {
    setOnlyNew (state, payload) {
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
