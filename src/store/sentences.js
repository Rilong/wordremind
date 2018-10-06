export default {
  state: {
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
    }
  },
  actions: {
    async addSentence ({commit, getters, dispatch}, payload) {
      let obj = {
        sentence: payload.sentence,
        translated: payload.translated,
        status: 'added'
      }
      let editing = getters.getEditing
      if (editing === null) {
        editing = {}
      }
      if (!editing['added']) {
        editing['added'] = []
      }
      editing['added'].push(obj)
      commit('setEditing', editing)
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
    }
  }
}
