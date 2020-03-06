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
              ? 'Reservating...'
              : isReservated
              ? 'Reservation Success'
              : 'Wait for action'
          }}</strong>
        </div>
        <div v-if="!isReservated" class="action-reser">
          <v-alert text dense type="warning" class="tw-text-xs">
            Việc giữ chỗ sẽ mất vài phút. Quý khách vui lòng không đóng trình
            duyệt trong quá trình hệ thống xử lý <br />
            Vui lòng nhấn
            <strong class="primary--text">"Xác nhận và giữ chỗ"</strong> để tiếp
            tục.
          </v-alert>
          <v-btn
            color="primary"
            class="normal-btn keep-row action-btn"
            :loading="reserLoading"
            :disabled="reserLoading"
            @click="confirmReservation"
            ><i class="icofont-ticket icofont-2x tw-mr-2"></i>Xác nhận và giữ
            chỗ</v-btn
          >
          <v-btn
            color="primary"
            class="normal-btn keep-row action-btn"
            text
            @click="close"
            >Back to homepage</v-btn
          >
        </div>
        <div v-else class="action-reser">
          <v-alert text dense type="success" class="tw-text-xs">
            Cảm ơn bạn đã sử dụng dịch vụ của Đại Minh.<br />
            Chúng tôi đã nhận được thông tin giữ chỗ của bạn, Chúng tôi sẽ xác
            nhận và gọi lại cho bạn theo số điện thoại bạn cung cấp Vui lòng giữ
            máy và nhận cuộc gọi sau 30'.
          </v-alert>
          <v-btn
            color="primary"
            class="normal-btn keep-row action-btn"
            @click="copyTicket"
            ><v-icon class="tw-text-xl tw-mr-2">mdi-content-copy</v-icon
            >{{ airTicket }}</v-btn
          >
          <v-btn
            color="primary"
            class="normal-btn keep-row action-btn"
            text
            @click="close"
            >Back to homepage</v-btn
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
    <input id="hiddencpx1ss" :value="airTicket" type="text" />
  </v-card>
</template>
<script>
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
      airTicket: 'ZX02902920'
    }
  },
  created() {},
  destroyed() {
    clearTimeout(this.timer)
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('close')
      this.reserLoading = false
    },
    async confirmReservation() {
      this.reserLoading = true
      const that = this
      this.timmer = await setTimeout(function() {
        that.reserLoading = false
        that.isReservated = true
      }, 6000)
    },
    copyTicket() {
      clearTimeout(this.timer)
      this.airTicket = 'VNA-20384029'
      const copyText = document.getElementById('hiddencpx1ss')
      copyText.value = this.airTicket
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
