<template>
  <v-card flat class="tw-rounded-none"
    ><v-card-subtitle class="tw-bg-blue-600 tw-text-white">
      Please select location
    </v-card-subtitle>
    <v-progress-linear
      :active="loading.search"
      :indeterminate="loading.search"
      color="success"
    ></v-progress-linear>
    <v-card-subtitle>
      <v-text-field
        v-model="search"
        @keydown="findLocation"
        outlined
        rounded
        autofocus
        dense
        clearable
        hide-details
        prepend-inner-icon="mdi-google-maps"
        placeholder="Find your target..."
        class="tw-text-sm"
      ></v-text-field>
    </v-card-subtitle>
    <v-card-text v-if="isSearching">
      <v-list rounded dense>
        <v-list-item-group
          v-model="searchSelected"
          @change="selectSearchResult"
          color="primary"
        >
          <v-list-item
            v-for="(port, i) in airportsFilter"
            :key="i + 'port'"
            :value="port"
            :disabled="port.PlaceId.length > 3"
            dense
          >
            <v-list-item-icon>
              <v-icon color="primary">{{
                port.PlaceId.length == 3
                  ? 'mdi-airport'
                  : 'mdi-city-variant-outline'
              }}</v-icon>
            </v-list-item-icon>
            <v-tooltip top color="primary">
              <template v-slot:activator="{ on }">
                <v-list-item-content v-on="on">
                  <v-list-item-title
                    >[{{ port.PlaceId }}]
                    {{ port.PlaceName }}</v-list-item-title
                  >
                  <v-list-item-subtitle>{{
                    port.ResultingPhrase
                  }}</v-list-item-subtitle>
                </v-list-item-content>
              </template>
              <span>{{ port.ResultingPhrase }}</span>
            </v-tooltip>
            <v-list-item-action>
              <v-btn
                v-if="port.PlaceId.length === 3"
                :disabled="port.PlaceId.length > 3"
                small
                class="tw-normal-case primary--text"
                color="blue lighten-5"
                rounded
                depressed
                >Select</v-btn
              >
              <v-tooltip v-else top color="primary">
                <template v-slot:activator="{ on }">
                  <v-badge
                    bordered
                    color="red darken-1"
                    icon="mdi-lock"
                    overlap
                  >
                    <v-btn
                      v-on="on"
                      :disabled="port.PlaceId.length > 3"
                      small
                      class="tw-normal-case primary--text"
                      color="blue lighten-5"
                      rounded
                      depressed
                      >Select</v-btn
                    >
                  </v-badge>
                </template>
                <span>Tooltip</span>
              </v-tooltip>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-card-text>
    <v-card-text v-else>
      <v-tabs>
        <v-tab
          v-for="(area, i) in Object.keys(defautlAirport)"
          :key="i + 'defaultAirport'"
          class="tw-normal-case"
          >{{ area }}</v-tab
        >
        <v-tab-item
          v-for="(area, i) in Object.values(defautlAirport)"
          :key="i + 'areaC'"
        >
          <v-card v-for="(local, i) in area" :key="i + 'local'" flat>
            <v-card-subtitle>
              {{ local.area }}
            </v-card-subtitle>
            <v-card-text class="px-0">
              <v-list rounded dense>
                <v-list-item-group
                  v-model="locationSelected"
                  @change="selectLocation"
                  color="primary"
                >
                  <v-list-item
                    v-for="(port, i) in local.airportList.filter(
                      (el) => el.airportCode !== exceptionLocal.airportCode
                    )"
                    :key="i + 'port'"
                    :value="port"
                    dense
                  >
                    <v-list-item-icon>
                      <v-icon color="primary">mdi-airport</v-icon>
                    </v-list-item-icon>
                    <v-tooltip top color="primary">
                      <template v-slot:activator="{ on }">
                        <v-list-item-content v-on="on">
                          <v-list-item-title
                            >[{{ port.airportCode }}]
                            {{ port.airportName }}</v-list-item-title
                          >
                          <v-list-item-subtitle>{{
                            port.city
                          }}</v-list-item-subtitle>
                        </v-list-item-content>
                      </template>
                      <span>{{ port.airportName }} / {{ port.city }}</span>
                    </v-tooltip>
                    <v-list-item-action>
                      <v-btn
                        small
                        class="tw-normal-case primary--text"
                        color="blue lighten-5"
                        rounded
                        depressed
                        >Select</v-btn
                      >
                    </v-list-item-action>
                  </v-list-item>
                </v-list-item-group>
              </v-list>
            </v-card-text>
          </v-card>
        </v-tab-item>
      </v-tabs>
    </v-card-text>
  </v-card>
</template>
<script>
import GeneralApi from '@/services/GeneralApi'
import { defautlAirport } from '@/localdb/defaultAirport'
export default {
  name: 'SelectLocation',
  props: {
    exceptionLocal: {
      type: [Object, Array],
      default() {
        return {
          PlaceId: ''
        }
      }
    }
  },
  data() {
    return {
      defautlAirport,
      search: '',
      locationSelected: '',
      searchSelected: '',
      airports: [],
      loading: { search: false }
    }
  },
  computed: {
    isSearching() {
      return this.search.length > 0
    },
    airportsFilter() {
      try {
        return this.airports.filter(
          (el) =>
            typeof el.PlaceId !== 'undefined' &&
            el.PlaceId.length > 2 &&
            el.PlaceId !== this.exceptionLocal.airportCode
        )
      } catch (error) {
        return []
      }
    }
  },
  methods: {
    selectLocation() {
      try {
        this.$emit('input', this.locationSelected)
      } catch (error) {}
    },
    async findLocation() {
      try {
        this.loading.search = true
        const locations = await GeneralApi.GetLocation(this.search)
        this.loading.search = false
        this.airports = locations
      } catch (error) {
        this.loading.search = false
      }
    },
    selectSearchResult() {
      try {
        if (this.searchSelected.PlaceId.length > 3) {
          this.searchSelected = {
            PlaceId: 'XXXX'
          }
          return
        }
        this.$emit('input', {
          airportCode: this.searchSelected.PlaceId,
          airportName: this.searchSelected.PlaceName,
          city: this.searchSelected.CityName
        })
      } catch (error) {}
    }
  }
}
</script>
