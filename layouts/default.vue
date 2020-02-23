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
  name: 'AuthenLayout',
  middleware: 'authenticated',
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
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 500ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
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
