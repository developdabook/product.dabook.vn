<template>
  <div>
    <div class="filted-list">
      <v-chip
        v-for="(fil, i) in Object.keys(filterCondition)"
        :key="i + 'filtes'"
        small
        color="red lighten-5"
        text-color="red lighten-1"
        label
        close
        close-icon="mdi-close"
        class="tw-m-1"
        @click:close="removeFilter(fil)"
        >{{ fil }}</v-chip
      >
    </div>
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
            {{ $t('filter_skyteam') }}
          </template></v-expansion-panel-header
        >
        <v-expansion-panel-content class="tw-p-1">
          <FilterSkyteam ref="skyteams" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="filter-panel-header">
          <template v-slot:actions>
            <v-icon small>mdi-chevron-down</v-icon>
          </template>
          <template v-slot:default>
            {{ $t('filter_airline') }}
          </template></v-expansion-panel-header
        >
        <v-expansion-panel-content class="tw-p-1">
          <FilterAirline ref="airlines" :airlines-props="filters.airlines" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="filter-panel-header">
          <template v-slot:actions>
            <v-icon small>mdi-chevron-down</v-icon>
          </template>
          <template v-slot:default>
            {{ $t('filter_price') }}
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
            {{ $t('filter_from_start') }}
          </template></v-expansion-panel-header
        >
        <v-expansion-panel-content class="tw-p-1">
          <FilterTime time-target="departureStart" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-header class="filter-panel-header">
          <template v-slot:actions>
            <v-icon small>mdi-chevron-down</v-icon>
          </template>
          <template v-slot:default>
            {{ $t('filter_from_end') }}
          </template></v-expansion-panel-header
        >
        <v-expansion-panel-content class="tw-p-1">
          <FilterTime time-target="departureEnd" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-if="isRoundTrip">
        <v-expansion-panel-header class="filter-panel-header">
          <template v-slot:actions>
            <v-icon small>mdi-chevron-down</v-icon>
          </template>
          <template v-slot:default>
            {{ $t('filter_to_start') }}
          </template></v-expansion-panel-header
        >
        <v-expansion-panel-content class="tw-p-1">
          <FilterTime time-target="arrivedStart" />
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel v-if="isRoundTrip">
        <v-expansion-panel-header class="filter-panel-header">
          <template v-slot:actions>
            <v-icon small>mdi-chevron-down</v-icon>
          </template>
          <template v-slot:default>
            {{ $t('filter_to_end') }}
          </template></v-expansion-panel-header
        >
        <v-expansion-panel-content class="tw-p-1">
          <FilterTime time-target="arrivedEnd" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <div v-if="Object.keys(filterCondition).length > 0" class="filter-actions">
      <v-btn
        color="primary"
        class="normal-btn"
        small
        text
        depressed
        @click="removeAllFilter"
        >ClearAll</v-btn
      >
      <v-btn
        color="primary"
        class="normal-btn"
        small
        depressed
        @click="startFilter"
        >Filter</v-btn
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'FilterAction',
  components: {
    FilterPrice: () =>
      import(/* webpackPrefetch: true */ '@/components/filter/FilterPrice'),
    FilterTime: () =>
      import(/* webpackPrefetch: true */ '@/components/filter/FilterTime'),
    FilterSkyteam: () =>
      import(/* webpackPrefetch: true */ '@/components/filter/FilterSkyteam'),
    FilterAirline: () =>
      import(/* webpackPrefetch: true */ '@/components/filter/FilterAirline')
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
    },
    filterCondition() {
      return this.$store.getters['search/getFilterCondition']
    }
  },
  methods: {
    removeFilter(payload) {
      this.$store.dispatch('search/emptyFilter', payload)
    },
    startFilter() {
      this.$store.dispatch('search/changeFilterState', true)
    },
    removeAllFilter() {
      this.$store.dispatch('search/emptyAllFilter')
      this.$refs.airlines.clearSelected()
      this.$refs.skyteams.clearSelected()
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
.filted-list {
  @apply tw-flex tw-flex-row tw-justify-start tw-items-center tw-flex-wrap;
}
.filter-actions {
  bottom: 0;
  z-index: 10;
  @apply tw-sticky tw-bg-white tw-py-2 tw-flex tw-justify-between;
}
</style>
