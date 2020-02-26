<template>
  <div class="keepticket-page tw-h-screen tw-w-screen tw-container tw-mx-auto">
    <v-btn @click="dialog = true">Show</v-btn>
    <v-dialog v-model="dialog" max-width="490" persistent>
      <Giucho @close="dialog = false" />
    </v-dialog>
  </div>
</template>
<script>
export default {
  name: 'KeepTicketPage',
  layout: 'unauthen',
  components: {
    Giucho: () => import('@/components/checkout/Giucho')
  },
  data() {
    return {
      dialog: false
    }
  }
}
</script>
<style lang="postcss">
.keepticket-page {
  @apply tw-flex tw-justify-center tw-items-center !important;
}
</style>
