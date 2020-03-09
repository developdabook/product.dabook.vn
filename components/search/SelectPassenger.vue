<template>
  <div>
    <v-card flat class="tw-rounded-none"
      ><v-card-subtitle class="tw-text-gray-400 tw-font-bold">
        {{ $t('search_popup_pass_title') }}
      </v-card-subtitle>
      <v-card-text class="px-4">
        <div class="passenger-select-box">
          <v-btn
            :disabled="passenger.ADULT === 0"
            fab
            text
            icon
            outlined
            small
            color="primary"
            @click="minusPerson('ADULT')"
            ><v-icon>mdi-minus</v-icon></v-btn
          >
          <div class="passenger-info">
            <strong class="m-0 p-0 tw-text-sm tw-text-blue-600"
              >{{ passenger.ADULT }} {{ $t('search_adult_label') }}</strong
            >
            <span class="tw-text-xs tw-text-gray-600">
              ({{ $t('search_adult_detail') }})
            </span>
          </div>
          <v-btn
            :disabled="totalPassenger === 5"
            fab
            text
            icon
            outlined
            small
            color="primary"
            @click="plusPerson('ADULT')"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </div>
        <div class="passenger-select-box">
          <v-btn
            :disabled="passenger.CHILD === 0"
            fab
            text
            icon
            outlined
            small
            color="primary"
            @click="minusPerson('CHILD')"
            ><v-icon>mdi-minus</v-icon></v-btn
          >
          <div class="passenger-info">
            <strong class="m-0 p-0 tw-text-sm tw-text-blue-600"
              >{{ passenger.CHILD }} {{ $t('search_child_label') }}</strong
            >
            <span class="tw-text-xs tw-text-gray-600">
              ({{ $t('search_child_detail') }})
            </span>
          </div>
          <v-btn
            :disabled="totalPassenger === 5"
            fab
            text
            icon
            outlined
            small
            color="primary"
            @click="plusPerson('CHILD')"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </div>
        <div class="passenger-select-box">
          <v-btn
            :disabled="passenger.INFANT === 0"
            fab
            text
            icon
            outlined
            small
            color="primary"
            @click="minusPerson('INFANT')"
            ><v-icon>mdi-minus</v-icon></v-btn
          >
          <div class="passenger-info">
            <strong class="m-0 p-0 tw-text-sm tw-text-blue-600"
              >{{ passenger.INFANT }} {{ $t('search_infant_label') }}</strong
            >
            <span class="tw-text-xs tw-text-gray-600">
              ({{ $t('search_infant_detail') }})
            </span>
          </div>
          <v-btn
            :disabled="totalPassenger === 5"
            fab
            text
            icon
            outlined
            small
            color="primary"
            @click="plusPerson('INFANT')"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </div>
      </v-card-text>
    </v-card>
    <div v-if="footer" class="detail-action">
      <v-btn
        depressed
        small
        text
        color="primary"
        class="detail-action-btn"
        @click="closeModal"
        >{{ $t('btn_close') }}</v-btn
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectPassenger',
  props: {
    footer: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      passenger: {
        ADULT: 1,
        CHILD: 0,
        INFANT: 0
      }
    }
  },
  computed: {
    totalPassenger() {
      return this.passenger.ADULT + this.passenger.CHILD + this.passenger.INFANT
    }
  },
  methods: {
    plusPerson(target) {
      if (this.totalPassenger < 5) {
        this.passenger[target] += 1
      }
      this.$emit('input', this.passenger)
    },
    minusPerson(target) {
      if (this.passenger[target] !== 0 && this.totalPassenger > 1) {
        this.passenger[target] -= 1
      }
      this.$emit('input', this.passenger)
    },
    closeModal() {
      this.$emit('close')
    }
  }
}
</script>
<style lang="postcss">
.detail-action {
  @apply tw-fixed tw-bottom-0;
}
</style>
