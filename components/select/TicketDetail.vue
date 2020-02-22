<template>
  <div class="fligh-detail">
    <v-tabs v-model="tab" show-arrows>
      <v-tab>Flight</v-tab>
      <v-tab>Price</v-tab>
      <v-tab>Điều kiện</v-tab>
      <v-tab-item>
        <v-timeline dense class="tw-my-4 flight-timeline">
          <v-timeline-item
            v-for="(seg, i) in ticket.Segments"
            :key="i + 'Segment'"
            small
            color="blue-grey lighten-5"
          >
            <template v-slot:icon>
              <v-tooltip top color="primary" z-index="999999">
                <template v-slot:activator="{ on }">
                  <v-avatar v-on="on" height="20" width="20">
                    <img
                      :src="
                        `https://booking.kayak.com/rimg/provider-logos/airlines/v/${seg.Airline}.png?crop=false&width=92&height=92`
                      "
                    />
                  </v-avatar>
                </template>
                <span
                  >{{ ticket.formatIATA.name }}
                  <v-icon color="#FFF" small
                    >mdi-information-outline</v-icon
                  ></span
                >
              </v-tooltip>
            </template>
            <v-card class="my-4 py-4 tw-shadow" color="#FFF">
              <FlightSegment
                :segment="seg"
                :totalTime="ticket.formatTotalTime"
              />
            </v-card>
          </v-timeline-item>
        </v-timeline>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <v-radio-group
              v-model="selectFareOption"
              @change="$emit('change', selectFareOption)"
            >
              <v-radio
                v-for="(fare, i) in ticket.FareOptions"
                :key="i + 'flightDetail'"
                :value="fare"
                color="primary"
                class="tw-my-4"
              >
                <template v-slot:label>
                  <div>
                    <p class="ma-0 tw-text-base">
                      {{ fare.Description }} class
                      <strong class="info--text">{{
                        new Intl.NumberFormat('vi-VN', {
                          style: 'currency',
                          currency: 'VND'
                        }).format(fare.Totalfare)
                      }}</strong>
                    </p>
                    <span class="ma-0 success--text"
                      >{{ fare.SeatsAvailable }} seats available</span
                    >
                  </div>
                </template>
              </v-radio>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat>
          <v-card-text>
            <div class="tw-text-gray-800">
              Điều kiện ký gửi hành lý Hành lý xách tay không được hoàn hủy Hành
              lý được phép mang đi 15KG
            </div>
          </v-card-text></v-card
        >
      </v-tab-item>
    </v-tabs>
  </div>
</template>
<script>
import GeneralApi from '@/services/GeneralApi'
export default {
  name: 'FlightDetail',
  components: {
    FlightSegment: () => import('@/components/select/FlightSegment')
  },
  props: {
    ticket: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      tab: null,
      selectFareOption: this.ticket.FareOptions[0]
    }
  },
  methods: {
    getAirPort(payload) {
      GeneralApi.GetAirPort(payload).then((result) => {
        return result
      })
    },
    async getIATABrandName(payload) {
      const IATABrandName = await GeneralApi.GetIATABrandName(payload)
      return IATABrandName
    }
  }
}
</script>
<style lang="postcss">
.flight-detail {
  @apply tw-text-sm;
}
.flight-timeline:before {
  left: calc(24px - 1px) !important;
}
.flight-timeline .v-timeline-item.theme--light .v-timeline-item__body {
  max-width: calc(100% - 24px) !important;
}
.flight-timeline .v-timeline-item.theme--light .v-timeline-item__divider {
  min-width: 48px !important;
}
</style>
