<template>
  <div class="airlinefees-page">
    <div class="tw-container tw-mx-auto tw-py-16">
      <v-card flat>
        <v-card-title>{{ $t('label_fee_title') }}</v-card-title>
        <v-card-text>
          <p class="tw-mb-8 black--text">
            {{ $t('label_fee_detail') }}
          </p>
          <v-text-field
            v-model="search"
            label="Tìm kiếm hãng hàng không"
            placeholder="VietnamAirline"
            color="primary"
            outlined
            rounded
            dense
            clearable
            class="input-sm"
          >
            <template v-slot:prepend-inner>
              <v-tooltip top color="primary">
                <template v-slot:activator="{ on }">
                  <v-icon small color="primary" v-on="on"
                    >mdi-airplane-takeoff</v-icon
                  >
                </template>
                Search Airline
              </v-tooltip>
            </template></v-text-field
          >
          <div class="tw-flex tw-flex-row tw-flex-wrap">
            <span
              v-for="(link, i) in filterFee"
              :key="i + 'airlinefee'"
              class="tw-px-2 tw-w-1/2 md:tw-w-1/4 lg:tw-w-1/6"
            >
              <a
                :href="link.link"
                target="_blank"
                class="tw-underline primary--text"
                >{{ link.airline }}</a
              ></span
            >
          </div>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>
<script>
import airlinefees from '@/localdb/airlinefees'
export default {
  name: 'AirlineFeesPage',
  layout: 'unauthen',
  data() {
    return {
      airlinefees,
      search: ''
    }
  },
  computed: {
    filterFee() {
      return this.airlinefees.filter((el) => {
        return el.airline.search(this.search) !== -1
      })
    }
  }
}
</script>
<style lang="postcss">
.airlinefees-page {
  @apply tw-bg-white tw-h-full tw-w-full tw-min-h-screen tw-text-gray-800 !important;
}
</style>
