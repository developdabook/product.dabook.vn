<template>
  <div class="request-reset-page tw-container">
    <v-card flat class="request-reset-box">
      <RequestReset />
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'RequestResetPage',
  components: {
    RequestReset: () => import('@/components/auth/RequestReset')
  }
}
</script>
<style lang="postcss">
.request-reset-page {
  @apply tw-mx-auto tw-p-4;
}
.request-reset-box {
  @apply tw-mx-auto tw-w-full tw-rounded-lg !important;
}
@screen md {
  .request-reset-box {
    @apply tw-w-1/3  tw-border  tw-border-gray-400  !important;
  }
  .request-reset-page {
    @apply tw-p-0;
  }
}
@screen lg {
  .request-reset-box {
    @apply tw-w-1/3  tw-border  tw-border-gray-400  !important;
  }
  .request-reset-page {
    @apply tw-p-0;
  }
}
</style>
