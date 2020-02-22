<template>
  <v-app light class="primarytext--text">
    <section class="section-header">
      <HeaderComponent />
    </section>
    <v-content id="body-target">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <section class="section-bottomnavi">
      <BottomNavigator />
    </section>
    <section class="global-component">
      <PushNotification />
    </section>
    <section class="section-footer">
      <FooterComponent />
    </section>
  </v-app>
</template>

<script>
export default {
  name: 'UnAuthenLayout',
  middleware: 'not_require_authenticated',
  components: {
    HeaderComponent: () => import('@/components/HeaderComponent'),
    BottomNavigator: () => import('@/components/BottomNavigator'),
    FooterComponent: () => import('@/components/FooterComponent')
  },
  data() {
    return {}
  }
}
</script>
<style lang="postcss">
/* RESSET */
button,
button:hover,
button:focus {
  outline: none !important;
}
.section-bottomnavi {
  @apply tw-block;
}
@screen md {
  .section-bottomnavi {
    @apply tw-hidden;
  }
}
</style>
