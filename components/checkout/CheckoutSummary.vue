<template>
  <v-card flat class="checkout-summary">
    <v-card-title></v-card-title>
    <v-card-text></v-card-text>
    <v-card-actions>
      <v-btn
        depressed
        rounded
        color="primary"
        class="select-pay-btn tw-normal-case"
        >Select payment</v-btn
      >
    </v-card-actions>
  </v-card>
</template>
<style lang="postcss">
.checkout-summary {
  @apply tw-p-4  tw-rounded-none !important;
}
.select-pay-btn {
  @apply tw-normal-case tw-font-normal tw-w-full !important;
}
</style>
