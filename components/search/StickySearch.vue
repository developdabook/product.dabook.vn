<template>
  <v-card class="sticky-component" color="#FFF">
    <div class="sticky-search tw-container tw-mx-auto">
      <v-card-text>
        <div class="search-info">
          <div class="search-wrap">
            <v-text-field
              label="From"
              placeholder="HaNoi( HAN)"
              outlined
              dense
              color="primary"
              class="input-sm tw-rounded-r-none"
              hide-details
            ></v-text-field>
            <v-text-field
              label="To"
              placeholder="HoChiMinh City(SGN)"
              outlined
              dense
              color="primary"
              class="input-sm tw-rounded-l-none"
              hide-details
            ></v-text-field>
          </div>
          <div class="search-wrap">
            <v-text-field
              label="From"
              placeholder="HaNoi( HAN)"
              outlined
              dense
              color="primary"
              class="input-sm tw-rounded-r-none"
              hide-details
            ></v-text-field>
            <v-text-field
              label="To"
              placeholder="HoChiMinh City(SGN)"
              outlined
              dense
              color="primary"
              class="input-sm tw-rounded-l-none"
              hide-details
            ></v-text-field>
          </div>
          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                color="primary"
                class="tw-normal-case"
                text
                rounded
                depressed
              >
                Passenger
                <v-icon>mdi-menu-down-outline</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-text>
                <SelectPassenger />
              </v-card-text>
            </v-card>
          </v-menu>
          <v-menu :close-on-content-click="false">
            <template v-slot:activator="{ on }">
              <v-btn
                v-on="on"
                color="primary"
                class="tw-normal-case"
                text
                rounded
                depressed
              >
                CabinClass
                <v-icon>mdi-menu-down-outline</v-icon>
              </v-btn>
            </template>

            <v-card>
              <v-card-text>
                <SelectCabinClass />
              </v-card-text>
            </v-card>
          </v-menu>
        </div>
      </v-card-text>
      <v-card-actions>
        <v-btn rounded depressed color="primary" class="tw-normal-case px-2"
          >Search</v-btn
        >
      </v-card-actions>
    </div>
  </v-card>
</template>
<script>
export default {
  name: 'StickySearch',
  components: {
    SelectPassenger: () => import('@/components/search/SelectPassenger'),
    SelectCabinClass: () => import('@/components/search/SelectCabinClass')
  }
}
</script>
<style lang="postcss">
.sticky-search {
  min-height: 3rem;
  @apply tw-flex tw-flex-row tw-justify-between tw-items-center;
}
.search-info {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-center;
}
.search-wrap {
  @apply tw-flex tw-flex-row tw-justify-center tw-items-center;
}
</style>
