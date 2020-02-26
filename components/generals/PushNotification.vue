<template>
  <div v-if="currentNotification.length > 0" class="push-notification">
    <v-snackbar
      v-for="(noti, $index) in currentNotification"
      :key="$index + 'noti'"
      :value="snackBarStatus"
      :color="classByType(noti.type)"
      top
      @input="updateStatus($event)"
    >
      <div class="tw-flex tw-flex-col tw-justify-start tw-items-start">
        <span class="tw-mr-2 tw-font-bold">{{ noti.title }}</span>
        <span>{{ noti.message }}</span>
      </div>
      <v-btn dark text fab @click="removeNoti(noti)">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>
<script>
export default {
  name: 'PushNotification',
  data() {
    return {
      snackbar: true
    }
  },
  computed: {
    currentNotification() {
      return this.$store.getters['notification/currentNotification']
    },
    snackBarStatus() {
      return this.$store.getters['notification/currentNotificationStatus']
    }
  },
  watch: {
    snackBarStatus(newVal) {
      this.snackbar = newVal
    }
  },
  methods: {
    iconByType(type) {
      switch (type) {
        case 'ERROR':
          return 'error'
        case 'SUCCESS':
          return 'check'
        case 'INFO':
          return 'help_outline'
        default:
          return 'warning'
      }
    },
    classByType(type) {
      switch (type) {
        case 'ERROR':
          return 'error'
        case 'SUCCESS':
          return 'success'
        case 'INFO':
          return 'info'
        default:
          return 'primary'
      }
    },
    removeNoti(noti) {
      this.$store.dispatch('notification/removeNotification', noti)
    },
    updateStatus(payload) {
      this.$store.dispatch('notification/removeAllNotification')
    }
  }
}
</script>
<style lang="postcss">
.noti-item {
  @apply tw-bg-gray-200 tw-rounded-lg tw-shadow-lg tw-p-4 tw-m-2 tw-flex tw-flex-col tw-justify-start tw-items-stretch tw-w-64 tw-border tw-cursor-pointer;
}
.noti-item:hover {
  @apply tw-bg-gray-300;
}
.top-noti {
  @apply tw-flex tw-flex-row tw-justify-start tw-items-center;
}
.top-noti .material-icons {
  @apply tw-w-6 tw-h-6 tw-rounded-full tw-flex tw-justify-center tw-items-center tw-mr-2 !important;
}
.top-noti strong {
  @apply tw-font-bold tw-text-base;
}
.push-fade-enter-active,
.push-fade-leave-active {
  transition: transform 0.5s;
}
.push-fade-enter, .push-fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  transform: translateY(100vh);
}
</style>
