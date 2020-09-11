<template>
  <div id="una">
    {{name}}
    <el-tag type="success" v-if="text" size="small" effect="dark">{{text}}</el-tag>
  </div>
</template>

<script>
export default {
  name: "Username",
  props: {
    name: String,
    text: String,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
/* #una {
  height: 30px;
  line-height: 30px;
} */
</style>
