<template>
  <el-card>
    <Navigator active-func="home" />
    <el-card id="hot">
      <div>asdasd</div>
      <div>{{abc}}</div>
    </el-card>
    <Footer />
  </el-card>
</template>

<script>
import * as UserAPI from "@/APIs/user.js";
import Navigator from "@/components/Navigator";
import Footer from "@/components/Footer";
export default {
  name: "Home",
  components: {
    Navigator,
    Footer,
  },
  data() {
    return {
      abc: "123123",
      username: "user0",
      pwd: "abc123",
    };
  },
  async created() {
      const userre = await UserAPI.login(this.abc, this.username, this.pwd);
      console.log(userre);
  },
  methods: {
  },
};
</script>

<style scoped>
#hot {
  width: 100%;
}
</style>