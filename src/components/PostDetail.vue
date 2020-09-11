<template>
  <el-col :span="19" :offset="4">

    <el-card style="margin-bottom: 20px;">
      <div
          style="color: rgb(0,102,204); margin-top: 20px; margin-left: 20px; margin-bottom: 20px; font-family: 微软雅黑; font-size: 30px; font-weight: bold">
        {{ post.title }}
        <el-tag type="success" effect="dark">置顶</el-tag>
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
            阅读量：{{ post.read }}
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
import * as postAPI from "../APIs/";//<-----------------------------------------NEED API

export default {
  name: "PostDetail",
  data() {
    return {
      reply_button_clicked: false,
      reply_text: "",
      //帖子详情页规范，前端传递参数：postId
      post: {                            //帖子主要内容，字典
        id: "帖子id，后端是int就int，是str就str",
        title: "帖子标题str",
        author: "发帖人str",
        datetime: "发帖时间，str，月.日 时:分",
        content: "帖子内容str",
        read: "阅读数，int",
        like: "点赞数，int",
        top: "是否置顶，bool",
        highlight: "是否精华，bool"
      },
      reply_list: [            //帖子下面的回复，列表，列表元素是字典
        {
          id: "回复的id，没有则提供楼层号",
          content: "回复内容str",
          author: "回复作者str",
          datetime: "回复时间str",
          floor: "回复的楼层号, int str 随意"
        },
      ]
    };
  },
  created() {
    this.get_post_detail();
  },
  methods: {
    like(e) {
      this.post.like += 1;
      let target = e.target;
      if (target.nodeName === 'SPAN' || target.nodeName === 'I')
        target = e.target.parentNode;
      target.blur();
    },
    dislike(e) {
      if (this.post.like > 0) this.post.like -= 1;
      let target = e.target;
      if (target.nodeName === 'SPAN' || target.nodeName === 'I')
        target = e.target.parentNode;
      target.blur();
    },
    report(e) {
      this.$message({
        message: "已举报",
        type: "success"
      });
      let target = e.target;
      if (target.nodeName === 'SPAN' || target.nodeName === 'I')
        target = e.target.parentNode;
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
      if (target.nodeName === 'SPAN' || target.nodeName === 'I')
        target = e.target.parentNode;
      target.blur();
    },
    async get_post_detail() {
      try {
        const detail_dict = await postAPI;//<-----------------------------------------NEED API
        window.console.log(detail_dict);
      } catch (e) {
        this.$message.error('请求超时');
      }
    },
    async send_reply(e) {
      if (this.reply_text === "") {
        this.$message.error("不能回复空内容");
        return;
      }
      let reply_dict = {
        id: this.reply_list.length + 2,
        content: this.reply_text,
        author: "田所浩一一四五一四",
        datetime: "9.9 19:59"
      };
      this.reply_list.push(reply_dict);
      try {
        const result = await postAPI;//<-----------------------------------------NEED API
        window.console.log(result);
      } catch (e) {
        this.$message.error('请求超时');
      }
      this.$message({
        message: "回复成功",
        type: "success"
      });
      this.reply_button_clicked = false
      let target = e.target;
      if (target.nodeName === 'SPAN' || target.nodeName === 'I')
        target = e.target.parentNode;
      target.blur();
    },
  }
};
</script>