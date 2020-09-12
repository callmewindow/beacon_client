<template>

  <el-card style="margin-bottom: 20px;">
    <el-card>
      <el-row :gutter="10">
        <el-col :span="16" :offset="3">
          <div v-if="rule_edit===false">
            {{ rule_content }}
          </div>
          <el-input v-if="rule_edit" type="textarea" maxlength="200"
                    show-word-limit v-model="rule_content"></el-input>
        </el-col>
        <el-col :span="2">
          <el-button type="primary" plain v-if="rule_edit===false" @click="edit_rule">编辑</el-button>
          <el-button type="primary" plain v-if="rule_edit" @click="send_edit">完成</el-button>
        </el-col>
      </el-row>
    </el-card>

    <el-card v-for="post in post_list" :key="post.id" style="margin-top: 20px;">
      <el-row style="margin-top: 10px; margin-bottom: 20px; margin-left: 5px">

        <el-col :span="2" style="text-align: center;">
          <el-tag style="width: 50px; text-align: center; font-size: 16px">{{ post.reply_num }}</el-tag>
        </el-col>

        <el-col :span="22">

          <el-row style="margin-bottom: 10px">
            <el-col :span="12">
              <el-link type="primary" :underline="false" style="font-size: 18px">{{ post.title }}</el-link>
            </el-col>
            <el-col :span="7">
              <div style="float: right;">
                {{ post.nickname }}
                <el-divider direction="vertical"></el-divider>
                {{ post.datetime }}
              </div>
            </el-col>
            <el-col :span="4">
              <div style="float: right;">
                阅读数：{{ post.read }}
              </div>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="20">
              {{ post.content|cut }}
            </el-col>
            <el-col :span="3">
              <div style="float: right">
                喜欢：{{ post.like }}
              </div>
            </el-col>
          </el-row>

        </el-col>

      </el-row>
    </el-card>

  </el-card>

</template>

<script>
import * as postAPI from "@/APIs/forum.js";
import * as frontTool from "@/tools/frontTool";

export default {
  name: "PostList",
  data() {
    return {
      frontTool,
      post_list: [],
      rule_edit: false,
      rule_content: "叙述原初。开天辟地之时，虚无亦为此献上祝贺。以吾之乖离剑撕裂世界。环绕众星之臼，天上的地狱乃创世前夜的祝福。以你的死来平息一切吧。天地乖离开辟之星！"
    };
  },
  created() {
    this.get_post_list();
  },
  filters: {
    cut(str) {
      if (str && str.length > 40) str = str.slice(0, 40) + "...";
      return str;
    }
  },
  methods: {
    edit_rule(e) {
      this.rule_edit = !this.rule_edit;
      let target = e.target;
      if (target.nodeName === 'SPAN' || target.nodeName === 'I')
        target = e.target.parentNode;
      target.blur();
    },
    async send_edit(e) {
      this.edit_rule(e);
      try {
        const list = await postAPI.setForumRule(1, this.rule_content);//------------圈子id
        this.post_list = list.data
      } catch (e) {
        this.$message.error('请求超时');
      }
    },
    async get_post_list() {
      try {
        const list = await postAPI.postList(1);//------------------------------圈子id
        //window.console.log(list.data);
        this.post_list = list.data
      } catch (e) {
        this.$message.error('请求超时');
      }
    },
  }
};
</script>