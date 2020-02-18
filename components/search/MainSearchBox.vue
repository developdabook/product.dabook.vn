<template>
  <div class="main-search">
    <section class="section-card">
      <v-card outlined max-width="400px" class="main-search-box tw-rounded-lg">
        <v-card-text class="pb-0">
          <v-text-field
            @click="selectCondition('from')"
            :value="fromSum"
            label="From"
            color="primary"
            prepend-inner-icon="mdi-airplane-takeoff"
            class="dotted-border my-4"
            hide-details
            name="searchFrom"
            placeholder="Please select departure airport"
          ></v-text-field>
          <v-text-field
            @click="selectCondition('to')"
            :value="toSum"
            label="To"
            prepend-inner-icon="mdi-airplane-landing"
            hide-details
            class="my-4"
            name="searchTo"
            placeholder="Please select arrived/return airport"
          ></v-text-field>
          <div class="tw-relative">
            <v-text-field
              @click="selectCondition('departure')"
              :value="departureSum"
              label="Departure"
              prepend-inner-icon="mdi-calendar-import"
              hide-details
              class="my-4"
              placeholder="DD-MM-YYY"
              name="searchDeparture"
            ></v-text-field>
            <div class="is-roundtrip">
              <label for="roundtrip"
                >Is Roundtrip?
                <v-switch
                  v-model="searchCondition.isRoundtrip"
                  hide-details
                ></v-switch
              ></label>
            </div>
          </div>
          <v-expand-transition>
            <v-text-field
              @click="selectCondition('arrived')"
              v-show="searchCondition.isRoundtrip"
              :value="arrivedSum"
              label="Arrived"
              prepend-inner-icon="mdi-calendar-export"
              hide-details
              class="my-4"
              placeholder="DD-MM-YYY"
              name="searchArrived"
            ></v-text-field>
          </v-expand-transition>
          <v-text-field
            @click="selectCondition('passenger')"
            :value="passegnerSum"
            label="Passenger"
            prepend-inner-icon="mdi-account-multiple-check-outline"
            hide-details
            class="my-4"
            name="searchPassenger"
          ></v-text-field>
          <v-text-field
            @click="selectCondition('cabinClass')"
            :value="cabinClassSum"
            label="CabinClass"
            prepend-inner-icon="mdi-seat-passenger"
            hide-details
            class="mt-4"
            name="searchCabinClass"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="pt-12">
          <v-btn
            @click="searchFlight"
            color="primary"
            rounded
            depressed
            large
            class="tw-w-full"
            >Search</v-btn
          >
        </v-card-actions>
        <v-card-text class="tw-text-center tw-text-xs tw-pt-0">
          <span class="tw-text-gray-400 tw-m-1"
            ><v-icon color="#E2E8F0" small>mdi-check-decagram</v-icon> Alway
            best price</span
          >
          <span class="tw-text-gray-400 tw-m-1"
            ><v-icon color="#E2E8F0" small>mdi-shield-check-outline</v-icon>
            Trust by DaiMinh</span
          >
        </v-card-text>
      </v-card>
    </section>
    <section class="section-draw">
      <v-navigation-drawer
        v-model="drawer.isDraw"
        temporary
        app
        fixed
        right
        bottom
        width="350px"
      >
        <SelectLocation
          v-if="drawer.from"
          v-model="searchCondition.from"
          :exceptionLocal="searchCondition.to"
        />
        <SelectLocation
          v-if="drawer.to"
          v-model="searchCondition.to"
          :exceptionLocal="searchCondition.from"
        />
        <SelectTime
          v-if="drawer.departure"
          v-model="searchCondition.departure"
        />
        <SelectTime v-if="drawer.arrived" v-model="searchCondition.arrived" />
        <SelectPassenger
          v-if="drawer.passenger"
          v-model="searchCondition.passenger"
        />
        <SelectCabinClass
          v-if="drawer.cabinClass"
          v-model="searchCondition.cabinClass"
        />
      </v-navigation-drawer>
    </section>
  </div>
</template>
<script>
export default {
  name: 'MainSearchBox',
  components: {
    SelectLocation: () => import('@/components/search/SelectLocation'),
    SelectTime: () => import('@/components/search/SelectTime'),
    SelectPassenger: () => import('@/components/search/SelectPassenger'),
    SelectCabinClass: () => import('@/components/search/SelectCabinClass')
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
        isDraw: false
      },
      searchCondition: {
        from: {},
        to: {},
        departure: this.$moment().format('DD-MM-YYYY'),
        arrived: this.$moment()
          .add(4, 'day')
          .format('DD-MM-YYYY'),
        passenger: {
          ADULT: 0,
          CHILDREN: 0,
          INFANT: 0
        },
        cabinClass: ['ECONOMY'],
        isRoundtrip: false
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
      return (
        this.searchCondition.passenger.ADULT +
        ' ADULT' +
        ' | ' +
        this.searchCondition.passenger.CHILDREN +
        ' CHILDREN' +
        ' | ' +
        this.searchCondition.passenger.INFANT +
        ' INFANT'
      )
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
    searchFlight() {},
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
    }
  }
}
</script>
<style lang="postcss">
.main-search-box {
  @apply tw-rounded-lg;
}
.main-search-box:hover {
  @apply tw-shadow-lg;
}
.main-search-box .v-label.theme--light {
  left: -30px !important;
  transform: translateY(-18px) scale(0.75) !important;
  @apply tw-text-gray-600;
}
.main-search-box .v-text-field__slot input {
  @apply text-gray-700 tw-font-bold tw-pl-4 tw-text-sm;
}
.is-roundtrip {
  transform: translateY(10%);
  z-index: 2;
  @apply tw-absolute tw-right-0 tw-bottom-0;
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
.main-search-box .v-text-field > .v-input__control > .v-input__slot:before {
  @apply tw-border-gray-600;
}
.main-search-box .v-input .v-icon {
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
.main-search .v-navigation-drawer {
  @apply tw-rounded-t-lg tw-overflow-hidden;
}
@screen md {
  .main-search .v-navigation-drawer {
    @apply tw-rounded-none tw-overflow-hidden;
  }
}
</style>
