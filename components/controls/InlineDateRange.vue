<template>
  <div class="inline-daterange">
    <client-only>
      <vc-date-picker
        v-model="selectedDate"
        :mode="mode"
        :is-inline="true"
        :is-expanded="true"
        :columns="1"
        :rows="12"
        class="tw-border-0"
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
