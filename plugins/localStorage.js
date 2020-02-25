import createPersistedState from 'vuex-persistedstate'

export default ({ store, req, isDev }) => {
  createPersistedState({
    key: 'dabookLocalStorage',
    paths: [
      'search.searchCondition',
      'search.section',
      'auth.currentUser.token',
      'checkout.ticketSelected'
    ]
  })(store)
}
