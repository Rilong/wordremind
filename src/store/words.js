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
    async saveWords ({commit, dispatch, getters}, payload) {
      let saveWord = getters.wordResource
      commit('setLoading', true)
      let words = await saveWord.save({word: payload})
      commit('setLoading', false)
      commit('setWords', words.body)
      dispatch('cleanTmpSentences')
    },
    async getWords ({commit, getters}) {
      let token = JSON.parse(localStorage.getItem('token')).access_token
      Vue.http.headers.common['Authorization'] = token
      try {
        let wordsResource = getters.wordsResource
        commit('setLoading', true)
        let words = await wordsResource.get({userId: getters.userId, settings: getters.settings})
        commit('setLoading', false)
        commit('setWords', words.body)
      } catch (e) {
        commit('setLoading', false)
        commit('setWords', null)
        if (e.status === 404) {
          localStorage.clear()
        } else {
          commit('setError', 'Error server: ' + e.statusText)
        }
      }
    },
    async deleteWord ({commit, getters}, payload) {
      let wordResource = getters.wordResource
      try {
        let delWord = await wordResource.delete(payload)
        commit('setWords', delWord.body)
      } catch (e) {
        throw e
      }
    },
    async saveEditing ({commit, getters}) {
      let editing = getters.getEditing
      let wordResource = getters.wordResource
      let words = await wordResource.update({editing})
      console.log(words)
      commit('setWords', null)
      commit('setWords', words.body)
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
