<template>
  <div class="header-component">
    <v-navigation-drawer
      v-model="draw.leftDraw"
      floating
      absolute
      app
      class="left-nav"
    >
      <template v-slot:prepend>
        <v-card flat class="tw-border-b tw-pb-4">
          <v-card-text> </v-card-text>
        </v-card>
      </template>
      <v-list nav dense shaped>
        <v-list-item-group active-class="blue lighten-5 primary--text">
          <div v-for="(menu, i) in menus" :key="i + 'menu'">
            <v-list-item nuxt :to="menu.to">
              <v-list-item-icon>
                <i :class="menu.icon"></i>
              </v-list-item-icon>
              <v-list-item-title>{{ menu.name }}</v-list-item-title>
            </v-list-item>
            <v-divider v-if="menu.isDivider" class="my-2"></v-divider>
          </div>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <ContactBanner />
      </template>
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

      <v-btn
        icon
        color="primary"
        class=" header-btn"
        @click="draw.rightDraw = !draw.rightDraw"
      >
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
              mdi-account
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
    <v-navigation-drawer
      v-model="draw.rightDraw"
      floating
      absolute
      app
      right
      width="350px"
      class="right-nav"
    >
      <CalendarPrice class="tw-shadow-none tw-mb-4" />
      <template v-slot:append>
        <div class="calendar-action">
          <v-btn
            small
            text
            depressed
            color="primary"
            class="normal-btn"
            @click="draw.rightDraw = !draw.rightDraw"
          >
            Close
          </v-btn>
          <v-btn
            small
            depressed
            color="primary"
            class="normal-btn"
            @click="draw.rightDraw = !draw.rightDraw"
          >
            Search
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </div>
</template>
<script>
import { menu } from '@/localdb/menu'
export default {
  name: 'HeaderComponent',
  components: {
    Signin: () => import('@/components/auth/Signin'),
    MenuAuth: () => import('@/components/auth/MenuAuth'),
    ContactBanner: () => import('@/components/search/ContactBanner'),
    CalendarPrice: () => import('@/components/search/CalendarPrice')
  },
  data() {
    return {
      draw: {
        leftDraw: false,
        rightDraw: false
      },
      menus: menu,
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
/* .left-nav {
  @apply tw-flex tw-flex-col tw-justify-between tw-items-stretch;
} */
.header-btn {
  @apply tw-font-normal tw-normal-case !important;
}
.news-tips {
  @apply tw-text-xs;
}
.calendar-action {
  @apply tw-p-2 tw-px-4 tw-flex tw-flex-row tw-justify-end tw-items-center;
}
</style>
