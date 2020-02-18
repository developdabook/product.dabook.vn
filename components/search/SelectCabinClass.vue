<template>
  <v-card flat class="tw-rounded-none"
    ><v-card-subtitle class="tw-bg-blue-600 tw-text-white">
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
          @change="selectClass"
          hide-details
        >
          <template v-slot:label>
            <div class="tw-flex tw-flex-col tw-justify-start">
              <strong class="tw-text-gray-800 tw-text-sm tw-m-0 tw-p-0">
                <v-icon color="primary" small>{{ cabin.icon }}</v-icon
                >{{ cabin.text }}</strong
              >
            </div>
          </template>
        </v-checkbox>

        <span class="tw-text-gray-600 tw-text-xs tw-m-0 tw-p-0">{{
          cabin.description
        }}</span>
      </div>
    </v-card-text>
  </v-card>
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
    }
  }
}
</script>
