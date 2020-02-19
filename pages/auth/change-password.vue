<template>
  <div class="reset-password-page tw-container">
    <v-card flat class="reset-password-box">
      <ResetPassword />
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'ResetPasswordPage',
  components: {
    ResetPassword: () => import('@/components/auth/ResetPassword')
  }
}
</script>
<style lang="postcss">
.reset-password-page {
  @apply tw-mx-auto tw-p-4;
}
.reset-password-box {
  @apply tw-mx-auto tw-w-full tw-rounded-lg !important;
}
@screen md {
  .reset-password-box {
    @apply tw-w-1/3  tw-border  tw-border-gray-400  !important;
  }
  .reset-password-page {
    @apply tw-p-0;
  }
}
@screen lg {
  .reset-password-box {
    @apply tw-w-1/3  tw-border  tw-border-gray-400  !important;
  }
  .reset-password-page {
    @apply tw-p-0;
  }
}
</style>
