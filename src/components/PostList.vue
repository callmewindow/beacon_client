<template>

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

</template>

<script>
import * as postAPI from "@/APIs/forum.js";

export default {
  name: "PostList",
  data() {
    return {
      post_list: [],
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
        const list = await postAPI.postList(1);
        window.console.log(list);
        this.post_list = list.data
      }
      catch (e) {
        this.$message.error('请求超时');
      }
    },
  }
};
</script>