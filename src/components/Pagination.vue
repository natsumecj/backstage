<template>
  <div>
      <div class="block">
          <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-sizes="[10, 20, 30, 40]"
                  :page-size="pagesize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="publish.length">
          </el-pagination>
      </div>
  </div>
</template>

<script>
export default {
  name: "pagination",
  components: {},
  props: {
      publish:{
          type:Array
      }
  },
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
    };
  },
  methods: {
      handleSizeChange(val) {
          // console.log(`每页 ${val} 条`);
          this.pagesize=val
          this.$emit('send',this.pagesize)
      },
      handleCurrentChange(val) {
          // console.log(`当前页: ${val}`);
          this.currentPage=val
          this.$emit('send1',this.currentPage)
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
