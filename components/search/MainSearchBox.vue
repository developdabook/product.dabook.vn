<template>
  <div class="main-search">
    <section class="section-card">
      <v-card outlined max-width="400px" class="main-search-box tw-rounded-lg">
        <v-card-text class="pb-0">
          <v-text-field
            @click="drawer.from = true"
            @blur="drawer.from = false"
            label="From"
            color="primary"
            prepend-inner-icon="mdi-airplane-takeoff"
            class="dotted-border my-4"
            hide-details
            name="searchFrom"
          ></v-text-field>
          <v-text-field
            @click="drawer.to = true"
            @blur="drawer.to = false"
            label="To"
            prepend-inner-icon="mdi-airplane-landing"
            hide-details
            class="my-4"
            name="searchTo"
          ></v-text-field>
          <div class="tw-relative">
            <v-text-field
              @click="drawer.departure = true"
              @blur="drawer.departure = false"
              label="Departure"
              prepend-inner-icon="mdi-calendar-import"
              hide-details
              class="my-4"
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
              @click="drawer.arrived = true"
              @blur="drawer.arrived = false"
              v-show="searchCondition.isRoundtrip"
              label="Arrived"
              prepend-inner-icon="mdi-calendar-export"
              hide-details
              class="my-4"
              name="searchArrived"
            ></v-text-field>
          </v-expand-transition>
          <v-text-field
            @click="drawer.passenger = true"
            @blur="drawer.passenger = false"
            label="Passenger"
            prepend-inner-icon="mdi-account-multiple-check-outline"
            hide-details
            class="my-4"
            name="searchPassenger"
          ></v-text-field>
          <v-text-field
            @click="drawer.cabinClass = true"
            @blur="drawer.cabinClass = false"
            label="CabinClass"
            prepend-inner-icon="mdi-seat-passenger"
            hide-details
            class="mt-4"
            name="searchCabinClass"
          ></v-text-field>
        </v-card-text>
        <v-card-actions class="py-8">
          <v-btn color="primary" rounded depressed large class="tw-w-full"
            >Search</v-btn
          >
        </v-card-actions>
      </v-card>
    </section>
    <section class="section-draw">
      <v-navigation-drawer :value="isDraw" temporary app fixed right bottom>
      </v-navigation-drawer>
    </section>
  </div>
</template>
<script>
export default {
  name: 'MainSearchBox',
  data() {
    return {
      drawer: {
        from: false,
        to: false,
        departure: false,
        arrived: false,
        passenger: false,
        cabinClass: false
      },
      searchCondition: {
        from: '',
        to: '',
        departure: '',
        arrived: '',
        passenger: '',
        cabinClass: '',
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
</style>
