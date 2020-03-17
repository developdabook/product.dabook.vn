import { clone } from 'lodash'
export const state = () => ({
  ticketSelected: {},
  currentState: 'MISS_ALL',
  checkoutInfo: {},
  session_id: ''
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
  RESET_TICKET_SELECT(state) {
    state.ticketSelected = {}
  },
  RESET_CHECKOUT_INFO(state) {
    state.checkoutInfo = {}
  },
  RESET_SECTION(state) {
    state.session_id = ''
  },
  RESET_CURRENT_STATE(state) {
    state.currentState = 'MISS_ALL'
  },
  UPDATE_CHECKOUT_INFO(state, payload) {
    state.checkoutInfo = clone(payload)
  },
  REMOVE_INVOICE(state, payload) {
    delete state.checkoutInfo.invoice
    state.checkoutInfo = Object.assign({}, clone(state.checkoutInfo))
  },
  UPDATE_CHECKOUT_SECTION(state, payload) {
    state.session_id = payload
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
    commit('RESET_CHECKOUT_INFO')
    commit('RESET_SECTION')
  },
  updateCheckoutSelect({ commit }, payload) {
    commit('UPDATE_CHECKOUT_INFO', payload)
  },
  removeInvoice({ commit }, payload) {
    commit('REMOVE_INVOICE', payload)
  },
  updateCheckoutSectionId({ commit }, payload) {
    const sectionId = `itinerary:1|origin:${
      payload.from.airportCode
    }|destination:${payload.to.airportCode}|date:${payload.departure}|date1:${
      payload.isRoundTrip ? payload.arrived : ''
    }|adults:${payload.passenger.ADULT}|children:${
      payload.passenger.CHILD
    }|infants:${payload.passenger.INFANT}`
    commit('UPDATE_CHECKOUT_SECTION', sectionId)
  },
  updateCurrentState({ commit }, payload) {
    commit('UPDATE_CURRENT_STATE', payload)
  }
}

export const getters = {
  geticketSelected(state) {
    return clone(state.ticketSelected)
  },
  isAcceptAddPassenger(state) {
    // if (
    //   (state.ticketSelected.DEPARTURE !== null &&
    //     typeof state.ticketSelected.DEPARTURE !== 'undefined' &&
    //     state.ticketSelected.DEPARTURE.ticket[0].service === 'AMADEUS') ||
    //   (state.ticketSelected.PAIR !== null &&
    //     typeof state.ticketSelected.PAIR !== 'undefined' &&
    //     state.ticketSelected.PAIR.ticket[0].service === 'AMADEUS')
    // ) {
    //   return true
    // } else return false
    return false
  },
  selectState(state) {
    return state.currentState
  },
  priceSummary(state, getters, rootState) {
    const sum = {}
    let total = 0
    const passenger = rootState.search.searchCondition.passenger
    for (const key in state.ticketSelected) {
      if (state.ticketSelected.hasOwnProperty(key)) {
        sum[key] = {}
        sum[key].fee = state.ticketSelected[key].fee.filter((el) => {
          return (
            el.fare_option.toUpperCase() ===
              state.ticketSelected[key].fare.class.toUpperCase() &&
            (el.type === 'ALL' ||
              (el.type.toUpperCase() in passenger &&
                passenger[el.type.toUpperCase()] > 0))
          )
        })
        sum[key].total = sum[key].fee.reduce(function(total, currentValue) {
          return total + currentValue.total
        }, 0)
      }
    }
    for (const key in sum) {
      if (sum.hasOwnProperty(key)) {
        total = total + parseFloat(sum[key].total)
      }
    }
    return {
      detail: sum,
      total
    }
  },
  getCheckoutInfo(state, getters, rootState) {
    const ticket = {
      session_id: state.session_id,
      flight_ids: [],
      fare_option_ids: []
    }
    if ('DEPARTURE' in state.ticketSelected) {
      ticket.flight_ids.push(state.ticketSelected.DEPARTURE.ticket[0].id)
      ticket.fare_option_ids.push(state.ticketSelected.DEPARTURE.fare._id)
    }
    if ('RETURN' in state.ticketSelected) {
      ticket.flight_ids.push(state.ticketSelected.RETURN.ticket[0].id)
      ticket.fare_option_ids.push(state.ticketSelected.RETURN.fare._id)
    }
    if ('PAIR' in state.ticketSelected) {
      ticket.flight_ids.push(
        state.ticketSelected.PAIR.ticket.find((el) => (el.type = 'DEPARTURE'))
          .id
      )
      ticket.flight_ids.push(
        state.ticketSelected.PAIR.ticket.find((el) => (el.type = 'RETURN')).id
      )
      ticket.fare_option_ids.push(state.ticketSelected.PAIR.fare._id)
    }
    return clone(Object.assign({}, clone(state.checkoutInfo), clone(ticket)))
  }
}
