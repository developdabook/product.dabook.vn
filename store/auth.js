import axios from 'axios'
export const state = () => ({
  currentUser: {
    userName: 'Guest',
    email: '',
    token: '',
    _id: ''
  },
  loginStatus: false
})
export const mutations = {
  UPDATE_TOKEN(state, payload) {
    state.currentUser.token = payload
    axios.defaults.headers.common.Authorization = `Bearer ${payload}`
    this.$axios.defaults.headers.common.Authorization = `Bearer ${payload}`
  },
  UPDATE_EMAIL(state, payload) {
    state.currentUser.email = payload
  },
  UPDATE_LOGIN_STATUS(state, payload) {
    state.loginStatus = payload
  },
  REMOVE_TOKEN(state) {
    state.currentUser.token = ''
    delete axios.defaults.headers.common.Authorization
    delete this.$axios.defaults.headers.common.Authorization
  },
  LOGOUT(state) {
    state.loginStatus = false
  },
  DEFAULT_CURRENTUSER(state) {
    state.currentUser = {
      userName: 'Guest',
      email: '',
      token: ''
    }
  }
}
export const actions = {
  updateToken({ commit }, payload) {
    commit('UPDATE_TOKEN', payload)
  },
  updateEmail({ commit }, payload) {
    commit('UPDATE_EMAIL', payload)
  },
  async login({ dispatch, commit, state, rootState }, credentials) {
    try {
      const result = await this.$axios.post(
        `/dabook/public/api/login`,
        credentials
      )
      if (result.status === 200 && result.statusText === 'OK') {
        if ('error' in result.data) {
          dispatch(
            'notification/addNotification',
            {
              type: 'ERROR',
              title: 'LOGIN FAIL!',
              message: `${result.data.error}`
            },
            { root: true }
          )
          return false
        } else {
          commit('UPDATE_TOKEN', result.data)
          commit('UPDATE_EMAIL', credentials.email)
          commit('UPDATE_LOGIN_STATUS', true)
          dispatch(
            'notification/addNotification',
            {
              type: 'SUCCESS',
              title: 'Login success!',
              message: ''
            },
            { root: true }
          )
          return true
        }
      }
    } catch (error) {
      let message = ''
      if (error.response) {
        message = error.response.data.error
      } else if (error.request) {
        message = error.request
      } else {
        message = error.message
      }
      dispatch(
        'notification/addNotification',
        {
          type: 'ERROR',
          title: 'SIGNIN FAIL!',
          message
        },
        { root: true }
      )
      return false
    }
  },
  async requestReset({ dispatch, commit, state, rootState }, credentials) {
    try {
      const res = await this.$axios.post(
        `${process.env.CRAWL_FLIGHT_API}/auth/request-reset`,
        credentials
      )
      if (res.status === 200 && res.statusText === 'OK') {
        if ('error' in res.data) {
          dispatch(
            'notification/addNotification',
            {
              type: 'ERROR',
              title: 'Request fail!',
              message: `${res.data.error}`
            },
            { root: true }
          )
          return false
        } else {
          commit('REMOVE_TOKEN')
          commit('UPDATE_LOGIN_STATUS', false)
          dispatch(
            'notification/addNotification',
            {
              type: 'SUCCESS',
              title: 'Request success, Please check your mailbox!',
              message: ''
            },
            { root: true }
          )
          return true
        }
      }
      return false
    } catch (error) {
      let message = ''
      if (error.response) {
        message = error.response.data.error
      } else if (error.request) {
        message = error.request
      } else {
        message = error.message
      }
      dispatch(
        'notification/addNotification',
        {
          type: 'ERROR',
          title: 'Request fail!',
          message
        },
        { root: true }
      )
      return false
    }
  },
  async reset({ dispatch, commit, state, rootState }, credentials) {
    const res = await this.$axios.post(
      `${process.env.CRAWL_FLIGHT_API}/auth/reset`,
      credentials
    )
    if (res.status === 200 && res.statusText === 'OK') {
      if ('error' in res.data) {
        dispatch(
          'notification/addNotification',
          {
            type: 'ERROR',
            title: 'Reset password fail!',
            message: `${res.data.error}`
          },
          { root: true }
        )
        return false
      } else {
        commit('REMOVE_TOKEN')
        commit('UPDATE_LOGIN_STATUS', false)
        dispatch(
          'notification/addNotification',
          {
            type: 'SUCCESS',
            title: 'Reset password success, Please check your mailbox!',
            message: ''
          },
          { root: true }
        )
        return true
      }
    }
    return false
  },
  logout({ dispatch, commit, state, rootState }) {
    commit('DEFAULT_CURRENTUSER')
    commit('REMOVE_TOKEN')
    commit('LOGOUT')
    dispatch(
      'notification/addNotification',
      {
        type: 'SUCCESS',
        title: 'Logout success!',
        message: 'Please login to using great function'
      },
      { root: true }
    )
  },
  signup({ dispatch, commit }, credentials) {
    return this.$axios
      .post(`/dabook/public/api/signup`, credentials)
      .then((res) => {
        if (res.status === 200 && res.statusText === 'OK') {
          if ('error' in res.data) {
            dispatch(
              'notification/addNotification',
              {
                type: 'ERROR',
                title: 'Signup fail!',
                message: `${res.data.error}`
              },
              { root: true }
            )
            return false
          } else {
            dispatch(
              'notification/addNotification',
              {
                type: 'SUCCESS',
                title: 'Signup success, Please login!',
                message: ''
              },
              { root: true }
            )
          }
        } else {
          dispatch(
            'notification/addNotification',
            {
              type: 'ERROR',
              title: 'Signup fail, Please try again!',
              message: `${res.status} +${res.data.error} `
            },
            { root: true }
          )
        }
      })
      .catch((error) => {
        let message = ''
        if (error.response) {
          message = error.response.data.error
        } else if (error.request) {
          message = error.request
        } else {
          message = error.message
        }
        dispatch(
          'notification/addNotification',
          {
            type: 'ERROR',
            title: 'SIGNUP FAIL!',
            message
          },
          { root: true }
        )
      })
  }
}
export const getters = {
  isLogin(state) {
    return state.loginStatus
  },
  getCurrentUser(state) {
    return state.currentUser
  },
  getToken(state) {
    return state.currentUser.token
  }
}
