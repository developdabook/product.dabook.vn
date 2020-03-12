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
      :label="$t(label)"
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
    >
      <template v-slot:item="{ item }">
        <span class="tw-text-xs tw-font-bold">{{ $t(item.text) }}</span>
      </template>
      <template v-slot:selection="{ item }">
        <span class="tw-text-xs tw-font-bold">{{ $t(item.text) }}</span>
      </template>
    </v-select>
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
    },
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      validation: {
        dayRules: [
          (v) => !!v || !this.validate || this.$t('field_valid_day_required'),
          (v) =>
            /^(([0]?[1-9])|([1-2][0-9])|(3[01]))$/.test(v) ||
            !this.validate ||
            this.$t('field_valid_day_valid')
        ],
        monthRules: [
          (v) => !!v || !this.validate || this.$t('field_valid_month')
        ],
        yearRules: [
          (v) => !!v || !this.validate || this.$t('field_valid_year_required'),
          (v) =>
            /^(19|20)\d{2}$/.test(v) ||
            !this.validate ||
            this.$t('field_valid_year_valid')
        ],
        valid: false
      },
      date: {
        day: '',
        month: '',
        year: ''
      },
      months: [
        { value: '01', text: 'mon_jan' },
        { value: '02', text: 'mon_feb' },
        { value: '03', text: 'mon_mar' },
        { value: '04', text: 'mon_apr' },
        { value: '05', text: 'mon_may' },
        { value: '06', text: 'mon_jun' },
        { value: '07', text: 'mon_jul' },
        { value: '08', text: 'mon_aug' },
        { value: '09', text: 'mon_sep' },
        { value: '10', text: 'mon_oct' },
        { value: '11', text: 'mon_nov' },
        { value: '12', text: 'mon_dec' }
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
