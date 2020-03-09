<template>
  <v-footer app class="footer-component">
    <div class="tw-w-full tw-flex tw-justify-between">
      <v-spacer></v-spacer>
      <div>&copy; DaiMinh {{ new Date().getFullYear() }}</div>
      <v-btn
        x-small
        color="primary"
        rounded
        outlined
        class="lang-btn"
        @click="changeLanguage"
        >{{ getCurrentLang.name }}
        <v-avatar size="15">
          <img
            :src="`/images/lang/${getCurrentLang.image}`"
            alt="Language"
          /> </v-avatar
      ></v-btn>
    </div>
  </v-footer>
</template>
<script>
import langMixin from '@/mixins/lang'
export default {
  name: 'FooterComponent',
  mixins: [langMixin]
}
</script>
<style lang="postcss">
.footer-component {
  @apply tw-text-xs tw-text-gray-800 tw-sticky tw-bottom-0 tw-p-2;
}
.lang-btn {
  @apply tw-shadow-lg tw-text-xs tw-normal-case tw-font-normal tw-ml-2 tw-shadow-lg tw-px-1 !important;
}
</style>
