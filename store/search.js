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
      CHILD: 0,
      INFANT: 0
    },
    cabinClass: ['ECONOMY'],
    isRoundTrip: false
  },
  section: '',
  filterCondition: {},
  sortCondition: {}
})
export const mutations = {
  UPDATE_SEARCH_CONDITION(state, payload) {
    state.searchCondition = _.clone(payload)
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
  UPDATE_PASSENGER(state, payload) {
    state.searchCondition.passenger[payload.target] =
      state.searchCondition.passenger[payload.target] + payload.qty
  },
  UPDATE_ALL_PASSENGERS(state, payload) {
    state.searchCondition.passenger.ADULT = payload.ADULT
    state.searchCondition.passenger.CHILD = payload.CHILD
    state.searchCondition.passenger.INFANT = payload.INFANT
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
  }
}

export const getters = {
  getSearchCondition(state) {
    return _.clone(state.searchCondition)
  },
  getPassengers(state) {
    return _.clone(state.searchCondition.passenger)
  },
  isRoundTrip(state) {
    return state.searchCondition.isRoundTrip
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
  }
}
