<template>
  <div>
    <el-table
      :data="publish.slice((val1 - 1) * val, val1 * val)"
      style="width: 100%"
      border
      stripe
    >
      <el-table-column
        type="index"
        width="50"
        align="center"
        header-align="center"
      >
      </el-table-column>
      <el-table-column
        label="标题"
        width="400"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="作者"
        width="100"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="类目"
        width="180"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.category }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="来源"
        width="100"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <span>{{ scope.row.source }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="重要性"
        width="180"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <el-rate
            :value="parseInt(scope.row.star)"
            disabled
            text-color="#ff9900"
          >
          </el-rate>
        </template>
      </el-table-column>
      <el-table-column
        label="发布时间"
        width="180"
        align="center"
        header-align="center"
      >
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.date }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" header-align="center">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="editor(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="del(scope.$index, scope.row)"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="success"
            @click="views(scope.$index, scope.row)"
            >查看</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <pagination :publish="publish" @send="send" @send1="send1"></pagination>
  </div>
</template>

<script>
import pagination from "../components/Pagination";
export default {
  name: "Published",
  components: {
    pagination
  },
  props: {},
  data() {
    return {
      publish: [],
      val: 10,
      val1: 1
    };
  },
  methods: {
    del(index, row) {
      console.log(index, row);
      this.$axios
        .req("api/article/delete", {
          _id: row._id
        })
        .then(res => {
          if (res === 200) {
            this.$message({
              type: "success",
              message: "删除成功"
            });
          }
        });
      this.$axios
        .req("api/article/allArticle")
        .then(res => {
          if (res) {
            this.publish = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    editor(index, row) {
      this.$router.push({
        name: "editor",
        query: {
          _id: row._id
        }
      });
    },
    views(index, row) {
      // console.log(row);
      this.$router.push({
        name: "views",
        query: {
          id: row._id
        }
      });
    },
    send(val) {
      this.val = val;
      console.log(this.val + "我是每页多少条");
    },
    send1(val) {
      this.val1 = val;
      console.log(this.val1 + "我是第几页");
    }
  },
  mounted() {
    this.$axios
      .req("api/article/allArticle")
      .then(res => {
        if (res) {
          console.log(res);
          this.publish = res.data;
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
