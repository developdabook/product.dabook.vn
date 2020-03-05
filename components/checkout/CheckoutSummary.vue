<template>
  <v-card outlined class="checkout-summary">
    <v-card-title class="summary-title">
      <strong class="pass-number tw-py-2"
        ><v-icon class="summary-title-icon">mdi-earth-arrow-right</v-icon> Trip
        summary
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
        ><v-icon class="summary-title-icon">mdi-cash-usd-outline</v-icon> Cash
        summary
      </strong>
    </v-card-title>
    <v-card-text>
      <div
        v-for="(way, i) in Object.keys(summaryPriceDetail)"
        :key="i + 'wway'"
      >
        <div
          v-for="(pass, j) in Object.keys(summaryPriceDetail[way])"
          :key="j + 'pass'"
          class="cash-box"
        >
          <div class="cash-box-title">
            <strong
              >{{ `${summaryPriceDetail[way][pass].pass} x ${pass}` }}
              <v-chip
                x-small
                color="blue lighten-5"
                text-color="blue lighten-1"
                >{{ way }}</v-chip
              >
            </strong>
            <strong>
              <PriceValidation
                :price="
                  summaryPriceDetail[way][pass].price +
                    summaryPriceDetail[way][pass].fee[0].total
                "
            /></strong>
          </div>
          <div class="cash-box-detail">
            <div class="box-item-detail">
              <span>Vé</span>
              <span
                ><PriceValidation :price="summaryPriceDetail[way][pass].price"
              /></span>
            </div>
            <div
              v-for="(fee, k) in summaryPriceDetail[way][pass].fee[0]
                .breakdowns"
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
          <strong>Total</strong>
          <strong><PriceValidation :price="summaryPriceTotal"/></strong>
        </div>
        <v-alert text dense type="info" class="tw-text-xs">
          Quý khách lưu ý. Giá trên chưa bao gồm phụ phí phát sinh khi quý khách
          lựa chọn phương thức thanh toán
          <strong>( phí thu bởi nhà cung cấp)</strong> Vui lòng điền thông tin
          và chọn Select Payment để biết thêm thông tin ,hoặc gọi
          <v-btn
            depressed
            rounded
            small
            href="tel:19001542"
            color="info"
            text
            class="tw-px-1"
            >1900-1542 <i class="icofont-live-support"></i
          ></v-btn>
          để biết thêm thông tin chi tiết
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
      return this.$store.getters['checkout/priceSummaryByPass'].detail
    },
    summaryPriceTotal() {
      return this.$store.getters['checkout/priceSummaryByPass'].total
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
