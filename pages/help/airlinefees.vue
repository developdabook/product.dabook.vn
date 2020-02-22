<template>
  <div class="airlinefees-page">
    <div class="tw-container tw-mx-auto">
      <v-card>
        <v-card-text>
          <v-header>Phí của hãng hàng không </v-header>

          <v-subheader
            >Giá trên Dabook luôn bao gồm khoản ước tính của toàn bộ thuế và phí
            bắt buộc, nhưng một số hãng hàng không / đại lý sẽ áp dụng phụ phí
            cho hành lý, bảo hiểm, sử dụng thẻ tín dụng hoặc các dịch vụ khác.
            Bạn có thể tìm thông tin chi tiết về phí của mỗi hãng hàng không bên
            dưới:
          </v-subheader>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'AirlineFeesPage',
  layout: 'unauthen'
}
</script>
<style lang="postcss">
.airlinefees-page {
  @apply tw-bg-gray-300 tw-h-full tw-w-full !important;
}
</style>
