import _ from 'lodash'
import moment from 'moment'
export const state = () => ({
  searchCondition: {
    from: {},
    to: {},
    departure: moment().format('DD-MM-YYYY'),
    arrived: moment()
      .add(4, 'day')
      .format('DD-MM-YYYY'),
    passenger: {
      ADULT: 0,
      CHILDREN: 0,
      INFANT: 0
    },
    cabinClass: ['ECONOMY'],
    isRoundtrip: false
  },
  section: '',
  filterCondition: {},
  sortCondition: {}
})
export const mutations = {
  UPDATE_SEARCH_CONDITION(state, payload) {
    state.searchCondition = _.clone(payload)
  },
  UPDATE_SECTION(state, payload) {
    state.section = payload
  }
}
export const actions = {
  updateSearchCondition({ commit, state }, payload) {
    commit('UPDATE_SEARCH_CONDITION', payload)
  },
  updateSearchSection({ commit, state }, payload) {
    commit('UPDATE_SECTION', payload)
  }
}

export const getters = {
  getSearchCondition(state) {
    return _.clone(state.searchCondition)
  }
}
