<template>
  <v-bottom-navigation v-model="currentTarget" grow color="primary">
    <v-btn v-for="(nav, i) in navs" :key="i + 'navbar'" :value="nav.name">
      <span>{{ nav.name }}</span>
      <v-icon>{{ nav.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>
<script>
import { nav } from '@/localdb/nav'
export default {
  name: 'BottomNavigator',
  data() {
    return {
      currentTarget: 'recent',
      navs: nav
    }
  }
}
</script>
