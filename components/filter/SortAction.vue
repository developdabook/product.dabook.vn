<template>
  <v-card class="sort-component" flat>
    <v-card-text>
      <div class="sort-box">
        <v-btn color="primarytext" small text class="tw-normal-case"
          >{{ $t('sort_alert') }} <v-icon small>mdi-bell-outline</v-icon></v-btn
        >
        <v-menu>
          <template v-slot:activator="{ on }">
            <v-btn color="primarytext" class="normal-btn" text small v-on="on">
              {{ $t('label_sortby') }}<v-icon small>mdi-sort-ascending</v-icon>
            </v-btn>
          </template>
          <v-card>
            <v-list dense>
              <v-subheader>{{ $t('sort_by') }}</v-subheader>
              <v-list-item-group
                v-model="sortSelected"
                color="primary"
                @change="selectSort"
              >
                <v-list-item
                  v-for="(item, i) in sorts"
                  :key="i"
                  :value="item.value"
                >
                  <v-list-item-content>
                    <v-list-item-title
                      v-text="$t(item.name)"
                    ></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  name: 'SortAction',
  data() {
    return {
      sortSelected: [],
      sorts: [
        {
          name: 'sort_price',
          value: 'LOWEST_PRICE',
          icon: 'mdi-sort-bool-descending'
        },
        {
          name: 'sort_time',
          value: 'LOWEST_TIME',
          icon: 'mdi-sort-numeric-ascending'
        },
        {
          name: 'sort_checkin',
          value: 'CHECKIN_TIME',
          icon: 'mdi-sort-bool-ascending'
        }
      ]
    }
  },
  methods: {
    selectSort() {
      this.$store.dispatch('search/updateSort', this.sortSelected)
    }
  }
}
</script>
<style lang="postcss">
.sort-box {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-center;
}
.sort-component {
  @apply tw-rounded-none !important;
}
</style>
