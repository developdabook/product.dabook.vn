<template>
  <v-card-text>
    <div v-for="(way, i) in Object.keys(price)" :key="i + 'wway'">
      <div
        v-for="(pass, j) in Object.keys(price[way])"
        :key="j + 'pass'"
        class="cash-box"
      >
        <div class="cash-box-title">
          <strong
            >{{ `${price[way][pass].pass} x ${pass}` }}
            <v-chip
              x-small
              color="blue lighten-5"
              text-color="blue lighten-1"
              >{{ way }}</v-chip
            >
          </strong>
          <strong>
            <PriceValidation
              :price="price[way][pass].price + price[way][pass].fee[0].total"
          /></strong>
        </div>
        <div class="cash-box-detail">
          <div class="box-item-detail">
            <span>Vé</span>
            <span><PriceValidation :price="price[way][pass].price"/></span>
          </div>
          <div
            v-for="(fee, k) in price[way][pass].fee[0].breakdowns"
            :key="k + 'fee'"
            class="box-item-detail"
          >
            <span>{{ fee.label }}</span>
            <span><PriceValidation :price="fee.per_pax_amount"/></span>
          </div>
        </div>
      </div>
    </div>
    <div class="cash-box">
      <div class="cash-box-title tw-text-base tw-text-gray-900">
        <strong>{{ $t('checkout_sum_total') }}</strong>
        <strong><PriceValidation :price="summaryPriceTotal"/></strong>
      </div>
      <v-alert
        text
        dense
        type="info"
        class="tw-text-xs"
        v-html="$t('checkout_sum_note')"
      >
      </v-alert>
    </div>
  </v-card-text>
</template>
<script>
export default {
  name: 'CheckoutSumVJVue',
  props: {
    price: {
      type: [Array, Object],
      required: true
    },
    way: {
      type: [String, Object, Array],
      required: true
    }
  }
}
</script>
