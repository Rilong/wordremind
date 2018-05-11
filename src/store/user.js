import Vue from 'vue'
export default {
  state: {
    user: null
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    async registerUser ({commit, dispatch}, payload) {
      let regRes = Vue.resource('/api/register.php')
      commit('setLoading', true)
      dispatch('cleanError')

      try {
        let user = await regRes.save({user: payload})
        commit('setLoading', false)
        let userData = user.body.user

        commit('setUser', userData)
        Vue.cookie.set('user', JSON.stringify(userData), 30)
      } catch (error) {
        commit('setLoading', false)

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
    async loginUser ({commit, dispatch}, payload) {
      let loginResource = Vue.resource('/api/login.php')
      commit('setLoading', true)
      dispatch('cleanError')
      try {
        let userResponse = await loginResource.get(payload)
        commit('setLoading', false)

        let user = userResponse.body
        Vue.cookie.set('user', JSON.stringify(user), 30)
        commit('setUser', user)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.body)
        throw error
      }
    },
    logoutUser ({commit, dispatch}) {
      dispatch('cleanError')
      commit('setUser', null)
      Vue.cookie.delete('user')
    },
    autoLogin ({commit}) {
      let user = JSON.parse(Vue.cookie.get('user'))
      commit('setUser', user)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUser (state) {
      return state.user !== null
    }
  }
}
