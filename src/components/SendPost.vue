<template>
  <div id="sendPA">
    <!-- <div slot="header">
      发布帖子
    </div> -->
    <div class="sendItem">
      <div class="itemTitle"><span style="color:red">*</span>帖子标题</div>
      <el-input v-model="post.title" placeholder="请输入内容" maxlength="30" show-word-limit></el-input>
    </div>
    <div class="sendItem">
      <div class="itemTitle"><span style="color:red">*</span>帖子内容</div>
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入内容"
        v-model="post.content"
        resize="none"
        maxlength="500"
        show-word-limit
      ></el-input>
    </div>
    <div class="sendItem" style="width:50%">
      <div class="itemTitle">帖子标签</div>
      <el-select
        v-model="value"
        disabled
        multiple
        filterable
        allow-create
        default-first-option
        placeholder="添加额外标签"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </div>
    <el-button id="sendBtn" type="primary" size="small" @click="sendPost">发布</el-button>
  </div>
</template>

<script>
import * as forumAPI from "@/APIs/forum"
export default {
  name: "SendPost",
  data() {
    return {
      post: {
        title: "",
        content: "",
      },
      options: [
        {
          value: "学习讨论",
          label: "学习讨论",
        },
        {
          value: "课程链接",
          label: "课程链接",
        },
      ],
      value: [],
    };
  },
  methods:{
    async sendPost(){
      let tempP = {
        title: this.post.title,
        content: this.post.content,
        senderId: 10,
        tags: '',
        courseId: this.$route.params.courseId,
      }
      try {
        await forumAPI.sendPost(tempP);
      } catch (error) {
        console.log(error)
      }
      location.reload()
    }
  }
};
</script>

<style scoped>
.sendItem{
  width: 80%;
  margin: 20px 0;
}
.sendItem:nth-child(1){
  margin-top: 0;
}
.itemTitle{
  font-size: 14px;
  font-weight: bold;
  margin: 5px 0;
}
</style>