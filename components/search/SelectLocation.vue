<template>
  <v-card flat class="tw-rounded-none"
    ><v-card-subtitle class="tw-text-gray-400 tw-font-bold">
      {{ $t('search_popup_local_title') }}
    </v-card-subtitle>
    <v-progress-linear
      :active="loading.search"
      :indeterminate="loading.search"
      absolute
      color="teal accent-4"
    ></v-progress-linear>
    <v-card-subtitle>
      <v-text-field
        v-model="search"
        outlined
        rounded
        autofocus
        dense
        clearable
        hide-details
        prepend-inner-icon="mdi-google-maps"
        :placeholder="$t('search_popup_local_placeholder')"
        class="tw-text-sm"
        @keydown="findLocation"
      ></v-text-field>
    </v-card-subtitle>
    <v-card-text v-if="isSearching">
      <v-list v-if="loading.search">
        <v-skeleton-loader
          v-for="i in 4"
          :key="i + 'skeleton'"
          type="list-item-avatar-two-line"
          class="mx-auto"
        >
        </v-skeleton-loader
      ></v-list>
      <v-list v-else rounded dense>
        <v-list-item-group
          v-model="searchSelected"
          color="primary"
          @change="selectSearchResult"
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
                text
                >{{ $t('btn_select_option') }}</v-btn
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
                      :disabled="port.PlaceId.length > 3"
                      small
                      class="tw-normal-case primary--text"
                      color="primary"
                      rounded
                      depressed
                      text
                      v-on="on"
                      >{{ $t('btn_select_option') }}</v-btn
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
          >{{ $t(area) }}</v-tab
        >
        <v-tab-item
          v-for="(area, i) in Object.values(defautlAirport)"
          :key="i + 'areaC'"
        >
          <v-card v-for="(local, j) in area" :key="j + 'local'" flat>
            <v-card-subtitle>
              {{ $t(local.area) }}
            </v-card-subtitle>
            <v-card-text class="px-0">
              <v-lazy>
                <v-list rounded dense>
                  <v-list-item-group
                    v-model="locationSelected"
                    color="primary"
                    @change="selectLocation"
                  >
                    <v-list-item
                      v-for="(port, k) in local.airportList.filter(
                        (el) => el.airportCode !== exceptionLocal.airportCode
                      )"
                      :key="k + 'port'"
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
                          color="primary"
                          rounded
                          text
                          depressed
                          >{{ $t('btn_select_option') }}</v-btn
                        >
                      </v-list-item-action>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-lazy>
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
        this.search = ''
        this.$emit('close')
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
        this.search = ''
        this.$emit('close')
      } catch (error) {}
    }
  }
}
</script>
