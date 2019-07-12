<template>
  <div>
    <div style="text-align: center;margin-top: 200px">
      <el-button type="danger" @click="loginout">退出登录</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Exit",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    loginout() {
      this.$axios
        .req("api/user/logout")
        .then(res => {
          if (res.code === 0) {
            this.$message({
              type: "success",
              message: "退出成功,期待你下次的登录"
            });
            localStorage.clear();
            sessionStorage.clear();
            this.$router.push("/login");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {},
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss"></style>
