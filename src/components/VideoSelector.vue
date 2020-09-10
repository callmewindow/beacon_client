<template>
  <div>
    <el-select v-model="value1" placeholder="请选择" @change="sendValue1">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>

    <el-select v-model="value2" style="margin-left: 20px;" placeholder="请选择" @change="sendValue2">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "VideoSelector",
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value1: "",
      value2: "",
    };
  },
  methods: {
    sendValue1() {
      this.$emit("sendValue1Event", this.value1);
    },
    sendValue2() {
      this.$emit("sendValue2Event", this.value2);
    },
  },
};
</script>