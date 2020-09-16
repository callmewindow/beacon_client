<template>
  <video id="video-player" controls @play="sendStartTime" @pause="sendPauseTime"></video>
</template>

<script>
export default {
  name: "VideoPlayer",
  methods: {
    sendStartTime() {
      let startTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
      this.$emit("startTime", startTime);
    },

    sendPauseTime() {
      let pauseTime = new Date().Format("yyyy-MM-dd hh:mm:ss");
      this.$emit("pauseTime", pauseTime);
    },
  },
};
</script>

<style scoped>
</style>

