<template>
  <div class="pay-page">
    <div class="tw-container  tw-mx-auto ">
      <Goback />
    </div>
    <div class="tw-container tw-mx-auto pay-wrap">
      <section class="section-pay">
        <PayOption />
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
  name: 'PayPage',
  layout: 'unauthen',
  components: {
    PayOption: () =>
      import(/* webpackPrefetch: true */ '@/components/payment/PayOption'),
    CheckoutSummary: () =>
      import(
        /* webpackPrefetch: true */ '@/components/checkout/CheckoutSummary'
      ),
    Goback: () =>
      import(/* webpackPrefetch: true */ '@/components/checkout/Goback')
  }
}
</script>
<style lang="postcss">
.pay-page {
  @apply tw-bg-gray-300 tw-min-h-screen tw-py-16;
}
.pay-wrap {
  @apply tw-flex tw-flex-col-reverse tw-w-full tw-p-2;
}
.section-summary {
  @apply tw-mb-8;
}
@screen lg {
  .pay-wrap {
    @apply tw-flex tw-flex-row tw-w-full tw-justify-between tw-items-start tw-p-0;
  }
  .section-pay {
    @apply tw-w-3/5 tw-mr-2;
  }
  .section-summary {
    @apply tw-w-2/5 tw-ml-2;
  }
}
</style>
