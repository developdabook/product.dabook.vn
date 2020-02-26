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
                'icofont-compass tw-text-white': reserLoading,
                'icofont-check-circled tw-text-green-600': !reserLoading
              }"
              class="status-icon"
            ></i>
          </span>
          <strong class="status-text">{{
            reserLoading ? 'Reservating...' : 'Reservation Success'
          }}</strong>
        </div>
        <v-alert
          v-if="reserLoading"
          text
          dense
          type="warning"
          class="tw-text-xs"
        >
          Việc giữ chỗ sẽ mất vài phút Quý khách vui lòng không đóng trình duyệt
        </v-alert>
        <div
          v-else
          class="tw-flex tw-flex-col tw-justify-center tw-items-stretch"
        >
          <p class="tw-text-center">
            Cảm ơn bạn đã sử dụng dịch vụ của Đại Minh.<br />
            Chúng tôi đã nhận được thông tin giữ chỗ của bạn, Chúng tôi sẽ xác
            nhận và gọi lại cho bạn theo số điện thoại bạn cung cấp Vui lòng giữ
            máy và nhận cuộc gọi sau 30'.
          </p>
          <v-btn
            color="primary"
            class="normal-btn keep-row action-btn"
            @click="loadingTiket"
            ><i class="icofont-ticket icofont-2x tw-mr-2"></i>Lấy mã giữ
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
        >19001542</v-btn
      >
    </v-card-actions>
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
      reserLoading: false
    }
  },
  mounted() {},
  methods: {
    close() {
      this.$emit('close')
      this.reserLoading = false
    },
    loadingTiket() {
      this.reserLoading = true
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
</style>
