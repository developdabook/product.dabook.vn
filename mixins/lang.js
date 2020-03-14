const langMixin = {
  computed: {
    getCurrentLang() {
      if (this.curentLang === 'en') {
        return {
          image: 'english.png',
          name: 'English'
        }
      } else if (this.curentLang === 'ko') {
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
    },
    curentLang() {
      return this.$store.getters.curentLang
    }
  },
  methods: {
    changeLanguage() {
      if (this.curentLang === 'en') {
        this.$store.commit('SET_LANG', 'ko')
        this.$i18n.locale = this.curentLang
      } else if (this.curentLang === 'ko') {
        this.$store.commit('SET_LANG', 'vi')
        this.$i18n.locale = this.curentLang
      } else {
        this.$store.commit('SET_LANG', 'en')
        this.$i18n.locale = this.curentLang
      }
    }
  }
}
export default langMixin
