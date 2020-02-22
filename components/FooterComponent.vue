<template>
  <v-footer class="tw-text-xs tw-text-gray-800">
    <v-spacer></v-spacer>
    <div>&copy; DaiMinh {{ new Date().getFullYear() }}</div>
    <v-btn x-small color="primary" rounded outlined class="lang-btn"
      >Vietnamese
      <v-avatar size="15">
        <img src="/images/lang/vietnam.png" alt="John" /> </v-avatar
    ></v-btn>
  </v-footer>
</template>
<script>
export default {
  name: 'FooterComponent'
}
</script>
<style lang="postcss">
.lang-btn {
  @apply tw-shadow-lg tw-text-xs tw-normal-case tw-font-normal tw-ml-2 tw-shadow-lg tw-px-1 !important;
}
</style>
