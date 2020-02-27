<template>
  <v-expansion-panels
    v-model="panel"
    accordion
    flat
    multiple
    class="filter-action-component"
  >
    <v-expansion-panel>
      <v-expansion-panel-header class="filter-panel-header tw-border-0">
        <template v-slot:actions>
          <v-icon small>mdi-chevron-down</v-icon>
        </template>
        <template v-slot:default>
          Skyteam
        </template></v-expansion-panel-header
      >
      <v-expansion-panel-content class="tw-p-1">
        <FilterSkyteam />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="filter-panel-header">
        <template v-slot:actions>
          <v-icon small>mdi-chevron-down</v-icon>
        </template>
        <template v-slot:default>
          Airline
        </template></v-expansion-panel-header
      >
      <v-expansion-panel-content class="tw-p-1">
        <FilterAirline :airlines-props="filters.airlines" />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="filter-panel-header">
        <template v-slot:actions>
          <v-icon small>mdi-chevron-down</v-icon>
        </template>
        <template v-slot:default>
          Price
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="tw-p-1">
        <FilterPrice :price-props="filters.prices" />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="filter-panel-header">
        <template v-slot:actions>
          <v-icon small>mdi-chevron-down</v-icon>
        </template>
        <template v-slot:default>
          Cất cánh chiều đi
        </template></v-expansion-panel-header
      >
      <v-expansion-panel-content class="tw-p-1">
        <FilterTime />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel>
      <v-expansion-panel-header class="filter-panel-header">
        <template v-slot:actions>
          <v-icon small>mdi-chevron-down</v-icon>
        </template>
        <template v-slot:default>
          Hạ cánh chiều đi
        </template></v-expansion-panel-header
      >
      <v-expansion-panel-content class="tw-p-1">
        <FilterTime />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel v-if="isRoundTrip">
      <v-expansion-panel-header class="filter-panel-header">
        <template v-slot:actions>
          <v-icon small>mdi-chevron-down</v-icon>
        </template>
        <template v-slot:default>
          Cất cánh chiều về
        </template></v-expansion-panel-header
      >
      <v-expansion-panel-content class="tw-p-1">
        <FilterTime />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-expansion-panel v-if="isRoundTrip">
      <v-expansion-panel-header class="filter-panel-header">
        <template v-slot:actions>
          <v-icon small>mdi-chevron-down</v-icon>
        </template>
        <template v-slot:default>
          Hạ cánh chiều về
        </template></v-expansion-panel-header
      >
      <v-expansion-panel-content class="tw-p-1">
        <FilterTime />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
<script>
export default {
  name: 'FilterAction',
  components: {
    FilterPrice: () => import('@/components/filter/FilterPrice'),
    FilterTime: () => import('@/components/filter/FilterTime'),
    FilterSkyteam: () => import('@/components/filter/FilterSkyteam'),
    FilterAirline: () => import('@/components/filter/FilterAirline')
  },
  props: {
    filters: {
      type: [Array, Object],
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      panel: [0, 1]
    }
  },
  computed: {
    isRoundTrip() {
      return this.$store.getters['search/isRoundTrip']
    }
  }
}
</script>
<style lang="postcss">
.filter-panel-header {
  border-style: solid;
  @apply tw-text-gray-800 tw-font-bold tw-text-sm tw-border-t tw-border-gray-200  tw-p-1;
}
.filter-action-component .v-expansion-panel-content__wrap {
  @apply tw-px-2;
}
</style>
