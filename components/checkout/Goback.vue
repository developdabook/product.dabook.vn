<template>
  <div class="tw-py-4">
    <v-btn text color="primary" class="normal-btn" @click="goback"
      ><v-icon>mdi-arrow-left</v-icon> Back step</v-btn
    >
  </div>
</template>
<script>
export default {
  name: 'Goback',
  methods: {
    goback() {
      this.$emit('goback')
      this.$router.go(-1)
    }
  }
}
</script>
