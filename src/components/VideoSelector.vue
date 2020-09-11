<template>
  <div>
    <el-select v-model="value1" placeholder="请选择" @change="sendValue1">
      <el-option
        v-for="item in course_array"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      ></el-option>
    </el-select>

    <el-select v-model="value2" style="margin-left: 20px;" placeholder="请选择" @change="sendValue2">
      <el-option
        v-for="item in url_array"
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
    video_url_array: Array,
  },
  data() {
    return {
      course_array: this.video_url_array,
      url_array: [],
      value1: "",
      value2: "",
    };
  },
  methods: {
    sendValue1() {
      this.url_array = this.course_array[this.value1 - 1].url_array;
      this.$emit("sendValue1Event", this.value1);
    },
    sendValue2() {
      this.$emit("sendValue2Event", this.value2);
    },
  },
};
</script>