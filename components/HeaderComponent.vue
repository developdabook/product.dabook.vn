<template>
  <div class="header-component">
    <v-navigation-drawer
      v-model="draw.leftDraw"
      disable-resize-watcher
      disable-route-watcher
      floating
      fixed
      app
      class="left-nav"
    >
      <template v-slot:prepend>
        <v-card flat class="tw-border-b tw-pb-4">
          <v-card-text>
            <img class="logo_header" src="/images/logo_trans.png" alt="" />
          </v-card-text>
        </v-card>
      </template>
      <v-list nav dense shaped class="tw-mb-16">
        <v-list-item-group active-class="blue lighten-5 primary--text">
          <div v-for="(group, i) in menus" :key="i + 'menu'">
            <strong v-if="group.name !== ''" class="group-header">{{
              group.name
            }}</strong>
            <v-list-item
              v-for="(menu, j) in group.menu"
              :key="j + 'submenu'"
              nuxt
              :to="menu.to"
            >
              <v-list-item-icon class="mr-1">
                <i :class="menu.icon"></i>
              </v-list-item-icon>
              <v-list-item-title>{{ menu.name }}</v-list-item-title>
            </v-list-item>
            <v-divider class="my-3 mb-6"></v-divider>
          </div>
        </v-list-item-group>
      </v-list>
      <template v-slot:append>
        <div class="leftdraw-action">
          <v-badge bordered color="success" icon="mdi-check" overlap>
            <v-btn rounded class="leftdraw-call" depressed href="tel:19001542"
              >19001542 <i class="icofont-live-support tw-text-xl tw-ml-1"></i
            ></v-btn>
          </v-badge>
          <v-btn
            fab
            x-small
            depressed
            text
            color="primary"
            @click="changeLanguage"
            ><v-avatar size="20">
              <img
                :src="`/images/lang/${getCurrentLang.image}`"
                alt="Language"
              /> </v-avatar
          ></v-btn>
        </div>
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
        ><span class="headercolor--text">{{ $t('header_flight') }}</span>
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
        ><span class="headercolor--text">{{ $t('header_travel') }}</span>
        <i class="icofont-beach icofont-2x"></i
      ></v-btn>
      <v-toolbar-title>
        <v-img aspect-ratio="1/1" src="/images/logo.png"> </v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn
        text
        depressed
        rounded
        color="primary"
        class="header-btn tw-hidden md:tw-flex"
        nuxt
        to="/auth/my-booking"
        ><span class="headercolor--text">{{ $t('header_mybooking') }}</span>
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
      <v-btn
        fab
        x-small
        depressed
        text
        color="primary"
        class="tw-hidden md:tw-flex"
        @click="changeLanguage"
        ><v-avatar size="20">
          <img
            :src="`/images/lang/${getCurrentLang.image}`"
            alt="Language"
          /> </v-avatar
      ></v-btn>
      <v-menu
        v-model="loginMenu"
        :close-on-content-click="false"
        absolute
        offset-x
      >
        <template v-slot:activator="{ on }">
          <v-btn text fab icon color="primary" class=" header-btn" v-on="on">
            <v-icon v-if="!loginStatus" color="headercolor">
              mdi-account-outline
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
      disable-resize-watcher
      disable-route-watcher
      right
      temporary
      fixed
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
import langMixin from '@/mixins/lang'
export default {
  name: 'HeaderComponent',
  components: {
    Signin: () =>
      import(/* webpackPrefetch: true */ '@/components/auth/Signin'),
    MenuAuth: () =>
      import(/* webpackPrefetch: true */ '@/components/auth/MenuAuth'),
    CalendarPrice: () =>
      import(/* webpackPrefetch: true */ '@/components/search/CalendarPrice')
  },
  mixins: [langMixin],
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
.group-header {
  @apply tw-pl-3 tw-pb-6 tw-font-bold tw-text-xs !important;
}
.header-btn {
  @apply tw-font-normal tw-normal-case !important;
}
.logo_header {
  height: 40px;
  width: auto;
}
.news-tips {
  @apply tw-text-xs;
}
.calendar-action {
  @apply tw-p-2 tw-px-4 tw-flex tw-flex-row tw-justify-end tw-items-center tw-fixed tw-bottom-0 tw-bg-white tw-z-10 tw-w-full;
}
.contact-banner {
  @apply tw-fixed tw-bottom-0;
}
.leftdraw-action {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-center tw-w-full tw-bg-white tw-p-4 tw-fixed tw-bottom-0;
}
.leftdraw-call {
  @apply tw-bg-blue-100 tw-text-blue-600 tw-normal-case tw-font-normal !important;
}
</style>
