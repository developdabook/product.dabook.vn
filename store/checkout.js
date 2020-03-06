import { clone } from 'lodash'
export const state = () => ({
  ticketSelected: {},
  currentState: 'MISS_ALL',
  checkoutInfo: {}
})
export const mutations = {
  UPDATE_TICKET_SELECTED(state, payload) {
    state.ticketSelected = Object.assign({}, state.ticketSelected, payload)
  },
  UPDATE_PAIR_TICKET_SELECTED(state, payload) {
    state.ticketSelected = clone(payload)
  },
  UPDATE_CURRENT_STATE(state, payload) {
    state.currentState = payload
  },
  REMOVE_TICKET_PART(state, payload) {
    delete state.ticketSelected[payload]
  },
  RESET_TICKET_SELECT(state, payload) {
    state.ticketSelected = {}
  },
  RESET_CURRENT_STATE(state) {
    state.currentState = 'MISS_ALL'
  },
  UPDATE_CHECKOUT_INFO(state, payload) {
    state.checkoutInfo = clone(payload)
  }
}
export const actions = {
  updateTicketSelected({ commit, state, rootState }, payload) {
    commit('UPDATE_TICKET_SELECTED', payload.ticket)
    if (!rootState.search.searchCondition.isRoundTrip) {
      commit('REMOVE_TICKET_PART', 'RETURN')
    }
    if (payload.type === 'PAIR') {
      commit('REMOVE_TICKET_PART', 'RETURN')
      commit('REMOVE_TICKET_PART', 'DEPARTURE')
    }
    if (
      (!rootState.search.searchCondition.isRoundTrip &&
        'DEPARTURE' in state.ticketSelected) ||
      ('DEPARTURE' in state.ticketSelected &&
        'RETURN' in state.ticketSelected) ||
      'PAIR' in state.ticketSelected
    ) {
      commit('UPDATE_CURRENT_STATE', 'DONE')
    } else if (
      (rootState.search.searchCondition.isRoundTrip &&
        !('RETURN' in state.ticketSelected)) ||
      (rootState.search.searchCondition.isRoundTrip &&
        'RETURN' in state.ticketSelected &&
        !('ticket' in state.ticketSelected.RETURN))
    ) {
      commit('UPDATE_CURRENT_STATE', 'MISS_RETURN')
    } else if (
      rootState.search.searchCondition.isRoundTrip &&
      'RETURN' in state.ticketSelected &&
      (!('DEPARTURE' in state.ticketSelected) ||
        ('DEPARTURE' in state.ticketSelected &&
          !('ticket' in state.ticketSelected.DEPARTURE)))
    ) {
      commit('UPDATE_CURRENT_STATE', 'MISS_DEPARTURE')
    } else {
      commit('UPDATE_CURRENT_STATE', 'MISS_ALL')
    }
  },
  resetData({ commit, state }) {
    commit('RESET_TICKET_SELECT')
    commit('RESET_CURRENT_STATE')
  },
  updateCheckoutSelect({ commit }, payload) {
    commit('UPDATE_CHECKOUT_INFO', payload)
  }
}

export const getters = {
  geticketSelected(state) {
    return clone(state.ticketSelected)
  },
  isAcceptAddPassenger(state) {
    if (
      (state.ticketSelected.DEPARTURE !== null &&
        typeof state.ticketSelected.DEPARTURE !== 'undefined' &&
        state.ticketSelected.DEPARTURE.ticket[0].service === 'AMADEUS') ||
      (state.ticketSelected.PAIR !== null &&
        typeof state.ticketSelected.PAIR !== 'undefined' &&
        state.ticketSelected.PAIR.ticket[0].service === 'AMADEUS')
    ) {
      return true
    } else return false
  },
  selectState(state) {
    return state.currentState
  },
  priceSummaryByPass(state, getters, rootState) {
    const sum = {}
    Object.keys(state.ticketSelected).forEach((way) => {
      sum[way] = {}
      Object.keys(rootState.search.searchCondition.passenger).forEach(
        (element) => {
          if (rootState.search.searchCondition.passenger[element] > 0) {
            sum[way][element] = {
              price: state.ticketSelected[way].fare.total_fare,
              fee: state.ticketSelected[way].fee.filter((el) => {
                return (
                  (el.type === element ||
                    el.type === 'ALL' ||
                    el.type === 'ADULT') &&
                  (el.fare_option.toUpperCase() ===
                    state.ticketSelected[way].fare.description.toUpperCase() ||
                    el.fare_option === 'NONE')
                )
              }),
              pass: rootState.search.searchCondition.passenger[element]
            }
          }
        }
      )
    })
    let total = 0
    try {
      Object.keys(sum).forEach((el) => {
        Object.keys(sum[el]).forEach((pr) => {
          total =
            total +
            (parseFloat(sum[el][pr].price) +
              parseFloat(sum[el][pr].fee[0].total)) *
              parseFloat(sum[el][pr].pass)
        })
      })
    } catch (error) {}
    return { detail: sum, total }
  }
}
