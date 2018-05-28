export default {
  state: {
    trainWords: null,
    trainWordsGood: null,
    trainWordsMistakes: 0,
    trainWordsActive: null
  },
  mutations: {
    setTrainWords (state, payload) {
      state.trainWords = payload
    },
    setTrainWordsGood (state, payload) {
      state.trainWordsGood = payload
    },
    setTrainWordsMistakes (state, payload) {
      state.trainWordsMistakes = payload
    },
    setTrainWordsActive (state, payload) {
      state.trainWordsActive = payload
    }
  },
  actions: {},
  getters: {
    trainWords (state) {
      return state.trainWords
    },
    trainWordsGood (state) {
      return state.trainWordsGood
    },
    trainWordsMistakes (state) {
      return state.trainWordsMistakes
    },
    trainWordsActive (state) {
      return state.trainWordsActive
    }
  }
}
