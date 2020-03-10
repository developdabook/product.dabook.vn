<template>
  <div class="banktrasfer-payment">
    <div class="tw-m-0">
      <span class="tw-m-0" v-html="$t('pay_bank_note_01')"></span>
      <v-chip
        color="blue lighten-5"
        text-color="blue darken-1"
        small
        class="tw-font-bold"
        >VN-224-CK</v-chip
      >
    </div>
    <v-alert text dense type="warning" class="tw-text-xs tw-mt-4">
      {{ $t('pay_bank_note_02') }}
    </v-alert>
    <div>
      <v-item-group v-model="bankSelected" mandatory class="bank-list">
        <div v-for="(bank, i) in banks" :key="i + 'bank'" class="bank-item">
          <v-item v-slot:default="{ active, toggle }">
            <v-card
              color="white"
              :class="active ? 'active' : ''"
              dark
              width="60"
              height="60"
              class="bank-card"
              @click="toggle"
            >
              <img
                width="60"
                height="60"
                aspect-ratio="1"
                :src="`/images/banks/${bank.bankImage}`"
              />
            </v-card>
          </v-item>
        </div>
      </v-item-group>
    </div>
    <v-alert text dense type="info" class="tw-text-xs tw-mt-4">
      {{ $t('pay_bank_note_03') }}
    </v-alert>
  </div>
</template>
<script>
export default {
  name: 'BankTransferPay',
  data() {
    return {
      bankSelected: '',
      banks: [
        {
          bankName: 'VietcomBank',
          bankImage: 'vietcombank.jpg',
          bankNumber: '0451001906812',
          displayBankNumber: '045-100-190-6812',
          bankOwner: 'Công ty TNHH thương mại, dịch vụ và du lịch Đại Mịnh',
          bankBrand: 'Vietcombank công ty - CN Thành Công'
        },
        {
          bankName: 'ShihanBank',
          bankImage: 'shinhanbank.jpg',
          bankNumber: '700003733597 ',
          displayBankNumber: '700-003-733-597',
          bankOwner: 'Công ty TNHH thương mại, dịch vụ và du lịch Đại Mịnh',
          bankBrand: 'Shinhanbank công ty - CN Hà Nội'
        },
        {
          bankName: 'TechcomBank',
          bankImage: 'techcombank.png',
          bankNumber: '19120166939018',
          displayBankNumber: '191-201-669-390-18',
          bankOwner: 'Công ty TNHH thương mại, dịch vụ và du lịch Đại Mịnh',
          bankBrand: 'Techcombank- CN Nội bài quỹ tiết kiệm The Manor'
        },
        {
          bankName: 'HDBank',
          bankImage: 'hdbank.jpg',
          bankNumber: '118704070162636',
          displayBankNumber: '118-704-070-162-636',
          bankOwner: 'Công ty TNHH thương mại, dịch vụ và du lịch Đại Mịnh',
          bankBrand:
            'Ngân hàng TMCP phát triển Tp. Hồ Chí Minh - CN Ba Đinh- PGD Mỹ Đình 2'
        },
        {
          bankName: 'Agribank',
          bankImage: 'agribank.jpg',
          bankNumber: '1410206030890',
          displayBankNumber: '141-020-603-0890',
          bankOwner: 'Công ty TNHH thương mại, dịch vụ và du lịch Đại Mịnh',
          bankBrand:
            'Ngân hàng nông nghiệp và phát triền nông thôn Việt Nam - CN Mỹ Đình'
        },
        {
          bankName: 'VietinBank',
          bankImage: 'vietinbank.png',
          bankNumber: '118002690095',
          displayBankNumber: '118-002-690-095',
          bankOwner: 'Công ty TNHH thương mại, dịch vụ và du lịch Đại Mịnh',
          bankBrand:
            'Ngân hàng TMCP Công thương Việt Nam - Chi nhánh Nam Thăng Long - PGD Mễ Trì'
        }
      ]
    }
  }
}
</script>
<style lang="postcss">
.banktrasfer-payment {
  @apply tw-text-xs;
}
.bank-item {
  @apply tw-p-4;
}
.bank-list {
  @apply tw-flex tw-flex-row tw-justify-start tw-items-center tw-flex-wrap;
}
.bank-card {
  @apply tw-shadow-none tw-border-2 tw-border-gray-300 tw-flex tw-items-center;
}
.bank-card:hover {
  @apply tw-shadow-lg;
}
.bank-card.active {
  @apply tw-border-teal-600 tw-shadow-lg !important;
}
</style>
