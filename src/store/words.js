/* eslint-disable no-unused-vars */
import Vue from 'vue'

export default {
  state: {
    words: null,
    tmpSentences: null
  },
  mutations: {
    setTmpSentences (state, payload) {
      if (payload === null) {
        state.tmpSentences = null
      } else {
        if (state.tmpSentences === null) {
          state.tmpSentences = []
        }
        state.tmpSentences.push(payload)
      }
    },
    updateTmpSentences (state, payload) {
      state.tmpSentences[payload.index] = {
        sentence: payload.sentence,
        translated: payload.translated
      }
    },
    deleteTmpSentences (state, payload) {
      state.tmpSentences.splice(payload.index, 1)
    },
    setWords (state, payload) {
      state.words = payload
    }
  },
  actions: {
    async translate ({commit}, payload) {
      let translation = Vue.resource('/api/translate.php')
      let text = await translation.get(payload)
      return text.body
    },
    async saveWords ({commit, dispatch}, payload) {
      let saveWord = Vue.resource('/api/saveword.php')
      commit('setLoading', true)
      let words = await saveWord.save({word: payload})
      commit('setLoading', false)
      commit('setWords', words.body)
      dispatch('cleanTmpSentences')
    },
    cleanTmpSentences ({commit}) {
      commit('setTmpSentences', null)
    },
    tmpSentencesAction ({commit}, payload) {
      commit('setTmpSentences', payload)
    },
    updateTmpSentences ({commit}, payload) {
      commit('updateTmpSentences', payload)
    },
    deleteTmpSentences ({commit}, payload) {
      commit('deleteTmpSentences', payload)
    }
  },
  getters: {
    tmpSentences (state) {
      return state.tmpSentences
    },
    words (state) {
      return state.words
    }
  }
}
