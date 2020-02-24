<template>
  <div class="tw-flex tw-flex-row">
    <v-text-field
      v-model="date.day"
      @change="changeDate"
      label="Date"
      placeholder="DD"
      outlined
      color="primary"
      dense
      class="tw-w-1/3 input-sm  tw-rounded-r-none"
    ></v-text-field>
    <v-select
      :items="months"
      v-model="date.month"
      @change="changeDate"
      label="Month"
      placeholder="Month"
      item-text="text"
      item-value="value"
      outlined
      single-line
      dense
      class="tw-w-1/3 input-sm tw-rounded-none border-x-none"
    ></v-select>
    <v-text-field
      v-model="date.year"
      @change="changeDate"
      label="Year"
      placeholder="YYYY"
      outlined
      single-line
      color="primary"
      dense
      class="tw-w-1/3 input-sm tw-rounded-l-none"
    ></v-text-field>
  </div>
</template>
<script>
export default {
  name: 'DateInput',
  data() {
    return {
      date: {
        day: '',
        month: '',
        year: ''
      },
      months: [
        { value: '01', text: 'January' },
        { value: '02', text: 'February' },
        { value: '03', text: 'March' },
        { value: '04', text: 'April' },
        { value: '05', text: 'May' },
        { value: '06', text: 'June' },
        { value: '07', text: 'July' },
        { value: '08', text: 'August' },
        { value: '09', text: 'September' },
        { value: '10', text: 'October' },
        { value: '11', text: 'November' },
        { value: '12', text: 'December' }
      ]
    }
  },
  computed: {
    calDate() {
      return `${this.date.day}-${this.date.month}-${this.date.year}`
    }
  },
  methods: {
    changeDate() {
      this.$emit('input', this.calDate)
    }
  }
}
</script>
<style lang="postcss">
.border-x-none.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  border-left: none;
  border-right: none;
}
</style>
