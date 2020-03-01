<template>
  <div class="filter-airline-component">
    <div
      v-for="(item, i) in airlinesProps"
      :key="i + 'item'"
      class="tw-flex tw-flex-col tw-justify-start"
    >
      <v-checkbox
        v-model="airlineSelected"
        :value="item.iata_code"
        hide-details
        @change="selectAirline"
      >
        <template v-slot:label>
          <div class="tw-flex tw-flex-row tw-justify-start">
            <strong class="tw-text-gray-900 tw-text-sm tw-m-0 tw-p-0">
              {{ item.name }}</strong
            >
          </div>
        </template>
      </v-checkbox>

      <span class="tw-text-gray-600 tw-text-xs tw-m-0 tw-p-0"
        >[{{ item.iata_code }}] {{ item.name }}
      </span>
    </div>
  </div>
</template>
<script>
import airlines from '@/localdb/airlines'
export default {
  name: 'FilterAirline',
  props: {
    airlinesProps: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      airlines: airlines.slice(1, 10),
      airlineSelected: []
    }
  },
  methods: {
    selectAirline() {
      try {
        this.$store.dispatch('search/updateFilter', {
          target: 'airlines',
          value: this.airlineSelected,
          isEmpty: this.airlineSelected.length === 0
        })
        this.$emit('input', this.airlineSelected)
      } catch (error) {}
    },
    clearSelected() {
      try {
        this.airlineSelected = []
      } catch (error) {}
    }
  }
}
</script>
