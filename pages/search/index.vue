<template>
  <div class="search-page">
    <section class="section-stickysearch">
      <StickyDeskSearch class="stick-des tw-hidden md:tw-block" />
      <StickyMobiSearch class="stick-mob tw-flex md:tw-hidden" />
    </section>
    <section id="body-target" class="section-search-result tw-container">
      <div class="left-filter"><FilterComponent /></div>
      <div class="center-search">
        <Ticket v-for="i in 10" :key="i" class="tw-mb-4" />
      </div>
      <div class="right-pro"></div>
    </section>
    <section class="section-filter"></section>
  </div>
</template>
<script>
import { tripType } from '@/localdb/tripType'
export default {
  name: 'SearchPage',
  layout: 'unauthen',
  components: {
    StickyDeskSearch: () => import('@/components/search/StickyDeskSearch'),
    StickyMobiSearch: () => import('@/components/search/StickyMobiSearch'),
    Ticket: () => import('@/components/select/Ticket'),
    FilterComponent: () => import('@/components/filter/FilterComponent')
  },
  data() {
    return {
      tripType
    }
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
.section-search-result {
  @apply tw-my-8 tw-mx-auto tw-flex tw-flex-row tw-justify-start tw-items-start;
}
.center-search {
  @apply tw-w-full tw-px-4 tw-m-0;
}
.right-pro {
  @apply tw-hidden;
}
.stick-desk {
  @apply tw-hidden;
}
.stick-mob {
  @apply tw-flex;
}
@screen md {
  .center-search {
    @apply tw-w-3/5;
  }
  .left-filter,
  .right-pro {
    @apply tw-sticky tw-flex tw-bg-transparent tw-w-1/5 tw-text-sm;
  }
  .right-pro {
    @apply tw-bg-white;
  }
  .stick-desk {
    @apply tw-block;
  }
  .stick-mob {
    @apply tw-hidden;
  }
}
</style>
