<template>
  <div class="search-page">
    <section class="section-stickysearch">
      <StickySearch />
    </section>
    <section class="section-search-result tw-container tw-mx-auto">
      <div class="tw-w-full md:tw-w-3/5 tw-mx-auto">
        <Ticket v-for="i in 10" :key="i" class="tw-mb-2" />
      </div>
    </section>
  </div>
</template>
<script>
export default {
  name: 'SearchPage',
  layout: 'unauthen',
  components: {
    StickySearch: () => import('@/components/search/StickySearch'),
    Ticket: () => import('@/components/select/Ticket')
  }
}
</script>
<style lang="postcss">
.section-stickysearch {
  z-index: 2;
  @apply tw-sticky tw-top-0;
}
</style>
