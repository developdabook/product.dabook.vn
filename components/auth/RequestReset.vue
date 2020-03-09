<template>
  <v-card flat class="signin-component">
    <v-card-title class="tw-text-blue-600">
      {{ $t('reset_title') }}</v-card-title
    >
    <v-card-subtitle>
      {{ $t('reset_subtitle') }}
    </v-card-subtitle>
    <v-card-text class="tw-py-4 tw-pb-0">
      <v-text-field
        autofocus
        :label="$t('signup_email')"
        placeholder="your@email.com"
        outlined
        dense
        class="input-sm"
      ></v-text-field>
    </v-card-text>
    <v-card-actions class="signin-action">
      <v-btn depressed rounded color="primary" class="signin-btn">{{
        $t('btn_reset')
      }}</v-btn>
    </v-card-actions>
    <v-card-actions>
      <v-btn text color="primary" class="tw-normal-case" nuxt to="/auth/signin">
        {{ $t('reset_backlogin') }}
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'RequestReset'
}
</script>
<style lang="postcss">
.signin-component {
  @apply tw-rounded-lg tw-p-2;
}
.signin-btn {
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
.signin-action {
  @apply tw-flex tw-flex-col tw-justify-start tw-items-stretch tw-p-4 tw-pb-8;
}
@screen md {
  .signin-component {
    @apply tw-rounded-lg tw-p-4;
  }
}
@screen lg {
  .signin-component {
    @apply tw-rounded-lg tw-p-4;
  }
}
</style>
