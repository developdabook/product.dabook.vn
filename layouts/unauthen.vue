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
    <section class="section-topup">
      <transition name="page">
        <v-btn
          @click="topFunction"
          v-show="isTopup"
          small
          fixed
          dark
          fab
          right
          color="primary"
          class="topup-btn"
        >
          <v-icon small>mdi-arrow-collapse-up</v-icon>
        </v-btn>
      </transition>
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
    return {
      isTopup: false
    }
  },
  mounted() {
    const that = this
    window.onscroll = function() {
      that.scrollFunction()
    }
  },
  methods: {
    scrollFunction() {
      if (
        document.body.scrollTop > 100 ||
        document.documentElement.scrollTop > 100
      ) {
        this.isTopup = true
      } else {
        this.isTopup = false
      }
    },

    topFunction() {
      document.body.scrollTop = 0 // For Safari
      document.documentElement.scrollTop = 0 // For Chrome, Firefox, IE and Opera
    }
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
