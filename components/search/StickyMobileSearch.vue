<template>
  <div class="sticky-mobile-search">
    <v-expansion-panels class="tw-rounded-none">
      <v-expansion-panel flat>
        <v-expansion-panel-header class="tw-p-4">
          <template v-slot:default>
            <div class="mobile-search-info">
              <div class="location-item">
                <strong>HAN (Ha Noi)</strong>
                <span>Tues, 20 Augt 2020</span>
              </div>
              <v-icon>mdi-swap-horizontal</v-icon>
              <div class="location-item">
                <strong>HAN (Ha Noi)</strong>
                <span>Tues, 20 Augt 2020</span>
              </div>
            </div>
          </template>
          <template v-slot:actions>
            <v-btn rounded small depressed class="change-search-btn"
              >Change</v-btn
            >
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <MainSearchBox />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>
<script>
export default {
  name: 'StickyMobileSearch',
  components: {
    MainSearchBox: () => import('@/components/search/MainSearchBox')
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
</style>
