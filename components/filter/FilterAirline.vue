<template>
  <div class="filter-airline-component">
    <div
      v-for="(item, i) in airlines"
      :key="i + 'item'"
      class="tw-flex tw-flex-col tw-justify-start"
    >
      <v-checkbox
        v-model="airlineSelected"
        :value="item.iata_code"
        @change="selectAirline"
        hide-details
      >
        <template v-slot:label>
          <div class="tw-flex tw-flex-row tw-justify-start">
            <v-avatar class="tw-mr-2" size="20px">
              <img
                :src="
                  `https://booking.kayak.com/rimg/provider-logos/airlines/v/${item.iata_code}.png?crop=false&width=20&height=20`
                "
              />
            </v-avatar>
            <strong class="tw-text-gray-800 tw-text-sm tw-m-0 tw-p-0">
              {{ item.name }}</strong
            >
          </div>
        </template>
      </v-checkbox>

      <span class="tw-text-gray-600 tw-text-xs tw-m-0 tw-p-0"
        >[{{ item.iata_code }}]{{ item.name }}</span
      >
    </div>
  </div>
</template>
<script>
import airlines from '@/localdb/airlines'
export default {
  name: 'FilterAirline',
  data() {
    return {
      airlines: airlines.slice(0, 10),
      airlineSelected: []
    }
  },
  methods: {
    selectAirline() {
      this.$emit('input', this.airlineSelected)
    }
  }
}
</script>
