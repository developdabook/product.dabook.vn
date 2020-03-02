<template>
  <div>
    <v-card outlined class="t-item">
      <v-expansion-panels v-model="expand" accordion flat>
        <v-expansion-panel>
          <v-expansion-panel-header disable-icon-rotate class="tw-p-0">
            <v-card-subtitle class="titem-title-box">
              <strong class="titem-title">{{ ticket.ticket.type }}</strong>
              <span class="titem-time">{{
                ticket.ticket.formatStartDate
              }}</span>
              <v-chip
                v-if="expand !== 0"
                label
                x-small
                color="blue lighten-5"
                text-color="blue darken-2"
                class="tw-border tw-border-dashed"
                >{{
                  `${ticket.ticket.segments[0].airline}-${ticket.ticket.segments[0].flight_number}`
                }}</v-chip
              >
            </v-card-subtitle>
            <template v-slot:actions>
              <v-icon small>{{
                expand !== 0
                  ? 'mdi-unfold-more-horizontal'
                  : 'mdi-unfold-less-horizontal'
              }}</v-icon>
            </template>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-card-text class="titem-body">
              <div class="titem-timeline">
                <v-icon class="tw-text-sm tw-text-gray-800"
                  >mdi-calendar-check</v-icon
                >
                <span class="tw-flex-grow titem-timeline-center">
                  <v-icon class="tw-text-sm rotate-180  tw-text-gray-800"
                    >mdi-airplane</v-icon
                  >
                </span>
                <v-icon class="tw-text-sm tw-text-gray-800"
                  >mdi-pan-down</v-icon
                >
              </div>
              <div class="titem-content">
                <div class="titem-content-time">
                  <strong class="titem-title-time">{{
                    `${ticket.ticket.start_time}  ${ticket.ticket.formatStartDate}`
                  }}</strong>
                  <v-chip
                    x-small
                    color="blue lighten-5"
                    text-color="blue darken-2"
                    label
                    >{{ ticket.fare.description }}</v-chip
                  >
                </div>
                <div class="titem-ticket-info">
                  <div>
                    <div>
                      <span class="titem-info-time">{{
                        ticket.ticket.start_time
                      }}</span
                      ><span class="titem-info-loca">{{
                        `${ticket.ticket.formatStartPoint.airportCode} -${ticket.ticket.formatStartPoint.city} `
                      }}</span>
                    </div>
                    <div>
                      <span class="titem-info-time">{{
                        ticket.ticket.end_time
                      }}</span
                      ><span class="titem-info-loca">{{
                        `${ticket.ticket.formatEndPoint.airportCode} -${ticket.ticket.formatEndPoint.city} `
                      }}</span>
                    </div>
                  </div>
                  <v-chip
                    label
                    small
                    text-color="blue darken-2"
                    class="tw-font-bold tw-bg-gray-100"
                    >{{
                      `${ticket.ticket.segments[0].airline}-${ticket.ticket.segments[0].flight_number}`
                    }}</v-chip
                  >
                  <v-tooltip top color="primary" z-index="999999">
                    <template v-slot:activator="{ on }">
                      <v-avatar height="24" width="24" tile v-on="on">
                        <img
                          :src="
                            `https://booking.kayak.com/rimg/provider-logos/airlines/v/${ticket.ticket.airline}.png?crop=false&width=92&height=92`
                          "
                        />
                      </v-avatar>
                    </template>
                    <span
                      >{{ ticket.ticket.formatIATA.name }}
                      <v-icon color="#FFF" small
                        >mdi-information-outline</v-icon
                      >
                    </span>
                  </v-tooltip>
                  <v-btn
                    text
                    icon
                    color="primary"
                    fab
                    small
                    @click="segmentExpand = true"
                  >
                    <v-icon small>{{
                      segmentExpand
                        ? 'mdi-unfold-less-horizontal'
                        : 'mdi-unfold-more-horizontal'
                    }}</v-icon>
                  </v-btn>
                </div>
              </div>
            </v-card-text>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-card>
    <section class="section-segment">
      <v-dialog v-model="segmentExpand" scrollable max-width="50vh">
        <v-card>
          <v-card-text class="tw-px-2 md:tw-px-4">
            <v-timeline dense class="tw-my-4 flight-timeline">
              <v-timeline-item small icon="mdi-bag-carry-on-check">
                <v-alert
                  color="info"
                  dense
                  text
                  class="tw-text-xs tw-border-dashed"
                >
                  <strong>
                    Chuyến bay khởi hành lúc
                    {{
                      `${ticket.ticket.start_time} , ${ticket.ticket.formatStartDate}`
                    }}</strong
                  >
                  Vui lòng di chuyển tới sân bay và làm thủ tục 3 tiếng trước
                  khi bay
                </v-alert>
              </v-timeline-item>
              <v-timeline-item
                v-for="(seg, i) in ticket.ticket.segments"
                :key="i + 'Segment'"
                small
                color="blue-grey lighten-5"
              >
                <template v-slot:icon>
                  <v-tooltip top color="primary" z-index="999999">
                    <template v-slot:activator="{ on }">
                      <v-avatar height="20" width="20" v-on="on">
                        <img
                          :src="
                            `https://booking.kayak.com/rimg/provider-logos/airlines/v/${seg.airline}.png?crop=false&width=92&height=92`
                          "
                        />
                      </v-avatar>
                    </template>
                    <span
                      >{{ ticket.ticket.formatIATA.name }}
                      <v-icon color="#FFF" small
                        >mdi-information-outline</v-icon
                      ></span
                    >
                  </v-tooltip>
                </template>
                <v-card class="my-4 py-4 tw-shadow" color="#FFF">
                  <FlightSegment
                    :segment="seg"
                    :total-time="ticket.ticket.formatTotalTime"
                  />
                </v-card>
              </v-timeline-item>
              <v-timeline-item small icon="mdi-bag-checked">
                <v-alert
                  color="info"
                  dense
                  text
                  class="tw-text-xs tw-border-dashed"
                  ><strong
                    >Hành trình kết thúc lúc
                    {{ ticket.ticket.end_time }}</strong
                  >
                  Cảm ơn quý khách đã sử dụng dịch vụ của Đại Minh
                </v-alert>
              </v-timeline-item>
            </v-timeline>
          </v-card-text>
        </v-card>
      </v-dialog>
    </section>
  </div>
</template>
<script>
export default {
  name: 'SumTicketInfo',
  components: {
    FlightSegment: () =>
      import(/* webpackPrefetch: true */ '@/components/select/FlightSegment')
  },
  props: {
    ticket: {
      type: [Array, Object],
      default() {
        return {
          fare: {},
          ticket: {}
        }
      }
    }
  },
  data() {
    return {
      expand: false,
      segmentExpand: false
    }
  }
}
</script>
<style lang="postcss">
.t-item {
  @apply tw-border-dashed tw-bg-gray-100 !important;
}
.t-item .v-expansion-panel-content__wrap {
  @apply tw-px-0 !important;
}
.titem-body {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-stretch;
}
.titem-title-box {
  @apply tw-flex tw-flex-row tw-justify-start tw-items-center;
}
.titem-content {
  @apply tw-flex-grow;
}
.titem-ticket-info {
  @apply tw-border tw-border-dashed tw-rounded tw-p-2 tw-text-xs tw-bg-gray-100 tw-flex tw-justify-between tw-items-center;
}
.titem-info-time {
  @apply tw-font-bold tw-mr-2 tw-text-gray-800;
}
.titem-title {
  @apply tw-flex tw-flex-row tw-text-gray-900 tw-justify-between tw-items-end tw-mr-2 tw-p-0;
}
.titem-content-time {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-end tw-mb-1;
}
.titem-title-time {
  @apply tw-text-sm tw-font-bold tw-text-gray-900;
}
.titem-time {
  @apply tw-text-xs tw-mr-2;
}
.titem-timeline {
  @apply tw-flex tw-flex-col tw-justify-between tw-items-center tw-px-2 tw-py-1;
}
.titem-timeline-center {
  width: 1px;
  min-height: 3rem;
  @apply tw-bg-gray-400 tw-inline-block tw-flex tw-justify-center tw-items-center;
}
</style>
