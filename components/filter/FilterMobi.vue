<template>
  <div class="filter-mobile-component">
    <v-btn rounded fixed small bottom color="primary" class="filter-btn"
      >Filter</v-btn
    >
  </div>
</template>
<script>
export default {
  name: 'FilterMobile'
}
</script>
<style lang="postcss">
.filter-btn {
  z-index: 2;
  left: 50% !important;
  transform: translateX(-50%) !important;
  @apply tw-fixed tw-shadow-lg;
}
</style>
