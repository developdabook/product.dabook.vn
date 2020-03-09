const langMixin = {
  computed: {
    getCurrentLang() {
      if (this.$store.state.locale === 'en') {
        return {
          image: 'english.png',
          name: 'English'
        }
      } else if (this.$store.state.locale === 'ko') {
        return {
          image: 'korea.png',
          name: 'Korean'
        }
      } else {
        return {
          image: 'vietnam.png',
          name: 'Tiếng Việt'
        }
      }
    }
  },
  methods: {
    changeLanguage() {
      if (this.$store.state.locale === 'en') {
        this.$store.commit('SET_LANG', 'ko')
        this.$i18n.locale = this.$store.state.locale
      } else if (this.$store.state.locale === 'ko') {
        this.$store.commit('SET_LANG', 'vn')
        this.$i18n.locale = this.$store.state.locale
      } else {
        this.$store.commit('SET_LANG', 'en')
        this.$i18n.locale = this.$store.state.locale
      }
    }
  }
}
export default langMixin
