<template>
  <div>
    <v-card outlined class="info-block contact-ingo">
      <v-card-title class="info-title">
        <strong class="pass-number"
          ><v-icon class="info-title-icon"
            >mdi-account-tie-voice-outline</v-icon
          >
          Payment
        </strong>
      </v-card-title>
      <v-card-text>
        <div class="info-notice">
          <v-alert text dense type="info" class="tw-text-xs">
            Sử dụng một trong những phương thức dưới đây để hoàn thành thanh
            toán và nhận vé của bạn
          </v-alert>
          <v-alert text dense type="info" class="tw-text-xs">
            Tiến trình thanh toán có thể mất vài phút, Chúng tôi đang cải thiện
            chúng. Mong bạn đừng tắt trình duyệt khi thanh toán
          </v-alert>
          <v-alert text dense type="warning" class="tw-text-xs">
            <ul class="tw-p-0 tw-m-0 tw-list-disc">
              <li>
                Quý khách lưu ý, mỗi phương thức thanh toán có thể phát sinh phụ
                thu đến từ nhà cung cấp dịch vụ thanh toán. Vui lòng chọn các
                chức năng thanh toán phù hợp
              </li>
              <li>
                Các hình thức thanh toán online sẽ diễn ra trên hệ thống của nhà
                cung cấp dịch vụ mà dabook liên kết. Mọi phát sinh lỗi khi giao
                dịch vui lòng liên hệ nhà cung cấp để xử lý
              </li>
            </ul>
          </v-alert>
        </div>
        <div class="field-box">
          <v-radio-group v-model="paySelected" column>
            <v-expansion-panels flat>
              <v-expansion-panel
                v-for="(item, i) in payOptions"
                :key="i"
                :class="{ active: paySelected.code === item.code }"
                class="pay-item"
              >
                <v-expansion-panel-header hide-actions>
                  <template v-slot:default>
                    <v-radio :value="item" color="info">
                      <template v-slot:label>
                        <div class="pay-item-header">
                          <div class="tw-flex tw-items-center">
                            <i
                              :class="item.icon"
                              class="pay-item-icon icofont-2x"
                            ></i>
                            <span class="pay-item-name">{{ item.name }}</span>
                          </div>
                          <strong
                            :class="{ 'success--text': item.unit === 'FREE' }"
                            class="pay-item-fee"
                            >{{
                              item.unit === 'FREE'
                                ? 'FREE'
                                : new Intl.NumberFormat('vi-VN', {
                                    style: 'currency',
                                    currency: item.unit
                                  }).format(item.fee)
                            }}</strong
                          >
                        </div>
                      </template>
                    </v-radio>
                  </template>
                </v-expansion-panel-header>
                <v-expansion-panel-content class="pay-item-body">
                  <component :is="item.component"> </component>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-radio-group>
        </div>
      </v-card-text>
    </v-card>
    <div class="select-payment-box">
      <v-btn
        v-if="paySelected.type === 'UNDIRECT_PAY'"
        color="primary"
        class="pay-btn"
        large
        @click="makeReservation"
      >
        <i class="icofont-air-ticket tw-mr-2 icofont-2x"></i> Make
        Reservation</v-btn
      >
      <v-btn v-else color="primary" class="pay-btn" large @click="issueTicket">
        <v-icon small class="tw-mx-2">mdi-check-decagram</v-icon>
        Pay and got ticket</v-btn
      >
    </div>
    <section class="section-dialog">
      <v-dialog v-model="issueDialog" max-width="490" persistent>
        <IssueTicket @close="issueDialog = false" />
      </v-dialog>
    </section>
  </div>
</template>
<script>
export default {
  name: 'PayOption',
  components: {
    IssueTicket: () =>
      import(/* webpackPrefetch: true */ '@/components/checkout/IssueTicket')
  },
  data() {
    return {
      issueDialog: false,
      payOptions: [
        {
          code: 'OFFICE',
          icon: 'icofont-building-alt',
          name: 'Thanh toán tại văn phòng',
          fee: 0,
          unit: 'FREE',
          component: 'OfficePay',
          type: 'UNDIRECT_PAY'
        },
        {
          code: 'BANK_TRANSFER',
          icon: 'icofont-bank-transfer',
          name: 'Chuyển khoản',
          fee: 0,
          unit: 'FREE',
          component: 'BankTransferPay',
          type: 'UNDIRECT_PAY'
        },
        {
          code: 'DELIVERY',
          icon: 'icofont-fast-delivery',
          name: 'Giao vé,thanh toán tại nhà',
          fee: 20000,
          unit: 'VND',
          component: 'DeliveryPay',
          type: 'UNDIRECT_PAY'
        },
        {
          code: 'PAYPAL',
          icon: 'icofont-paypal-alt',
          name: 'Paypal',
          fee: 3.14,
          unit: 'USD',
          component: 'PayPalPay',
          type: 'DIRECT_PAY'
        },
        {
          code: 'ONEPAY',
          icon: 'icofont-pay',
          name: 'Onepay',
          fee: 50000,
          unit: 'VND',
          component: 'OnePayPay',
          type: 'DIRECT_PAY'
        }
      ],
      paySelected: {}
    }
  },
  methods: {
    issueTicket() {
      this.issueDialog = true
    },
    makeReservation() {
      this.issueDialog = true
    }
  }
}
</script>
<style lang="postcss">
.info-notice {
  @apply tw-text-xs;
}
.field-box {
  @apply tw-pt-4;
}
.pay-item {
  @apply tw-border-2 tw-border-gray-300 tw-my-2;
}
.pay-item:hover {
  @apply tw-border-2 tw-border-gray-600;
}
.pay-item.active {
  @apply tw-border-2 tw-border-teal-600 !important;
}
.pay-item-header {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-center tw-text-gray-800 tw-w-full tw-text-sm;
}
.pay-item-name {
  @apply tw-text-xs;
}
.pay-item-icon {
  @apply tw-text-gray-800 tw-mr-2 !important;
}
.pay-item-fee {
  @apply tw-text-gray-800;
}
.pay-item-body {
  @apply tw-text-sm;
}
.pay-btn {
  @apply tw-rounded-none tw-font-normal tw-normal-case tw-shadow;
}
.pay-btn:hover {
  @apply tw-shadow-lg;
}
</style>
