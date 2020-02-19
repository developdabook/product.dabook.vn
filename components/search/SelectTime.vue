<template>
  <v-card flat class="tw-rounded-none"
    ><v-card-subtitle
      class="tw-bg-blue-600 tw-text-white tw-sticky tw-top-0 tw-z-10"
    >
      Please select time
    </v-card-subtitle>
    <v-card-text>
      <v-lazy>
        <client-only>
          <vc-date-picker
            v-model="selectedDate"
            :is-inline="true"
            :is-expanded="true"
            :min-date="minDate"
            :columns="1"
            :rows="12"
            :attributes="attrs"
            @input="changeDate"
            mode="single"
            class="tw-border-0"
          />
        </client-only>
      </v-lazy>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'SelectTime',
  props: {
    minDate: {
      type: [Object, Array, Date],
      default() {
        return new Date('01-01-1900')
      }
    }
  },
  data() {
    return {
      attrs: [
        {
          key: 'today',
          highlight: {
            backgroundColor: '#0064D2',
            fillMode: 'light'
          },
          dates: new Date()
        }
      ],
      selectedDate: ''
    }
  },
  methods: {
    changeDate() {
      this.$emit('input', this.$moment(this.selectedDate).format('DD-MM-YYYY'))
    }
  }
}
</script>
