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
          ><v-icon class="info-title-icon">mdi-account-circle</v-icon> Passenger
          {{ j + 1 }}
        </strong>
        <v-select
          :items="passengers_sl"
          :rules="validation.passengerTypeRules"
          v-model="pass.type"
          item-text="text"
          item-value="value"
          dense
          class="tw-inline-block tw-flex-grow-0 tw-w-48"
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
                  : `${item.text} (${item.detail})`
              }}</v-btn
            >
          </template>
        </v-select>
      </v-card-title>
      <v-card-text>
        <div class="info-notice">
          <v-alert text dense type="info" class="tw-text-xs">
            Sử dụng họ/ tên chính xác như trên chứng minh thư, hộ chiếu của bạn
            để tránh gặp phải vấn đề khi lên máy bay
          </v-alert>
        </div>
        <div class="field-box">
          <div class="input-box">
            <div class=" half-left">
              <v-text-field
                v-model="pass.given_name"
                :rules="validation.givenNameRules"
                label="GivenName"
                placeholder="ex. Tran"
                outlined
                color="primary"
                dense
                class="input-sm"
              ></v-text-field>
            </div>
            <div class=" half-right">
              <v-text-field
                v-model="pass.sur_name"
                :rules="validation.surNameRules"
                label="SurName"
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
                v-model="pass.name_prefix"
                :rules="validation.namePrefixRules"
                label="Gender"
                placeholder="Mr"
                outlined
                dense
                class="tw-w-1/3 input-sm"
              ></v-select>
            </div>
            <div class="half-right tw-flex tw-flex-row">
              <DateInput
                ref="birthday"
                v-model="pass.birthday"
                :validate="true"
                :rules="validation.dateRules"
                @validate="validation.birthdayValid = $event"
              />
            </div>
          </div>
          <div class="input-box">
            <div class="half-left ">
              <v-text-field
                v-model="pass.passport"
                label="Passport"
                placeholder="C2500525"
                outlined
                color="primary"
                dense
                class="input-sm"
              ></v-text-field>
            </div>
            <div class="half-right tw-flex tw-flex-row">
              <DateInput v-model="pass.expired_date" />
            </div>
          </div>
        </div>
      </v-card-text>
      <v-card-actions> </v-card-actions>
      <v-btn
        @click="removePassenger(pass)"
        :disabled="checkout.passengers.length === 1"
        color="primary"
        class="remove-btn"
        icon
        x-small
        absolute
        fab
      >
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-card>
    <div class="add-more-box">
      <v-btn
        @click="addMorePassenger"
        :disabled="checkout.passengers.length >= 5"
        color="primary"
        class="addmore-btn"
        ><v-icon small class="tw-mr-2">mdi-account-plus-outline</v-icon> Add
        more passengers</v-btn
      >
    </div>
    <v-card outlined class="info-block contact-ingo">
      <v-card-title class="info-title">
        <strong class="pass-number"
          ><v-icon class="info-title-icon"
            >mdi-account-tie-voice-outline</v-icon
          >
          Contact
        </strong>
      </v-card-title>
      <v-card-text>
        <div class="info-notice">
          <v-alert text dense type="info" class="tw-text-xs">
            Please fill exactly your contact info. We will send ticket throw
            those informations
          </v-alert>
        </div>
        <div class="field-box">
          <div class="input-box">
            <div class="half-left tw-flex tw-flex-row">
              <v-select
                :items="gender"
                v-model="checkout.contact.name_prefix"
                label="Gender"
                placeholder="Mr"
                outlined
                dense
                class="tw-w-1/3 input-sm tw-mr-1"
              ></v-select>
              <v-text-field
                v-model="checkout.contact.given_name"
                label="GivenName"
                placeholder="ex. Tran"
                outlined
                color="primary"
                dense
                class="tw-w-2/3 input-sm"
              ></v-text-field>
            </div>
            <div class="half-right">
              <v-text-field
                v-model="checkout.contact.sur_name"
                label="SurName"
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
                v-model="checkout.contact.national"
                :items="country"
                outlined
                chips
                dense
                color="primary"
                label="National"
                placeholder="VietNam"
                item-text="name"
                item-value="code"
                class="tw-w-1/3 tw-mr-1 input-sm"
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
              <v-text-field
                v-model="checkout.contact.phone_number"
                label="Phone"
                placeholder="+84 933-393-223"
                outlined
                color="primary"
                dense
                class="tw-w-2/3 input-sm"
              ></v-text-field>
            </div>
            <div class="half-right">
              <v-text-field
                v-model="checkout.contact.email"
                label="Email"
                placeholder="ex. your@gmail.com"
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
                v-model="checkout.contact.street"
                label="Stress"
                placeholder="Lot 113, Me Tri"
                outlined
                color="primary"
                dense
                class="input-sm"
              ></v-text-field>
            </div>
            <div class="half-right tw-flex tw-flex-row">
              <v-text-field
                v-model="checkout.contact.city"
                label="City"
                placeholder="Lot 113, Me Tri"
                outlined
                color="primary"
                dense
                class="tw-w-1/2 tw-mr-1 input-sm"
              ></v-text-field>
              <v-text-field
                v-model="checkout.contact.residency"
                label="Resident"
                placeholder="Lot 113, Me Tri"
                outlined
                color="primary"
                dense
                class="tw-w-1/2 input-sm"
              ></v-text-field>
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
              <template v-slot:default v-if="invoiceUsed">
                <strong class="pass-number"
                  ><i class="icofont-file-alt tw-text-xl"></i>
                  Invoice
                </strong>
              </template>
              <template v-slot:actions>
                <div class="tw-flex tw-flex-col tw-items-end">
                  <v-switch v-model="invoiceUsed" hide-details> </v-switch>
                  <span class="tw-text-xs">Bạn có muốn xuất hóa đơn đỏ</span>
                </div>
              </template>
            </v-expansion-panel-header>
            <v-expansion-panel-content>
              <template class="tw-px-0">
                <v-alert text dense type="warning" class="tw-text-xs">
                  Hóa đơn được xuất theo thông tin được ghi dưới đây. Quý khách
                  vui lòng kiểm tra kĩ thông tin trước khi gửi đi
                </v-alert>
                <div class="field-box">
                  <div class="input-box">
                    <div class="half-left">
                      <v-text-field
                        v-model="checkout.invoice.company"
                        label="Tên công ty"
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
                        label="Mã số thuế"
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
                      label="Địa chỉ"
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
      <v-btn @click="checkoutPayment" color="primary" class="addmore-btn"
        ><v-icon small class="tw-mr-2">mdi-credit-card-settings-outline</v-icon>
        Next <v-icon small>mdi-pan-right</v-icon>
        <v-icon small class="tw-mr-2">mdi-pan-right</v-icon> Select
        payment</v-btn
      >
    </div>
  </v-form>
</template>
<script>
import country from '@/localdb/country'
import gender from '@/localdb/gender'
import passengers from '@/localdb/passenger'
export default {
  name: 'CheckoutInformation',
  components: {
    DateInput: () => import('@/components/checkout/DateInput')
  },
  data() {
    return {
      expandOpended: undefined,
      passengers_sl: passengers,
      country,
      gender,
      checkout: {
        passengers: this.$store.getters['search/generatePassengers'],
        contact: {
          name_prefix: '',
          given_name: '',
          sur_name: '',
          phone_number: '',
          email: '',
          street: '',
          city: '',
          residency: ''
        },
        invoice: {
          tax: '',
          company: '',
          address: ''
        }
      },
      validation: {
        givenNameRules: [(v) => !!v || 'Given name is required'],
        surNameRules: [(v) => !!v || 'Sur name is required'],
        residencyRules: [(v) => !!v || 'Residency is required'],
        namePrefixRules: [(v) => !!v || 'Gender is required'],
        passengerTypeRules: [(v) => !!v || 'Passenger Type is required'],
        dateRules: [
          (v) => v || this.validation.birthdayValid || 'Birthday is required'
        ],
        emailRules: [
          (v) => !!v || 'E-mail is required',
          (v) => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        acceptTermRules: [
          (v) => v === true || 'Please accept our term and condition'
        ],
        phoneRules: [
          (v) => !!v || 'Phone number required',
          (value) => {
            const pattern = /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{1,6}$/im
            return pattern.test(value) || 'Invalid phone number.'
          }
        ],
        birthdayValid: false,
        valid: false
      },
      invoiceUsed: false
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
        name_prefix: '',
        given_name: '',
        sur_name: '',
        birthday: '',
        residence: '',
        passport: '',
        expired_date: ''
      })
    },
    removePassenger(payload) {
      this.checkout.passengers.splice(
        this.checkout.passengers.indexOf(payload),
        1
      )
    },
    checkoutPayment() {
      this.$refs.birthday.forEach((element) => {
        element.checkValidate()
      })
      this.$refs.checkoutForm.validate()
    }
  }
}
</script>
<style lang="postcss">
.info-block {
  @apply tw-p-0 tw-mb-4 tw-rounded-none;
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