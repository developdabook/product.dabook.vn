<template>
  <v-card flat class="tw-rounded-none"
    ><v-card-subtitle class="tw-bg-blue-600 tw-text-white">
      Please select cabin class
    </v-card-subtitle>
    <v-card-text>
      <client-only>
        <vc-date-picker
          v-model="selectedDate"
          :is-inline="true"
          :is-expanded="true"
          :columns="1"
          :rows="12"
          :attributes="attrs"
          @input="changeDate"
          mode="single"
          class="tw-border-0"
        />
      </client-only>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'SelectTime',
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
      console.log(this.$moment(this.selectedDate).format('DD-MM-YYYY'))
      this.$emit('input', this.$moment(this.selectedDate).format('DD-MM-YYYY'))
    }
  }
}
</script>
