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
    <v-app-bar
      app
      absolute
      elevate-on-scroll
      scroll-target="#body-target"
      color="white"
    >
      <v-app-bar-nav-icon
        @click="draw.leftDraw = !draw.leftDraw"
        color="primary"
      ></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-img aspect-ratio="1/1" src="/images/logo_trans.png"> </v-img>
      </v-toolbar-title>

      <v-spacer></v-spacer>
      <v-btn icon color="primary">
        <v-icon>mdi-map-marker-multiple-outline</v-icon>
      </v-btn>
      <v-btn icon color="primary">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon color="primary">
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn icon color="primary">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
      <v-avatar size="30">
        <img
          src="https://randomuser.me/api/portraits/women/44.jpg"
          alt="John"
          size="20"
        />
      </v-avatar>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  name: 'HeaderComponent',
  data() {
    return {
      draw: {
        leftDraw: false
      },
      menus: []
    }
  }
}
</script>
