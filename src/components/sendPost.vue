<template>
  <div id="sendPA">

    <el-select
      v-model="value"
      multiple
      filterable
      allow-create
      default-first-option
      placeholder="请选择文章标签"
    >
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value"></el-option>
    </el-select>
  </div>
</template>

<script>
export default {
  name: "sendPost",
  data() {
    return {
      post: {
        title: "这是帖子标题",
        content: "这是帖子内容",
      },
      options: [
        {
          value: "",
          label: "HTML",
        },
        {
          value: "CSS",
          label: "CSS",
        },
        {
          value: "JavaScript",
          label: "JavaScript",
        },
      ],
      value: [],
    };
  },
};
</script>

<style scoped>
#sendPA{
  width: 500px;
  height: 600px;
  margin-left: 50px;
  margin-top: 50px;
}
</style>