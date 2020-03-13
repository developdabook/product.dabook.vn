<template>
  <v-card>
    <v-progress-linear
      :active="reserLoading"
      :indeterminate="reserLoading"
      color="teal accent-4"
    ></v-progress-linear>
    <v-card-title> </v-card-title>
    <v-card-text class="keep-box">
      <div class="keep-body">
        <div class="keep-status">
          <span class="tw-relative keep-row">
            <i class="icofont-interface icofont-4x process-icon"></i>
            <span class="process-loading"
              ><v-progress-circular
                :active="reserLoading"
                :indeterminate="reserLoading"
                size="20"
                color="teal accent-4"
              ></v-progress-circular> </span
            ><i
              :class="{
                'icofont-sound-wave info--text': !isReservated,
                'icofont-compass white--text': reserLoading,
                'icofont-check-circled success--text': isReservated
              }"
              class="status-icon"
            ></i>
          </span>
          <strong class="status-text">{{
            reserLoading
              ? $t('reser_popup_reservating')
              : isReservated
              ? $t('reser_popup_reservated')
              : $t('reser_popup_waitforaction')
          }}</strong>
        </div>
        <div v-if="!isReservated" class="action-reser">
          <v-alert
            text
            dense
            type="warning"
            class="tw-text-xs"
            v-html="$t('reser_popup_notice')"
          >
          </v-alert>
          <v-btn
            color="primary"
            class="normal-btn keep-row action-btn"
            :loading="reserLoading"
            :disabled="reserLoading"
            @click="confirmReservation"
            ><i class="icofont-ticket icofont-2x tw-mr-2"></i
            >{{ $t('btn_confirm_reser') }}</v-btn
          >
          <v-btn
            color="primary"
            class="normal-btn keep-row action-btn"
            text
            @click="close"
            >{{ $t('btn_back_to_home') }}</v-btn
          >
        </div>
        <div v-else class="action-reser">
          <v-alert
            text
            dense
            type="success"
            class="tw-text-xs"
            v-html="$t('reser_popup_thankyou')"
          >
          </v-alert>
          <v-btn
            color="primary"
            class="normal-btn keep-row action-btn"
            @click="copyTicket"
            ><v-icon class="tw-text-xl tw-mr-2">mdi-content-copy</v-icon
            >{{ reservationCode }}</v-btn
          >
          <v-btn
            color="primary"
            class="normal-btn keep-row action-btn"
            text
            @click="close"
            >{{ $t('btn_back_to_mybooking') }}</v-btn
          >
        </div>
      </div>
    </v-card-text>
    <v-card-actions class="tw-px-4 tw-flex tw-justify-end">
      <v-btn
        color="primary"
        small
        rounded
        depressed
        text
        class="callus-btn"
        href="tel:19001542"
        >19001542 <i class="icofont-live-support tw-text-xl tw-ml-1"></i
      ></v-btn>
    </v-card-actions>
    <input id="hiddencpx1ss" :value="reservationCode" type="text" />
  </v-card>
</template>
<script>
import SearchApi from '@/services/SearchApi'
import CheckoutApi from '@/services/CheckoutApi'
export default {
  name: 'ReservationBox',
  data() {
    return {
      process: [
        'mdi-credit-card-multiple-outline',
        'mdi-email-open-multiple-outline',
        'mdi-email-multiple-outline'
      ],
      status: ['mdi-check-circle-outline'],
      reserLoading: false,
      isReservated: false,
      timer: null,
      reservationCode: 'ZX02902920'
    }
  },
  computed: {
    checkoutInfo() {
      return this.$store.getters['checkout/getCheckoutInfo']
    }
  },
  destroyed() {
    clearTimeout(this.timer)
  },
  methods: {
    close() {
      this.$emit('close')
      this.reserLoading = false
      this.$router.push({ path: 'auth/my-booking' })
    },
    async confirmReservation() {
      try {
        this.reserLoading = true
        let result = null
        result = await CheckoutApi.Reservation(this.checkoutInfo)
        if ('errors' in result) {
          await SearchApi.GetSectionId(
            this.$store.getters['search/getSearchCondition']
          )
          result = await CheckoutApi.Reservation(this.checkoutInfo)
          this.reservationCode = result.reservation_code
          this.reserLoading = false
          this.isReservated = true
        } else {
          this.reservationCode = result.reservation_code
          this.reserLoading = false
          this.isReservated = true
        }
      } catch (error) {}
    },
    copyTicket() {
      clearTimeout(this.timer)
      const copyText = document.getElementById('hiddencpx1ss')
      copyText.value = this.reservationCode
      copyText.select()
      copyText.setSelectionRange(0, 99999)
      document.execCommand('copy')
    }
  }
}
</script>
<style lang="postcss">
.process-loading {
  bottom: 0;
  right: 0;
  z-index: 2;
  @apply tw-absolute;
}
.keep-box {
  @apply tw-p-8 !important;
}
.keep-body {
  @apply tw-flex tw-flex-col tw-justify-center tw-items-stretch !important;
}
.keep-status {
  @apply tw-flex tw-flex-col tw-items-center tw-justify-center tw-mb-8 !important;
}
.keep-row {
  @apply tw-my-2;
}
.process-icon {
  font-size: 4rem !important;
  @apply tw-text-gray-600 !important;
}
.status-icon {
  font-size: 1.25rem !important;
  bottom: 0;
  right: 0;
  @apply tw-absolute tw-bg-white !important;
}
.status-text {
  @apply tw-text-xl;
}
.action-btn {
  @apply tw-flex-grow;
}
.callus-btn {
  @apply tw-bg-gray-300 tw-font-normal tw-normal-case;
}
.action-reser {
  @apply tw-flex tw-flex-col tw-justify-center tw-items-stretch;
}
#hiddencpx1ss {
  display: inline-block;
  height: 1px;
  background: transparent;
  color: transparent;
  @apply tw-absolute;
}
</style>
