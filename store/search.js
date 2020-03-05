import { clone } from 'lodash'
import moment from 'moment'
export const state = () => ({
  searchCondition: {
    from: {},
    to: {},
    departure: moment()
      .add(1, 'day')
      .format('DD-MM-YYYY'),
    arrived: moment()
      .add(4, 'day')
      .format('DD-MM-YYYY'),
    passenger: {
      ADULT: 0,
      CHILD: 0,
      INFANT: 0
    },
    cabinClass: ['ECONOMY'],
    isRoundTrip: false
  },
  section: '',
  filterCondition: {},
  sortCondition: '',
  isFilter: false,
  isTotalMode: false
})
export const mutations = {
  UPDATE_SEARCH_CONDITION(state, payload) {
    state.searchCondition = clone(payload)
    state.searchCondition.departure = moment(
      state.searchCondition.departure,
      'DD-MM-YYYY'
    ).format('DD-MM-YYYY')
    if (!state.searchCondition.isRoundTrip) {
      state.searchCondition.arrived = ''
    } else {
      state.searchCondition.arrived = moment(
        state.searchCondition.arrived,
        'DD-MM-YYYY'
      ).format('DD-MM-YYYY')
    }
  },
  UPDATE_SECTION(state, payload) {
    state.section = payload
  },
  UPDATE_TOTAL_MODE(state, payload) {
    state.isTotalMode = payload
  },
  UPDATE_PASSENGER(state, payload) {
    state.searchCondition.passenger[payload.target] =
      state.searchCondition.passenger[payload.target] + payload.qty
  },
  UPDATE_ALL_PASSENGERS(state, payload) {
    state.searchCondition.passenger.ADULT = payload.ADULT
    state.searchCondition.passenger.CHILD = payload.CHILD
    state.searchCondition.passenger.INFANT = payload.INFANT
  },
  REMOVE_SECTION(state) {
    state.section = ''
  },
  REMOVE_SEARCH_CONDITION(state) {
    state.searchCondition = {
      from: {},
      to: {},
      departure: moment()
        .add(1, 'day')
        .format('DD-MM-YYYY'),
      arrived: moment()
        .add(4, 'day')
        .format('DD-MM-YYYY'),
      passenger: {
        ADULT: 0,
        CHILD: 0,
        INFANT: 0
      },
      cabinClass: ['ECONOMY'],
      isRoundTrip: false
    }
  },
  UPDATE_FILTER(state, payload) {
    if (payload.isEmpty) {
      delete state.filterCondition[payload.target]
      state.filterCondition = Object.assign({}, state.filterCondition)
    } else {
      const obj = {}
      obj[payload.target] = payload.value
      state.filterCondition = Object.assign({}, state.filterCondition, obj)
    }
  },
  EMPTY_FILTER(state, payload) {
    delete state.filterCondition[payload]
    state.filterCondition = Object.assign({}, state.filterCondition)
  },
  EMPTY_ALL_FILTER(state, payload) {
    state.filterCondition = {}
  },
  CHANGE_FILTER_STATE(state, payload) {
    state.isFilter = payload
  },
  UPDATE_SORT(state, payload) {
    state.sortCondition = payload
  },
  RESET_SEARCH(state) {
    state.searchCondition = {
      from: {},
      to: {},
      departure: moment()
        .add(1, 'day')
        .format('DD-MM-YYYY'),
      arrived: moment()
        .add(4, 'day')
        .format('DD-MM-YYYY'),
      passenger: {
        ADULT: 0,
        CHILD: 0,
        INFANT: 0
      },
      cabinClass: ['ECONOMY'],
      isRoundTrip: false
    }
  },
  RESET_SECTION(state) {
    state.section = ''
  },
  RESET_FILTER_CONDITION(state) {
    state.filterCondition = {}
    state.isFilter = false
  },
  RESET_SORT_CONDITION(state) {
    state.sortCondition = ''
  },
  RESET_TOTAL_MODE(state) {
    state.isTotalMode = false
  }
}
export const actions = {
  updateSearchCondition({ commit, state }, payload) {
    commit('UPDATE_SEARCH_CONDITION', payload)
  },
  updateSearchSection({ commit, state }, payload) {
    commit('UPDATE_SECTION', payload)
  },
  updatePassengerQty({ commit, state }, payload) {
    commit('UPDATE_PASSENGER', payload)
  },
  updateAllPassengers({ commit, state }, payload) {
    commit('UPDATE_ALL_PASSENGERS', payload)
  },
  updateFilter({ commit, state }, payload) {
    commit('UPDATE_FILTER', payload)
  },
  emptyFilter({ commit, state }, payload) {
    commit('EMPTY_FILTER', payload)
  },
  emptyAllFilter({ commit, state }) {
    commit('EMPTY_ALL_FILTER')
    commit('CHANGE_FILTER_STATE', false)
  },
  changeFilterState({ commit, state }, payload) {
    commit('CHANGE_FILTER_STATE', payload)
  },
  updateSort({ commit, state }, payload) {
    commit('UPDATE_SORT', payload)
  },
  updateTotalMode({ commit, state }, payload) {
    commit('UPDATE_TOTAL_MODE', payload)
  },
  resetDate({ commit }) {
    commit('RESET_SEARCH')
    commit('RESET_SECTION')
    commit('RESET_FILTER_CONDITION')
    commit('RESET_SORT_CONDITION')
    commit('RESET_TOTAL_MODE')
  }
}

export const getters = {
  getSearchCondition(state) {
    return clone(state.searchCondition)
  },
  getPassengers(state) {
    return clone(state.searchCondition.passenger)
  },
  isRoundTrip(state) {
    return state.searchCondition.isRoundTrip
  },
  isFilter(state) {
    return state.isFilter
  },
  getSection(state) {
    return state.section
  },
  generatePassengers(state) {
    const result = []
    for (
      let index = 0;
      index < state.searchCondition.passenger.ADULT;
      index++
    ) {
      result.push({
        type: 'ADULT',
        name_prefix: '',
        given_name: '',
        sur_name: '',
        birthday: '',
        residence: '',
        passport: '',
        expired_date: ''
      })
    }
    for (
      let index = 0;
      index < state.searchCondition.passenger.CHILD;
      index++
    ) {
      result.push({
        type: 'CHILD',
        name_prefix: '',
        given_name: '',
        sur_name: '',
        birthday: '',
        residence: '',
        passport: '',
        expired_date: ''
      })
    }
    for (
      let index = 0;
      index < state.searchCondition.passenger.INFANT;
      index++
    ) {
      result.push({
        type: 'INFANT',
        name_prefix: '',
        given_name: '',
        sur_name: '',
        birthday: '',
        residence: '',
        passport: '',
        expired_date: ''
      })
    }
    return result
  },
  getFilterCondition(state) {
    return clone(state.filterCondition)
  },
  getSortCondition(state) {
    return clone(state.sortCondition)
  },
  getTotalMode(state) {
    return state.isTotalMode
  }
}
