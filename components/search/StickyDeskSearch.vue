<template>
  <v-card flat class="sticky-component">
    <div class="tw-container tw-mx-auto sticky-search-box">
      <div class="tw-flex tw-flex-row tw-justify-start tw-mb-2">
        <v-menu
          :close-on-content-click="false"
          color="white"
          :nudge-width="200"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
              small
              rounded
              text
              color="primarytext"
              class="tw-normal-case"
              v-on="on"
              >{{ roundtripSum }} <v-icon small>mdi-chevron-down</v-icon></v-btn
            >
          </template>
          <SelectRoundTrip v-model="searchCondition.isRoundTrip" />
        </v-menu>
        <v-menu
          :close-on-content-click="false"
          color="white"
          :nudge-width="200"
          offset-y
        >
          <template v-slot:activator="{ on }">
            <v-btn
              small
              rounded
              text
              color="primarytext"
              class="tw-normal-case"
              v-on="on"
              ><v-icon small>mdi-account-multiple</v-icon>{{ passengerSum
              }}<v-icon small>mdi-chevron-down</v-icon></v-btn
            >
          </template>
          <SelectPassenger
            v-model="searchCondition.passenger"
            :footer="false"
            class="tw-bg-white"
          />
        </v-menu>
        <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
          <template v-slot:activator="{ on }">
            <v-btn
              small
              rounded
              text
              color="primarytext"
              class="tw-normal-case"
              v-on="on"
              >{{ cabinClassSum }}<v-icon small>mdi-chevron-down</v-icon></v-btn
            >
          </template>
          <SelectCabinClass
            v-model="searchCondition.cabinClass"
            :footer="false"
            class="tw-bg-white"
          />
        </v-menu>
      </div>
      <div class="desktop-search-box">
        <div class="search-box tw-relative">
          <v-menu
            v-model="drawer.from"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="fromSum"
                label="From"
                placeholder="HAN- Ha Noi"
                outlined
                dense
                readonly
                hide-details
                class="input-sm tw-rounded-r-none tw-mr-2"
                v-on="on"
              >
              </v-text-field>
            </template>
            <v-card class="tw-h-128 tw-bg-white tw-max-30">
              <SelectLocation
                v-model="searchCondition.from"
                :exception-local="searchCondition.to"
                @close="drawer.from = false"
              />
            </v-card>
          </v-menu>
          <v-btn
            color="primary"
            dark
            x-small
            absolute
            depressed
            fab
            @click="swapLocation"
          >
            <v-icon>mdi-swap-horizontal</v-icon>
          </v-btn>
          <v-menu
            v-model="drawer.to"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="toSum"
                label="To"
                placeholder="HAN- Ha Noi"
                outlined
                dense
                readonly
                hide-details
                class="input-sm tw-rounded-l-none tw-ml-2"
                v-on="on"
              ></v-text-field>
            </template>
            <v-card class="tw-h-128 tw-bg-white tw-max-30">
              <SelectLocation
                v-model="searchCondition.to"
                :exception-local="searchCondition.from"
                @close="drawer.to = false"
              />
            </v-card>
          </v-menu>
        </div>
        <div class="search-box">
          <v-menu
            v-model="drawer.departure"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="departureSum"
                label="Departure"
                placeholder="20 August 2020"
                outlined
                dense
                readonly
                hide-details
                class="input-sm tw-rounded-r-none"
                v-on="on"
              ></v-text-field>
            </template>
            <SelectTimeDesktop
              v-model="searchCondition.departure"
              :min-date="new Date()"
              @change="validateArrivedTime"
              @close="drawer.departure = false"
            />
          </v-menu>
          <v-menu
            v-model="drawer.arrived"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field
                :value="arrivedSum"
                label="Arrived"
                placeholder="22 August 2020"
                outlined
                dense
                readonly
                hide-details
                class="input-sm tw-rounded-l-none"
                v-on="on"
              ></v-text-field>
            </template>
            <SelectTimeDesktop
              v-model="searchCondition.arrived"
              :min-date="
                new Date($moment(searchCondition.departure, 'DD-MM-YYYY'))
              "
              @close="drawer.arrived = false"
            />
          </v-menu>
        </div>
        <v-btn rounded depressed class="change-search-btn" @click="searchFlight"
          >Change</v-btn
        >
      </div>
    </div>
  </v-card>
</template>
<script>
import { clone } from 'lodash'
import utils from '@/utils/utils'
export default {
  name: 'StickyDesktopSearch',
  components: {
    SelectPassenger: () =>
      import(/* webpackPrefetch: true */ '@/components/search/SelectPassenger'),
    SelectCabinClass: () =>
      import(
        /* webpackPrefetch: true */ '@/components/search/SelectCabinClass'
      ),
    SelectRoundTrip: () =>
      import(/* webpackPrefetch: true */ '@/components/search/SelectRoundTrip'),
    SelectTimeDesktop: () =>
      import(
        /* webpackPrefetch: true */ '@/components/search/SelectTimeDesktop'
      ),
    SelectLocation: () =>
      import(/* webpackPrefetch: true */ '@/components/search/SelectLocation')
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
        isMaxHeight: false
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
    searchFlight() {
      this.$store.dispatch('checkout/resetData')
      this.$store.dispatch('search/resetDate')
      this.validateDefault()
      const section = utils.uuid()
      this.$store.dispatch('search/updateSearchCondition', this.searchCondition)
      this.$store.dispatch('search/updateSearchSection', section)
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
