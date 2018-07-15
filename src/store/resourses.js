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
    userResource (state) {
      return Vue.resource('/api/user')
    },
    wordsResource (state) {
      return Vue.resource('/api/words')
    },
    wordResource (state) {
      return Vue.resource('/api/word')
    }
  }
}
