<template>
  <div class="checkout-page">
    <div class="tw-container tw-mx-auto checkout-wrap">
      <section class="section-checkout">
        <CheckoutInformation />
      </section>
      <section class="section-summary">
        <CheckoutSummary />
      </section>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CheckoutPage',
  layout: 'unauthen',
  components: {
    CheckoutInformation: () =>
      import('@/components/checkout/CheckoutInformation'),
    CheckoutSummary: () => import('@/components/checkout/CheckoutSummary')
  }
}
</script>
<style lang="postcss">
.checkout-page {
  @apply tw-bg-gray-300 tw-min-h-screen tw-py-16;
}
.checkout-wrap {
  @apply tw-flex tw-flex-col tw-w-full;
}
@screen md {
  .checkout-wrap {
    @apply tw-flex tw-flex-row tw-w-full tw-justify-between tw-items-start;
  }
  .section-checkout {
    @apply tw-w-3/5 tw-mr-2;
  }
  .section-summary {
    @apply tw-w-2/5 tw-ml-2;
  }
}
</style>
