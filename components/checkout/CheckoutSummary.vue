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
        <SumTicketInfo
          v-for="(ticket, j) in ticketSelected"
          :key="j + 'ticketcheckout'"
          :ticket="ticket"
          class="tw-mb-2"
        />
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
        v-for="(pass, i) in Object.keys(passengers).filter(
          (item) => passengers[item] > 0
        )"
        :key="i + 'checkoutpass'"
        class="cash-box"
      >
        <div class="cash-box-title">
          <strong>{{ `${passengers[pass]} x ${pass}` }}</strong>
          <strong>25,000,000</strong>
        </div>
        <div class="cash-box-detail">
          <div class="box-item-detail">
            <span>Vé</span>
            <span>20,000,000</span>
          </div>
          <div class="box-item-detail">
            <span>Phí san bay</span>
            <span>1,000,000</span>
          </div>
          <div class="box-item-detail">
            <span>Phu phi</span>
            <span>300,000</span>
          </div>
        </div>
      </div>
      <div class="cash-box">
        <div class="cash-box-title tw-text-base tw-text-gray-900">
          <strong>Total</strong>
          <strong>14,000,000</strong>
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
      import(/* webpackPrefetch: true */ '@/components/checkout/SumTicketInfo')
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
    totalSum() {
      return this.$store.getters['checkout/priceSummaryByPass']
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
