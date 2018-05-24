import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import shared from './shared'
import words from './words'
import sentences from './sentences'
import pagination from './pagination'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    shared,
    words,
    sentences,
    pagination
  }
})
