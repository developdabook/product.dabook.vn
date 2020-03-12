<template>
  <div class="tw-bg-transparent">
    <div class="round-date">
      {{ $d($moment(segment.start_date, 'DD-MM-YYYY'), 'longday') }}
    </div>
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
        <div class="segment-location">
          <div>
            <strong class="tw-mr-2">{{ segment.start_time }}</strong>

            <v-skeleton-loader
              v-if="airPort.fromLoading"
              ref="skeleton"
              type="text"
              class="tw-inline-block"
            ></v-skeleton-loader
            ><strong v-else class="tw-mr-2">{{ airPort.from.name }}</strong>
          </div>
          <v-skeleton-loader
            v-if="airPort.fromLoading"
            ref="skeleton"
            type="text"
            class="tw-inline-block"
          ></v-skeleton-loader>
          <span v-else class="tw-text-xs tw-text-gray-600">{{
            airPort.from.location
          }}</span>
        </div>
        <div class="segment-time">
          <v-tooltip top color="primary" z-index="999999">
            <template v-slot:activator="{ on }">
              <v-chip
                text-color="blue-grey darken-4"
                color="blue-grey lighten-5"
                small
                class="font-weight-bold"
                v-on="on"
              >
                {{ totalTime }}
              </v-chip>
            </template>
            <span
              >{{ $t('label_total_flight') }} {{ totalTime }}
              <v-icon color="#FFF" small>mdi-information-outline</v-icon></span
            >
          </v-tooltip>
          <v-tooltip top color="primary" z-index="999999">
            <template v-slot:activator="{ on }">
              <v-chip
                small
                color="blue-grey lighten-5"
                text-color="blue darken-1"
                class="font-weight-bold"
                v-on="on"
              >
                <v-icon class="tw-mr-1" small>mdi-airplane</v-icon>
                {{ segment.airline + '-' + segment.flight_number }}
              </v-chip>
            </template>
            <span
              >{{ $t('label_airline_code') }}
              {{ segment.airline + '-' + segment.flight_number }}
              <v-icon color="#FFF" small>mdi-information-outline</v-icon></span
            >
          </v-tooltip>
        </div>
        <div class="segment-location">
          <div>
            <strong class="tw-mr-2">{{ segment.end_time }}</strong
            ><v-skeleton-loader
              v-if="airPort.toLoading"
              ref="skeleton"
              type="text"
              class="tw-inline-block"
            ></v-skeleton-loader
            ><strong v-else class="tw-mr-2">{{ airPort.to.name }}</strong>
          </div>
          <v-skeleton-loader
            v-if="airPort.toLoading"
            ref="skeleton"
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
      GeneralApi.GetAirPortByCode(this.segment.start_airport).then((result) => {
        this.airPort.from = result
        this.airPort.fromLoading = false
      })
      GeneralApi.GetAirPortByCode(this.segment.end_airport).then((result) => {
        this.airPort.to = result
        this.airPort.toLoading = false
      })
    }
  }
}
</script>
<style lang="postcss">
.segment-location {
  @apply tw-text-sm tw-text-gray-700 tw-m-0 tw-mb-4  tw-flex tw-flex-col tw-justify-start;
}
.segment-time {
  @apply tw-mb-4 tw-p-2 tw-bg-gray-100 tw-rounded-sm tw-border tw-border-dashed tw-border-r-0;
}
.rotate-45 {
  transform: rotate(135deg) !important;
}
</style>
