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
import * as postAPI from "../APIs/";//<-----------------------------------------NEED API

export default {
  name: "PostList",
  data() {
    return {
      //帖子列表规范，前端传参：forumId
      post_list: [      //某个圈子下面的所有帖子（即帖子基本信息和一楼内容），列表，元素是字典
        {
          id:"帖子id",
          title: "标题",
          author: "作者",
          datetime: "发帖时间",
          content: "内容",
          read: "阅读数，int",
          like: "点赞数，int",
          reply_num: "回复数，即最大楼层-1",
          top: "是否置顶，bool",
          highlight: "是否精华，bool"
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