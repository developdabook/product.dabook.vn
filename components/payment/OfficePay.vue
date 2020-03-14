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

    <div class="visit-box">
      <strong>{{ $t('label_visit') }}</strong>
      <div
        class="tw-flex tw-flex-row tw-justify-between tw-items-center tw-mt-4"
      >
        <v-dialog
          ref="dialogdate"
          v-model="modal.date"
          :return-value.sync="visitTime.date"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              :value="$moment(visitTime.date).format('DD-MM-YYYY')"
              :label="$t('label_date')"
              outlined
              color="primary"
              dense
              class="input-sm tw-rounded-r-none tw-flex-grow"
              readonly
              v-on="on"
            ></v-text-field>
          </template>
          <v-date-picker v-model="visitTime.date" scrollable color="primary">
            <v-spacer></v-spacer>
            <v-btn
              text
              small
              class="normal-btn"
              color="primary"
              @click="modal.date = false"
              >{{ $t('btn_cancel') }}</v-btn
            >
            <v-btn
              text
              small
              class="normal-btn"
              color="primary"
              @click="$refs.dialogdate.save(visitTime.date)"
              >{{ $t('btn_ok') }}</v-btn
            >
          </v-date-picker>
        </v-dialog>
        <v-dialog
          ref="dialogtime"
          v-model="modal.time"
          :return-value.sync="visitTime.time"
          persistent
          width="290px"
        >
          <template v-slot:activator="{ on }">
            <v-text-field
              v-model="visitTime.time"
              outlined
              color="primary"
              dense
              :label="$t('label_time')"
              readonly
              class="input-sm tw-rounded-l-none tw-flex-grow"
              v-on="on"
            ></v-text-field>
          </template>
          <v-time-picker
            v-if="modal.time"
            v-model="visitTime.time"
            color="primary"
            full-width
            format="24hr"
          >
            <v-spacer></v-spacer>
            <v-btn
              text
              small
              class="normal-btn"
              color="primary"
              @click="modal.time = false"
              >{{ $t('btn_cancel') }}</v-btn
            >
            <v-btn
              text
              small
              class="normal-btn"
              color="primary"
              @click="$refs.dialogtime.save(visitTime.time)"
              >{{ $t('btn_ok') }}</v-btn
            >
          </v-time-picker>
        </v-dialog>
      </div>
    </div>
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
  name: 'OfficePay',
  data() {
    return {
      visitTime: {
        date: new Date().toISOString().substr(0, 10),
        time: '09:30'
      },
      modal: {
        date: false,
        time: false
      }
    }
  }
}
</script>
<style lang="postcss">
.office-payment {
  @apply tw-text-xs;
}
.visit-box {
  @apply tw-w-full tw-mt-8;
}
@screen md {
  .visit-box {
    @apply tw-w-1/3 tw-mt-8;
  }
}
@screen lg {
  .visit-box {
    @apply tw-w-1/5 tw-mt-8;
  }
}
</style>
