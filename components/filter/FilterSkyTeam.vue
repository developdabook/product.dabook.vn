<template>
  <div class="filter-skyteam-component">
    <div
      v-for="(team, i) in skyteams"
      :key="i + 'team'"
      class="tw-flex tw-flex-col tw-justify-start"
    >
      <v-checkbox
        v-model="skyteamSelected"
        :value="team.value"
        @change="selectSkyTeam"
        hide-details
      >
        <template v-slot:label>
          <div class="tw-flex tw-flex-col tw-justify-start">
            <strong class="tw-text-gray-800 tw-text-sm tw-m-0 tw-p-0">
              {{ team.name }}</strong
            >
          </div>
        </template>
      </v-checkbox>

      <span class="tw-text-gray-600 tw-text-xs tw-m-0 tw-p-0">{{
        team.description
      }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FilterSkyteam',
  data() {
    return {
      skyteams: [
        {
          value: 'SKY_TEAM',
          name: 'SkyTeam',
          description: 'Lien minh hang khong'
        },
        {
          value: 'STAR_ALLIANCE',
          name: 'StarAlliance',
          description: 'Lien minh hang khong'
        },
        {
          value: 'ONE_WORLD',
          name: 'OneWorld',
          description: 'Lien minh hang khong'
        }
      ],
      skyteamSelected: []
    }
  },
  methods: {
    selectSkyTeam() {
      this.$emit('input', this.skyteamSelected)
    }
  }
}
</script>
