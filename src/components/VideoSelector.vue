<template>
  <div>
    <el-select v-model="value1" placeholder="请选择" @change="sendValue1">
      <el-option
        v-for="item in courseArray"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>

    <el-select v-model="value2" style="margin-left: 20px;" placeholder="请选择" @change="sendValue2">
      <el-option
        v-for="item in urlArray"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "VideoSelector",
  props: {
    videoUrlArray: Array,
  },
  data() {
    return {
      courseArray: this.videoUrlArray,
      urlArray: [],
      value1: "",
      value2: "",
    };
  },
  methods: {
    sendValue1() {
      this.urlArray = this.courseArray[this.value1 - 1].urlArray;
      this.$emit("sendValue1Event", this.value1);
    },
    sendValue2() {
      this.$emit("sendValue2Event", this.value2);
    },
  },
};
</script>