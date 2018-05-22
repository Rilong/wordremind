/* eslint-disable no-unused-vars */
import Vue from 'vue'
import _ from 'lodash'

export default {
  state: {
    words: null,
    editing: null
  },
  mutations: {

    setWords (state, payload) {
      state.words = payload
    },
    setEditing (state, payload) {
      state.editing = payload
    },
    updateAdded (state, payload) {
      state.editing['added'][payload.index] = {
        sentence: payload.sentence,
        translated: payload.translated
      }
    },
    deleteAdded (state, payload) {
      state.editing['added'].splice(payload, 1)
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
    async getWords ({commit, getters}) {
      try {
        commit('setLoading', true)
        let words = await Vue.http.get('/api/getwords.php', {params: {userId: getters.userId}})
        commit('setLoading', false)
        commit('setWords', words.body)
      } catch (e) {
        commit('setLoading', false)
        commit('setWords', null)
        console.log(e)
      }
    },
    async deleteWord ({commit}, payload) {
      try {
        let delWord = await Vue.http.post('/api/deleteword.php', payload)
        commit('setWords', delWord.body)
      } catch (e) {
        throw e
      }
    },
    async saveEditing ({commit, getters}) {
      let editing = getters.getEditing
      let words = await Vue.http.post('/api/saveediting.php', {editing, user_id: getters.userId})
      commit('setWords', null)
      commit('setWords', words.body)
    },
    reverseWords ({commit, getters}) {
      let words = getters.words
      commit('setWords', _.reverse(words))
    },
    addWordEditing ({commit, getters}, payload) {
      let editing = getters.getEditing
      if (editing === null) {
        editing = {}
      }
      editing['word'] = payload
      commit('setEditing', editing)
    },
    addEditingSentence ({commit, getters}, payload) {
      let editing = getters.getEditing
      if (editing === null) {
        editing = {}
      }
      editing[payload.sentence_id] = payload
      commit('setEditing', editing)
    },
    deleteAdded ({commit}, payload) {
      commit('deleteAdded', payload)
    },
    editAdded ({commit, getters}, payload) {
      commit('updateAdded', payload)
    },
    clearEditingSentence ({commit}) {
      commit('setEditing', null)
    }
  },
  getters: {
    getEditing (state) {
      return state.editing
    },
    isEditing (state) {
      return state.editing !== null
    },
    words (state) {
      return state.words
    }
  }
}
