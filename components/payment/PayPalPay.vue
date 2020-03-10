<template>
  <div class="paypal-payment">
    <v-alert text dense type="info" class="tw-text-xs tw-mt-4">
      {{ $t('pay_online_note_01') }}
      <br />{{ $t('pay_online_note_ul') }}
      <ul class="normal-list">
        <li>
          {{ $t('pay_online_note_li_01') }}
        </li>
        <li>
          {{ $t('pay_online_note_li_02') }}
        </li>
        <li>
          {{ $t('pay_online_note_li_03') }}
        </li>
      </ul>
    </v-alert>
  </div>
</template>
<script>
export default {
  name: 'PayPalPay'
}
</script>
