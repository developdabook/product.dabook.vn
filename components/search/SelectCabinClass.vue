<template>
  <div>
    <v-card flat class="tw-rounded-none"
      ><v-card-subtitle class="tw-text-gray-400 tw-font-bold">
        Please select cabin class
      </v-card-subtitle>
      <v-card-text class="px-4">
        <div
          v-for="(cabin, i) in cabins"
          :key="i + 'cabins'"
          class="tw-flex tw-flex-col tw-justify-start"
        >
          <v-checkbox
            v-model="classSelected"
            :value="cabin.value"
            hide-details
            @change="selectClass"
          >
            <template v-slot:label>
              <div class="tw-flex tw-flex-col tw-justify-start">
                <strong class="tw-text-gray-800 tw-text-sm tw-m-0 tw-p-0">
                  {{ cabin.text }}</strong
                >
              </div>
            </template>
          </v-checkbox>

          <span class="tw-text-gray-600 tw-text-xs tw-m-0 tw-p-0"
            >{{ cabin.description
            }}<v-icon color="primary" class="tw-ml-2" small>{{
              cabin.icon
            }}</v-icon></span
          >
        </div>
      </v-card-text>
    </v-card>
    <div class="detail-action">
      <v-btn
        depressed
        small
        text
        color="primary"
        class="detail-action-btn"
        @click="close"
        >Close</v-btn
      >
    </div>
  </div>
</template>
<script>
import { cabinClass } from '@/localdb/cabinClass'
export default {
  name: 'SelectCabinClass',
  data() {
    return {
      cabins: cabinClass,
      classSelected: ['ECONOMY']
    }
  },
  methods: {
    selectClass() {
      this.$emit('input', this.classSelected)
    },
    close() {
      this.$emit('close')
    }
  }
}
</script>
