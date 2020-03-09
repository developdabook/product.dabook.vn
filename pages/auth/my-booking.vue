<template>
  <div class="my-booking-page">
    <MyBooking />
  </div>
</template>
<script>
export default {
  name: 'MyBookingPage',
  components: {
    MyBooking: () => import('@/components/auth/MyBooking')
  },
  layout: 'unauthen'
}
</script>
