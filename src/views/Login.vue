<template>
  <div>
    <div class="bg">
      <div style="width: 500px;padding: 300px 600px">
        <div>
          <el-card class="box-card">
            <el-form
              label-position="left"
              :model="ruleForm"
              status-icon
              :rules="rules"
              ref="ruleForm"
              label-width="120px"
              class="demo-ruleForm"
            >
              <el-form-item label="请输入用户名" prop="name">
                <el-input
                  v-model="ruleForm.name"
                  autocomplete="off"
                  type="text"
                ></el-input>
              </el-form-item>
              <el-form-item label="请输入密码" prop="password">
                <el-input
                  v-model="ruleForm.password"
                  show-password
                  autocomplete="off"
                ></el-input>
              </el-form-item>
              <el-form-item label="请输入验证码" prop="captch">
                <el-input
                  style="width: 150px;float: left"
                  v-model="ruleForm.captch"
                  status-icon
                ></el-input>
                <div
                  v-html="captchas"
                  style="float: left;margin-left: 20px"
                  @click="change"
                ></div>
              </el-form-item>
              <el-button type="primary" style="margin-left: 50px" @click="login"
                >登录</el-button
              >
              <el-button
                type="primary"
                style="margin-left: 150px"
                @click="register"
                >注册</el-button
              >
            </el-form>
          </el-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  components: {},
  props: {},
  data() {
    return {
      ruleForm: { captch: "", name: "", password: "" },
      captchas: "",
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 10, message: "长度在 2 到 10 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ],
        captch: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    change() {
      this.$axios.req("api/captcha").then(res => {
        if (res) {
          // console.log(res);
          this.captchas = res;
        }
      });
    },
    register() {
      this.$router.push("/register");
    },
    logins() {
      this.$axios
        .req("api/user/login", {
          username: this.ruleForm.name,
          password: this.ruleForm.password,
          code: this.ruleForm.captch
        })
        .then(res => {
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "登录成功"
            });
            localStorage.setItem("user", this.ruleForm.name);
            sessionStorage.setItem("user", JSON.stringify(this.ruleForm.name));
            sessionStorage.setItem(
              "code",
              JSON.stringify(this.ruleForm.captch)
            );
            let date = new Date();
            let y = date.getFullYear();
            let m = date.getMonth() + 1;
            let d = date.getDate();
            let h = date.getHours();
            let f = date.getMinutes();
            let s = date.getSeconds();
            localStorage.setItem(
              "date",
              y + "年" + m + "月" + d + "日" + h + "时" + f + "分" + s + "秒"
            );
            this.$router.push("/home");
          }
          if (res.code === 1) {
            this.$message({
              type: "error",
              message: "验证码不正确"
            });
          }
          if (res.code === 500) {
            this.$message({
              type: "error",
              message: "用户名或密码不正确"
            });
          }
        });
    }
  },
  mounted() {
    this.$axios
      .req("api/captcha ")
      .then(res => {
        if (res) {
          // console.log(res);
          this.captchas = res;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  created() {
    this.login = this.$lodash.debounce(this.logins, 350);
  },
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.bg {
  background-image: url("../assets/1560306705728.jpg");
  background-size: 100% 100%;
  width: 1750px;
  height: 850px;
}
</style>
