<template>
  <div class="tw-bg-transparent">
    <div class="round-date">{{ segment.StartDate }}</div>
    <div class="round-airline">
      <div class="newtk-timeline">
        <v-icon class="tw-text-xs tw-text-gray-600"
          >mdi-dots-vertical-circle</v-icon
        >
        <span class="tw-flex-grow newtk-timeline-center">
          <v-icon class="tw-text-sm rotate-180 tw-text-gray-600"
            >mdi-airplane</v-icon
          >
        </span>
        <v-icon class="tw-text-xs tw-text-gray-600"
          >mdi-dots-vertical-circle</v-icon
        >
      </div>
      <div class="detail-airline">
        <div
          class="tw-text-sm tw-text-gray-700 tw-m-0 tw-mb-4  tw-flex tw-flex-col tw-justify-start"
        >
          <div>
            <strong class="tw-mr-2">{{ segment.StartTime }}</strong>

            <v-skeleton-loader
              ref="skeleton"
              v-if="airPort.fromLoading"
              type="text"
              class="tw-inline-block"
            ></v-skeleton-loader
            ><strong v-else class="tw-mr-2">{{ airPort.from.name }}</strong>
          </div>
          <v-skeleton-loader
            ref="skeleton"
            v-if="airPort.fromLoading"
            type="text"
            class="tw-inline-block"
          ></v-skeleton-loader>
          <span v-else class="tw-text-xs tw-text-gray-600">{{
            airPort.from.location
          }}</span>
        </div>
        <div class=" tw-mb-4">
          <v-tooltip top color="primary" z-index="999999">
            <template v-slot:activator="{ on }">
              <v-chip
                v-on="on"
                text-color="blue-grey darken-4"
                color="blue-grey lighten-5"
                small
                class="font-weight-bold"
              >
                {{ totalTime }}
              </v-chip>
            </template>
            <span
              >Thời gian bay {{ totalTime }}
              <v-icon color="#FFF" small>mdi-information-outline</v-icon></span
            >
          </v-tooltip>
          <v-tooltip top color="primary" z-index="999999">
            <template v-slot:activator="{ on }">
              <v-chip
                v-on="on"
                small
                color="blue lighten-4"
                text-color="primary"
                class="font-weight-bold"
              >
                <v-icon class="tw-mr-1" small>mdi-airplane</v-icon>
                {{ segment.Airline + '_' + segment.FlightNumber }}
              </v-chip>
            </template>
            <span
              >Số hiệu chuyến bay
              {{ segment.Airline + '_' + segment.FlightNumber }}
              <v-icon color="#FFF" small>mdi-information-outline</v-icon></span
            >
          </v-tooltip>
        </div>
        <div
          class="tw-text-sm tw-text-gray-700 tw-flex tw-flex-col tw-justify-start"
        >
          <div>
            <strong class="tw-mr-2">{{ segment.EndTime }}</strong
            ><v-skeleton-loader
              ref="skeleton"
              v-if="airPort.toLoading"
              type="text"
              class="tw-inline-block"
            ></v-skeleton-loader
            ><strong v-else class="tw-mr-2">{{ airPort.to.name }}</strong>
          </div>
          <v-skeleton-loader
            ref="skeleton"
            v-if="airPort.toLoading"
            type="text"
            class="tw-inline-block"
          ></v-skeleton-loader>
          <span v-else class="tw-text-xs tw-text-gray-600">{{
            airPort.to.location
          }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import GeneralApi from '@/services/GeneralApi'
export default {
  name: 'FlightSegment',
  props: {
    segment: {
      type: Object,
      required: true
    },
    totalTime: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      airPort: {
        from: '',
        to: '',
        fromLoading: false,
        toLoading: false
      }
    }
  },
  mounted() {
    this.getAirPort()
  },
  methods: {
    getAirPort() {
      this.airPort.fromLoading = true
      this.airPort.toLoading = true
      GeneralApi.GetAirPortByCode(this.segment.StartAirport).then((result) => {
        this.airPort.from = result
        this.airPort.fromLoading = false
      })
      GeneralApi.GetAirPortByCode(this.segment.EndAirport).then((result) => {
        this.airPort.to = result
        this.airPort.toLoading = false
      })
    }
  }
}
</script>
<style lang="postcss">
.rotate-45 {
  transform: rotate(135deg) !important;
}
</style>
