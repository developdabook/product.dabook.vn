import utils from '@/utils/utils'
export const state = () => ({
  notifications: [],
  status: false
})

export const mutations = {
  ADD_NOTIFICATION(state, payload) {
    payload.id = utils.uuid()
    state.notifications.push(payload)
  },
  CHANGE_NOTIFICATION_STATUS(state, payload) {
    state.status = payload
  },
  REMOVE_NOTIFICATION(state, payload) {
    state.notifications = state.notifications.filter((element) => {
      return element.id !== payload.id
    })
  },
  REMOVE_ALL_NOTIFICATION(state) {
    state.notifications = []
  },
  REMOVE_FIRST_NOTIFICATION(state) {
    if (state.notifications.length > 0) {
      state.notifications.shift()
    }
  }
}
export const actions = {
  removeNotification({ commit, state, rootState }, payload) {
    commit('REMOVE_NOTIFICATION', payload)
    commit('CHANGE_NOTIFICATION_STATUS', false)
  },
  removeAllNotification({ commit }) {
    commit('REMOVE_ALL_NOTIFICATION')
    commit('CHANGE_NOTIFICATION_STATUS', false)
  },
  addNotification({ commit }, payload) {
    commit('ADD_NOTIFICATION', payload)
    commit('CHANGE_NOTIFICATION_STATUS', true)
  },
  activeInterval({ commit, state, rootState }) {
    setInterval(() => {
      commit('REMOVE_FIRST_NOTIFICATION')
    }, 10000)
  }
}
export const getters = {
  currentNotification(state) {
    return state.notifications
  },
  currentNotificationStatus(state) {
    return state.status
  }
}
