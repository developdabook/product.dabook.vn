<template>
  <v-card class="tw-py-4">
    <v-card-text class="tw-pb-0">
      <img src="/illustrator/contact.png" />
    </v-card-text>
    <v-card-actions class="tw-flex tw-flex-col tw-justify-center">
      <v-btn
        depressed
        rounded
        small
        href="tel:19001542"
        class="tw-bg-purple-200 tw-text-blue-600 tw-normal-case tw-font-normal"
        >Call us 19001542 <i class="icofont-live-support"></i
      ></v-btn>
      <span class="tw-text-xs tw-text-gray-600 tw-m-0 tw-p-0"
        >24/7 Everytime, Everywhere</span
      >
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'ContactBanner'
}
</script>
