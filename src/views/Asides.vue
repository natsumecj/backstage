<template>
  <div>
    <el-row>
      <el-col>
        <el-menu
          default-active="1"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1" @click="home">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="5" @click="published">
            <i class="el-icon-menu"></i>
            <span slot="title">已发布</span>
          </el-menu-item>
          <el-menu-item index="3" @click="statistics">
            <i class="el-icon-menu"></i>
            <span slot="title">统计</span>
          </el-menu-item>
          <el-menu-item index="7" @click="publishing">
            <i class="el-icon-menu"></i>
            <span slot="title">发表文章</span>
          </el-menu-item>
          <el-menu-item index="2" @click="tabs">
            <i class="el-icon-menu"></i>
            <span slot="title">标签页</span>
          </el-menu-item>
          <el-menu-item index="6" @click="excel">
            <i class="el-icon-document"></i>
            <span slot="title">导出Excel</span>
          </el-menu-item>
          <el-menu-item index="4" @click="uploads">
            <i class="el-icon-setting"></i>
            <span slot="title">图片上传</span>
          </el-menu-item>
          <el-menu-item index="8" @click="exit">
            <i class="el-icon-menu"></i>
            <span slot="title">退出系统</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Aside",
  components: {},
  props: {},
  data() {
    return {};
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    home() {
      this.$router.push("/");
    },
    publishing() {
      this.$router.push("/publishing");
    },
    published() {
      this.$router.push("/published");
    },
    exit() {
      this.$router.push("/exit");
    },
    excel() {
      this.$router.push("/excel");
    },
    uploads(){
      this.$router.push("/upload")
    },
    tabs(){
      this.$router.push('/tab')
    },
    statistics(){
      this.$router.push("/statistics")
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
