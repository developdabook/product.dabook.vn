<template>
  <v-card flat class="tw-rounded-none"
    ><v-card-subtitle class="tw-text-gray-400 tw-font-bold">
      {{ $t('search_popup_time_title') }}
    </v-card-subtitle>
    <v-card-text>
      <v-lazy>
        <client-only>
          <vc-date-picker
            v-model="selectedDate"
            :locale="curentLang"
            :is-inline="true"
            :is-expanded="true"
            :min-date="minDate"
            :columns="1"
            :rows="12"
            :attributes="attrs"
            :select-attribute="attrs[0]"
            mode="single"
            class="tw-border-0"
            @input="changeDate"
          />
        </client-only>
      </v-lazy>
    </v-card-text>
  </v-card>
</template>
<script>
import lang from '@/mixins/lang'
export default {
  name: 'SelectTime',
  mixins: [lang],
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
            contentClass: 'tw-text-white tw-text-xs',
            backgroundColor: 'red'
          },
          popover: {
            label: this.$t('search_popup_time_tooltip')
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
      this.$emit('close')
    }
  }
}
</script>
