<template>
  <v-card>
    <v-card-title> </v-card-title>
    <v-card-text class="keep-box">
      <div class="keep-body">
        <div class="keep-status">
          <span class="tw-relative keep-row">
            <i class="icofont-interface process-icon"></i>
            <i class="icofont-check-circled status-icon"></i>
          </span>
          <strong class="status-text">Payment Success</strong>
        </div>
        <div>
          <p class="tw-text-center">
            Cảm ơn bạn đã sử dụng dịch vụ của Đại Minh.<br />
            Chúng tôi đã nhận được thông tin giữ chỗ của bạn, Chúng tôi sẽ xác
            nhận và gọi lại cho bạn theo số điện thoại bạn cung cấp Vui lòng giữ
            máy và nhận cuộc gọi sau 30'.
          </p>
        </div>
        <v-btn color="primary" class="normal-btn keep-row action-btn"
          ><i class="icofont-ticket icofont-2x tw-mr-2"></i>Lấy mã giữ
          chỗ</v-btn
        >
        <v-btn
          @click="close"
          color="primary"
          class="normal-btn keep-row action-btn"
          text
          >Back to homepage</v-btn
        >
      </div>
    </v-card-text>
    <v-card-actions> </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'KeepTicket',
  data() {
    return {
      process: [
        'mdi-credit-card-multiple-outline',
        'mdi-email-open-multiple-outline',
        'mdi-email-multiple-outline'
      ],
      status: ['mdi-check-circle-outline']
    }
  },
  methods: {
    close() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="postcss">
.keep-box {
  @apply tw-p-8 !important;
}
.keep-body {
  @apply tw-flex tw-flex-col tw-justify-center tw-items-stretch;
}
.keep-status {
  @apply tw-flex tw-flex-col tw-items-center tw-justify-center tw-mb-8;
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
  @apply tw-text-green-600 tw-absolute tw-bg-white !important;
}
.status-text {
  @apply tw-text-xl;
}
.action-btn {
  @apply tw-flex-grow;
}
</style>
