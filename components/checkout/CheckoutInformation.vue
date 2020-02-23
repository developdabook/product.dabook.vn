<template>
  <div class="checkout-information">
    <v-card outlined class="info-block">
      <v-card-title class="info-title">
        <strong class="pass-number"
          ><v-icon class="info-title-icon">mdi-account-circle</v-icon>
          Passenger
        </strong>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" small text class="select-pass-btn black--text"
              >Select passenger <v-icon small>mdi-chevron-down</v-icon></v-btn
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
        <div class="info-notice">
          <v-alert text dense type="info" class="tw-text-xs">
            Use all given names and surnames exactly as they appear in your
            passport/ID to avoid boarding complications.
          </v-alert>
        </div>
        <div class="field-box">
          <div class="input-box">
            <v-text-field
              label="GivenName"
              placeholder="ex. Tran"
              outlined
              color="primary"
              dense
              class="tw-w-1/2 tw-mr-2 input-sm"
            ></v-text-field>
            <v-text-field
              label="SurName"
              placeholder="ex. Hoang Anh"
              outlined
              color="primary"
              dense
              class="tw-w-1/2 tw-ml-2 input-sm"
            ></v-text-field>
          </div>
          <div class="input-box">
            <div class="tw-w-1/2 tw-flex tw-flex-row tw-mr-2">
              <v-autocomplete
                v-model="friends"
                :items="country"
                outlined
                chips
                dense
                color="primary"
                label="National"
                placeholder="VietNam"
                item-text="name"
                item-value="code"
                class="tw-w-2/3 tw-mr-1 input-sm"
              >
                <template v-slot:selection="data">
                  <v-chip label color="primary" small>
                    {{ data.item.name }}
                  </v-chip>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content
                      v-text="data.item"
                    ></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content>
                      <v-list-item-title
                        v-html="data.item.name"
                      ></v-list-item-title>
                      <v-list-item-subtitle
                        v-html="data.item.group"
                      ></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
              <v-select
                :items="gender"
                label="Gender"
                placeholder="Mr"
                outlined
                dense
                class="tw-w-1/3 input-sm"
              ></v-select>
            </div>
            <v-text-field
              label="Date"
              placeholder="DD"
              outlined
              color="primary"
              dense
              class="tw-w-2/12 tw-ml-2 input-sm  tw-rounded-r-none"
            ></v-text-field>
            <v-select
              :items="month"
              label="Month"
              placeholder="Month"
              outlined
              single-line
              dense
              class="tw-w-2/12 input-sm tw-rounded-none border-x-none"
            ></v-select>
            <v-text-field
              label="Year"
              placeholder="YYYY"
              outlined
              single-line
              color="primary"
              dense
              class="tw-w-2/12 input-sm tw-rounded-l-none"
            ></v-text-field>
          </div>
          <div class="input-box">
            <v-text-field
              label="Passport"
              placeholder="C2500525"
              outlined
              color="primary"
              dense
              class="tw-w-1/2 tw-mr-2 input-sm"
            ></v-text-field>
            <v-text-field
              label="Date"
              placeholder="DD"
              outlined
              color="primary"
              dense
              class="tw-w-2/12 tw-ml-2 input-sm  tw-rounded-r-none"
            ></v-text-field>
            <v-select
              :items="month"
              label="Month"
              placeholder="Month"
              outlined
              single-line
              dense
              class="tw-w-2/12 input-sm tw-rounded-none border-x-none"
            ></v-select>
            <v-text-field
              label="Year"
              placeholder="YYYY"
              outlined
              single-line
              color="primary"
              dense
              class="tw-w-2/12 input-sm tw-rounded-l-none"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
      <v-card-actions> </v-card-actions>
      <v-btn color="primary" class="remove-btn" icon x-small absolute fab>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card>
    <v-card outlined class="info-block">
      <v-card-title class="info-title">
        <strong class="pass-number"
          ><v-icon class="info-title-icon">mdi-account-circle</v-icon>
          Passenger
        </strong>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" small text class="select-pass-btn black--text"
              >Select passenger <v-icon small>mdi-chevron-down</v-icon></v-btn
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
        <div class="info-notice">
          <v-alert text dense type="info" class="tw-text-xs">
            Use all given names and surnames exactly as they appear in your
            passport/ID to avoid boarding complications.
          </v-alert>
        </div>
        <div class="field-box">
          <div class="input-box">
            <v-text-field
              label="GivenName"
              placeholder="ex. Tran"
              outlined
              color="primary"
              dense
              class="tw-w-1/2 tw-mr-2 input-sm"
            ></v-text-field>
            <v-text-field
              label="SurName"
              placeholder="ex. Hoang Anh"
              outlined
              color="primary"
              dense
              class="tw-w-1/2 tw-ml-2 input-sm"
            ></v-text-field>
          </div>
          <div class="input-box">
            <div class="tw-w-1/2 tw-flex tw-flex-row tw-mr-2">
              <v-text-field
                label="National"
                placeholder="ex. Tran"
                outlined
                color="primary"
                dense
                class="tw-w-2/3 tw-mr-1 input-sm"
              ></v-text-field>
              <v-text-field
                label="Gender"
                placeholder="ex. Hoang Anh"
                outlined
                color="primary"
                dense
                class="tw-w-1/3 input-sm"
              ></v-text-field>
            </div>
            <v-text-field
              label="Date"
              placeholder="DD"
              outlined
              color="primary"
              dense
              class="tw-w-2/12 tw-ml-2 input-sm  tw-rounded-r-none"
            ></v-text-field>
            <v-text-field
              label="Month"
              placeholder="Month"
              outlined
              single-line
              color="primary"
              dense
              class="tw-w-2/12 input-sm tw-rounded-none border-x-none"
            ></v-text-field>
            <v-text-field
              label="Year"
              placeholder="YYYY"
              outlined
              single-line
              color="primary"
              dense
              class="tw-w-2/12 input-sm tw-rounded-l-none"
            ></v-text-field>
          </div>
          <div class="input-box">
            <v-text-field
              label="Passport"
              placeholder="ex. Tran"
              outlined
              color="primary"
              dense
              class="tw-w-1/2 tw-mr-2 input-sm"
            ></v-text-field>
            <v-text-field
              label="Date"
              placeholder="DD"
              outlined
              color="primary"
              dense
              class="tw-w-2/12 tw-ml-2 input-sm  tw-rounded-r-none"
            ></v-text-field>
            <v-text-field
              label="Month"
              placeholder="Month"
              outlined
              single-line
              color="primary"
              dense
              class="tw-w-2/12 input-sm tw-rounded-none border-x-none"
            ></v-text-field>
            <v-text-field
              label="Year"
              placeholder="YYYY"
              outlined
              single-line
              color="primary"
              dense
              class="tw-w-2/12 input-sm tw-rounded-l-none"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
      <v-card-actions> </v-card-actions>
      <v-btn color="primary" class="remove-btn" icon x-small absolute fab>
        <v-icon>mdi-close</v-icon>
      </v-btn> </v-card
    ><v-card outlined class="info-block">
      <v-card-title class="info-title">
        <strong class="pass-number"
          ><v-icon class="info-title-icon">mdi-account-circle</v-icon>
          Passenger
        </strong>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn v-on="on" small text class="select-pass-btn black--text"
              >Select passenger <v-icon small>mdi-chevron-down</v-icon></v-btn
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
        <div class="info-notice">
          <v-alert text dense type="info" class="tw-text-xs">
            Use all given names and surnames exactly as they appear in your
            passport/ID to avoid boarding complications.
          </v-alert>
        </div>
        <div class="field-box">
          <div class="input-box">
            <v-text-field
              label="GivenName"
              placeholder="ex. Tran"
              outlined
              color="primary"
              dense
              class="tw-w-1/2 tw-mr-2 input-sm"
            ></v-text-field>
            <v-text-field
              label="SurName"
              placeholder="ex. Hoang Anh"
              outlined
              color="primary"
              dense
              class="tw-w-1/2 tw-ml-2 input-sm"
            ></v-text-field>
          </div>
          <div class="input-box">
            <div class="tw-w-1/2 tw-flex tw-flex-row tw-mr-2">
              <v-text-field
                label="National"
                placeholder="ex. Tran"
                outlined
                color="primary"
                dense
                class="tw-w-2/3 tw-mr-1 input-sm"
              ></v-text-field>
              <v-text-field
                label="Gender"
                placeholder="ex. Hoang Anh"
                outlined
                color="primary"
                dense
                class="tw-w-1/3 input-sm"
              ></v-text-field>
            </div>
            <v-text-field
              label="Date"
              placeholder="DD"
              outlined
              color="primary"
              dense
              class="tw-w-2/12 tw-ml-2 input-sm  tw-rounded-r-none"
            ></v-text-field>
            <v-text-field
              label="Month"
              placeholder="Month"
              outlined
              single-line
              color="primary"
              dense
              class="tw-w-2/12 input-sm tw-rounded-none border-x-none"
            ></v-text-field>
            <v-text-field
              label="Year"
              placeholder="YYYY"
              outlined
              single-line
              color="primary"
              dense
              class="tw-w-2/12 input-sm tw-rounded-l-none"
            ></v-text-field>
          </div>
          <div class="input-box">
            <v-text-field
              label="Passport"
              placeholder="ex. Tran"
              outlined
              color="primary"
              dense
              class="tw-w-1/2 tw-mr-2 input-sm"
            ></v-text-field>
            <v-text-field
              label="Date"
              placeholder="DD"
              outlined
              color="primary"
              dense
              class="tw-w-2/12 tw-ml-2 input-sm  tw-rounded-r-none"
            ></v-text-field>
            <v-text-field
              label="Month"
              placeholder="Month"
              outlined
              single-line
              color="primary"
              dense
              class="tw-w-2/12 input-sm tw-rounded-none border-x-none"
            ></v-text-field>
            <v-text-field
              label="Year"
              placeholder="YYYY"
              outlined
              single-line
              color="primary"
              dense
              class="tw-w-2/12 input-sm tw-rounded-l-none"
            ></v-text-field>
          </div>
        </div>
      </v-card-text>
      <v-card-actions> </v-card-actions>
      <v-btn color="primary" class="remove-btn" icon x-small absolute fab>
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card>
    <div class="add-more-box">
      <v-btn color="primary" class="addmore-btn"
        ><v-icon small class="tw-mr-2">mdi-account-plus-outline</v-icon> Add
        more passengers</v-btn
      >
    </div>
  </div>
</template>
<script>
import country from '@/localdb/country'
import gender from '@/localdb/gender'
export default {
  name: 'CheckoutInformation',
  data() {
    return {
      passengers: ['Adult', 'Child', 'Infant'],
      country,
      gender,
      month: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ]
    }
  }
}
</script>
<style lang="postcss">
.info-block {
  @apply tw-p-4 tw-mb-4 tw-rounded-none !important;
}
.info-title {
  @apply tw-text-base tw-flex tw-flex-row tw-justify-between tw-items-center tw-mb-4 !important;
}
.pass-number {
  @apply tw-flex tw-flex-row tw-items-center;
}
.info-title-icon {
  @apply tw-mr-1 tw-text-gray-700 !important;
}
.remove-btn {
  top: 0.25rem;
  right: 0.25rem;
}
.info-notice {
  @apply tw-text-xs;
}
.input-box {
  @apply tw-flex tw-flex-row tw-justify-between tw-items-start tw-my-2;
}
.field-box {
  @apply tw-pt-4;
}
.select-pass-btn {
  @apply tw-normal-case tw-font-normal tw-text-xs;
}
.add-more-box {
  @apply tw-flex tw-justify-center tw-items-center;
}
.addmore-btn {
  @apply tw-rounded-none tw-font-normal tw-normal-case tw-shadow;
}
.addmore-btn:hover {
  @apply tw-shadow-lg;
}
.border-x-none.theme--light.v-text-field--outlined:not(.v-input--is-focused):not(.v-input--has-state)
  > .v-input__control
  > .v-input__slot
  fieldset {
  border-left: none;
  border-right: none;
}
</style>
