<template>
  <div class="background-component">
    <div
      :style="`background-image: url('/images/background/${cuBg}.jpg')`"
      class="background-image"
    ></div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Background',
  data() {
    return {
      bgs: [0, 1, 2, 3, 4],
      currentBg: [0, 1, 2, 3, 4][Math.floor(Math.random() * 5)],
      polling: null
    }
  },
  computed: {
    cuBg() {
      return this.currentBg
    }
  },
  created() {
    this.changeBg()
  },
  beforeDestroy() {
    clearInterval(this.polling)
  },
  methods: {
    changeBg() {
      this.polling = setInterval(() => {
        this.currentBg = this.bgs[Math.floor(Math.random() * this.bgs.length)]
      }, 60000)
    }
  }
}
</script>
<style lang="postcss">
.absolute-bg {
}
.background-component {
  height: 600px;
  @apply tw-relative tw-w-screen;
}
.background-image {
  height: 600px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: bottom;
  z-index: 0;
  @apply tw-absolute tw-bg-blue-600 tw-top-0 tw-left-0 tw-w-screen;
}
@screen md {
  .background-component {
    height: 800px;
  }
  .background-image {
    height: 800px;
  }
}
</style>
