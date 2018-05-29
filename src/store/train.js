import _ from 'lodash'

export default {
  state: {
    mainTrainWord: null,
    trainWords: null,
    trainWordsGood: null,
    trainWordsMistakes: 0,
    trainWordsActive: null,
    isReverse: false
  },
  mutations: {
    setMainWord (state, payload) {
      state.mainTrainWord = payload
    },
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
    },
    setTrainSelectedWord (state, payload) {
      state.trainWordsActive = _.map(state.trainWordsActive, o => {
        o['active'] = o.word_id === payload
        return o
      })
    }
  },
  actions: {
    trainStart ({commit, getters}) {
      let words = getters.trainWords
      if (words === null) {
        commit('setTrainWords', _.clone(getters.words))
        words = _.clone(getters.words)
      }

      let mainWord = _.sample(words)
      let wordsWithout = _.clone(getters.words)

      _.remove(wordsWithout, o => o.word_id === mainWord.word_id)
      let activeWords = _.sampleSize(wordsWithout, 2)

      activeWords.push(mainWord)
      activeWords = _.shuffle(_.map(activeWords, o => {
        o['active'] = false
        return o
      }))
      commit('setMainWord', mainWord)
      commit('setTrainWordsActive', activeWords)
    },
    trainRestart ({commit, getters, dispatch}) {
      commit('setTrainWords', null)
      dispatch('trainStart')
    },
    trainWordCheck ({commit, getters, dispatch}) {
      let selected = getters.selected
      let mainWord = getters.mainTrainWord
      let words = getters.trainWords
      if (typeof selected !== 'undefined') {
        return new Promise((resolve, reject) => {
          if (selected.word === mainWord.word) {
            _.remove(words, o => o.word_id === mainWord.word_id)
            commit('setTrainWords', words)
            dispatch('trainStart')
            resolve()
          } else {
            reject(new Error('Mistake'))
          }
        })
      }
    }
  },
  getters: {
    mainTrainWord (state) {
      return state.mainTrainWord
    },
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
    },
    selected (state) {
      return _.find(state.trainWordsActive, {active: true})
    }
  }
}
