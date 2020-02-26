<template>
  <v-form
    ref="dateinput"
    v-model="validation.valid"
    lazy-validation
    class="tw-flex tw-flex-row"
    @input="validFire"
  >
    <v-text-field
      v-model="date.day"
      :rules="validation.dayRules"
      label="Date"
      placeholder="DD"
      outlined
      color="primary"
      dense
      class="tw-w-1/3 input-sm  tw-rounded-r-none"
      @change="changeDate"
    ></v-text-field>
    <v-select
      v-model="date.month"
      :items="months"
      :rules="validation.monthRules"
      label="Month"
      placeholder="Month"
      item-text="text"
      item-value="value"
      outlined
      single-line
      dense
      class="tw-w-1/3 input-sm tw-rounded-none border-x-none"
      @change="changeDate"
    ></v-select>
    <v-text-field
      v-model="date.year"
      :rules="validation.yearRules"
      label="Year"
      placeholder="YYYY"
      outlined
      single-line
      color="primary"
      dense
      class="tw-w-1/3 input-sm tw-rounded-l-none"
      @change="changeDate"
    ></v-text-field>
  </v-form>
</template>
<script>
export default {
  name: 'DateInput',
  props: {
    validate: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      validation: {
        dayRules: [
          (v) => !!v || !this.validate || 'Day is required',
          (v) =>
            /^(([0]?[1-9])|([1-2][0-9])|(3[01]))$/.test(v) ||
            !this.validate ||
            'Day must be valid'
        ],
        monthRules: [(v) => !!v || !this.validate || 'Month is required'],
        yearRules: [
          (v) => !!v || !this.validate || 'Year is required',
          (v) =>
            /^(19|20)\d{2}$/.test(v) || !this.validate || 'Year must be valid'
        ],
        valid: false
      },
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
    },
    validFire() {
      this.$emit('validate', this.validation.valid)
    },
    checkValidate() {
      this.$refs.dateinput.validate()
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
