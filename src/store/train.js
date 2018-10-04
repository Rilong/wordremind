import _ from 'lodash'

export default {
  state: {
    trainWordsLength: 0,
    trainWordsMistakes: 0,
    trainWordsGood: 0,
    trainWordsRight: 0,
    trainMessageTimeout: 2000,
    mainTrainWord: null,
    trainWords: null,
    trainWordsActive: null,
    trainMessage: null,
    reverseMode: false,
    trainOnlyNew: false,
    trainControls: true,
    range: [null, null]
  },
  mutations: {
    setMainWord (state, payload) {
      state.mainTrainWord = payload
    },
    setTrainWords (state, payload) {
      state.trainWords = payload
    },
    setTrainWordsGood (state, payload) {
      if (typeof payload !== 'undefined') {
        state.trainWordsGood = payload
      } else {
        state.trainWordsGood++
      }
    },
    setTrainWordsMistakes (state, payload) {
      if (typeof payload !== 'undefined') {
        state.trainWordsMistakes = payload
      } else {
        state.trainWordsMistakes++
      }
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
    },
    setTrainReverseMode (state, payload) {
      state.reverseMode = payload
    },
    setTrainOnlyNew (state, payload) {
      state.trainOnlyNew = payload
    },
    setTrainWordsLength (state, payload) {
      state.trainWordsLength = payload
    },
    setRange (state, payload) {
      state.range = payload
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
      dispatch('trainOnlyNew')
    },
    trainWordCheck ({commit, getters, dispatch}) {
      let selected = getters.selected
      let mainWord = getters.mainTrainWord
      let words = getters.trainWords

      let goodMessages = ['Good!', 'Excellent!', 'Wonderful!', 'Amazing!']
      let badMessages = ['It\'s mistake', 'Try one more time!']

      return new Promise((resolve, reject) => {
        if (typeof selected === 'undefined') {
          reject(new Error('notSelected'))
        }
        console.log(selected.word)
        if (selected.word === mainWord.word) {
          _.remove(words, o => o.word_id === mainWord.word_id)
          commit('setTrainWords', words)
          commit('setTrainWordsGood')
          dispatch('setTrainGoodMessage', _.sample(goodMessages))
          dispatch('trainStart')
          resolve()
        } else {
          commit('setTrainControls', false)
          commit('setTrainWordsMistakes')
          dispatch('setTrainMistakeMessage', _.sample(badMessages))
          dispatch('trainHighlight')
          setTimeout(() => {
            commit('setTrainControls', true)
            dispatch('trainStart')
          }, getters.trainMessageTimeout + 300)
        }
      })
    },
    trainHighlight ({commit, getters}) {
      commit('setTrainHighlight', getters.mainTrainWord.word_id)
      setTimeout(() => {
        commit('setTrainHighlight', 0)
      }, getters.trainMessageTimeout)
    },
    trainOnlyNew ({commit, getters, dispatch}) {
      let onlyNew = getters.trainOnlyNew
      let words = _.clone(getters.words)
      dispatch('trainReset', true)
      if (onlyNew) {
        commit('setTrainWords', _.dropRight(_.orderBy(words, ['created_date'], ['desc']), words.length - getters.perPage))
      } else {
        commit('setTrainWords', words)
      }
      commit('setTrainWordsLength', getters.trainWords.length)
      dispatch('trainStart')
    },
    trainReset ({commit}, payload) {
      commit('setTrainWords', null)
      commit('setMainWord', null)
      commit('setTrainWordsActive', null)
      commit('setTrainControls', true)
      commit('setTrainWordsLength', 0)
      if (payload === true) {
        commit('setTrainWordsMistakes', 0)
        commit('setTrainWordsGood', 0)
      }
    },
    trainRange ({commit, getters, dispatch}) {
      commit('setTrainWords', getters.words)
      dispatch('trainOnlyNew')
      let range = getters.range
      let words = getters.trainWords
      words = _.slice(words, range[0] - 1, range[1] - 1)
      commit('setTrainWords', words)
      commit('setTrainWordsLength', getters.trainWords.length)
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
    trainReverseMode (state) {
      return state.reverseMode
    },
    trainOnlyNew (state) {
      return state.trainOnlyNew
    },
    trainWordsLength (state) {
      return state.trainWordsLength
    },
    selected (state) {
      return _.find(state.trainWordsActive, {active: true})
    },
    range (state) {
      return state.range
    }
  }
}
