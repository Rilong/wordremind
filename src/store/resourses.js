import Vue from 'vue'

export default {
  state: {

  },
  mutations: {

  },
  actions: {

  },
  getters: {
    translateResource (state) {
      return Vue.resource('/api/translate')
    },
    authResource (state) {
      return Vue.resource('/api/auth')
    },
    wordsResource (state) {
      return Vue.resource('/api/words')
    },
    wordResource (state) {
      return Vue.resource('/api/word')
    }
  }
}
