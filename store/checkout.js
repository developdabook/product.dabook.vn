import { clone } from 'lodash'
export const state = () => ({
  ticketSelected: {
    DEPARTURE: {},
    RETURN: {}
  }
})
export const mutations = {
  UPDATE_TICKET_SELECTED(state, payload) {
    state.ticketSelected = Object.assign({}, state.ticketSelected, payload)
  },
  UPDATE_PAIR_TICKET_SELECTED(state, payload) {
    state.ticketSelected = clone(payload)
  },
  REMOVE_TICKET_PART(state, payload) {
    delete state.ticketSelected[payload]
  },
  RESET_TICKET_SELECT(state, payload) {
    state.ticketSelected = {
      DEPARTURE: {},
      RETURN: {}
    }
  }
}
export const actions = {
  updateTicketSelected({ commit, state, rootState }, payload) {
    commit('UPDATE_TICKET_SELECTED', payload)
    if (!rootState.search.searchCondition.isRoundTrip) {
      commit('REMOVE_TICKET_PART', 'RETURN')
    }
  },
  updatePairTicketSelected({ commit, state, rootState }, payload) {
    commit('UPDATE_PAIR_TICKET_SELECTED', payload)
    if (!rootState.search.searchCondition.isRoundTrip) {
      commit('REMOVE_TICKET_PART', 'RETURN')
    }
  },
  resetTicketSelected({ commit, state }) {
    commit('RESET_TICKET_SELECT')
  }
}

export const getters = {
  geticketSelected(state) {
    return clone(state.ticketSelected)
  },
  isAcceptAddPassenger(state) {
    if (state.ticketSelected.DEPARTURE.ticket.service === 'AMADEUS') {
      return true
    } else return false
  },
  selectState(state, getters, rootState) {
    console.log(rootState.search.searchCondition.isRoundTrip)
    console.log(state.ticketSelected)
    if (
      (rootState.search.searchCondition.isRoundTrip &&
        state.ticketSelected.DEPARTURE !== null &&
        typeof state.ticketSelected.DEPARTURE !== 'undefined' &&
        Object.keys(state.ticketSelected.DEPARTURE).length > 0 &&
        state.ticketSelected.RETURN !== null &&
        typeof state.ticketSelected.RETURN !== 'undefined' &&
        Object.keys(state.ticketSelected.RETURN).length > 0) ||
      (!rootState.search.searchCondition.isRoundTrip &&
        Object.keys(state.ticketSelected.DEPARTURE).length > 0)
    ) {
      return 'DONE'
    } else if (
      state.ticketSelected.DEPARTURE !== null &&
      typeof state.ticketSelected.DEPARTURE !== 'undefined' &&
      Object.keys(state.ticketSelected.DEPARTURE).length > 0
    ) {
      return 'MISS_RETURN'
    } else if (
      state.ticketSelected.RETURN !== null &&
      typeof state.ticketSelected.RETURN !== 'undefined' &&
      Object.keys(state.ticketSelected.RETURN).length > 0
    ) {
      return 'MISS_DEPARTURE'
    } else {
      return 'MISS_ALL'
    }
  }
}
