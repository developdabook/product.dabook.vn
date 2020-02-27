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
      :min="priceProps.min"
      :max="priceProps.max"
      name="price"
      hide-details
      @change="changePrice"
    >
    </v-range-slider>
  </div>
</template>
<script>
export default {
  name: 'FilterPrice',
  props: {
    priceProps: {
      type: [Object, Array],
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      price: [0, this.priceProps.max / 2]
    }
  },
  methods: {
    changePrice() {
      this.$emit('input', this.price)
    }
  }
}
</script>
