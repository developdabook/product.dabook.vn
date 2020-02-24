<template>
  <v-card outlined class="t-item">
    <v-expansion-panels v-model="expand" accordion flat>
      <v-expansion-panel>
        <v-expansion-panel-header disable-icon-rotate class="tw-p-0">
          <v-card-subtitle class="titem-title-box">
            <strong class="titem-title">Chiều đi</strong>
            <span class="titem-time">20, Thur, 09-2020</span>
            <v-chip
              v-if="expand !== 0"
              label
              x-small
              color="blue lighten-5"
              text-color="blue darken-2"
              class="tw-border tw-border-dashed"
              >VN-235</v-chip
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
              <v-icon class="tw-text-sm tw-text-gray-800">mdi-pan-down</v-icon>
            </div>
            <div class="titem-content">
              <div class="titem-content-time">
                <strong class="titem-title-time">20:30 Thur,29/2</strong>
                <v-chip small color="blue lighten-5" text-color="blue darken-2"
                  >Economy</v-chip
                >
              </div>
              <div class="titem-ticket-info">
                <div>
                  <div>
                    <span class="titem-info-time">20h30</span
                    ><span class="titem-info-loca">HAN- Ha Noi</span>
                  </div>
                  <div>
                    <span class="titem-info-time">20h30</span
                    ><span class="titem-info-loca">SGN- Ho Chi Minh</span>
                  </div>
                </div>
                <v-chip
                  label
                  small
                  text-color="blue darken-2"
                  class="tw-font-bold tw-bg-gray-100"
                  >VN-235</v-chip
                >
                <v-tooltip top color="primary" z-index="999999">
                  <template v-slot:activator="{ on }">
                    <v-avatar v-on="on" height="24" width="24" tile>
                      <img
                        :src="
                          `https://booking.kayak.com/rimg/provider-logos/airlines/v/VN.png?crop=false&width=92&height=92`
                        "
                      />
                    </v-avatar>
                  </template>
                  <span
                    >Vietnam Airline
                    <v-icon color="#FFF" small>mdi-information-outline</v-icon>
                  </span>
                </v-tooltip>
              </div>
            </div>
          </v-card-text>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>
<script>
export default {
  name: 'SumTicketInfo',
  data() {
    return {
      expand: false
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
