export const state = () => ({
  locales: ['en', 'vi', 'ko'],
  locale: 'en'
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  }
}
export const getters = {
  curentLang(state) {
    return state.locale
  }
}
