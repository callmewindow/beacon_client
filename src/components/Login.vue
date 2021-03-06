<template>
  <el-card>
    <el-tabs :stretch="true" v-model="pos">
      <el-tab-pane label="登录" name="login">
        <el-form class="login-container" ref="login" :model="login">
          <h1 class="title"></h1>
          <el-form-item label>
            <el-input v-model="login.username" placeholder="用户名" clearable></el-input>
          </el-form-item>
          <el-form-item label>
            <el-input v-model="login.password" placeholder="密码" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" style="width: 100%;" @click="doSubmitLogin()">登录</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="注册" name="register">
        <el-form
          class="register-container"
          ref="register"
          :model="register"
          :rules="rules"
          label-width="80px"
        >
          <h1 class="title"></h1>
          <el-form-item label="用户名" prop="username">
            <el-input v-model="register.username" clearable></el-input>
          </el-form-item>
          <el-form-item label="昵称" prop="nickname">
            <el-input v-model="register.nickname" clearable></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail">
            <el-input v-model="register.userEmail" clearable></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="register.password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input v-model="register.checkPass" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="doSubmitRegister('register')">立即注册</el-button>
            <el-button @click="resetForm('register')">清空</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import * as userAPI from "../APIs/user";

export default {
  name: "Login",
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      } else if (
        /([a-zA-Z]|[0-9])(\w|-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})/.test(value) ==
        false
      ) {
        return callback(new Error("邮箱格式错误"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        return callback(new Error("密码格式错误：长度须大于6位"));
      } else {
        if (/[A-Za-z].*[0-9]|[0-9].*[A-Za-z]/.test(value) == false) {
          return callback(new Error("密码格式错误：必须同时包含字母和数字"));
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.register.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      pos: "login",
      login: {
        username: "",
        password: "",
      },
      register: {
        username: "",
        password: "",
        checkPass: "",
        nickname: "",
        userEmail: "",
      },

      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
        ],
        nickname: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        userEmail: [{ required: true, validator: checkEmail, trigger: "blur" }],
        password: [
          { required: true, validator: validatePass, trigger: "blur" },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
      },
    };
  },

  methods: {
    async doSubmitLogin() {
      try {
        const userInfo = await userAPI.login(
          this.login.username,
          this.login.password
        );
        const res = userInfo.data.result;
        window.console.log(userInfo);
        if (res === "用户不存在或密码错误。") {
          this.$message.error("用户名或密码错误");
        } else {
          this.$message({
            message: "登录成功，2秒后跳转至个人主页",
            type: "success",
          });
          this.$store.state.userId = userInfo.data.id;
          this.$store.state.teacherID = userInfo.data.teacher_identity;
          this.$store.state.nickname = userInfo.data.user_nickname;
          this.$store.state.email = userInfo.data.email;
          localStorage.setItem("userinfo", JSON.stringify(this.$store.state));
          setTimeout(() => {
            this.$router.push({ path: "/user/" + this.$store.state.userId });
          }, 2000);
        }
      } catch (e) {
        this.$message.error(e.toString());
      }
    },
    async doSubmitRegister(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          try {
            const userInfo = await userAPI.register(
              this.register.username,
              this.register.nickname,
              this.register.password,
              this.register.userEmail
            );
            console.log(userInfo);
            const res = userInfo.data.result;
            if (res === "该用户名已被注册。") {
              this.$message.error("用户名已被注册");
            } else if (res === "该邮箱已被注册。") {
              this.$message.error("邮箱已被注册");
            } else if (res !== "OK") {
              this.$message.error("抱歉，服务端发生错误");
            } else {
              this.$message({
                message: "注册成功，欢迎加入烽火平台！",
                type: "success",
              });
              this.pos = "login";
            }
          } catch (e) {
            this.$message.error("哦豁，" + e.toString());
          }
        } else {
          return false;
        }
      });
    },

    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>

<style scoped>
.login-container {
  width: 300px;
  margin: 0 auto;
}
.register-container {
  margin: 0 auto;
}
</style>
