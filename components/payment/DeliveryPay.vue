<template>
  <v-form v-model="validation.valid" class="delivery-payment" lazy-validation>
    <p class="tw-m-0 tw-mb-8">
      Vui lòng điền địa chỉ giao hàng, Chúng tôi sẽ giao vé cho bạn<br />
    </p>
    <v-text-field
      v-model="delivery.name"
      :rules="validation.nameRules"
      label="Người nhận"
      placeholder="ex. Tran"
      outlined
      color="primary"
      dense
      class="input-sm"
    ></v-text-field>
    <v-text-field
      v-model="delivery.phone"
      :rules="validation.phoneRules"
      label="Số điện thoại"
      placeholder="+84 936376420"
      outlined
      color="primary"
      dense
      class="input-sm"
    ></v-text-field>
    <v-text-field
      v-model="delivery.address"
      :rules="validation.addressRules"
      label="Địa chỉ"
      placeholder="Lot 113, Me Tri, Nam Tu Liem, Ha Noi"
      outlined
      color="primary"
      dense
      class="input-sm"
    ></v-text-field>
    <v-textarea outlined label="Yêu cầu khác" placeholder="..."> </v-textarea>
    <v-alert text dense type="info" class="tw-text-xs tw-mt-4">
      Đại Minh giới hạn giao hàng trong nội thành Hà Nội. Trường hợp quý khách ở
      ngoại thành và các tỉnh khác, vui lòng chọn phương thức thanh toán khác.
      <br />Lưu ý
      <ul class="normal-list">
        <li>
          Vui lòng điền chính xác thông tin giao hàng
        </li>
        <li>
          Thời gian giao hàng từ 8 đến 17h hằng ngày ( trừ thứ 7 và chủ nhật)
        </li>
        <li>
          Thông tin chi tiết, vui lòng tham khảo
          <a href="/help/payment">Hướng dẫn thanh toán</a>
        </li>
      </ul>
    </v-alert>
  </v-form>
</template>
<script>
export default {
  name: 'DeliveryPay',
  data() {
    return {
      delivery: {
        name: '',
        phone: '',
        address: ''
      },
      validation: {
        addressRules: [(v) => !!v || 'Address is required'],
        nameRules: [(v) => !!v || 'Name is required'],
        phoneRules: [
          (v) => !!v || 'Phone number required',
          (value) => {
            const pattern = /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{1,6}$/im
            return pattern.test(value) || 'Invalid phone number.'
          }
        ],
        valid: false
      }
    }
  }
}
</script>
<style lang="postcss">
.delivery-payment {
  @apply tw-text-xs;
}
</style>
