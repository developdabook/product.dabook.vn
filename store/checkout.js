import _ from 'lodash'
export const state = () => ({
  ticketSelected: {
    DEPARTURE: {},
    RETURN: {}
  }
})
export const mutations = {
  UPDATE_TICKET_SELECTED(state, payload) {
    state.ticketSelected = _.clone(payload)
  },
  REMOVE_TICKET_PART(state, payload) {
    delete state.ticketSelected[payload]
  }
}
export const actions = {
  updateTicketSelected({ commit, state, rootState }, payload) {
    commit('UPDATE_TICKET_SELECTED', payload)
    if (!rootState.search.searchCondition.isRoundTrip) {
      commit('REMOVE_TICKET_PART', 'RETURN')
    }
  }
}
