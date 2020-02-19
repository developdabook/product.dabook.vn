<template>
  <div class="signup-page tw-container">
    <v-card flat class="signup-box">
      <Signup />
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'SignupPage',
  components: {
    Signup: () => import('@/components/auth/Signup')
  }
}
</script>
<style lang="postcss">
.signup-page {
  @apply tw-mx-auto tw-p-4;
}
.signup-box {
  @apply tw-mx-auto tw-w-full tw-rounded-lg !important;
}
@screen md {
  .signup-box {
    @apply tw-w-1/3 tw-border tw-border-gray-400  !important;
  }
  .signup-page {
    @apply tw-p-0;
  }
}
@screen lg {
  .signup-box {
    @apply tw-w-1/3 tw-border tw-border-gray-400  !important;
  }
  .signup-page {
    @apply tw-p-0;
  }
}
</style>
