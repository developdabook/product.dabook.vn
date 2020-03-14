<template>
  <v-card flat class="reset-password-component">
    <v-card-title class="tw-text-blue-600">
      {{ $t('label_reset_title') }}
    </v-card-title>
    <v-card-subtitle>
      {{ $t('label_reset_detail') }}
    </v-card-subtitle>
    <v-card-text class="tw-py-4 tw-pb-0">
      <v-text-field
        autofocus
        :label="$t('signup_password')"
        :placeholder="place.password"
        outlined
        type="password"
        dense
        class="input-sm"
      ></v-text-field>
      <v-text-field
        :label="$t('signup_confirm')"
        :placeholder="place.confirmPassword"
        outlined
        type="password"
        dense
        class="input-sm"
      ></v-text-field>
      <v-text-field
        :label="$t('label_confirmcode')"
        :placeholder="place.confirmCode"
        outlined
        type="number"
        dense
        class="input-sm"
      ></v-text-field>
    </v-card-text>
    <v-card-actions class="reset-password-action">
      <v-btn depressed rounded color="primary" class="reset-password-btn">{{
        $t('btn_resetpass')
      }}</v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn text color="primary" class="tw-normal-case" nuxt to="/auth/signin">
        {{ $t('btn_backlogin') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'ResetPassword',
  data() {
    return {
      place: {
        confirmCode: this.$t('field_place_confirmcode'),
        password: this.$t('field_place_password'),
        confirmPassword: this.$t('field_place_confirmpass')
      }
    }
  }
}
</script>
<style lang="postcss">
.reset-password-component {
  @apply tw-rounded-lg tw-p-2;
}
.reset-password-btn {
  @apply tw-p-0 tw-m-0 tw-normal-case !important;
}
.input-sm {
  @apply tw-text-sm;
}
.icon-image {
  height: 20px;
  width: 20px;
}
.oauth-btn {
  @apply tw-flex-grow tw-normal-case;
}
.reset-password-action {
  @apply tw-flex tw-flex-col tw-justify-start tw-items-stretch tw-p-4 tw-pb-8;
}
@screen md {
  .reset-password-component {
    @apply tw-rounded-lg tw-p-4;
  }
}
@screen lg {
  .reset-password-component {
    @apply tw-rounded-lg tw-p-4;
  }
}
</style>
