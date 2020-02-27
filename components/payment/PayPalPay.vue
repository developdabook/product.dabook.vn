<template>
  <div class="paypal-payment">
    <v-alert text dense type="info" class="tw-text-xs tw-mt-4">
      Nhấn Pay để tiếp tục
      <br />Lưu ý
      <ul class="normal-list">
        <li>
          Hệ thống sẽ chuyển yêu cầu thanh toán của bạn tới nhà cung cấp thanh
          toán
        </li>
        <li>
          Sau thanh toán, quá trình xuất vé sẽ diễn ra tự động. Quá trình có thể
          mất vài phút, quý khác vui lòng đợi và không tắt trình duyệt
        </li>
        <li>
          Sau khi thanh toán thành công, Hệ thống sẽ gửi vé qua email mà bạn đã
          đăng kí. Quý khách cũng có thể xem lại thông tin đặt chỗ qua tài khoản
          thành viên Dabook
        </li>
      </ul>
    </v-alert>
  </div>
</template>
<script>
export default {
  name: 'PayPalPay'
}
</script>
