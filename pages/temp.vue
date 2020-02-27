<template>
  <PayOption />
</template>
<script>
export default {
  name: 'Temp',
  layout: 'unauthen',
  components: {
    PayOption: () => import('@/components/checkout/PayOption')
  }
}
</script>
