/* eslint-disable no-unused-vars */
import Vue from 'vue'

export default {
  state: {
    words: null
  },
  mutations: {},
  actions: {
    async translate ({commit}, payload) {
      let translation = Vue.resource('/api/translate.php')
      let text = await translation.get(payload)
      return text.body
    }
  },
  getters: {}
}
