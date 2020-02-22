<template>
  <div class="price-valid-component">
    <span>{{ validPrice }}</span>
  </div>
</template>
<script>
export default {
  name: 'PriceValidation',
  props: {
    price: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    validPrice() {
      if (typeof this.price === 'undefined') {
        return '0'
      }
      return new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND'
      }).format(this.price)
    }
  }
}
</script>
