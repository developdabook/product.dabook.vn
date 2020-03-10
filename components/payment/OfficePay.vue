<template>
  <div class="office-payment">
    <p class="tw-m-0">
      {{ $t('pay_office_note_01') }}
    </p>
    <ul class="normal-list">
      <li v-html="$t('pay_office_note_01_li_01')"></li>
      <li v-html="$t('pay_office_note_01_li_02')"></li>
      <li>
        {{ $t('pay_office_note_01_li_03') }}
        <v-chip color="blue lighten-5" small text-color="blue darken-1"
          >EXVN202901</v-chip
        >
      </li>
    </ul>
    <v-alert text dense type="info" class="tw-text-xs tw-mt-4">
      {{ $t('pay_office_note_02') }}
      <ul class="normal-list">
        <li>
          {{ $t('pay_office_note_02_li_01') }}
        </li>
        <li v-html="$t('pay_office_note_02_li_02')"></li>
      </ul>
    </v-alert>
  </div>
</template>
<script>
export default {
  name: 'OfficePay'
}
</script>
<style lang="postcss">
.office-payment {
  @apply tw-text-xs;
}
</style>
