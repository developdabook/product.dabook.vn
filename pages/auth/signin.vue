<template>
  <div class="signin-page tw-container">
    <v-card flat class="signin-box">
      <Signin />
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'SigninPage',
  layout: 'unauthen',
  components: {
    Signin: () => import('@/components/auth/Signin')
  }
}
</script>
<style lang="postcss">
.signin-page {
  @apply tw-mx-auto tw-p-4;
}
.signin-box {
  @apply tw-mx-auto tw-w-full tw-rounded-lg !important;
}
@screen md {
  .signin-box {
    @apply tw-w-1/3  tw-border  tw-border-gray-400  !important;
  }
  .signin-page {
    @apply tw-p-0;
  }
}
@screen lg {
  .signin-box {
    @apply tw-w-1/3  tw-border  tw-border-gray-400  !important;
  }
  .signin-page {
    @apply tw-p-0;
  }
}
</style>
