<template>
  <div>
    <div class="bg">
      <div style="width: 500px;padding: 300px 600px">
        <el-card class="box-card">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="120px"
            class="demo-ruleForm"
          >
            <el-form-item label="请输入用户名" prop="name">
              <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="请输入密码" prop="password">
              <el-input
                v-model="ruleForm.password"
                show-password
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-button
              type="primary"
              style="margin-left: 50px"
              @click="register"
              >注册</el-button
            >
            <el-button type="primary" style="margin-left: 150px" @click="login"
              >登录</el-button
            >
          </el-form>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  components: {},
  props: {},
  data() {
    return {
      ruleForm: { name: "", password: "" },
      rules: {
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { max: 10, message: "最多为10位", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 12, message: "长度在 6 到 12 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    login() {
      this.$router.push("/");
    },
    registers() {
      this.$axios
        .req("api/user/register", {
          username: this.ruleForm.name,
          password: this.ruleForm.password
        })
        .then(res => {
          if (res.code === 1) {
            this.$message({
              type: "error",
              message: "用户已存在"
            });
            this.ruleForm.name = "";
            this.ruleForm.password = "";
            return;
          }
          if (res.code === 200) {
            this.$message({
              type: "success",
              message: "注册成功"
            });
            this.$store.state.name = {
              name: this.ruleForm.name
            };
            this.$router.push("/");
            // console.log(this.$store.state.name);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {},
  created() {
    this.register=this.$lodash.debounce(this.registers,350)
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
