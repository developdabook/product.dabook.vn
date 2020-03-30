<template>
  <v-card outlined class="checkout-summary">
    <v-card-title class="summary-title">
      <strong class="pass-number tw-py-2"
        ><v-icon class="summary-title-icon">mdi-earth-arrow-right</v-icon>
        {{ $t('checkout_sum_tripsummary') }}
      </strong>
    </v-card-title>
    <v-card-text>
      <client-only>
        <div v-for="(way, i) in Object.keys(ticketSelected)" :key="i + 'way'">
          <SumTicketInfo
            v-for="(ticket, j) in ticketSelected[way].ticket"
            :key="j + 'ticketcheckout'"
            :ticket="ticket"
            :fare="ticketSelected[way].fare"
            class="tw-mb-2"
          />
        </div>
      </client-only>
    </v-card-text>
    <v-card-title class="summary-title">
      <strong class="pass-number"
        ><v-icon class="summary-title-icon">mdi-cash-usd-outline</v-icon
        >{{ $t('checkout_sum_cash') }}
      </strong>
    </v-card-title>
    <v-card-text>
      <div
        v-for="(way, i) in Object.keys(summaryPriceDetail)"
        :key="i + 'wway'"
      >
        <div
          v-for="(pass, j) in summaryPriceDetail[way].fee"
          :key="j + 'pass'"
          class="cash-box"
        >
          <div class="cash-box-title">
            <strong
              >{{
                `${passengers[pass.type.toUpperCase()]} x ${$t(pass.label)}`
              }}
              <v-chip
                x-small
                color="blue lighten-5"
                text-color="blue lighten-1"
                >{{ $t(way) }}</v-chip
              >
            </strong>
            <strong> <PriceValidation :price="pass.total"/></strong>
          </div>
          <div class="cash-box-detail">
            <div class="box-item-detail">
              <span>{{ $t('label_ticket') }}</span>
              <span class="tw-flex tw-flex-row tw-flex-no-wrap"
                ><span class="tw-mr-2">{{
                  `${passengers[pass.type.toUpperCase()]} x`
                }}</span
                ><PriceValidation :price="pass.fare_per_pax_amount"
              /></span>
            </div>
            <div
              v-for="(fee, k) in pass.breakdowns"
              :key="k + 'fee'"
              class="box-item-detail"
            >
              <span>{{ $t(fee.charge_code) }}</span>
              <span class="tw-flex tw-flex-row tw-flex-no-wrap"
                ><span class="tw-mr-2">{{
                  `${passengers[pass.type.toUpperCase()]} x`
                }}</span
                ><PriceValidation :price="fee.per_pax_amount"
              /></span>
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
  </v-card>
</template>
<script>
export default {
  name: 'CheckoutSummary',
  components: {
    SumTicketInfo: () =>
      import(/* webpackPrefetch: true */ '@/components/checkout/SumTicketInfo'),
    PriceValidation: () =>
      import(
        /* webpackPrefetch: true */ '@/components/generals/PriceValidation'
      )
  },
  computed: {
    passengers() {
      return this.$store.getters['search/getPassengers']
    },
    ticketSelected() {
      if (
        typeof this.$store.getters['checkout/geticketSelected'] === 'undefined'
      ) {
        return {
          fare: {},
          ticket: {}
        }
      }
      return this.$store.getters['checkout/geticketSelected']
    },
    feeAdult() {
      return 0
    },
    summaryPriceDetail() {
      return this.$store.getters['checkout/priceSummary'].detail
    },
    summaryPriceTotal() {
      return this.$store.getters['checkout/priceSummary'].total
    }
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

.cash-box {
  @apply tw-text-gray-800 tw-border-b tw-border-dashed tw-py-2;
}
.cash-box-title {
  @apply tw-text-sm tw-flex tw-flex-row tw-justify-between tw-items-center tw-pb-3 !important;
}
.cash-box-detail {
  @apply tw-text-xs tw-pl-4;
}
.box-item-detail {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-center tw-pb-1;
}
</style>
