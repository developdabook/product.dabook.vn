const menu = {
  HOME: {
    name: '',
    menu: {
      home: {
        icon: 'icofont-ui-home tw-text-xl',
        name: 'draw_home',
        to: '/',
        isDivider: true
      }
    }
  },
  MAIN_SERVICE: {
    name: 'draw_main_service',
    menu: {
      flight: {
        icon: 'icofont-ui-flight tw-text-xl',
        name: 'draw_flight',
        to: '/flight',
        isDivider: false
      },
      hotel: {
        icon: 'icofont-5-star-hotel tw-text-xl',
        name: 'draw_hotel',
        to: '/hotel',
        isDivider: false
      },
      tour: {
        icon: 'icofont-beach tw-text-xl',
        name: 'draw_tour',
        to: '/tour',
        isDivider: false
      },
      golf: {
        icon: 'icofont-golf-bag tw-text-xl',
        name: 'draw_golf',
        to: '/golf',
        isDivider: true
      }
    }
  },
  SUB_SERVICE: {
    name: 'draw_sub_service',
    menu: {
      visa: {
        icon: 'icofont-world tw-text-xl',
        name: 'draw_visa',
        to: '/visa',
        isDivider: false
      },
      lawfirm: {
        icon: 'icofont-law-alt-3 tw-text-xl',
        name: 'draw_lawfirm',
        to: '/lawfirm',
        isDivider: true
      }
    }
  },
  TERM: {
    name: 'draw_term_condition',
    menu: {
      term: {
        icon: 'icofont-shield-alt tw-text-xl',
        name: 'draw_term',
        to: '/general/term',
        isDivider: false
      },
      policy: {
        icon: 'icofont-shield-alt tw-text-xl',
        name: 'draw_privacy',
        to: '/general/privacy-policy',
        isDivider: false
      },
      cookie: {
        icon: 'icofont-ui-settings tw-text-xl',
        name: 'draw_cookie',
        to: '/general/cookie-policy',
        isDivider: false
      }
    }
  }
}
module.exports = {
  menu
}
