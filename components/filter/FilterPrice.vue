<template>
  <div class="filter-price">
    <span class="tw-text-xs tw-text-gray-600">
      {{
        new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(price[0])
      }}
      -
      {{
        new Intl.NumberFormat('vi-VN', {
          style: 'currency',
          currency: 'VND'
        }).format(price[1])
      }}
    </span>
    <v-range-slider
      v-model="price"
      @change="changePrice"
      min="0"
      max="50000000"
      name="price"
      hide-details
    >
    </v-range-slider>
  </div>
</template>
<script>
export default {
  name: 'FilterPrice',
  data() {
    return {
      price: [0, 20000000]
    }
  },
  methods: {
    changePrice() {
      this.$emit('input', this.price)
    }
  }
}
</script>
