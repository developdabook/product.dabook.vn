<template>
  <v-card class="contact-banner-componnent" flat>
    <v-card-text class="tw-pb-0">
      <img src="/illustrator/contact.png" />
    </v-card-text>
    <v-card-actions class="action-contact">
      <v-btn depressed rounded small href="tel:19001542" class="call-us-btn"
        >{{ $t('banner_contact_callus') }} <i class="icofont-live-support"></i
      ></v-btn>
      <span class="call-subtext">{{ $t('banner_contact_detail') }}</span>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'ContactBanner'
}
</script>
<style lang="postcss">
.contact-banner-component {
  @apply tw-py-4;
}
.action-contact {
  @apply tw-flex tw-flex-col tw-justify-center;
}
.call-us-btn {
  @apply tw-bg-purple-200 tw-text-blue-600 tw-normal-case tw-font-normal !important;
}
.call-subtext {
  @apply tw-text-xs tw-text-gray-600 tw-m-0 tw-p-0;
}
</style>
