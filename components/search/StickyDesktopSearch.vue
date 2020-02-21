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
              >Roundtrip <v-icon small>mdi-chevron-down</v-icon></v-btn
            >
          </template>
          <SelectRoundTrip />
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
              >Passenger<v-icon small>mdi-chevron-down</v-icon></v-btn
            >
          </template>
          <SelectPassenger />
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
              >CabinClass<v-icon small>mdi-chevron-down</v-icon></v-btn
            >
          </template>
          <SelectCabinClass />
        </v-menu>
      </div>
      <div class="desktop-search-box">
        <div class="search-box tw-relative">
          <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                label="From"
                placeholder="HAN- Ha Noi"
                outlined
                dense
                readonly
                hide-details
                single-line
                class="input-sm tw-rounded-r-none tw-mr-2"
              ></v-text-field>
            </template>
            <v-card class="tw-h-128 tw-bg-white tw-max-30">
              <SelectLocation />
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
                label="To"
                placeholder="HAN- Ha Noi"
                outlined
                dense
                readonly
                hide-details
                single-line
                class="input-sm tw-rounded-l-none tw-ml-2"
              ></v-text-field>
            </template>
            <v-card class="tw-h-128 tw-bg-white tw-max-30">
              <SelectLocation />
            </v-card>
          </v-menu>
        </div>
        <div class="search-box">
          <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                label="Departure"
                placeholder="20 August 2020"
                outlined
                dense
                readonly
                hide-details
                single-line
                class="input-sm tw-rounded-r-none"
              ></v-text-field>
            </template>
            <SelectTimeDesktop />
          </v-menu>
          <v-menu :close-on-content-click="false" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on }">
              <v-text-field
                v-on="on"
                label="Arrived"
                placeholder="22 August 2020"
                outlined
                dense
                readonly
                hide-details
                single-line
                class="input-sm tw-rounded-l-none"
              ></v-text-field>
            </template>
            <SelectTimeDesktop />
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
      menu: false
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
  @apply tw-w-full tw-flex tw-flex-col tw-justify-between tw-items-start tw-p-4 tw-py-6;
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
