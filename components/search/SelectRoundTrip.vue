<template>
  <v-card flat class="tw-rounded-none"
    ><v-card-subtitle class="tw-text-gray-400 tw-font-bold">
      Please select trip type
    </v-card-subtitle>
    <v-card-text class="px-4">
      <v-radio-group v-model="roundTrip" @change="changeRoundTrip">
        <div
          v-for="(trip, n) in tripType"
          :key="n"
          class="tw-flex tw-flex-col tw-justify-start tw-my-2"
        >
          <v-radio :value="trip.value" hide-details class="tw-m-0"
            ><template v-slot:label>
              <div class="tw-flex tw-flex-col tw-justify-start">
                <strong class="tw-text-gray-800 tw-text-sm tw-m-0 tw-p-0">
                  {{ trip.text }}</strong
                >
              </div>
            </template></v-radio
          >
          <span class="tw-text-gray-600 tw-text-xs tw-m-0 tw-p-0"
            >{{ trip.description
            }}<v-icon color="primary" small class="tw-ml-2">{{
              trip.icon
            }}</v-icon></span
          >
        </div>
      </v-radio-group>
    </v-card-text>
  </v-card>
</template>
<script>
import { tripType } from '@/localdb/tripType'
export default {
  name: 'SelectRountrip',
  data() {
    return {
      roundTrip: 'ONEWAY',
      tripType
    }
  },
  methods: {
    changeRoundTrip() {
      this.$emit('input', this.roundTrip)
    }
  }
}
</script>
