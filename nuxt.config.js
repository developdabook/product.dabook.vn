const colors = require('vuetify/es5/util/colors').default
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
//   .BundleAnalyzerPlugin

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
    { src: '~/plugins/localStorage.js', ssr: false },
    '~/plugins/global.js',
    '~/plugins/axios.js',
    '~/plugins/i18n.js'
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
    'nuxt-purgecss',
    'nuxt-polyfill'
  ],
  polyfill: {
    features: [
      /* 
            Feature without detect:

            Note: 
              This is not recommended for most polyfills
              because the polyfill will always be loaded, parsed and executed.
        */
      {
        require: 'url-polyfill' // NPM package or require path of file
      },

      /* 
            Feature with detect:

            Detection is better because the polyfill will not be 
            loaded, parsed and executed if it's not necessary.
        */
      {
        require: 'intersection-observer',
        detect: () => 'IntersectionObserver' in window
      },

      /*
            Feature with detect & install:

            Some polyfills require a installation step
            Hence you could supply a install function which accepts the require result
        */
      {
        require: 'smoothscroll-polyfill',

        // Detection found in source: https://github.com/iamdustan/smoothscroll/blob/master/src/smoothscroll.js
        detect: () =>
          'scrollBehavior' in document.documentElement.style &&
          window.__forceSmoothScrollPolyfill__ !== true,

        // Optional install function called client side after the package is required:
        install: (smoothscroll) => smoothscroll.polyfill()
      }
    ]
  },
  pageTransition: 'page',
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
    baseURL: 'http://45.32.99.26:8081'
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
          componentColor: '#4A5568',
          headercolor: '#5F6368'
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
          componentColor: '#4A5568',
          headercolor: '#5F6368'
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
    // plugins: [new BundleAnalyzerPlugin({ analyzerPort: 1010 })]
  }
}
