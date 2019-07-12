<template>
  <div>
    <el-row>
      <el-col :span="6">
        <div style="background-color: #62af96;text-align: center;padding: 10px">
          <div>今日发布</div>
          <div>1</div>
          <div style="float: right;margin-top:-35px">
            <img src="../assets/对.png" alt="" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="background-color: #fd8184;text-align: center;padding: 10px">
          <div>原创文章</div>
          <div>5</div>
          <div style="float: right;margin-top:-35px">
            <img src="../assets/文章1.png" alt="" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="background-color: #7e5f8a;text-align: center;padding: 10px">
          <div>新留言</div>
          <div>0</div>
          <div style="float: right;margin-top:-35px">
            <img src="../assets/铃铛.png" alt="" />
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div style="background-color: #68dc87;text-align: center;padding: 10px">
          <div>新消息</div>
          <div>0</div>
          <div style="float: right;margin-top:-35px">
            <img src="../assets/电话.png" alt="" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="12">
        <ve-pie :data="chartData1"></ve-pie>
      </el-col>
      <el-col :span="12">
        <ve-ring :data="chartData2" :settings="chartSettings2"></ve-ring>
      </el-col>
    </el-row>
      <el-row>
          <ve-waterfall :data="chartData3"></ve-waterfall>
      </el-row>
  </div>
</template>

<script>
export default {
  name: "Statistics",
  components: {},
  props: {},
  data() {
    this.chartSettings2 = {
      roseType: "radius"
    };
    return {
      allArticle: [],
      chartData1: {
        columns: ["类目", "数量"],
        rows: []
      },
      chartData2: {
        columns: ["来源", "数量"],
        rows: []
      },
        chartData3: {
            columns: ['时间', '数量'],
            rows: [
            ]
        }
    };
  },
  methods: {},
  mounted() {
    this.$axios
      .req("api/article/allArticle")
      .then(res => {
        if (res) {
          console.log(res);
          this.allArticle = res.data;
          let cj = _.groupBy(this.allArticle, "category");
          // console.log(cj);
          let cate = [];
          let num = [];
          for (let i in cj) {
            cate.push(i);
            num.push(cj[i]);
          }
          for (let i = 0; i < cate.length; i++) {
            this.chartData1.rows.push({ 类目: cate[i], 数量: num[i].length });
          }
          let zz = _.groupBy(this.allArticle, "source");
          // console.log(cj);
          let cates = [];
          let nums = [];
          for (let i in zz) {
            cates.push(i);
            nums.push(zz[i]);
          }
          for (let i = 0; i < cates.length; i++) {
            this.chartData2.rows.push({ 来源: cates[i], 数量: nums[i].length });
          }
            let dates = _.groupBy(this.allArticle, "date");
            let date1=[]
            let date2=[]
            for(let i in dates){
                date1.push(i)
                date2.push(dates[i])
            }
            for(let i=0;i<date1.length;i++){
                this.chartData3.rows.push({
                    时间:date1[i], 数量:date2[i].length
                })
            }
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
img {
  width: 25px;
}
</style>
