<template>
  <v-card outlined class="checkout-summary">
    <v-card-title class="summary-title">
      <strong class="pass-number"
        ><v-icon class="summary-title-icon">mdi-earth-arrow-right</v-icon> Trip
        summary
      </strong>
    </v-card-title>
    <v-card-text>
      <SumTicketInfo class="tw-mb-2" />
      <SumTicketInfo class="tw-mb-2" />
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'CheckoutSummary',
  components: {
    SumTicketInfo: () => import('@/components/checkout/SumTicketInfo')
  }
}
</script>
<style lang="postcss">
.checkout-summary {
  @apply tw-p-0  tw-rounded-none !important;
}
.select-pay-btn {
  @apply tw-normal-case tw-font-normal tw-w-full !important;
}
</style>
<style lang="postcss">
.summary-title {
  @apply tw-text-base tw-flex tw-flex-row tw-justify-between tw-items-center tw-mb-4 !important;
}
.summary-title-icon {
  @apply tw-mr-1 tw-text-gray-700 !important;
}
@screen md {
  .checkout-summary {
    @apply tw-p-4  tw-rounded-none !important;
  }
}
</style>
