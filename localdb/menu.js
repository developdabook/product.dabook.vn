const menu = {
  HOME: {
    name: '',
    menu: {
      home: {
        icon: 'icofont-ui-home tw-text-xl',
        name: 'Home',
        to: '/',
        isDivider: true
      }
    }
  },
  MAIN_SERVICE: {
    name: 'MAIN_SERVICE',
    menu: {
      flight: {
        icon: 'icofont-ui-flight tw-text-xl',
        name: 'Flight',
        to: '/flight',
        isDivider: false
      },
      hotel: {
        icon: 'icofont-5-star-hotel tw-text-xl',
        name: 'Hotel',
        to: '/hotel',
        isDivider: false
      },
      tour: {
        icon: 'icofont-beach tw-text-xl',
        name: 'Tour',
        to: '/tour',
        isDivider: false
      },
      golf: {
        icon: 'icofont-golf-bag tw-text-xl',
        name: 'Golf',
        to: '/golf',
        isDivider: true
      }
    }
  },
  SUB_SERVICE: {
    name: 'SUB_SERVICE',
    menu: {
      visa: {
        icon: 'icofont-world tw-text-xl',
        name: 'Visa',
        to: '/visa',
        isDivider: false
      },
      lawfirm: {
        icon: 'icofont-law-alt-3 tw-text-xl',
        name: 'Lawfirm',
        to: '/lawfirm',
        isDivider: true
      }
    }
  },
  TERM: {
    name: 'TERM & CONDITION',
    menu: {
      term: {
        icon: 'icofont-shield-alt tw-text-xl',
        name: 'Term & condition',
        to: '/general/term',
        isDivider: false
      },
      policy: {
        icon: 'icofont-shield-alt tw-text-xl',
        name: 'Privacy policy',
        to: '/general/privacy-policy',
        isDivider: false
      },
      cookie: {
        icon: 'icofont-ui-settings tw-text-xl',
        name: 'Cookie policy',
        to: '/general/cookie-policy',
        isDivider: false
      }
    }
  }
}
module.exports = {
  menu
}
