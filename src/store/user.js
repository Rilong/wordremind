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
      let regRes = Vue.resource('/api/register.php')
      commit('setLoading', true)

      return new Promise((resolve, reject) => {
        regRes.save({user: payload}).then(response => {
          commit('setLoading', false)

          let user = response.body.user

          if (user !== 'error') {
            if (user !== 'errorUserExists') {
              commit('setUser', user)
              Vue.cookie.set('user', JSON.stringify(user), 30)
              resolve(response)
            } else {
              commit('setError', 'Such login already exists')
              reject(response.body)
            }
          }
        }, response => {
          commit('setLoading', false)
          reject(response.body)
        })
      })
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
