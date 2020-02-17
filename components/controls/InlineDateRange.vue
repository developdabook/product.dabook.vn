<template>
  <div class="inline-daterange">
    <client-only>
      <vc-date-picker
        :mode="mode"
        v-model="selectedDate"
        :is-inline="true"
        :is-expanded="true"
        :columns="1"
        :rows="12"
      />
    </client-only>
  </div>
</template>
<script>
export default {
  name: 'InlineDateRange',
  data() {
    return {
      // Data used by the date picker
      mode: 'range',
      selectedDate: null
    }
  }
}
</script>
