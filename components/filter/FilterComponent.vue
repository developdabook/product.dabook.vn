<template>
  <div class="filter-component">
    <div class="filter-desktop">
      <v-card outlined class="tw-w-full">
        <v-card-text>
          <FilterAction />
        </v-card-text>
      </v-card>
    </div>
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
          <FilterAction />
        </v-sheet>
      </v-bottom-sheet>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FilterComponent',
  components: {
    FilterAction: () => import('@/components/filter/FilterAction')
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
.filter-desktop {
  @apply tw-hidden;
}
.float-filter-btn {
  z-index: 2;
  position: fixed !important;
  bottom: 4rem !important;
  left: 50% !important;
  transform: translateX(-50%) !important;
}
@screen md {
  .filter-mobile {
    @apply tw-hidden;
  }
  .filter-desktop {
    @apply tw-flex;
  }
}
</style>
