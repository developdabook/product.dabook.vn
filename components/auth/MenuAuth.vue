<template>
  <v-list dense rounded>
    <v-subheader>Auth</v-subheader>
    <v-list-item-group color="primary">
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        @click="$emit('close')"
        dense
        nuxt
      >
        <v-list-item-icon>
          <v-icon v-text="item.icon" :class="item.class"></v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title v-text="item.name"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item @click="logout">
        <v-list-item-icon>
          <v-icon>mdi-lastpass</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>
<script>
export default {
  name: 'MenuAuth',
  data() {
    return {
      items: [
        { name: 'Profile', icon: 'mdi-fingerprint', to: '/auth/profile' },
        {
          name: 'My promotion',
          icon: 'mdi-brightness-percent',
          to: '/auth/promotion'
        },
        {
          name: 'My booking',
          icon: 'mdi-ticket-percent',
          to: '/auth/mybooking',
          class: 'rotate-45'
        }
      ]
    }
  },
  methods: {
    logout() {
      this.$emit('close')
      this.$store.dispatch('auth/logout')
    }
  }
}
</script>
