<template>
  <div class="home-page">
    <Background class="tw-relative">
      <div class="tw-container tw-mx-auto tw-pt-16">
        <section class="section-search">
          <MainSearchBox class="search-main" />
        </section>
      </div>
    </Background>
  </div>
</template>

<script>
export default {
  components: {
    Background: () => import('@/components/Background'),
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
