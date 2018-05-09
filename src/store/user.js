import Vue from 'vue'
export default {
  state: {
    user: null,
    error: null,
    loading: false
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    },
    setError (state, payload) {
      state.error = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    }
  },
  actions: {
    registerUser ({commit}, payload) {
      Vue.http.interceptors.push((request, next) => {
        commit('setLoading', true)
        next(response => {
          commit('setLoading', false)
        })
      })
      Vue.http.get('http://remindwordserver.loc/register.php', {params: payload}).then(response => {
        let user = response.body

        if (user !== 'error') {
          if (user !== 'errorUserExists') {
            commit('setUser', user)
          } else commit('setError', 'Such login already exists')
        } else commit('setError', 'Server error')
      }, response => {})
    },
    cleanError ({commit}) {
      commit('setError', null)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    error (state) {
      return state.error
    },
    isUser (state) {
      return state.user !== null
    },
    loading (state) {
      return state.loading
    }
  }
}
