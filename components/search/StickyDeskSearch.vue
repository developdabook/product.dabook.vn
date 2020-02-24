<template>
  <v-card flat class="sticky-component">
    <div class="tw-container tw-mx-auto sticky-search-box">
      <div class="tw-flex tw-flex-row tw-justify-start tw-mb-2">
        <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              small
              rounded
              text
              color="primarytext"
              class="tw-normal-case"
              >{{ roundtripSum }} <v-icon small>mdi-chevron-down</v-icon></v-btn
            >
          </template>
          <SelectRoundTrip v-model="searchCondition.isRoundTrip" />
        </v-menu>
        <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              small
              rounded
              text
              color="primarytext"
              class="tw-normal-case"
              ><v-icon small>mdi-account-multiple</v-icon>{{ passengerSum
              }}<v-icon small>mdi-chevron-down</v-icon></v-btn
            >
          </template>
          <SelectPassenger v-model="searchCondition.passenger" />
        </v-menu>
        <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              v-on="on"
              small
              rounded
              text
              color="primarytext"
              class="tw-normal-case"
              >{{ cabinClassSum }}<v-icon small>mdi-chevron-down</v-icon></v-btn
            >
          </template>
          <SelectCabinClass v-model="searchCondition.cabinClass" />
        </v-menu>
      </div>
      <div class="desktop-search-box">
        <div class="search-box tw-relative">
          <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                :value="fromSum"
                label="From"
                placeholder="HAN- Ha Noi"
                outlined
                dense
                readonly
                hide-details
                class="input-sm tw-rounded-r-none tw-mr-2"
              >
              </v-text-field>
            </template>
            <v-card class="tw-h-128 tw-bg-white tw-max-30">
              <SelectLocation
                v-model="searchCondition.from"
                :exceptionLocal="searchCondition.to"
              />
            </v-card>
          </v-menu>
          <v-btn
            @click="swapLocation"
            color="primary"
            dark
            x-small
            absolute
            depressed
            fab
          >
            <v-icon>mdi-swap-horizontal</v-icon>
          </v-btn>
          <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                :value="toSum"
                label="To"
                placeholder="HAN- Ha Noi"
                outlined
                dense
                readonly
                hide-details
                class="input-sm tw-rounded-l-none tw-ml-2"
              ></v-text-field>
            </template>
            <v-card class="tw-h-128 tw-bg-white tw-max-30">
              <SelectLocation
                v-model="searchCondition.to"
                :exceptionLocal="searchCondition.from"
              />
            </v-card>
          </v-menu>
        </div>
        <div class="search-box">
          <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                :value="departureSum"
                label="Departure"
                placeholder="20 August 2020"
                outlined
                dense
                readonly
                hide-details
                class="input-sm tw-rounded-r-none"
              ></v-text-field>
            </template>
            <SelectTimeDesktop
              v-model="searchCondition.departure"
              :minDate="new Date()"
            />
          </v-menu>
          <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                :value="arrivedSum"
                label="Arrived"
                placeholder="22 August 2020"
                outlined
                dense
                readonly
                hide-details
                class="input-sm tw-rounded-l-none"
              ></v-text-field>
            </template>
            <SelectTimeDesktop
              v-model="searchCondition.arrived"
              :minDate="
                new Date($moment(searchCondition.departure, 'DD-MM-YYYY'))
              "
            />
          </v-menu>
        </div>
        <v-btn rounded depressed class="change-search-btn">Change</v-btn>
      </div>
    </div>
  </v-card>
</template>
<script>
export default {
  name: 'StickyDesktopSearch',
  components: {
    SelectPassenger: () => import('@/components/search/SelectPassenger'),
    SelectCabinClass: () => import('@/components/search/SelectCabinClass'),
    SelectRoundTrip: () => import('@/components/search/SelectRoundTrip'),
    SelectTimeDesktop: () => import('@/components/search/SelectTimeDesktop'),
    SelectLocation: () => import('@/components/search/SelectLocation')
  },
  data() {
    return {
      searchCondition: this.$store.getters['search/getSearchCondition'] || {
        from: {},
        to: {},
        departure: this.$moment().format('DD-MM-YYYY'),
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
    passengerSum() {
      const total =
        this.searchCondition.passenger.ADULT +
        +this.searchCondition.passenger.CHILD +
        +this.searchCondition.passenger.INFANT
      if (total === 0) {
        return 'Passenger'
      }
      return total + ' Person'
    },
    cabinClassSum() {
      if (this.searchCondition.cabinClass.length === 1) {
        return 'Economy'
      } else if (this.searchCondition.cabinClass.length > 1) {
        return 'Economy +'
      }
      return 'Cabin'
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
        : `[${
            this.searchCondition.from.airportCode
          }] ${this.searchCondition.from.airportName.substring(0, 20)}...`
    },
    toSum() {
      return typeof this.searchCondition.to.airportCode === 'undefined'
        ? ''
        : `[${
            this.searchCondition.to.airportCode
          }] ${this.searchCondition.to.airportName.substring(0, 20)}...`
    },
    roundtripSum() {
      if (this.searchCondition.isRoundTrip) {
        return 'Roundtrip'
      }
      return 'Oneway'
    }
  },
  methods: {
    swapLocation() {}
  }
}
</script>
<style lang="postcss">
.sticky-component {
  border-style: solid;
  @apply tw-rounded-none tw-border-t tw-border-gray-100 !important;
}
.sticky-search-box {
  @apply tw-w-full tw-flex tw-flex-col tw-justify-between tw-items-start tw-px-0 tw-py-6;
}
.change-search-btn {
  @apply tw-text-blue-600 tw-bg-gray-300 tw-font-normal tw-normal-case tw-px-6 !important;
}
.search-box {
  @apply tw-flex tw-flex-row tw-justify-center tw-items-center tw-flex-grow tw-mr-16;
}
.desktop-search-box {
  @apply tw-flex tw-flex-row tw-justify-between tw-flex-grow tw-w-full;
}
.tw-h-128 {
  height: 32rem;
}
.tw-max-30 {
  max-width: 30rem;
  width: 30rem;
}
</style>
