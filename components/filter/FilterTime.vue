<template>
  <div class="filter-time">
    <span class="tw-text-xs tw-text-gray-600">
      {{ $moment(time[0], 'HH').format('HH:mm') }}
      -
      {{ $moment(time[1], 'HH').format('HH:mm') }}
    </span>
    <v-range-slider
      v-model="time"
      min="0"
      name="time"
      max="24"
      hide-details
      @change="changeTime"
    >
    </v-range-slider>
  </div>
</template>
<script>
export default {
  name: 'FilterTime',
  props: {
    timeTarget: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      time: [0, 12]
    }
  },
  methods: {
    changeTime() {
      this.$store.dispatch('search/updateFilter', {
        target: this.timeTarget,
        value: this.time,
        isEmpty: this.time[1] === 0
      })
      this.$emit('input', this.time)
    }
  }
}
</script>
