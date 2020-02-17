<template>
  <v-app light>
    <section class="section-header">
      <HeaderComponent />
    </section>
    <v-content id="body-target">
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <section class="section-footer"></section>
    <section class="section-bottomnavi">
      <BottomNavigator />
    </section>
  </v-app>
</template>

<script>
export default {
  components: {
    HeaderComponent: () => import('@/components/HeaderComponent'),
    BottomNavigator: () => import('@/components/BottomNavigator')
  },
  data() {
    return {}
  }
}
</script>
<style lang="postcss">
.section-bottomnavi {
  @apply tw-block;
}
@screen md {
  .section-bottomnavi {
    @apply tw-hidden;
  }
}
</style>
