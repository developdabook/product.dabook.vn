<template>
  <v-form v-model="validation.valid" class="delivery-payment" lazy-validation>
    <p class="tw-m-0 tw-mb-8">{{ $t('pay_delivery_note_01') }}<br /></p>
    <v-text-field
      v-model="delivery.name"
      :rules="validation.nameRules"
      :label="$t('pay_delivery_label_received')"
      :placeholder="place.name"
      outlined
      color="primary"
      dense
      class="input-sm"
    ></v-text-field>
    <v-text-field
      v-model="delivery.phone"
      :rules="validation.phoneRules"
      :label="$t('checkout_contact_phone')"
      :placeholder="place.phone"
      outlined
      color="primary"
      dense
      class="input-sm"
    ></v-text-field>
    <v-text-field
      v-model="delivery.address"
      :rules="validation.addressRules"
      :label="$t('label_address')"
      :placeholder="place.address"
      outlined
      color="primary"
      dense
      class="input-sm"
    ></v-text-field>
    <v-textarea outlined :label="$t('label_other_required')" placeholder="...">
    </v-textarea>
    <v-alert text dense type="info" class="tw-text-xs tw-mt-4">
      {{ $t('pay_delivery_note_02') }}
      <br />{{ $t('pay_delivery_note_ul') }}
      <ul class="normal-list">
        <li>
          {{ $t('pay_delivery_note_li_01') }}
        </li>
        <li>
          {{ $t('pay_delivery_note_li_02') }}
        </li>
        <li v-html="$t('pay_delivery_note_li_03')"></li>
      </ul>
    </v-alert>
  </v-form>
</template>
<script>
export default {
  name: 'DeliveryPay',
  data() {
    return {
      delivery: {
        name: '',
        phone: '',
        address: ''
      },
      validation: {
        addressRules: [(v) => !!v || this.$t('field_valid_address')],
        nameRules: [(v) => !!v || this.$t('field_valid_name')],
        phoneRules: [
          (v) => !!v || this.$t('field_valid_phone_required'),
          (value) => {
            const pattern = /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\. ]?[0-9]{3}[-\s\\. ]?[0-9]{1,6}$/im
            return pattern.test(value) || this.$t('field_valid_phone_valid')
          }
        ],
        valid: false
      },
      place: {
        name: this.$t('field_place_fullname'),
        phone: this.$t('field_place_phone'),
        address: this.$t('field_place_address')
      }
    }
  }
}
</script>
<style lang="postcss">
.delivery-payment {
  @apply tw-text-xs;
}
</style>
