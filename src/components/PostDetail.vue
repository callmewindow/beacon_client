<template>
  <div style="margin-bottom: 20px;">
    <!--帖子标题、置顶精华标签-->
    <el-row style="margin-left: 20px; margin-bottom: 20px">
      <div
          style="font-family: 微软雅黑; color: rgb(0,102,204); float: left; font-size: 26px; font-weight: bold">
        {{ post.title }}
      </div>
      <el-tag type="primary" effect="dark" style="margin-left: 5px;" v-if="post.top === 1">置顶</el-tag>
      <el-tag type="warning" color="rgb(255,215,0)" effect="dark" style="margin-left: 5px;" v-if="post.star === 1">
        精华
      </el-tag>
    </el-row>
    <!--帖子作者、时间、阅读量-->
    <el-row style="font-size: 18px; margin-bottom: 20px;">
      <el-col :span="12">
        <div style="margin-left: 20px; color: rgb(120,120,120)">
          {{ post.author }}
          <el-divider direction="vertical"></el-divider>
          {{ post.datetime|cut }}
        </div>
      </el-col>
      <el-col :span="12">
        <div style="float: right; margin-right: 50px; color: rgb(120,120,120)">阅读量：{{ post.read }}</div>
      </el-col>
    </el-row>
    <!--帖子内容-->
    <el-row>
      <div style="font-size: 20px; margin-left: 20px; margin-right: 20px">{{ post.content }}</div>
    </el-row>
    <!--置顶加精按钮、点赞按钮、回复按钮、举报按钮-->
    <el-row style="margin-top: 20px; margin-bottom: 20px">
      <div style="float: right; margin-right: 30px">
        <el-button type="text" v-if="post.top === 0" @click="top_post">设为置顶</el-button>
        <el-button type="text" v-if="post.top === 1" @click="top_post">取消置顶</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" v-if="post.star === 0" @click="star_post">设为精华</el-button>
        <el-button type="text" v-if="post.star === 1" @click="star_post">取消精华</el-button>
        <el-divider direction="vertical"></el-divider>
        1楼
        <el-divider v-if="test" direction="vertical"></el-divider>
        <el-button type="primary" icon="el-icon-caret-top" size="mini" plain circle @click="like"></el-button>
        喜欢：{{ post.like }}
        <el-button
            type="primary"
            icon="el-icon-caret-bottom"
            size="mini"
            plain
            circle
            @click="dislike"
        ></el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" @click="show_reply_box">回复</el-button>
        <el-divider direction="vertical"></el-divider>
        <el-button type="text" @click="report">举报</el-button>
      </div>
    </el-row>
    <!--回复文本框、发送-->
    <el-card v-if="reply_button_clicked" style="margin-bottom: 20px;">
      <el-input
          type="textarea"
          :rows="5"
          placeholder="请输入回复内容"
          v-model="reply_text"
          maxlength="500"
          show-word-limit
          style="font-size: 20px; margin-bottom: 20px"
      ></el-input>
      <el-button
          type="primary"
          plain
          @click="send_reply"
          style="float: right; margin-bottom: 20px"
      >发送
      </el-button>
    </el-card>
    <!--帖子回复列表-->
    <el-card v-for="reply in reply_list" :key="reply.id" style="margin-bottom: 20px;">
      <el-row style="margin-top: 10px; margin-bottom: 20px; margin-left: 5px">
        <div style="font-size: 20px;">{{ reply.content }}</div>
      </el-row>
      <el-row style="margin-left: 5px">
        <el-col :span="12">
          <div>
            {{ reply.owner.user_nickname }}
            <el-divider direction="vertical"></el-divider>
            {{ reply.post_time|cut }}
          </div>
        </el-col>
        <el-col :span="12">
          <div style="float: right; margin-right: 20px">
            {{ reply.floor_num }}楼
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="reply_reply(reply.floor_num)">回复</el-button>
            <el-divider direction="vertical"></el-divider>
            <el-button type="text" @click="report">举报</el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
import * as postAPI from "@/APIs/forum.js";
import * as FT from "@/tools/frontTool";

export default {
  name: "PostDetail",
  props: {
    postId: String,
  },
  data() {
    return {
      test: true,
      reply_button_clicked: false,
      reply_text: "",
      post: {
        id: 0,
        title: "",
        author: "",
        author_tag: 0,
        datetime: "",
        content: "",
        read: 0,
        like: 0,
        top: 0,
        star: 0
      },
      reply_list: [],
    };
  },
  watch: {
    postId(newID) {
      let numPID = parseInt(newID);
      this.get_post_detail(numPID);
    },
  },
  created() {
    let numPID = parseInt(this.postId);
    this.get_post_detail(numPID);
  },
  filters: {
    cut(str) {
      if (str) str = str.slice(5, 16);
      return str;
    },
  },
  methods: {
    like(e) {
      this.post.like += 1;
      this.test = false;
      this.test = true;
      let target = e.target;
      if (target.nodeName === "SPAN" || target.nodeName === "I")
        target = e.target.parentNode;
      target.blur();
    },
    dislike(e) {
      if (this.post.like > 0) this.post.like -= 1;
      this.test = false;
      this.test = true;
      let target = e.target;
      if (target.nodeName === "SPAN" || target.nodeName === "I")
        target = e.target.parentNode;
      target.blur();
    },
    report(e) {
      this.$message({
        message: "已举报",
        type: "success",
      });
      let target = e.target;
      if (target.nodeName === "SPAN" || target.nodeName === "I")
        target = e.target.parentNode;
      target.blur();
    },
    reply_reply(id) {
      this.reply_text = "回复" + id + "楼: ";
      this.reply_button_clicked = true;
      document.scrollingElement.scrollTop = 0;
    },
    show_reply_box(e) {
      this.reply_text = "";
      this.reply_button_clicked = !this.reply_button_clicked;
      let target = e.target;
      if (target.nodeName === "SPAN" || target.nodeName === "I")
        target = e.target.parentNode;
      target.blur();
    },
    async get_post_detail(pid) {
      try {
        const detail_dict = await postAPI.postDetail(pid);
        window.console.log(detail_dict.data);
        this.post.id = detail_dict.data.post.id;
        this.post.title = detail_dict.data.post.title;
        this.post.author = detail_dict.data.post.owner.user_nickname;
        this.post.author_tag = detail_dict.data.post.owner.teacher_identity;
        this.post.datetime = detail_dict.data.floors[0].post_time;
        this.post.content = detail_dict.data.floors[0].content;
        this.post.read = detail_dict.data.post.watches;
        this.post.like = detail_dict.data.floors[0].like_num;
        this.post.top = detail_dict.data.post.topped;
        this.post.star = detail_dict.data.post.stared;
        this.reply_list = [];
        for (let i = 1; i < detail_dict.data.floors.length; i++) {
          this.reply_list.push(detail_dict.data.floors[i]);
        }
      } catch (e) {
        this.$message.error("请求超时");
      }
    },
    async send_reply(e) {
      if (this.reply_text === "") {
        this.$message.error("不能回复空内容");
        return;
      }
      if (FT.CS(this.reply_text)) {
        this.$message.error("为了社区和谐，请勿输入英文引号，感谢支持");
        return;
      }
      let date = new Date();
      let mon = (date.getMonth() + 1).toString();
      if (mon.length < 2) mon = "0" + mon;
      let day = date.getDate().toString();
      if (day.length < 2) day = "0" + day;
      let hor = date.getHours().toString();
      if (hor.length < 2) hor = "0" + hor;
      let min = date.getMinutes().toString();
      if (min.length < 2) min = "0" + min;
      let reply_dict = {
        floor_num: this.reply_list.length + 2,
        content: this.reply_text,
        owner: {user_nickname: "zym4"}, //----------------------------------------------store.nickname
        post_time: mon + "-" + day + " " + hor + ":" + min,
      };
      this.reply_list.push(reply_dict);
      try {
        await postAPI.replyPost(this.post.id, 5, this.reply_text); //-------------store.userid
      } catch (e) {
        this.$message.error("回复请求超时");
      }
      this.$message({
        message: "回复成功",
        type: "success",
      });
      this.reply_button_clicked = false;
      let target = e.target;
      if (target.nodeName === "SPAN" || target.nodeName === "I")
        target = e.target.parentNode;
      target.blur();
    },
    //（取消）置顶帖子，通过当前post.top状态决定
    async top_post() {
      if (this.post.top === 0) {
        try {
          await postAPI.topPost(this.post.id);
        } catch (e) {
          this.$message.error("置顶请求超时");
        }
      } else {
        try {
          await postAPI.cancelTopPost(this.post.id);
        } catch (e) {
          this.$message.error("置顶请求超时");
        }
      }
      this.post.top = 1 - this.post.top;
    },
    //（取消）加精帖子，通过当前post.star状态决定
    async star_post() {
      if (this.post.star === 0) {
        try {
          await postAPI.starPost(this.post.id);
        } catch (e) {
          this.$message.error("加精请求超时");
        }
      } else {
        try {
          await postAPI.cancelStarPost(this.post.id);
        } catch (e) {
          this.$message.error("加精请求超时");
        }
      }
      this.post.star = 1 - this.post.star;
    },
  },
};
</script>