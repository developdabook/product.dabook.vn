<template>
  <div class="sticky-mobile-search">
    <v-expansion-panels
      v-model="drawer.panelActive"
      flat
      tile
      class="tw-rounded-none"
    >
      <v-expansion-panel flat>
        <v-expansion-panel-header class="tw-p-4">
          <template v-slot:default>
            <div
              class="mobile-search-info"
              :class="{ 'tw-pb-2 tw-border-b': drawer.panelActive === 0 }"
            >
              <div class="location-item">
                <strong>{{ searchCondition.departure }}</strong>
                <span>{{
                  `${searchCondition.from.airportCode} - ${searchCondition.from.city}`
                }}</span>
              </div>
              <v-icon>{{
                searchCondition.isRoundTrip
                  ? 'mdi-swap-horizontal'
                  : 'mdi-transfer-right'
              }}</v-icon>
              <div class="location-item">
                <strong>{{
                  searchCondition.isRoundTrip
                    ? searchCondition.arrived
                    : searchCondition.departure
                }}</strong>
                <span>{{
                  `${searchCondition.to.airportCode} - ${searchCondition.to.city}`
                }}</span>
              </div>
            </div>
          </template>
          <template v-slot:actions>
            <v-btn
              absolute
              fab
              bottom
              x-small
              right
              color="primary"
              class="tw-z-2"
              ><v-icon small class=" tw-text-white">{{
                drawer.panelActive === 0
                  ? 'mdi-unfold-less-horizontal'
                  : 'mdi-unfold-more-horizontal'
              }}</v-icon>
            </v-btn>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="tw-relative">
          <div class="mobile-search">
            <section class="section-card">
              <v-card flat class="mobile-search-box">
                <v-card-text class="pb-0">
                  <div class="tw-relative">
                    <v-text-field
                      :value="fromSum"
                      label="From"
                      color="primary"
                      prepend-inner-icon="mdi-airplane-takeoff"
                      class="dotted-border my-4"
                      hide-details
                      name="searchFrom"
                      readonly
                      placeholder="Please select departure airport"
                      @click="
                        selectCondition('from')
                        drawer.isMaxHeight = true
                      "
                    ></v-text-field>
                    <v-btn
                      color="primary"
                      dark
                      small
                      absolute
                      bottom
                      depressed
                      fab
                      class="tw-right-0"
                      @click="swapLocation"
                    >
                      <v-icon>mdi-swap-vertical</v-icon>
                    </v-btn>
                  </div>
                  <v-text-field
                    :value="toSum"
                    label="To"
                    prepend-inner-icon="mdi-airplane-landing"
                    hide-details
                    class="my-4"
                    readonly
                    name="searchTo"
                    placeholder="Please select arrived/return airport"
                    @click="
                      selectCondition('to')
                      drawer.isMaxHeight = true
                    "
                  ></v-text-field>
                  <div class="tw-relative">
                    <v-text-field
                      :value="departureSum"
                      label="Departure"
                      prepend-inner-icon="mdi-calendar-import"
                      hide-details
                      class="my-4"
                      readonly
                      placeholder="DD-MM-YYY"
                      name="searchDeparture"
                      @click="
                        selectCondition('departure')
                        drawer.isMaxHeight = true
                      "
                    ></v-text-field>
                    <div class="is-roundtrip">
                      <label
                        for="roundtrip"
                        class="tw-flex tw-flex-col tw-justify-end tw-items-end"
                        >Is Roundtrip?
                        <v-switch
                          v-model="searchCondition.isRoundTrip"
                          hide-details
                        ></v-switch
                      ></label>
                    </div>
                  </div>
                  <v-expand-transition>
                    <v-text-field
                      v-show="searchCondition.isRoundTrip"
                      :value="arrivedSum"
                      label="Arrived"
                      prepend-inner-icon="mdi-calendar-export"
                      hide-details
                      readonly
                      class="my-4"
                      placeholder="DD-MM-YYY"
                      name="searchArrived"
                      @click="
                        selectCondition('arrived')
                        drawer.isMaxHeight = true
                      "
                    ></v-text-field>
                  </v-expand-transition>
                  <v-text-field
                    :value="passegnerSum"
                    label="Passenger"
                    prepend-inner-icon="mdi-account-multiple-check-outline"
                    hide-details
                    class="my-4"
                    readonly
                    name="searchPassenger"
                    @click="
                      selectCondition('passenger')
                      drawer.isMaxHeight = false
                    "
                  ></v-text-field>
                  <v-text-field
                    :value="cabinClassSum"
                    label="CabinClass"
                    prepend-inner-icon="mdi-seat-passenger"
                    hide-details
                    readonly
                    class="mt-4"
                    name="searchCabinClass"
                    @click="
                      selectCondition('cabinClass')
                      drawer.isMaxHeight = false
                    "
                  ></v-text-field>
                </v-card-text>
                <v-card-actions class="pt-12 tw-px-4">
                  <v-btn
                    color="primary"
                    rounded
                    depressed
                    large
                    class="tw-w-full"
                    @click="searchFlight"
                    >Search</v-btn
                  >
                </v-card-actions>
                <v-card-text class="tw-text-center tw-text-xs tw-pt-0">
                  <span class="tw-text-gray-400 tw-m-1"
                    ><v-icon color="#E2E8F0" small>mdi-check-decagram</v-icon>
                    Alway best price</span
                  >
                  <span class="tw-text-gray-400 tw-m-1"
                    ><v-icon color="#E2E8F0" small
                      >mdi-shield-check-outline</v-icon
                    >
                    Trust by DaiMinh</span
                  >
                </v-card-text>
              </v-card>
            </section>
            <section class="section-draw">
              <v-bottom-sheet v-model="drawer.isDraw">
                <v-sheet height="80vh">
                  <SelectLocation
                    v-if="drawer.from"
                    v-model="searchCondition.from"
                    :exception-local="searchCondition.to"
                    @close="drawer.isDraw = false"
                  />
                  <SelectLocation
                    v-if="drawer.to"
                    v-model="searchCondition.to"
                    :exception-local="searchCondition.from"
                    @close="drawer.isDraw = false"
                  />
                  <SelectTime
                    v-if="drawer.departure"
                    v-model="searchCondition.departure"
                    :min-date="new Date()"
                    @change="validateArrivedTime"
                    @close="drawer.isDraw = false"
                  />
                  <SelectTime
                    v-if="drawer.arrived"
                    v-model="searchCondition.arrived"
                    :min-date="
                      new Date($moment(searchCondition.departure, 'DD-MM-YYYY'))
                    "
                    @close="drawer.isDraw = false"
                  />
                  <SelectPassenger
                    v-if="drawer.passenger"
                    v-model="searchCondition.passenger"
                    @close="drawer.isDraw = false"
                  />
                  <SelectCabinClass
                    v-if="drawer.cabinClass"
                    v-model="searchCondition.cabinClass"
                    @close="drawer.isDraw = false"
                  />
                </v-sheet>
              </v-bottom-sheet>
            </section>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
import { clone } from 'lodash'
import utils from '@/utils/utils'
export default {
  name: 'StickyMobileSearch',
  components: {
    SelectLocation: () =>
      import(/* webpackPrefetch: true */ '@/components/search/SelectLocation'),
    SelectTime: () =>
      import(/* webpackPrefetch: true */ '@/components/search/SelectTime'),
    SelectPassenger: () =>
      import(/* webpackPrefetch: true */ '@/components/search/SelectPassenger'),
    SelectCabinClass: () =>
      import(/* webpackPrefetch: true */ '@/components/search/SelectCabinClass')
  },
  props: {
    currentSearch: {
      type: [Array, Object],
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      drawer: {
        from: false,
        to: false,
        departure: false,
        arrived: false,
        passenger: false,
        cabinClass: false,
        isDraw: false,
        isMaxHeight: false,
        panelActive: 1
      },
      searchCondition: this.$store.getters['search/getSearchCondition'] || {
        from: {},
        to: {},
        departure: this.$moment()
          .add(1, 'day')
          .format('DD-MM-YYYY'),
        arrived: this.$moment()
          .add(4, 'day')
          .format('DD-MM-YYYY'),
        passenger: {
          ADULT: 0,
          CHILD: 0,
          INFANT: 0
        },
        cabinClass: ['ECONOMY'],
        isRoundTrip: false
      }
    }
  },
  computed: {
    isDraw() {
      return (
        this.drawer.from ||
        this.drawer.to ||
        this.drawer.departure ||
        this.drawer.arrived ||
        this.drawer.passenger ||
        this.drawer.cabinClass
      )
    },
    passegnerSum() {
      return this.$t('comp_passenger_sum', [
        this.searchCondition.passenger.ADULT,
        this.searchCondition.passenger.CHILD,
        this.searchCondition.passenger.INFANT
      ])
    },
    cabinClassSum() {
      return this.searchCondition.cabinClass.reduce((lastSum, newVal) => {
        return lastSum + newVal + ' | '
      }, '')
    },
    departureSum() {
      return this.searchCondition.departure
    },
    arrivedSum() {
      return this.searchCondition.arrived
    },
    fromSum() {
      return typeof this.searchCondition.from.airportCode === 'undefined'
        ? ''
        : `[${this.searchCondition.from.airportCode}] ${this.searchCondition.from.airportName}`
    },
    toSum() {
      return typeof this.searchCondition.to.airportCode === 'undefined'
        ? ''
        : `[${this.searchCondition.to.airportCode}] ${this.searchCondition.to.airportName}`
    }
  },
  methods: {
    selectCondition(target) {
      this.drawer = {
        from: false,
        to: false,
        departure: false,
        arrived: false,
        passenger: false,
        cabinClass: false,
        isDraw: false
      }
      this.drawer[target] = true
      this.drawer.isDraw = true
    },
    searchFlight() {
      this.$store.dispatch('checkout/resetData')
      this.$store.dispatch('search/resetDate')
      this.validateDefault()
      const section = utils.uuid()
      this.$store.dispatch('search/updateSearchCondition', this.searchCondition)
      this.$store.dispatch('search/updateSearchSection', section)
      this.$store.dispatch(
        'checkout/updateCheckoutSectionId',
        this.searchCondition
      )
      this.$router.push({
        path: 'search',
        query: {
          section,
          itinerary: '1',
          origin: this.searchCondition.from.airportCode,
          destination: this.searchCondition.to.airportCode,
          date: this.searchCondition.departure,
          date1: this.searchCondition.isRoundTrip
            ? this.searchCondition.arrived
            : '',
          adults: this.searchCondition.passenger.ADULT,
          children: this.searchCondition.passenger.CHILD,
          infants: this.searchCondition.passenger.INFANT
        }
      })
    },
    validateDefault() {
      if (
        this.searchCondition.from.airportCode === '' ||
        this.searchCondition.from.airportCode === null ||
        typeof this.searchCondition.from.airportCode === 'undefined'
      ) {
        this.searchCondition.from =
          this.searchCondition.to.airportCode === 'SGN'
            ? {
                airportCode: 'HAN',
                airportName: 'Noi Bai International Airport',
                city: 'HaNoi'
              }
            : {
                airportCode: 'SGN',
                airportName: 'Tan Son Nhat International Airport',
                city: 'HoChiMinh'
              }
      }
      if (
        this.searchCondition.to.airportCode === '' ||
        this.searchCondition.to.airportCode === null ||
        typeof this.searchCondition.to.airportCode === 'undefined'
      ) {
        this.searchCondition.to =
          this.searchCondition.from.airportCode === 'SGN'
            ? {
                airportCode: 'HAN',
                airportName: 'Noi Bai International Airport',
                city: 'HaNoi'
              }
            : {
                airportCode: 'SGN',
                airportName: 'Tan Son Nhat International Airport',
                city: 'HoChiMinh'
              }
      }
    },
    validateArrivedTime() {
      if (
        this.$moment(this.searchCondition.departure, 'DD-MM-YYYY').isAfter(
          this.$moment(this.searchCondition.arrived, 'DD-MM-YYYY')
        )
      ) {
        this.searchCondition.arrived = this.$moment(
          this.searchCondition.departure,
          'DD-MM-YYYY'
        )
          .add(4, 'day')
          .format('DD-MM-YYYY')
      }
    },
    swapLocation() {
      const temp = clone(this.searchCondition.from)
      this.searchCondition.from = clone(this.searchCondition.to)
      this.searchCondition.to = clone(temp)
    }
  }
}
</script>
<style lang="postcss">
.sticky-mobile-search {
  @apply tw-flex tw-flex-row;
}
.mobile-search-info {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-center;
}
.location-item {
  @apply tw-text-xs tw-flex tw-flex-col tw-text-gray-600;
}
.change-search-btn {
  @apply tw-text-blue-600 tw-bg-gray-300 tw-font-normal tw-normal-case !important;
}
.mobile-search-box {
  @apply tw-rounded-lg tw-p-2;
}
.mobile-search-box .v-label.theme--light {
  left: -30px !important;
  transform: translateY(-18px) scale(0.75) !important;
  @apply tw-text-gray-600;
}
.mobile-search-box .v-text-field__slot input {
  @apply text-gray-700 tw-font-bold tw-pl-4 tw-text-sm;
}
.is-roundtrip {
  transform: translateY(10%);
  z-index: 2;
  @apply tw-absolute tw-right-0 tw-bottom-0 tw-text-left;
}
.is-roundtrip .v-input--switch {
  @apply tw-m-0 tw-p-0;
}
.is-roundtrip label {
  @apply tw-text-gray-600 tw-text-xs;
}
.is-roundtrip .v-input--switch__track {
  /* opacity: 1; */
}
.is-roundtrip .v-input--switch__track.theme--light {
  @apply tw-text-gray-600;
}
.is-roundtrip .v-input--switch__track.theme--light.primary--text {
  /* @apply tw-text-blue-200 !important; */
}
.mobile-search-box .v-text-field > .v-input__control > .v-input__slot:before {
  @apply tw-border-gray-600;
}
.mobile-search-box .v-input .v-icon {
  @apply tw-text-blue-600;
}
.dotted-border .v-input__slot:before {
  @apply tw-border-dotted !important;
}

.passenger-select-box {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-center tw-w-full tw-my-4;
}
.passenger-info {
  @apply tw-flex tw-flex-col tw-justify-center tw-items-center;
}
.mobile-search .v-navigation-drawer {
  @apply tw-rounded-t-lg tw-overflow-hidden;
}
@screen md {
  .mobile-search .v-navigation-drawer {
    @apply tw-rounded-none tw-overflow-hidden;
  }
}
</style>
