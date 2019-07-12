<template>
  <div>
    <el-button type="primary" @click="returns">返回</el-button>
    <div style="text-align: center">
      <h2>{{ obj.title }}</h2>
    </div>
    <div style="text-align: center">摘要{{ obj.abstract }}</div>
    <div style="text-align: center;color: #bdbdbd;">发布于{{ obj.date }}</div>
    <el-card class="box-card">
      <mavon-editor
        :value="obj.text"
        defaultOpen="preview"
        :subfield="false"
        :toolbarsFlag="false"
        :boxShadow="false"
      ></mavon-editor>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "views",
  components: {},
  props: {},
  data() {
    return {
      ids: "",
      obj: {}
    };
  },
  methods: {
    returns() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.ids = this.$route.query.id;
    console.log(this.ids);
    this.$axios
      .req("api/article/article", {
        _id: this.ids
      })
      .then(res => {
        console.log(res);
        if (res) {
          this.obj = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
  },
  created() {},
  filters: {},
  computed: {},
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss"></style>
