<template>
  <div>
    <v-card flat class="tw-rounded-none"
      ><v-card-subtitle class="tw-text-gray-400 tw-font-bold">
        Please select passenger
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
              >{{ passenger.ADULT }} Adult</strong
            >
            <span class="tw-text-xs tw-text-gray-600">
              (Tren 12 tuoi)
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
              >{{ passenger.CHILD }} Children</strong
            >
            <span class="tw-text-xs tw-text-gray-600">
              (Tu 2 den 12 tuoi)
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
              >{{ passenger.INFANT }} Infant</strong
            >
            <span class="tw-text-xs tw-text-gray-600">
              (Duoi 2 tuoi)
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
        >Close</v-btn
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
