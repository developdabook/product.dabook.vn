<template>
  <div class="filter-component">
    <div class="filter-mobile">
      <v-btn
        @click="sheet = true"
        rounded
        small
        color="primary"
        class="float-filter-btn"
        >Filter <v-icon small class="tw-ml-2">mdi-filter-outline</v-icon></v-btn
      >
      <v-bottom-sheet v-model="sheet">
        <v-sheet height="80vh" class="tw-p-3 tw-overflow-scroll">
          <FilterMobi />
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FilterComponent',
  components: {
    FilterMobi: () => import('@/components/filter/FilterMobi')
  },
  data() {
    return {
      sheet: false
    }
  }
}
</script>
<style lang="postcss">
.filter-mobile {
  @apply tw-block;
}
.float-filter-btn {
  z-index: 2;
  position: fixed !important;
  bottom: 4rem !important;
  left: 50% !important;
}
</style>
