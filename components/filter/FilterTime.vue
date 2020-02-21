<template>
  <div class="filter-time">
    <span class="tw-text-xs tw-text-gray-600">
      {{ $moment(time[0], 'HH').format('HH:mm') }}
      -
      {{ $moment(time[1], 'HH').format('HH:mm') }}
    </span>
    <v-range-slider v-model="time" min="0" name="time" max="24" hide-details>
    </v-range-slider>
  </div>
</template>
<script>
export default {
  name: 'FilterTime',
  data() {
    return {
      time: [0, 12]
    }
  },
  methods: {
    changePrice() {
      this.$emit('input', this.time)
    }
  }
}
</script>
