<template>

  <el-col :lg="20" style="float: right; margin-right: 100px">
    <el-card>
      <div style="color: rgb(0,102,204); margin-top: 20px">
        <h2>
          这是帖子标题，要长长长长长长长
          <el-tag type="success">精华</el-tag>
        </h2>
      </div>

      <el-row style="font-size: 18px; margin-bottom: 20px;">
        <el-col :span="21">
          <div class="factor">
            发帖人：田所浩二
          </div>
        </el-col>
        <el-col :span="3">
          <div class="factor">
            阅读量：114514
          </div>
        </el-col>
      </el-row>

      <el-row class="col-row">
        <el-col>
          <div style="font-size: 20px;">
            这里是帖子一一一一一一楼内容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容
            容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容
            容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容
            容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容
            容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容
            容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容容
          </div>
        </el-col>
      </el-row>

      <el-row style="margin-top: 30px; margin-bottom: 30px;">
        <el-col :xs="10" :sm="10" :md="7" :lg="7">
          <el-button type="primary" plain @click="report()">报错</el-button>
        </el-col>
        <el-col :xs="4" :sm="4" :md="2" :lg="2">
          <el-button type="primary" plain v-if="hasUp" @click="yesUp()">认领</el-button>
          <el-button type="primary" plain v-if="!hasUp" @click="noUp()">认领</el-button>
        </el-col>
      </el-row>

      <el-row style="margin-bottom: 30px;">
        <el-tabs type="border-card">
          <el-tab-pane label="获取原文">
            <el-row>
              <el-col :span="6">
                <el-link :underline="false" @click="getEntity(url)" type="primary"
                         style="float: left; margin-left: 20px;">
                  {{urlName}}
                </el-link>
              </el-col>
            </el-row>
          </el-tab-pane>
        </el-tabs>
      </el-row>

    </el-card>
  </el-col>

  <!--      <el-col :xs="24" :sm="24" :md="8" :lg="8" style="margin-top: 18px;">-->
  <!--        <el-card>-->
  <!--          <el-tabs v-model="activeName">-->
  <!--            <el-tab-pane label="相似文献" name="first">-->

  <!--              <div v-for="(document,i) in similarDocuments" :key="i">-->
  <!--                <el-row style="margin-top:10px; margin-bottom: 10px;">-->
  <!--                  <el-col :span="24">-->
  <!--                    <el-link :underline="false" type="primary" style="float: left;text-align: left; font-size: 20px;" @click="toPaper(i)">-->
  <!--                      {{document.paperTitle}}-->
  <!--                    </el-link>-->
  <!--                  </el-col>-->
  <!--                </el-row>-->

  <!--                <el-row class="col-row">-->
  <!--                  <el-col :span="24">-->
  <!--                    <div class="factor-text" style="text-align: left; line-height: 1.6;">-->
  <!--                      摘要：{{document.paperAbstract|paperTitleEllipsis}}-->
  <!--                    </div>-->
  <!--                  </el-col>-->
  <!--                </el-row>-->

  <!--                <el-row class="col-row">-->
  <!--                  <el-col>-->
  <!--                    <span style="float :left;font-size: 14px;line-height: 1.1">作者： </span><el-link @click="searchAuthor($event)" type="primary" style="float: left;">{{document.author[0]}}</el-link>-->
  <!--                  </el-col>-->
  <!--                </el-row>-->

  <!--                <el-divider></el-divider>-->
  <!--              </div>-->

  <!--            </el-tab-pane>-->
  <!--          </el-tabs>-->
  <!--        </el-card>-->
  <!--      </el-col>-->
</template>

<script>
  export default {
    name: "Home",
    data() {
      return {
        refID: '',
        display: false,
        hasUp: true,
        uploadExpertId: "",
        paperId: "",
        activeName: "first",
        mainTitle: "",
        mainFrom: "暂无",
        url: "http://xueshu.baidu.com/s?wd=",
        urlName: "百度学术",
        readTimes: "暂无",
        mainAbstract: "暂无",
        authors: [],
        keywords: [],
        DOI: "暂无",
        referredTimes: "",
        year: "暂无",
        similarId: [],
        similarDocuments: [],
      };
    },
    methods: {
      toPaper() {
      },
      searchAuthor() {
      },
      report() {
      },
      toTag() {
      },
      noUp() {
      },
      getEntity() {
      },
      async yesUp() {
      },
      async addQuote() {
      },
      async getPaperInfo() {
      },
      async getRelatedPaper() {
      },
      async addReading() {
      },
    }
  };
</script>

<style scoped>
  .content {
    font-size: 18px;
    float: left;
  }

  .factor {
    float: left;
    color: rgb(120, 120, 120);
  }

  .factor-text {
    float: left;
    color: rgb(102, 102, 102);
  }

  .col-row {
    margin-bottom: 15px;
  }

  input {
    border: none;
    border-bottom: 1px solid black;
    font-size: 12px;
    line-height: 1.3;
    font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
  }

  input:focus {
    outline: 0;
    border-bottom: 1px solid #409EFF;
  }
</style>