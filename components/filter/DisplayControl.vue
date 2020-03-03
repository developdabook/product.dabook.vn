<template>
  <div class="display-control">
    <div class="tw-w-1/2 tw-pr-1">
      <v-card flat class="tw-rounded-none">
        <v-card-text class="tw-flex tw-justify-start">
          <v-btn
            color="primarytext"
            small
            text
            class="tw-normal-case"
            @click="changeTotalMode"
            ><v-icon small>mdi-airballoon-outline</v-icon>Show total price
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
    <div class="tw-w-1/2 tw-pl-1">
      <v-card flat class="tw-rounded-none">
        <v-card-text class="tw-flex tw-justify-end">
          <v-btn color="primarytext" small text class="tw-normal-case"
            >Show table
            <v-icon small>mdi-file-table-box-multiple-outline</v-icon></v-btn
          >
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
export default {
  name: 'DisplayControl',
  data() {
    return {
      control: {
        totalPrice: true
      }
    }
  },
  methods: {
    changeTotalMode() {
      this.control.totalPrice = !this.control.totalPrice
      this.$store.dispatch('search/updateTotalMode', this.control.totalPrice)
    }
  }
}
</script>
<style lang="postcss">
.display-control {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-start tw-w-full !important;
}
.total-price-control {
  @apply tw-flex tw-flex-col tw-items-end tw-text-xs !important;
}
</style>
