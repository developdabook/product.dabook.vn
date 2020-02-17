<template>
  <div class="home-page">
    <div class="tw-container tw-mx-auto">
      <section class="section-search">
        <MainSearchBox />
      </section>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    MainSearchBox: () => import('@/components/search/MainSearchBox')
  }
}
</script>
<style lang="postcss">
.section-search {
  @apply tw-p-2;
}
@screen md {
  .section-search {
    @apply tw-p-0;
  }
}
</style>
