<template>
  <div class="checkout-page">
    <div class="tw-container  tw-mx-auto ">
      <Goback @goback="backToSearch" />
    </div>
    <div class="tw-container tw-mx-auto checkout-wrap">
      <section class="section-checkout">
        <CheckoutInformation />
      </section>
      <section class="section-summary">
        <client-only>
          <CheckoutSummary />
        </client-only>
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
      import(
        /* webpackPrefetch: true */ '@/components/checkout/CheckoutInformation'
      ),
    CheckoutSummary: () =>
      import(
        /* webpackPrefetch: true */ '@/components/checkout/CheckoutSummary'
      ),
    Goback: () =>
      import(/* webpackPrefetch: true */ '@/components/checkout/Goback')
  },
  methods: {
    backToSearch() {
      this.$store.dispatch('checkout/updateCurrentState', 'MISS_ALL')
    }
  }
}
</script>
<style lang="postcss">
.checkout-page {
  @apply tw-bg-gray-300 tw-min-h-screen tw-py-16;
}
.checkout-wrap {
  @apply tw-flex tw-flex-col-reverse tw-w-full tw-p-2;
}
.section-summary {
  @apply tw-mb-8;
}
@screen lg {
  .checkout-wrap {
    @apply tw-flex tw-flex-row tw-w-full tw-justify-between tw-items-start tw-p-0;
  }
  .section-checkout {
    @apply tw-w-3/5 tw-mr-2;
  }
  .section-summary {
    @apply tw-w-2/5 tw-ml-2;
  }
}
</style>
