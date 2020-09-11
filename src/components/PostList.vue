<template>
  <el-col :span="19" :offset="4">
    <el-card style="margin-bottom: 20px;">

      <el-card v-for="post in post_list" :key="post.id" style="margin-bottom: 20px;">

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
                  {{ post.author }}
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
  </el-col>
</template>

<script>
import * as postAPI from "@/APIs/forum.js";

export default {
  name: "PostList",
  data() {
    return {
      post_list: [
        {
          id:1,
          title: "帖子1标题啊啊啊啊啊啊",
          author: "田所浩二",
          datetime: "08:10",
          content: "帖子内容啊啊",
          read: "114",
          like: "1919",
          reply_num: "2"
        },
      ],
    };
  },
  created() {
    this.get_post_list();
  },
  filters: {
    cut(str) {
      if (str.length > 40) str = str.slice(0, 40) + "...";
      return str;
    }
  },
  methods: {
    async get_post_list(){
      try {
        const detail_dict = await postAPI;//<-----------------------------------------NEED API
        window.console.log(detail_dict);
      }
      catch (e) {
        this.$message.error('请求超时');
      }
    },
  }
};
</script>