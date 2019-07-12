<template>
  <div>
    <div style="background-color: #244c6e">
      <el-row>
        <el-col :span="4"
          ><div style="color: white; font-size: 18px">
            欢迎{{ name }}来到小爱后台管理系统
          </div></el-col
        >
        <el-col :span="8" :offset="12"
          ><div style="color: white; font-size: 18px">
            早上好，亲爱的{{ name }} 本次登录时间：{{ date }}
          </div></el-col
        >
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navigation",
  components: {},
  props: {},
  data() {
    return {
      name: "",
      date: ""
    };
  },
  methods: {},
  mounted() {
    this.name = localStorage.getItem("user");
    this.date = localStorage.getItem("date");
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
</style>
