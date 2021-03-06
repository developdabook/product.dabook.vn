<template>
  <div class="flight-detail">
    <v-tabs v-model="tab" show-arrows>
      <v-tab class="tab-title">{{ $t('ticket_tab_01') }}</v-tab>
      <v-tab class="tab-title">{{ $t('ticket_tab_02') }}</v-tab>
      <v-tab class="tab-title">{{ $t('ticket_tab_03') }}</v-tab>
      <v-tab-item>
        <v-subheader>
          {{ $t('ticket_label_depa')
          }}<span class="fly-animate-depart"
            ><v-icon class="rotate-90 tw-ml-1 tw-text-sm"
              >mdi-airplane</v-icon
            ></span
          >
        </v-subheader>
        <v-divider></v-divider>
        <v-timeline dense class="tw-my-4 flight-timeline">
          <v-timeline-item small icon="mdi-bag-carry-on-check">
            <v-alert
              color="info"
              dense
              text
              class="tw-text-xs tw-border-dashed"
            >
              <div
                v-html="
                  $t('label_pair_depart_startflight_noti', [
                    ticket.DEPARTURE.start_time,
                    ticket.DEPARTURE.formatStartDate
                  ])
                "
              ></div>
            </v-alert>
          </v-timeline-item>
          <v-timeline-item
            v-for="(seg, i) in ticket.DEPARTURE.segments"
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
                  >{{ ticket.DEPARTURE.formatIATA.name }}
                  <v-icon color="#FFF" small
                    >mdi-information-outline</v-icon
                  ></span
                >
              </v-tooltip>
            </template>
            <v-card class="my-4 py-4 tw-shadow" color="#FFF">
              <FlightSegment
                :segment="seg"
                :total-time="ticket.DEPARTURE.formatTotalTime"
              />
            </v-card>
          </v-timeline-item>
          <v-timeline-item small icon="mdi-bag-checked">
            <v-alert
              color="info"
              dense
              text
              class="tw-text-xs tw-border-dashed"
            >
              <div
                v-html="
                  $t('label_pair_depart_endflight_noti', [
                    ticket.DEPARTURE.end_time
                  ])
                "
              ></div>
            </v-alert>
          </v-timeline-item>
        </v-timeline>
        <v-subheader>
          {{ $t('ticket_label_ret')
          }}<span class="fly-animate-return"
            ><v-icon class="rotate-270 tw-ml-1 tw-text-sm"
              >mdi-airplane</v-icon
            ></span
          >
        </v-subheader>
        <v-divider></v-divider>
        <v-timeline dense class="tw-my-4 flight-timeline">
          <v-timeline-item small icon="mdi-bag-carry-on-check">
            <v-alert
              color="info"
              dense
              text
              class="tw-text-xs tw-border-dashed"
            >
              <div
                v-html="
                  $t('label_pair_return_startflight_noti', [
                    ticket.RETURN.start_time,
                    ticket.RETURN.formatStartDate
                  ])
                "
              ></div>
            </v-alert>
          </v-timeline-item>
          <v-timeline-item
            v-for="(seg, i) in ticket.RETURN.segments"
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
                  >{{ ticket.RETURN.formatIATA.name }}
                  <v-icon color="#FFF" small
                    >mdi-information-outline</v-icon
                  ></span
                >
              </v-tooltip>
            </template>
            <v-card class="my-4 py-4 tw-shadow" color="#FFF">
              <FlightSegment
                :segment="seg"
                :total-time="ticket.RETURN.formatTotalTime"
              />
            </v-card>
          </v-timeline-item>
          <v-timeline-item small icon="mdi-bag-checked">
            <v-alert color="info" dense text class="tw-text-xs tw-border-dashed"
              ><div
                v-html="
                  $t('label_pair_return_endflight_noti', [
                    ticket.RETURN.end_time
                  ])
                "
              ></div>
            </v-alert>
          </v-timeline-item>
        </v-timeline>
      </v-tab-item>
      <v-tab-item>
        <v-card flat class="tw-my-4">
          <v-card-text>
            <v-radio-group
              v-model="fareOptionSelected"
              column
              :value-comparator="fareCompare"
            >
              <v-expansion-panels flat>
                <v-expansion-panel
                  v-for="(fare, i) in ticket.DEPARTURE.fare_options"
                  :key="i"
                  :class="{ active: fareOptionSelected === fare }"
                  class="price-item"
                >
                  <v-expansion-panel-header hide-actions>
                    <template v-slot:default>
                      <v-radio :value="fare" hide-details color="info">
                        <template v-slot:label>
                          <div class="price-item-header">
                            <div class="tw-flex tw-flex-row tw-justify-start">
                              <strong class="class-info">
                                {{ fare.class }} class</strong
                              ><strong class="teal--text tw-text-sm">{{
                                new Intl.NumberFormat('vi-VN', {
                                  style: 'currency',
                                  currency: 'VND'
                                }).format(fare.fare)
                              }}</strong>
                            </div>
                            <span class="seat-info"
                              >{{ fare.seats_available }}
                              {{ $t('ticket_detail_seatava') }}</span
                            >
                          </div>
                        </template>
                      </v-radio>
                    </template>
                  </v-expansion-panel-header>
                  <v-expansion-panel-content class="price-item-body">
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-radio-group>
          </v-card-text>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card flat class="tw-my-4">
          <v-card-text class="tw-pt-4">
            <div class="tab-condition">
              {{ $t('ticket_condition') }}
              <ul>
                <li v-html="$t('ticket_condition_li_01')"></li>
                <li>
                  {{ $t('ticket_condition_li_02') }}
                </li>
              </ul>
            </div>
            <ContactBanner class="tw-shadow-none" /> </v-card-text
        ></v-card>
      </v-tab-item>
    </v-tabs>
    <div class="detail-action">
      <div class="tw-mr-4">
        <strong class="price-select teal--text">
          <PriceValidation :price="totalFare" />
        </strong>
      </div>
      <v-btn
        depressed
        small
        color="primary"
        class="detail-action-btn"
        @click="selectFareOption"
        >{{ $t('btn_select_option') }}</v-btn
      >
      <v-btn
        depressed
        small
        text
        color="primary"
        class="detail-action-btn"
        @click="close"
        >{{ $t('btn_close') }}</v-btn
      >
    </div>
  </div>
</template>
<script>
import { clone } from 'lodash'
import GeneralApi from '@/services/GeneralApi'
export default {
  name: 'PairTicketDetail',
  components: {
    FlightSegment: () =>
      import(/* webpackPrefetch: true */ '@/components/select/FlightSegment'),
    ContactBanner: () =>
      import(/* webpackPrefetch: true */ '@/components/search/ContactBanner'),
    PriceValidation: () =>
      import(
        /* webpackPrefetch: true */ '@/components/generals/PriceValidation'
      )
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
      fareOptionSelected: this.ticket.DEPARTURE.formatMinFare
    }
  },
  computed: {
    totalFare() {
      return this.fareOptionSelected.fare
    }
  },
  watch: {
    ticket(newVal) {
      try {
        this.fareOptionSelected = clone(newVal.DEPARTURE.formatMinFare)
      } catch (error) {}
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
    },
    selectFareOption() {
      this.$emit('change', this.fareOptionSelected)
      this.$emit('close')
    },
    close() {
      this.$emit('close')
    },
    fareCompare(a, b) {
      return a.class === b.class
    }
  }
}
</script>
<style lang="postcss">
.flight-detail {
  @apply tw-text-sm tw-p-4 !important;
}
.tab-title {
  @apply tw-text-gray-800 tw-font-normal tw-normal-case !important;
}
.flight-timeline:before {
  left: calc(12px - 1px) !important;
  width: 1px !important;
}
.flight-timeline .v-timeline-item.theme--light .v-timeline-item__body {
  max-width: calc(100% - 12px) !important;
}
.flight-timeline .v-timeline-item.theme--light .v-timeline-item__divider {
  min-width: 24px !important;
}
.fare-option-body {
  @apply tw-flex tw-flex-col tw-justify-start tw-my-2;
}
.class-info {
  @apply tw-text-gray-800 tw-text-sm tw-m-0 tw-p-0 tw-mr-2;
}
.seat-info {
  @apply tw-text-gray-600 tw-text-xs tw-m-0 tw-p-0 tw-ml-1;
}
.tab-condition {
  @apply tw-text-gray-800 tw-text-xs;
}
.tab-condition ul {
  list-style: initial !important;
}
.rotate-90 {
  transform: rotate(90deg);
}
.rotate-270 {
  transform: rotate(270deg);
}
.fly-animate-return {
  animation-name: flyaniretrun;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}
.fly-animate-depart {
  animation-name: flyanidepat;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}
.detail-action {
  width: 100%;
  @apply tw-fixed tw-bottom-0 tw-right-0 tw-flex tw-justify-end tw-items-start tw-py-2 tw-mr-4 tw-bg-white tw-border-t;
}
.detail-action-btn {
  @apply tw-font-normal tw-normal-case;
}
.price-select {
  @apply tw-text-sm tw-font-bold tw-flex-grow tw-text-right tw-m-0 tw-p-0;
}
.price-select {
  @apply tw-text-sm tw-font-bold tw-flex-grow tw-text-right tw-m-0 tw-p-0;
}
.price-item {
  @apply tw-border-2 tw-border-gray-300 tw-my-2;
}
.price-item:hover {
  @apply tw-border-2 tw-border-gray-600;
}
.price-item.active {
  @apply tw-border-2 tw-border-teal-600 !important;
}
.price-item-header {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-center tw-text-gray-800 tw-w-full tw-text-sm;
}
.price-item-name {
  @apply tw-text-xs;
}
.price-item-icon {
  @apply tw-text-gray-800 tw-mr-2 !important;
}
.price-item-fee {
  @apply tw-text-gray-800;
}
.price-item-body {
  @apply tw-text-sm;
}
.price-btn {
  @apply tw-rounded-none tw-font-normal tw-normal-case tw-shadow;
}
.price-btn:hover {
  @apply tw-shadow-lg;
}
@keyframes flyaniretrun {
  from {
    transform: translateX(50px);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
@keyframes flyanidepat {
  from {
    transform: translateX(0);
    opacity: 0;
  }
  to {
    transform: translateX(50px);
    opacity: 1;
  }
}
@screen md {
  .flight-timeline:before {
    left: calc(24px - 1px) !important;
    width: 1px !important;
  }
  .flight-timeline .v-timeline-item.theme--light .v-timeline-item__body {
    max-width: calc(100% - 24px) !important;
  }
  .flight-timeline .v-timeline-item.theme--light .v-timeline-item__divider {
    min-width: 48px !important;
  }
}
</style>
