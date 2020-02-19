<template>
  <v-card flat class="reset-password-component">
    <v-card-title class="tw-text-blue-600"> Reset Password </v-card-title>
    <v-card-subtitle>
      Please input new password
    </v-card-subtitle>
    <v-card-text class="tw-py-4 tw-pb-0">
      <v-text-field
        autofocus
        label="Password"
        placeholder="Your password"
        outlined
        type="password"
        dense
        class="input-sm"
      ></v-text-field>
      <v-text-field
        label="Confirm password"
        placeholder="Confirm your password"
        outlined
        type="password"
        dense
        class="input-sm"
      ></v-text-field>
      <v-text-field
        label="Confirm Code"
        placeholder="Input code we send in email"
        outlined
        type="number"
        dense
        class="input-sm"
      ></v-text-field>
    </v-card-text>
    <v-card-actions class="reset-password-action">
      <v-btn depressed rounded color="primary" class="reset-password-btn"
        >Reset Password</v-btn
      >
    </v-card-actions>
    <v-card-actions>
      <v-btn text color="primary" class="tw-normal-case" nuxt to="/auth/signin">
        Back to login
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'ResetPassword'
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
