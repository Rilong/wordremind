import _ from 'lodash'

export default {
  state: {
    mainTrainWord: null,
    trainWords: null,
    trainWordsGood: null,
    trainWordsMistakes: 0,
    trainWordsActive: null,
    trainMessage: null,
    trainMessageTimeout: 2000,
    isReverse: false,
    trainControls: true
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
    },
    setTrainHighlight (state, payload) {
      state.trainWordsActive = _.map(state.trainWordsActive, o => {
        o['highlighted'] = o.word_id === payload
        return o
      })
    },
    setTrainMessage (state, payload) {
      state.trainMessage = payload
      setTimeout(() => {
        state.trainMessage = null
      }, state.trainMessageTimeout)
    },
    setTrainControls (state, payload) {
      state.trainControls = payload
    }
  },
  actions: {
    setTrainGoodMessage ({commit}, payload) {
      let obj = {
        text: payload,
        status: 'success'
      }
      commit('setTrainMessage', obj)
    },
    setTrainMistakeMessage ({commit}, payload) {
      let obj = {
        text: payload,
        status: 'error'
      }
      commit('setTrainMessage', obj)
    },
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
        o['highlighted'] = false
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

      let goodMessages = ['Good!', 'Excellent!', 'Wonderful!', 'Amazing!']
      let badMessages = ['It\'s mistake', 'Try one more time!']

      if (typeof selected !== 'undefined') {
        return new Promise((resolve, reject) => {
          if (selected.word === mainWord.word) {
            _.remove(words, o => o.word_id === mainWord.word_id)
            commit('setTrainWords', words)
            dispatch('setTrainGoodMessage', _.sample(goodMessages))
            dispatch('trainStart')
            resolve()
          } else {
            commit('setTrainControls', false)
            dispatch('setTrainMistakeMessage', _.sample(badMessages))
            dispatch('trainHighlight')
            setTimeout(() => {
              commit('setTrainControls', true)
              dispatch('trainStart')
            }, getters.trainMessageTimeout + 300)
            reject(new Error('Mistake'))
          }
        })
      }
    },
    trainHighlight ({commit, getters}) {
      commit('setTrainHighlight', getters.mainTrainWord.word_id)
      setTimeout(() => {
        commit('setTrainHighlight', 0)
      }, getters.trainMessageTimeout)
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
    trainMessage (state) {
      return state.trainMessage
    },
    trainMessageTimeout (state) {
      return state.trainMessageTimeout
    },
    trainControls (state) {
      return state.trainControls
    },
    selected (state) {
      return _.find(state.trainWordsActive, {active: true})
    }
  }
}
