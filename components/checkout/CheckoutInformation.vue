<template>
  <v-form
    ref="checkoutForm"
    v-model="validation.valid"
    lazy-validation
    class="checkout-information"
  >
    <v-card
      v-for="(pass, j) in checkout.passengers"
      :key="j + 'pasenger'"
      outlined
      class="info-block passenger-ingo"
    >
      <v-card-title class="info-title">
        <strong class="pass-number"
          ><v-icon class="info-title-icon">mdi-account-circle</v-icon>
          {{ $t('checkout_passenger_label') }}
          {{ j + 1 }}
        </strong>
        <v-select
          v-model="pass.type"
          :items="passengers_sl"
          :rules="validation.passengerTypeRules"
          :disabled="!isAcceptAddPassenger"
          item-text="text"
          item-value="value"
          dense
          class="tw-inline-block tw-flex-grow-0 tw-w-48"
          @change="changePassengerType"
        >
          <template v-slot:selection="{ item }">
            <v-btn
              color="default"
              class="tw-text-normal tw-normal-case"
              x-small
              text
              >{{
                pass.type === ''
                  ? 'Select passenger'
                  : `${$t(item.text)} (${$t(item.detail)})`
              }}</v-btn
            >
          </template>
          <template v-slot:item="{ item }">
            <span class="tw-text-xs">{{
              `${$t(item.text)} (${$t(item.detail)})`
            }}</span>
          </template>
        </v-select>
      </v-card-title>
      <v-card-text>
        <div class="info-notice">
          <v-alert text dense type="info" class="tw-text-xs">
            {{ $t('checkout_fill_note_01') }}
          </v-alert>
        </div>
        <div class="field-box">
          <div class="input-box">
            <div class=" half-left">
              <v-text-field
                v-model="pass.sur_name"
                :rules="validation.surNameRules"
                :hint="hint.sur_name"
                :label="$t('checkout_contact_surname')"
                placeholder="ex. Tran"
                outlined
                color="primary"
                dense
                class="input-sm"
              ></v-text-field>
            </div>
            <div class=" half-right">
              <v-text-field
                v-model="pass.given_name"
                :hint="hint.given_name"
                :rules="validation.givenNameRules"
                :label="$t('checkout_contact_givenname')"
                placeholder="ex. Hoang Anh"
                outlined
                color="primary"
                dense
                class="input-sm"
              ></v-text-field>
            </div>
          </div>
          <div class="input-box">
            <div class="half-left tw-flex tw-flex-row">
              <v-autocomplete
                v-model="pass.residency"
                :items="country"
                :rules="validation.residencyRules"
                outlined
                chips
                dense
                color="primary"
                :label="$t('checkout_contact_national')"
                placeholder="VietNam"
                item-text="name"
                item-value="code"
                class="tw-w-2/3 tw-mr-1 input-sm"
              >
                <template v-slot:selection="data">
                  <div class="tw-w-11/12 tw-overflow-hidden">
                    <v-chip label color="primary" class="tw-px-1" small>
                      {{ data.item.name }}
                    </v-chip>
                  </div>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content
                      v-text="data.item"
                    ></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content>
                      <v-list-item-title>{{
                        data.item.name
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        data.item.group
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
              <v-select
                v-model="pass.gender"
                :items="gender"
                :rules="validation.namePrefixRules"
                :label="$t('checkout_contact_gender')"
                item-text="name"
                item-value="value"
                placeholder="Male"
                outlined
                dense
                class="tw-w-1/3 input-sm"
              >
                <template v-slot:item="{ item }">
                  <span class="tw-font-bold tw-text-xs">{{
                    $t(item.name)
                  }}</span>
                </template>
                <template v-slot:selection="{ item }">
                  <span class="tw-font-bold tw-text-xs">{{
                    $t(item.name)
                  }}</span>
                </template>
              </v-select>
            </div>
            <div class="half-right tw-flex tw-flex-row">
              <DateInput
                ref="birthday"
                v-model="pass.birthday"
                :validate="true"
                :rules="validation.dateRules"
                label="checkout_fill_label_birthday"
                @validate="validation.birthdayValid = $event"
              />
            </div>
          </div>
          <div class="input-box">
            <div class="half-left ">
              <v-text-field
                v-model="pass.passport"
                :label="$t('checkout_fill_passport')"
                placeholder="C2500525"
                outlined
                color="primary"
                dense
                class="input-sm"
              ></v-text-field>
            </div>
            <div class="half-right tw-flex tw-flex-row">
              <DateInput
                v-model="pass.expired_date"
                label="checkout_expired_label"
              />
            </div>
          </div>
        </div>
      </v-card-text>
      <v-btn
        :disabled="checkout.passengers.length === 1"
        color="primary"
        class="remove-btn"
        icon
        x-small
        absolute
        fab
        @click="removePassenger(pass)"
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card>
    <div v-if="isAcceptAddPassenger" class="add-more-box">
      <v-btn
        :disabled="checkout.passengers.length >= 5"
        color="primary"
        class="addmore-btn"
        @click="addMorePassenger"
        ><v-icon small class="tw-mr-2">mdi-account-plus-outline</v-icon>
        {{ $t('btn_add_more_passenger') }}</v-btn
      >
    </div>
    <LoginCTA class="info-block tw-p-0" @logined="updateContactBySignin" />
    <v-card outlined class="info-block contact-ingo">
      <v-card-title class="info-title">
        <strong class="pass-number"
          ><v-icon class="info-title-icon"
            >mdi-account-tie-voice-outline</v-icon
          >
          {{ $t('checkout_contact') }}
        </strong>
        <div class="tw-flex tw-flex-col tw-items-end">
          <v-switch
            v-model="passContactRel"
            hide-details
            @change="migradePassInfo"
          >
          </v-switch>
          <span class="tw-text-xs tw-font-normal">{{
            $t('checkout_using_pas_info')
          }}</span>
        </div>
      </v-card-title>
      <v-card-text>
        <div class="info-notice">
          <v-alert text dense type="info" class="tw-text-xs">
            {{ $t('checkout_contact_note') }}
          </v-alert>
        </div>
        <div class="field-box">
          <div class="input-box">
            <div class="half-left tw-flex tw-flex-row">
              <v-select
                v-model="checkout.contact.name_prefix"
                :items="nameprefix"
                :rules="validation.namePrefixRules"
                :label="$t('checkout_contact_gender')"
                item-text="name"
                item-value="value"
                placeholder="Mr"
                outlined
                dense
                class="tw-w-1/3 input-sm tw-mr-1"
                ><template v-slot:item="{ item }">
                  <span class="tw-font-bold tw-text-xs">{{
                    $t(item.name)
                  }}</span>
                </template>
                <template v-slot:selection="{ item }">
                  <span class="tw-font-bold tw-text-xs">{{
                    $t(item.name)
                  }}</span>
                </template>
              </v-select>
              <v-text-field
                v-model="checkout.contact.sur_name"
                :hint="hint.sur_name"
                :rules="validation.surNameRules"
                :label="$t('checkout_contact_surname')"
                placeholder="ex. Tran"
                outlined
                color="primary"
                dense
                class="tw-w-2/3 input-sm"
              ></v-text-field>
            </div>
            <div class="half-right">
              <v-text-field
                v-model="checkout.contact.given_name"
                :hint="hint.given_name"
                :rules="validation.givenNameRules"
                :label="$t('checkout_contact_givenname')"
                placeholder="ex. Hoang Anh"
                outlined
                color="primary"
                dense
                class="input-sm"
              ></v-text-field>
            </div>
          </div>
          <div class="input-box">
            <div class="half-left">
              <v-text-field
                v-model="checkout.contact.email"
                :rules="validation.emailRules"
                :label="$t('checkout_contact_email')"
                placeholder="ex. your@gmail.com"
                outlined
                color="primary"
                dense
                class="input-sm"
              ></v-text-field>
            </div>
            <div class="half-right tw-flex tw-flex-row">
              <v-autocomplete
                v-model="checkout.contact.national"
                :items="country"
                outlined
                chips
                dense
                color="primary"
                :label="$t('checkout_contact_national')"
                placeholder="VietNam"
                item-text="name"
                item-value="code"
                class="tw-w-1/2 tw-mr-1 input-sm"
              >
                <template v-slot:selection="data">
                  <div class="tw-w-11/12 tw-overflow-hidden">
                    <v-chip label color="primary" class="tw-px-1" small>
                      {{ data.item.name }}
                    </v-chip>
                  </div>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content
                      v-text="data.item"
                    ></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content>
                      <v-list-item-title>{{
                        data.item.name
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        data.item.group
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
              <v-text-field
                v-model="checkout.contact.phone_number"
                :rules="validation.phoneRules"
                :label="$t('checkout_contact_phone')"
                :hint="hint.phone"
                placeholder="+84 933-393-223"
                outlined
                color="primary"
                dense
                class="tw-w-1/2 input-sm"
              ></v-text-field>
            </div>
          </div>
          <div class="input-box">
            <div class="half-left">
              <v-text-field
                v-model="checkout.contact.street"
                :rules="validation.addressRules"
                :label="$t('checkout_contact_street')"
                :hint="hint.street"
                placeholder="Lot 113, Me Tri, Nam Tu Liem"
                outlined
                color="primary"
                dense
                class="input-sm"
              ></v-text-field>
            </div>
            <div class="half-right tw-flex tw-flex-row">
              <v-text-field
                v-model="checkout.contact.city"
                :hint="hint.city"
                :rules="validation.requiredRules"
                :label="$t('checkout_contact_city')"
                placeholder="Ha Noi"
                outlined
                color="primary"
                dense
                class="tw-w-1/2 tw-mr-1 input-sm"
              ></v-text-field>
              <v-autocomplete
                v-model="checkout.contact.residency"
                :rules="validation.requiredRules"
                :items="country"
                outlined
                chips
                dense
                color="primary"
                :label="$t('checkout_contact_country')"
                placeholder="VietNam"
                item-text="name"
                item-value="code"
                class="tw-w-1/2 input-sm"
              >
                <template v-slot:selection="data">
                  <div class="tw-w-11/12 tw-overflow-hidden">
                    <v-chip label color="primary" class="tw-px-1" small>
                      {{ data.item.name }}
                    </v-chip>
                  </div>
                </template>
                <template v-slot:item="data">
                  <template v-if="typeof data.item !== 'object'">
                    <v-list-item-content
                      v-text="data.item"
                    ></v-list-item-content>
                  </template>
                  <template v-else>
                    <v-list-item-content>
                      <v-list-item-title>{{
                        data.item.name
                      }}</v-list-item-title>
                      <v-list-item-subtitle>{{
                        data.item.group
                      }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </template>
              </v-autocomplete>
            </div>
          </div>
        </div>
        <v-expansion-panels
          v-model="expandOpended"
          accordion
          flat
          class="invoice-info"
        >
          <v-expansion-panel @change="expandPanel($event)">
            <v-expansion-panel-header
              class="tw-border-b tw-px-0 tw-flex tw-items-end"
            >
              <template v-if="invoiceUsed" v-slot:default>
                <strong class="pass-number"
                  ><i class="icofont-file-alt tw-text-xl"></i>
                  Invoice
                </strong>
              </template>
              <template v-slot:actions>
                <div class="tw-flex tw-flex-col tw-items-end">
                  <v-switch v-model="invoiceUsed" hide-details> </v-switch>
                  <span class="tw-text-xs">{{
                    $t('checkout_request_invoice')
                  }}</span>
                </div>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <template class="tw-px-0">
                <v-alert text dense type="warning" class="tw-text-xs">
                  {{ $t('checkout_invoice_note_01') }}
                </v-alert>
                <div class="field-box">
                  <div class="input-box">
                    <div class="half-left">
                      <v-text-field
                        v-model="checkout.invoice.company"
                        :rules="validation.companyRules"
                        :label="$t('checkout_invoice_label_company')"
                        placeholder="Công ty TNHH Thuong Mai HD"
                        outlined
                        color="primary"
                        dense
                        class="input-sm"
                      ></v-text-field>
                    </div>
                    <div class="half-right tw-flex tw-flex-row">
                      <v-text-field
                        v-model="checkout.invoice.tax"
                        :rules="validation.taxRules"
                        :label="$t('checkout_invoice_label_tax')"
                        placeholder="05300022350"
                        outlined
                        color="primary"
                        dense
                        class="input-sm"
                      ></v-text-field>
                    </div>
                  </div>
                  <div class="input-box">
                    <v-text-field
                      v-model="checkout.invoice.address"
                      :rules="validation.taxAddressRules"
                      :label="$t('label_address')"
                      placeholder="Lot 113, Me Tri, Nam Tu Liem, Ha Noi"
                      outlined
                      color="primary"
                      dense
                      class="input-sm"
                    ></v-text-field>
                  </div>
                </div>
              </template>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-card-text>
    </v-card>
    <div class="select-payment-box">
      <v-btn
        text
        color="primary"
        class="reservation-btn"
        large
        @click="makeReservation"
      >
        <i class="icofont-air-ticket tw-mr-2 icofont-2x"></i
        >{{ $t('btn_make_reservation') }}</v-btn
      >
      <v-btn color="primary" class="addmore-btn" large @click="checkoutPayment">
        <i class="icofont-pay tw-mr-2 icofont-2x"></i>
        {{ $t('btn_select_payment') }}</v-btn
      >
    </div>
    <section class="section-dialog">
      <v-dialog v-model="reservationDialog" max-width="490" persistent>
        <ReservationBox @close="reservationDialog = false" />
      </v-dialog>
    </section>
  </v-form>
</template>
<script>
import country from '@/localdb/country'
import gender from '@/localdb/gender'
import nameprefix from '@/localdb/nameprefix'
import passengers from '@/localdb/passenger'
export default {
  name: 'CheckoutInformation',
  components: {
    DateInput: () =>
      import(/* webpackPrefetch: true */ '@/components/checkout/DateInput'),
    ReservationBox: () =>
      import(
        /* webpackPrefetch: true */ '@/components/checkout/ReservationBox'
      ),
    LoginCTA: () =>
      import(/* webpackPrefetch: true */ '@/components/generals/LoginCTA')
  },
  data() {
    return {
      reservationDialog: false,
      expandOpended: undefined,
      passengers_sl: passengers,
      country,
      gender,
      nameprefix,
      checkout: {
        passengers: this.$store.getters['search/generatePassengers'],
        contact: {
          name_prefix: 'MR',
          given_name: '',
          sur_name: '',
          phone_number: '',
          email: '',
          street: '',
          city: '',
          residency: 'VNM'
        },
        invoice: {
          tax: '',
          company: '',
          address: ''
        }
      },
      validation: {
        requiredRules: [(v) => !!v || this.$t('field_valid_required')],
        givenNameRules: [(v) => !!v || this.$t('field_valid_givenname')],
        surNameRules: [(v) => !!v || this.$t('field_valid_surname')],
        residencyRules: [(v) => !!v || this.$t('field_valid_residency')],
        namePrefixRules: [(v) => !!v || this.$t('field_valid_nameprefix')],
        passengerTypeRules: [
          (v) => !!v || this.$t('field_valid_passengertype')
        ],
        companyRules: [
          (v) =>
            this.invoiceUsed === false ||
            (!!v && this.invoiceUsed === true) ||
            this.$t('field_valid_company')
        ],
        taxRules: [
          (v) =>
            this.invoiceUsed === false ||
            (!!v && this.invoiceUsed === true) ||
            this.$t('field_valid_tax')
        ],
        taxAddressRules: [
          (v) =>
            this.invoiceUsed === false ||
            (!!v && this.invoiceUsed === true) ||
            this.$t('field_valid_taxaddress')
        ],
        addressRules: [(v) => !!v || this.$t('field_valid_address')],
        dateRules: [
          (v) =>
            v || this.validation.birthdayValid || this.$t('field_valid_date')
        ],
        emailRules: [
          (v) => !!v || this.$t('field_valid_email_required'),
          (v) => /.+@.+\..+/.test(v) || this.$t('field_valid_email_valid')
        ],
        acceptTermRules: [
          (v) => v === true || this.$t('field_valid_acceptterm')
        ],
        phoneRules: [
          (v) => !!v || this.$t('field_valid_phone_required'),
          (value) => {
            const pattern = /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\. ]?[0-9]{3}[-\s\\. ]?[0-9]{1,6}$/im
            return pattern.test(value) || this.$t('field_valid_phone_valid')
          }
        ],
        birthdayValid: false,
        valid: false
      },
      hint: {
        phone: this.$t('hint_phone'),
        email: this.$t('hint_email'),
        sur_name: this.$t('hint_sur_name'),
        given_name: this.$t('hint_given_name'),
        street: this.$t('hint_street'),
        city: this.$t('hint_city')
      },
      invoiceUsed: false,
      passContactRel: false
    }
  },
  computed: {
    isAcceptAddPassenger() {
      return this.$store.getters['checkout/isAcceptAddPassenger']
    },
    userProfile() {
      return this.$store.getters['auth/getUserProfile']
    }
  },
  methods: {
    expandPanel() {
      if (this.expandOpended === 0) {
        this.invoiceUsed = false
        return
      }
      this.invoiceUsed = true
    },
    addMorePassenger() {
      this.checkout.passengers.push({
        type: 'ADULT',
        gender: 'MALE',
        given_name: '',
        sur_name: '',
        birthday: '',
        residency: 'VNM',
        passport: '',
        expired_date: ''
      })
      this.$store.dispatch('search/updatePassengerQty', {
        target: 'ADULT',
        qty: 1
      })
    },
    removePassenger(payload) {
      this.$store.dispatch('search/updatePassengerQty', {
        target: payload.type,
        qty: -1
      })
      this.checkout.passengers.splice(
        this.checkout.passengers.indexOf(payload),
        1
      )
    },
    removeInvoice() {
      if (!this.invoiceUsed) {
        this.$store.dispatch('checkout/removeInvoice')
      }
    },
    changePassengerType() {
      const payload = this.sumaryPassengers()
      this.$store.dispatch('search/updateAllPassengers', payload)
    },
    sumaryPassengers() {
      const sum = {
        ADULT: 0,
        CHILD: 0,
        INFANT: 0
      }
      this.checkout.passengers.forEach((element) => {
        sum[element.type]++
      })
      return sum
    },
    summaryIssueInfo() {
      return this.checkout
    },
    makeReservation() {
      this.$refs.birthday.forEach((element) => {
        element.checkValidate()
      })
      if (this.$refs.checkoutForm.validate() && this.validation.birthdayValid) {
        this.$store.dispatch('checkout/updateCheckoutSelect', this.checkout)
        this.removeInvoice()
        this.reservationDialog = true
      }
    },
    checkoutPayment() {
      this.$refs.birthday.forEach((element) => {
        element.checkValidate()
      })
      if (this.$refs.checkoutForm.validate() && this.validation.birthdayValid) {
        this.removeInvoice()
        this.$router.push({
          path: 'pay',
          query: {
            section: this.$store.getters['search/getSection']
          }
        })
      }
    },
    migradePassInfo() {
      if (this.passContactRel) {
        this.checkout.contact.given_name = this.checkout.passengers[0].given_name
        this.checkout.contact.sur_name = this.checkout.passengers[0].sur_name
        this.checkout.contact.national = this.checkout.passengers[0].residency
        this.checkout.contact.residency = this.checkout.passengers[0].residency
      } else {
        this.checkout.contact.name_prefix = 'MR'
        this.checkout.contact.given_name = ''
        this.checkout.contact.sur_name = ''
        this.checkout.contact.national = 'VNM'
        this.checkout.contact.residency = 'VNM'
      }
    },
    updateContactBySignin() {
      if (!this.passContactRel) {
        this.checkout.contact.given_name = this.userProfile.given_name
        this.checkout.contact.sur_name = this.userProfile.sur_name
      }
    }
  }
}
</script>
<style lang="postcss">
.info-block {
  @apply tw-p-0 tw-mb-4 tw-rounded-none !important;
}
.half-left {
  @apply tw-w-full tw-m-0 tw-pb-4;
}
.half-right {
  @apply tw-w-full tw-m-0 tw-mb-4;
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
  @apply tw-flex tw-flex-row tw-justify-between tw-items-start tw-flex-wrap tw-m-0;
}
.field-box {
  @apply tw-pt-4;
}
.select-pass-btn {
  @apply tw-normal-case tw-font-normal tw-text-xs;
}
.add-more-box {
  @apply tw-flex tw-justify-center tw-items-center tw-my-8;
}
.select-payment-box {
  @apply tw-flex tw-justify-end tw-items-center tw-my-8;
}
.reservation-btn {
  @apply tw-rounded-none tw-font-normal tw-normal-case;
}
.addmore-btn {
  @apply tw-rounded-none tw-font-normal tw-normal-case tw-shadow;
}
.addmore-btn:hover {
  @apply tw-shadow-lg;
}
.invoice-info .v-expansion-panel-content__wrap {
  @apply tw-px-0 tw-py-4;
}
@screen md {
  .info-block {
    @apply tw-p-4 tw-mb-4 tw-rounded-none;
  }
  .half-left {
    @apply tw-w-1/2 tw-m-0 tw-pr-2;
  }
  .half-right {
    @apply tw-w-1/2 tw-m-0 tw-pl-2;
  }
}
</style>
