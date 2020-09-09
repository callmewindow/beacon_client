<template>
  <el-col :span="19" :offset="4">

    <el-card style="margin-bottom: 20px;">
      <div style="color: rgb(0,102,204); margin-top: 20px">
        <h1>
          这是帖子标题，要长长长长长长长
          <el-tag type="warning">精华</el-tag>
          <el-divider direction="vertical"></el-divider>
          <el-tag>置顶</el-tag>
        </h1>
      </div>

      <el-row style="font-size: 18px; margin-bottom: 20px;">
        <el-col :span="12">
          <div style="margin-left: 20px; color: rgb(120,120,120)">
            田所浩二
            <el-divider direction="vertical"></el-divider>
            9月9日
          </div>
        </el-col>
        <el-col :span="12">
          <div style="float: right; margin-right: 50px; color: rgb(120,120,120)">
            阅读量：114514
          </div>
        </el-col>
      </el-row>

      <el-row class="col-row">
        <div style="font-size: 20px; margin-left: 20px; margin-right: 20px">
          这里是帖子一一一一一一楼内容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容
        </div>
      </el-row>

      <el-row style="margin-top: 20px; margin-bottom: 30px;">
        <div style="float: right; margin-right: 30px">
          1楼
          <el-divider direction="vertical"></el-divider>
          <el-button type="primary" icon="el-icon-caret-top" size="mini" plain circle @click="like()"></el-button>
          喜欢：{{like_number}}
          <el-button type="primary" icon="el-icon-caret-bottom" size="mini" plain circle @click="dislike()"></el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="primary" plain @click="show_reply_box()">回复</el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button type="primary" plain @click="report()">举报</el-button>
        </div>
      </el-row>

      <el-card v-if="reply_button_clicked" style="margin-bottom: 20px;">
        <el-input
            type="textarea"
            :rows="5"
            placeholder="请输入回复内容"
            v-model="textarea"
            maxlength="500"
            show-word-limit
            style="font-size: 20px; margin-bottom: 20px">
        </el-input>
        <el-button type="primary" plain @click="send_reply()" style="float: right; margin-bottom: 20px">发送</el-button>
      </el-card>

      <el-card style="margin-bottom: 20px;">
        <el-row style="margin-bottom: 20px;">
          <div style="font-size: 20px;">
            这是2楼的内容容容容容容容容容容容容容容容
          </div>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div>
              田所浩三
              <el-divider direction="vertical"></el-divider>
              9月9日
            </div>
          </el-col>
          <el-col :span="12">
            <div style="float: right; margin-right: 20px">
              2楼
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" @click="reply()">回复</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" @click="report()">举报</el-button>
            </div>
          </el-col>
        </el-row>
      </el-card>

      <el-card style="margin-bottom: 20px;">
        <el-row style="margin-bottom: 20px;">
          <div style="font-size: 20px;">
            这是3楼的内容容容容容容容容容容容容容容容
          </div>
        </el-row>
        <el-row>
          <el-col :span="12">
            <div style="float: left;">
              田所浩四
              <el-divider direction="vertical"></el-divider>
              9月9日
            </div>
          </el-col>
          <el-col :span="12">
            <div style="float: right; margin-right: 20px">
              3楼
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" @click="reply()">回复</el-button>
              <el-divider direction="vertical"></el-divider>
              <el-button type="text" @click="report()">举报</el-button>
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
        like_number: 0,
        textarea: "",
        reply_button_clicked: false
      };
    },
    methods: {
      like() {
        this.like_number += 1;
      },
      dislike() {
        if (this.like_number > 0)
          this.like_number -= 1;
      },
      report() {
        alert("已举报");
      },
      reply() {
        this.textarea = "回复X楼：";
      },
      show_reply_box() {
        this.textarea = "";
        this.reply_button_clicked = !this.reply_button_clicked;
      },
      async yesUp() {
      },
    }
  };
</script>