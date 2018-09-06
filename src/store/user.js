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
    async registerUser ({commit, dispatch, getters}, payload) {
      let regRes = getters.userResource
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
    async loginUser ({commit, dispatch, getters}, payload) {
      let loginResource = getters.authResource
      commit('setLoading', true)
      dispatch('cleanError')
      try {
        let userResponse = await loginResource.save('/api/auth', payload)
        commit('setLoading', false)

        let user = userResponse.body
        localStorage.setItem('token', JSON.stringify(user.response))
        commit('setUser', user)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.body.error)
        throw error
      }
    },
    async logoutUser ({commit, dispatch, getters}) {
      let token = JSON.parse(localStorage.getItem('token')).access_token
      let loginResource = getters.authResource
      try {
        await loginResource.delete(token)
        dispatch('cleanError')
        commit('setUser', null)
        commit('setWords', null)
        localStorage.removeItem('token')
      } catch (error) {
        commit('setError', error.body.error)
      }
    },
    autoLogin ({commit}) {
      let token = JSON.parse(localStorage.getItem('token'))
      commit('setUser', token)
    }
  },
  getters: {
    user (state) {
      return state.user
    },
    isUser (state) {
      return state.user !== null
    },
    userId (state) {
      return state.user.id
    }
  }
}
