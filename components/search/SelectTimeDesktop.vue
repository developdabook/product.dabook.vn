<template>
  <v-card flat class="tw-rounded-none"
    ><v-card-subtitle class="tw-text-gray-400 tw-font-bold">
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
            :columns="2"
            :rows="1"
            :attributes="attrs"
            :select-attribute="attrs[0]"
            @input="changeDate"
            mode="single"
            class="tw-border tw-border-gray-200 tw-rounded-sm"
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
            class: 'tw-bg-blue-600',
            contentClass: 'tw-text-white tw-text-xs'
          },
          popover: {
            label: 'Nhanh chân lên Còn rất ít chuyến bay khuyến mãi'
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
      this.$emit('change')
    }
  }
}
</script>
