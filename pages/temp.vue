<template>
  <div>
    <div class="header-letter"></div>
    <div class="footer-letter"></div>
    <PayOption />
  </div>
</template>
<script>
export default {
  name: 'Temp',
  layout: 'unauthen',
  components: {
    PayOption: () =>
      import(/* webpackPrefetch: true */ '@/components/payment/PayOption')
  }
}
</script>
