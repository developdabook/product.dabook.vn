import Vue from 'vue'
import PushNotification from '../components/generals/PushNotification'
import OfficePay from '../components/payment/OfficePay'
import BankTransferPay from '../components/payment/BankTransferPay'
import DeliveryPay from '../components/payment/DeliveryPay'
import OnePayPay from '../components/payment/OnePayPay'
import PayPalPay from '../components/payment/PayPalPay'
import ComingSoon from '../components/generals/ComingSoon'

Vue.component('PushNotification', PushNotification)
Vue.component('OfficePay', OfficePay)
Vue.component('BankTransferPay', BankTransferPay)
Vue.component('DeliveryPay', DeliveryPay)
Vue.component('OnePayPay', OnePayPay)
Vue.component('PayPalPay', PayPalPay)
Vue.component('ComingSoon', ComingSoon)
