<template>
  <div class="header-component">
    <v-navigation-drawer v-model="draw.leftDraw" floating absolute app>
      <v-list nav dense>
        <v-list-item-group
          v-model="menus"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Account</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app absolute flat scroll-target="#body-target" color="white">
      <v-app-bar-nav-icon
        @click="draw.leftDraw = !draw.leftDraw"
        color="#718096"
      ></v-app-bar-nav-icon>
      <v-btn
        text
        depressed
        rounded
        color="#718096"
        class="tw-normal-case"
        nuxt
        to="/flight"
        >Flight <v-icon small>mdi-airplane-takeoff</v-icon></v-btn
      >
      <v-btn
        text
        depressed
        rounded
        color="#718096"
        class="tw-normal-case"
        nuxt
        to="/travel"
        >Travel <v-icon small>mdi-beach</v-icon></v-btn
      >
      <v-toolbar-title>
        <v-img aspect-ratio="1/1" src="/images/logo_trans.png"> </v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon color="#718096" class="tw-hidden md:tw-inline-block">
        <v-icon color="#718096">mdi-map-marker-multiple-outline</v-icon>
      </v-btn>
      <v-btn icon color="#718096" class="tw-hidden md:tw-inline-block">
        <i class="icofont-air-ticket icofont-2x"></i>
      </v-btn>

      <v-btn icon color="#718096" class="tw-hidden md:tw-inline-block">
        <v-icon color="#718096">mdi-heart-outline</v-icon>
      </v-btn>

      <v-btn icon color="#718096">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-menu
        v-model="loginMenu"
        :close-on-content-click="false"
        absolute
        offset-x
      >
        <template v-slot:activator="{ on }">
          <v-btn v-on="on" text fab icon color="#718096">
            <v-icon v-if="!loginStatus">
              mdi-shield-check-outline
            </v-icon>

            <v-avatar v-else size="30">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="John"
                size="20"
              />
            </v-avatar>
          </v-btn>
        </template>

        <v-card class="tw-shadow-lg tw-rounded-lg tw-max-w-screen-sm w-screen">
          <Signin
            @loggined="closeMenu($event)"
            @close="closeMenu(true)"
            v-show="!loginStatus"
          />
          <MenuAuth v-show="loginStatus" @close="closeMenu(true)" />
        </v-card>
      </v-menu>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: 'HeaderComponent',
  components: {
    Signin: () => import('@/components/auth/Signin'),
    MenuAuth: () => import('@/components/auth/MenuAuth')
  },
  data() {
    return {
      draw: {
        leftDraw: false
      },
      menus: [],
      loginMenu: false
    }
  },
  computed: {
    loginStatus() {
      return this.$store.getters['auth/isLogin']
    }
  },
  methods: {
    closeMenu(payload) {
      this.loginMenu = !payload
    }
  }
  // watch: {
  //   $route(to, from) {
  //     this.loginMenu = false
  //   }
  // }
}
</script>
