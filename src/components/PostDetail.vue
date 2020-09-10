<template>
  <el-col :span="19" :offset="4">

    <el-card style="margin-bottom: 20px;">
      <div
          style="color: rgb(0,102,204); margin-top: 20px; margin-left: 20px; margin-bottom: 20px; font-family: 微软雅黑; font-size: 30px; font-weight: bold">
        {{ post.title }}
        <el-tag effect="dark">置顶</el-tag>
        <el-tag type="warning" color="rgb(255,215,0)" effect="dark" style="margin-left: 5px;">精华</el-tag>
      </div>

      <el-row style="font-size: 18px; margin-bottom: 20px;">
        <el-col :span="12">
          <div style="margin-left: 20px; color: rgb(120,120,120)">
            {{ post.author }}
            <el-divider direction="vertical"></el-divider>
            {{ post.datetime }}
          </div>
        </el-col>
        <el-col :span="12">
          <div style="float: right; margin-right: 50px; color: rgb(120,120,120)">
            阅读量：{{post.read}}
          </div>
        </el-col>
      </el-row>

      <el-row class="col-row">
        <div style="font-size: 20px; margin-left: 20px; margin-right: 20px">
          {{ post.content }}
        </div>
      </el-row>

      <el-row style="margin-top: 20px; margin-bottom: 30px;">
        <div style="float: right; margin-right: 30px">
          1楼
          <el-divider direction="vertical"></el-divider>
          <el-button type="primary" icon="el-icon-caret-top" size="mini" plain circle @click="like"></el-button>
          喜欢：{{ post.like }}
          <el-button type="primary" icon="el-icon-caret-bottom" size="mini" plain circle @click="dislike"></el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="primary" plain @click="show_reply_box">回复</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="primary" plain @click="report">举报</el-button>
        </div>
      </el-row>

      <el-card v-if="reply_button_clicked" style="margin-bottom: 20px;">
        <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入回复内容"
            v-model="reply_text"
            maxlength="500"
            show-word-limit
            style="font-size: 20px; margin-bottom: 20px">
        </el-input>
        <el-button type="primary" plain @click="send_reply" style="float: right; margin-bottom: 20px">发送</el-button>
      </el-card>

      <el-card v-for="reply in reply_list" :key="reply.id" style="margin-bottom: 20px;">
        <el-row style="margin-top: 10px; margin-bottom: 20px; margin-left: 5px">
          <div style="font-size: 20px;">
            {{ reply.content }}
          </div>
        </el-row>
        <el-row style="margin-left: 5px">
          <el-col :span="12">
            <div>
              {{ reply.author }}
              <el-divider direction="vertical"></el-divider>
              {{ reply.datetime }}
            </div>
          </el-col>
          <el-col :span="12">
            <div style="float: right; margin-right: 20px">
              {{ reply.id }}楼
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" @click="reply_reply(reply.id)">回复</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" @click="report">举报</el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>

    </el-card>
  </el-col>
</template>

<script>
export default {
  name: "PostDetail",
  data() {
    return {
      reply_button_clicked: false,
      post: {
        title: "帖子标题啊啊啊啊啊啊",
        author: "田所浩二",
        datetime: "8.10",
        content: "帖子内容啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊",
        read: "114514",
        like: "1919"
      },
      reply_list: [
        {id: 2, content: "这是2楼的内容", author: "田所浩三", datetime: "9.9 19:59"},
        {id: 3, content: "这是3楼的内容", author: "田所浩四", datetime: "9.9 19:69"},
      ]
    };
  },
  methods: {
    like(e) {
      this.like_number += 1;
      let target = e.target;
      if (target.nodeName === 'SPAN' || target.nodeName === 'I') target = e.target.parentNode;
      target.blur();
    },
    dislike(e) {
      if (this.like_number > 0) this.like_number -= 1;
      let target = e.target;
      if (target.nodeName === 'SPAN' || target.nodeName === 'I') target = e.target.parentNode;
      target.blur();
    },
    report(e) {
      alert("已举报");
      let target = e.target;
      if (target.nodeName === 'SPAN' || target.nodeName === 'I') target = e.target.parentNode;
      target.blur();
    },
    reply_reply(id) {
      this.reply_text = "回复" + id + "楼:\n";
      this.reply_button_clicked = true;
      document.scrollingElement.scrollTop = 0;
    },
    show_reply_box(e) {
      this.reply_text = "";
      this.reply_button_clicked = !this.reply_button_clicked;
      let target = e.target;
      if (target.nodeName === 'SPAN' || target.nodeName === 'I') target = e.target.parentNode;
      target.blur();
    },
    async send_reply(e) {
      if (this.reply_text === "") {
        alert("不能回复空内容");
        return;
      }
      let reply_dict = {
        id: this.reply_list.length + 2,
        content: this.reply_text,
        author: "田所浩一一四五一四",
        datetime: "9.9 19:59"
      };
      this.reply_list.push(reply_dict);
      alert("已发送");
      this.reply_button_clicked = false
      let target = e.target;
      if (target.nodeName === 'SPAN' || target.nodeName === 'I') target = e.target.parentNode;
      target.blur();
    },
  }
};
</script>