<template>
  <div class="office-payment">
    <p class="tw-m-0">
      Quý khách vui lòng mang theo giấy tờ tùy thân đến văn phòng Đại Minh để
      nhận vé <br />
    </p>
    <ul class="normal-list">
      <li>
        Địa chỉ
        <strong>Lô TT3 Khu đô thị Mĩ Đình, Mễ Trì, Nam Từ Liêm, Hà Nội</strong>
      </li>
      <li>
        Số điện thoại
        <strong>19001542</strong>
      </li>
      <li>
        Mã giao dịch
        <v-chip color="blue lighten-5" small text-color="blue darken-1"
          >EXVN202901</v-chip
        >
      </li>
    </ul>
    <v-alert text dense type="info" class="tw-text-xs tw-mt-4">
      Quý khách lưu ý, khi đi mang theo giấy tờ tùy thân, email hoặc số điện
      thoại khi mua vé để đối chiếu
      <ul class="normal-list">
        <li>
          Phòng vé Đại Minh làm việc từ 8 ~ 17h từ thứ 2 đến thứ 6, 8 ~12h các
          ngày thứ 7 trong tuần
        </li>
        <li>
          Ngoài thời gian trên, để xuất vé vui lòng liên hệ 19001542
        </li>
      </ul>
    </v-alert>
  </div>
</template>
<script>
export default {
  name: 'OfficePay'
}
</script>
<style lang="postcss">
.office-payment {
  @apply tw-text-xs;
}
</style>
