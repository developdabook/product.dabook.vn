<template>
  <div>
    <v-card flat class="tw-rounded-none"
      ><v-card-subtitle class="tw-text-gray-400 tw-font-bold">
        Please select passenger
      </v-card-subtitle>
      <v-card-text class="px-4">
        <div class="passenger-select-box">
          <v-btn
            @click="minusPerson('ADULT')"
            :disabled="passenger.ADULT === 0"
            fab
            text
            icon
            outlined
            small
            color="primary"
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
            @click="plusPerson('ADULT')"
            :disabled="totalPassenger === 5"
            fab
            text
            icon
            outlined
            small
            color="primary"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </div>
        <div class="passenger-select-box">
          <v-btn
            @click="minusPerson('CHILDREN')"
            :disabled="passenger.CHILDREN === 0"
            fab
            text
            icon
            outlined
            small
            color="primary"
            ><v-icon>mdi-minus</v-icon></v-btn
          >
          <div class="passenger-info">
            <strong class="m-0 p-0 tw-text-sm tw-text-blue-600"
              >{{ passenger.CHILDREN }} Children</strong
            >
            <span class="tw-text-xs tw-text-gray-600">
              (Tu 2 den 12 tuoi)
            </span>
          </div>
          <v-btn
            @click="plusPerson('CHILDREN')"
            :disabled="totalPassenger === 5"
            fab
            text
            icon
            outlined
            small
            color="primary"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </div>
        <div class="passenger-select-box">
          <v-btn
            @click="minusPerson('INFANT')"
            :disabled="passenger.INFANT === 0"
            fab
            text
            icon
            outlined
            small
            color="primary"
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
            @click="plusPerson('INFANT')"
            :disabled="totalPassenger === 5"
            fab
            text
            icon
            outlined
            small
            color="primary"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
        </div>
      </v-card-text>
    </v-card>
    <div class="detail-action">
      <v-btn
        @click="close"
        depressed
        small
        text
        color="primary"
        class="detail-action-btn"
        >Close</v-btn
      >
    </div>
  </div>
</template>
<script>
export default {
  name: 'SelectPassenger',
  data() {
    return {
      passenger: {
        ADULT: 1,
        CHILDREN: 0,
        INFANT: 0
      }
    }
  },
  computed: {
    totalPassenger() {
      return (
        this.passenger.ADULT + this.passenger.CHILDREN + this.passenger.INFANT
      )
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
    close() {
      this.$emit('close')
    }
  }
}
</script>
