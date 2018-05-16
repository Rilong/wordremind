/* eslint-disable no-unused-vars */
import Vue from 'vue'

export default {
  state: {
    words: null,
    tmpSentences: null,
    editingSentences: null
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
    },
    setEditing (state, payload) {
      state.editingSentences = payload
    },
    updateAdded (state, payload) {
      state.editingSentences['added'][payload.index] = {
        sentence: payload.sentence,
        translated: payload.translated
      }
    },
    deleteAdded (state, payload) {
      state.editingSentences['added'].splice(payload, 1)
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
    async addSentence ({commit, getters, dispatch}, payload) {
      let translated = await dispatch('translate', {text: payload.sentence, to: 'uk'})
      let obj = {
        sentence: payload.sentence,
        translated: translated,
        status: 'added'
      }
      let editing = getters.getEditingSentences
      if (editing === null) {
        editing = {}
      }
      if (!editing['added']) {
        editing['added'] = []
      }
      editing['added'].push(obj)
      commit('setEditing', editing)
    },
    async saveEditing ({commit, getters}) {
      let editing = getters.getEditingSentences
      let words = await Vue.http.post('/api/saveediting.php', {editing, user_id: getters.userId})
      commit('setWords', null)
      commit('setWords', words.body)
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
    },
    addWordEditing ({commit, getters}, payload) {
      let editing = getters.getEditingSentences
      if (editing === null) {
        editing = {}
      }
      editing['word'] = payload
      commit('setEditing', editing)
    },
    addEditingSentence ({commit, getters}, payload) {
      let editing = getters.getEditingSentences
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
    getEditingSentences (state) {
      return state.editingSentences
    },
    isEditingSentences (state) {
      return state.editingSentences !== null
    },
    tmpSentences (state) {
      return state.tmpSentences
    },
    words (state) {
      return state.words
    }
  }
}
