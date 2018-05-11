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
    async registerUser ({commit}, payload) {
      let regRes = Vue.resource('/api/register.php')
      commit('setLoading', true)
      commit('setError', null)

      try {
        commit('setLoading', false)

        let user = await regRes.save({user: payload})
        let userData = user.body.user

        commit('setUser', userData)
        Vue.cookie.set('user', JSON.stringify(userData), 30)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', null)

        switch (error.body.user) {
          case 'errorUserExists' :
            commit('setError', 'Such login already exists')
            break
          case 'error' :
            commit('setError', 'Error server')
            break
        }
        throw error
      }
    },
    logoutUser ({commit}) {
      commit('setError', null)
      commit('setUser', null)
      Vue.cookie.delete('user')
    },
    autoLogin ({commit}) {
      let user = JSON.parse(Vue.cookie.get('user'))
      commit('setUser', user)
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
