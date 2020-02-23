<template>
  <div class="checkout-information">
    <v-card flat class="info-block">
      <v-card-title class="info-title">
        <strong
          ><v-icon class="info-title-icon">mdi-account-circle</v-icon>
          Passenger
        </strong>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" small text class="tw-normal-case tw-text-sm white"
              >Select passenger <v-icon>mdi-chevron-down</v-icon></v-btn
            >
          </template>
          <v-card>
            <v-list dense>
              <v-subheader>Select passenger</v-subheader>
              <v-list-item-group color="primary">
                <v-list-item
                  v-for="(item, i) in passengers"
                  :key="i"
                  :value="item"
                >
                  <v-list-item-content>
                    <v-list-item-title v-text="item"></v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-menu>
      </v-card-title>
      <v-card-text>
        <v-alert text dense prominent type="primary" class="info-notice">
          <v-icon color="primary" small>mdi-information</v-icon>
          Use all given names and surnames exactly as they appear in your
          passport/ID to avoid boarding complications.
        </v-alert>
        <div class="input-box">
          <v-text-field
            label="GivenName"
            placeholder="ex. Tran"
            outlined
            color="primary"
            dense
            class="tw-w-1/2 tw-mr-1 input-sm"
          ></v-text-field>
          <v-text-field
            label="SurName"
            placeholder="ex. Hoang Anh"
            outlined
            color="primary"
            dense
            class="tw-w-1/2 tw-ml-1 input-sm"
          ></v-text-field>
        </div>
      </v-card-text>
      <v-card-actions> </v-card-actions>
      <v-btn color="primary" class="remove-btn" icon x-small absolute fab>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card>
    <v-card flat class="info-block">
      <v-card-title class="info-title">
        <v-icon class="info-title-icon">mdi-account-circle</v-icon> Passenger
      </v-card-title>
      <v-card-text> </v-card-text>
      <v-card-actions> </v-card-actions>
    </v-card>
    <v-card flat class="info-block">
      <v-card-title class="info-title">
        <v-icon class="info-title-icon">mdi-baby-carriage</v-icon> Passenger
      </v-card-title>
      <v-card-text> </v-card-text>
      <v-card-actions> </v-card-actions>
    </v-card>
  </div>
</template>
<script>
export default {
  name: 'CheckoutInformation',
  data() {
    return {
      passengers: ['Adult', 'Child', 'Infant']
    }
  }
}
</script>
<style lang="postcss">
.info-block {
  @apply tw-p-4 tw-mb-4 tw-rounded-none !important;
}
.info-title {
  @apply tw-text-base tw-flex tw-flex-row tw-justify-between tw-items-center !important;
}
.info-title-icon {
  @apply tw-mr-1 !important;
}
.remove-btn {
  top: 0.25rem;
  right: 0.25rem;
}
.info-notice {
  @apply tw-text-xs;
}
.input-box {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-start;
}
</style>
