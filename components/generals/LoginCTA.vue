<template>
  <div v-show="!isLogin">
    <v-card flat class="tw-rounded-none tw-border" color="primary" dark>
      <v-card-actions class="login-cta-body">
        <div>
          <v-card-title class="tw-text-base tw-pb-2"
            >Get 50 coin in your wallet</v-card-title
          >
          <v-card-subtitle class="tw-text-xs tw-hidden md:tw-block"
            >Hundred promotion and discount every day. Let's traver
            free</v-card-subtitle
          >
        </div>
        <v-spacer></v-spacer>
        <v-btn
          depressed
          rounded
          color="blue darken-1"
          dark
          class="normal-btn tw-mr-2 tw-px-2"
          @click="loginModal = !loginModal"
          >Login now</v-btn
        >
      </v-card-actions>
    </v-card>
    <v-dialog v-model="loginModal" width="350">
      <Signin @loggined="logined" />
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'LoginCTA',
  components: {
    Signin: () => import('@/components/auth/Signin')
  },
  data() {
    return {
      loginModal: false
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters['auth/isLogin']
    }
  },
  methods: {
    logined() {
      this.$emit('logined')
      this.loginModal = false
    }
  }
}
</script>
<style lang="postcss">
.login-cta-body {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-center tw-w-full;
}
</style>
