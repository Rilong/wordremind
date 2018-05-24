import _ from 'lodash'
export default {
  state: {
    activePage: 1,
    paginationData: null,
    perPage: 8
  },
  mutations: {
    setPagination (state, payload) {
      state.paginationData = _.chunk(payload, state.perPage)
    },
    setActivePage (state, payload) {
      state.activePage = payload
    }
  },
  actions: {},
  getters: {
    pagination (state) {
      return state.paginationData
    },
    activePage (state) {
      return state.activePage
    }
  }
}
