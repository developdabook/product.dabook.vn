<template>
  <div class="search-page">
    <section class="section-stickysearch">
      <StickyDesktopSearch class="tw-hidden md:tw-block" />
      <StickyMobileSearch class="md:tw-hidden" />
    </section>
    <section
      id="body-target"
      class="section-search-result tw-container tw-mx-auto"
    >
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
    StickyDesktopSearch: () =>
      import('@/components/search/StickyDesktopSearch'),
    StickyMobileSearch: () => import('@/components/search/StickyMobileSearch'),
    Ticket: () => import('@/components/select/Ticket')
  }
}
</script>
<style lang="postcss">
.search-page {
  @apply tw-bg-gray-300;
}
.section-stickysearch {
  z-index: 2;
  @apply tw-sticky tw-top-0;
}
</style>
