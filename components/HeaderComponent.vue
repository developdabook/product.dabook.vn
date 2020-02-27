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
    <v-app-bar absolute app flat scroll-target="#body-target" color="white">
      <v-app-bar-nav-icon
        color="primary"
        class="headercolor--text header-btn"
        @click="draw.leftDraw = !draw.leftDraw"
      ></v-app-bar-nav-icon>
      <v-btn
        text
        depressed
        rounded
        color="primary"
        class="header-btn"
        nuxt
        to="/flight"
        ><span class="headercolor--text">Flight</span>
        <i class="icofont-ui-flight icofont-2x"></i
      ></v-btn>
      <v-btn
        text
        depressed
        rounded
        color="primary"
        class="header-btn"
        nuxt
        to="/travel"
        ><span class="headercolor--text">Travel</span>
        <i class="icofont-beach icofont-2x"></i
      ></v-btn>
      <v-toolbar-title>
        <v-img aspect-ratio="1/1" src="/images/logo_trans.png"> </v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        text
        depressed
        rounded
        color="primary"
        class="header-btn tw-hidden md:tw-flex"
        nuxt
        to="/auth/mybooking"
        ><span class="headercolor--text">Mybooking</span>
        <i class="icofont-air-ticket icofont-2x"></i>
      </v-btn>

      <v-btn icon color="primary" class=" header-btn">
        <v-icon color="headercolor">mdi-dots-vertical</v-icon>
      </v-btn>
      <v-menu
        v-model="loginMenu"
        :close-on-content-click="false"
        absolute
        offset-x
      >
        <template v-slot:activator="{ on }">
          <v-btn text fab icon color="primary" class=" header-btn" v-on="on">
            <v-icon v-if="!loginStatus" color="headercolor">
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
            v-show="!loginStatus"
            @loggined="closeMenu($event)"
            @close="closeMenu(true)"
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
}
</script>
<style lang="postcss">
.header-btn {
  @apply tw-font-normal tw-normal-case !important;
}
</style>
