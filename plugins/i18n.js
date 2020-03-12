import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)
const dateTimeFormats = {
  en: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    longday: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric'
    }
  },
  vi: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    longday: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
  },
  ko: {
    short: {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    },
    longday: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short'
    },
    long: {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      weekday: 'short',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }
  }
}
export default ({ app, store }) => {
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch
  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: 'en',
    messages: {
      en: require('~/locales/en.json'),
      vi: require('~/locales/vi.json'),
      ko: require('~/locales/ko.json')
    },
    dateTimeFormats
  })

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      return `/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
}
