<template>
  <div style="margin-bottom: 20px;">
    <el-card>
      <div slot="header">
        圈子规则
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          v-if="rule_edit===false"
          @click="edit_rule"
        >编辑规则</el-button>
        <el-button
          style="float: right; padding: 3px 3px"
          type="text"
          v-if="rule_edit"
          @click="edit_rule"
        >取消</el-button>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          v-if="rule_edit"
          @click="send_edit"
        >保存</el-button>
      </div>
      <el-row :gutter="10">
        <el-col :span="16" :offset="3">
          <div v-if="rule_edit===false">{{ rule_content }}</div>
          <el-input
            v-if="rule_edit"
            type="textarea"
            maxlength="200"
            show-word-limit
            v-model="rule_content_bk"
          ></el-input>
        </el-col>
        <!-- <el-col :span="2">
          <el-button type="primary" plain v-if="rule_edit===false" @click="edit_rule">编辑</el-button>
          <el-button type="primary" plain v-if="rule_edit" @click="send_edit">完成</el-button>
        </el-col>-->
      </el-row>
      <el-button
        v-if="rule_edit===false"
        id="sendBtn"
        type="primary"
        icon="el-icon-edit"
        @click="showSendUp = true"
      >发帖</el-button>
    </el-card>

    <el-card v-if="!havePost" style="margin-top: 20px;">目前圈子暂无帖子或未开启</el-card>

    <div v-if="havePost">
      <el-card v-for="post in post_list" :key="post.id" style="margin-top: 20px;">
        <el-row style="margin-top: 10px; margin-bottom: 20px; margin-left: 5px">
          <el-col :span="2" style="text-align: center;">
            <el-tag style="width: 50px; text-align: center; font-size: 16px">{{ post.reply_num }}</el-tag>
          </el-col>

          <el-col :span="22">
            <el-row style="margin-bottom: 10px">
              <el-col :span="12">
                <el-link
                  type="primary"
                  :underline="false"
                  style="font-size: 18px"
                  @click="showDetail(post.id)"
                >{{ post.title }}</el-link>
              </el-col>
              <el-col :span="7">
                <div style="float: right;">
                  {{ post.nickname }}
                  <el-divider direction="vertical"></el-divider>
                  {{ post.datetime ? post.datetime.substring(5, 16) : "notime" }}
                </div>
              </el-col>
              <el-col :span="4">
                <div style="float: right;">阅读数：{{ post.read }}</div>
              </el-col>
            </el-row>

            <el-row>
              <el-col :span="20">{{ post.content|cut }}</el-col>
              <el-col :span="3">
                <div style="float: right">喜欢：{{ post.like }}</div>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-card>
    </div>

    <el-dialog title="发布帖子" id="sendUp" :visible.sync="showSendUp" width="30%">
      <SendPost />
    </el-dialog>

    <el-dialog id="detailUp" :visible.sync="showDetailUp" width="50%">
      <PostDetail :postId="detailId" />
    </el-dialog>
  </div>
</template>

<script>
import * as postAPI from "@/APIs/forum.js";
import * as CourseAPI from "@/APIs/course";
import * as frontTool from "@/tools/frontTool";
import SendPost from "@/components/SendPost";
import PostDetail from "@/components/PostDetail";

export default {
  name: "PostList",
  components: {
    SendPost,
    PostDetail,
  },
  data() {
    return {
      frontTool,
      detailId: 0,
      havePost: false,
      post_list: [],
      showSendUp: false,
      showDetailUp: false,
      rule_edit: false,
      rule_content: "",
      rule_content_bk: "",
    };
  },
  created() {
    this.get_post_list();
    this.getCourseBasicInfo();
  },
  filters: {
    cut(str) {
      if (str && str.length > 40) str = str.slice(0, 40) + "...";
      return str;
    },
  },
  methods: {
    showDetail(postId) {
      // this.$router.push({
      //   path: "/course/" + this.$route.params.courseId + "/forum/post/" + postId,
      // });
      this.detailId = postId;
      this.showDetailUp = true;
    },
    edit_rule() {
      this.rule_edit = !this.rule_edit;
      this.rule_content_bk = this.rule_content;
    },
    async send_edit() {
      this.rule_edit = !this.rule_edit;
      this.rule_content = this.rule_content_bk;
      try {
        await postAPI.setForumRule(
          parseInt(this.$route.params.courseId),
          this.rule_content
        ); //------------圈子id
      } catch (e) {
        this.$message.error("请求超时");
      }
    },
    async get_post_list() {
      let courseId = this.$route.params.courseId;
      console.log(courseId);
      try {
        const list = await postAPI.postList(parseInt(courseId)); //------------------------------圈子id
        this.post_list = list.data;
        this.post_list.reverse();
        if (this.post_list != "该圈子id不存在") {
          this.havePost = true;
        }
      } catch (e) {
        this.$message.error("请求超时");
      }
    },
    async getCourseBasicInfo() {
      const temp = await CourseAPI.getCourseBasicInfo(
        this.$route.params.courseId
      );
      this.rule_content = temp.data.course.rule;
    },
  },
};
</script>

<style scoped>
#sendBtn {
  float: right;
  margin-bottom: 10px;
}
</style>