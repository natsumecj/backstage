<template>
  <div>
    <el-row>
      <el-col :span="6">
        <el-input
          placeholder="请输入你想搜索的商品名称"
          v-model="input"
          clearable
        >
        </el-input>
      </el-col>
    </el-row>
    <el-row>
      <el-table
        :data="
          tableData.slice((currentPage - 1) * pagesize, currentPage * pagesize)
        "
        style="width: 100%"
      >
        <el-table-column
          label="名称"
          width="300"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.NAME }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="商品编号"
          width="300"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.GOODS_SERIAL_NUMBER }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="原价"
          width="300"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.ORI_PRICE }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="现价"
          width="300"
          align="center"
          header-align="center"
        >
          <template slot-scope="scope">
            <span>{{ scope.row.PRESENT_PRICE }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" header-align="center">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              >修改</el-button
            >
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400, 500, 600, 700]"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.length"
      >
      </el-pagination>
    </el-row>
    <el-row :gutter="100">
      <el-col :span="3">
        <el-button type="primary"
          ><download-excel
            :data="
              tableData.slice(
                (currentPage - 1) * pagesize,
                currentPage * pagesize
              )
            "
            type="xls"
            name="导出xls"
          >
          </download-excel
        ></el-button>
      </el-col>
      <el-col :span="3">
        <el-button type="danger"
          ><download-excel
            :data="
              tableData.slice(
                (currentPage - 1) * pagesize,
                currentPage * pagesize
              )
            "
            type="csv"
            name="导出csv"
          >
          </download-excel
        ></el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Excel",
  components: {},
  props: {},
  data() {
    return {
      tableData: [],
      input: "",
      pagesize: 100,
      currentPage: 1,
      dialogFormVisible: false,
    };
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
    },
    handleDelete(index, row) {
      this.tableData.splice(index, 1);
    },
  },
  mounted() {
    this.$axios
      .req("api/tableData")
      .then(res => {
        if (res) {
          // console.log(res);
          this.tableData = res.data;
          console.log(this.tableData);
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

<style scoped lang="scss">
.el-row {
  margin-bottom: 20px;
}
</style>
