const colors = require('vuetify/es5/util/colors').default

module.exports = {
  mode: 'universal',
  server: {
    port: 3505
  },
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: '/icofont/icofont.min.css' }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#fff' },
  /*
   ** Global CSS
   */
  css: ['./assets/scss/main.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    { src: '@/plugins/v-calendar', ssr: false },
    { src: 'plugins/owl.js', ssr: false },
    '~/plugins/global.js',
    '~/plugins/axios.js'
  ],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/moment',
    '@nuxtjs/dotenv'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    'nuxt-purgecss'
  ],
  purgeCSS: {
    mode: 'postcss',
    enabled: true,
    // whitelist pattern of vuetify class names
    // content: [
    //   './src/**/*.html',
    //   './src/**/*.vue'
    // ],
    whitelistPatterns: [/^v-*/, /^theme-*/, /^application--*/],
    whitelistPatternsChildren: [/^v-*/, /^theme-*/, /^application--*/],
    whitelist: [
      'spacer',
      'primary',
      'secondary',
      'accent',
      'error',
      'warning',
      'info',
      'success'
    ]
  },
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    baseURL: 'https://cors-anywhere.herokuapp.com/http://45.32.99.26'
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        dark: {
          primary: '#1A73E8',
          accent: '#1A202C',
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          primarytext: '#3C4043',
          secondarytext: '#70757A',
          componentColor: '#4A5568'
        },
        light: {
          primary: '#1A73E8',
          accent: '#1A202C',
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          primarytext: '#3C4043',
          secondarytext: '#70757A',
          componentColor: '#4A5568'
        }
      }
    }
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      config.module.rules.push({
        enforce: 'pre',
        test: /\.(js|vue)$/,
        loader: 'eslint-loader',
        exclude: /(node_modules)/,
        options: {
          fix: true
        }
      })
    }
  }
}
