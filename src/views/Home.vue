<template>
  <div class="home">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card class="box-card">
          <div style="float: left">
            <img src="../assets/多人 用户.png" alt="" />
          </div>
          <div style="float: right">
            <div style="color: #99a9bf">New Visits</div>
            <div>
              <count
                :startVal="startVal"
                :endVal="num.visits"
                :duration="duration"
              ></count>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div style="float: left">
            <img src="../assets/信息.png" alt="" />
          </div>
          <div style="float: right">
            <div style="color: #99a9bf">Messages</div>
            <div>
              <count
                :startVal="startVal"
                :endVal="num.messages"
                :duration="duration"
              ></count>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div style="float: left">
            <img src="../assets/人民币.png" alt="" />
          </div>
          <div style="float: right">
            <div style="color: #99a9bf">Purchases</div>
            <div>
              <count
                :startVal="startVal"
                :endVal="num.purchases"
                :duration="duration"
              ></count>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="box-card">
          <div style="float: left">
            <img src="../assets/购物车.png" alt="" />
          </div>
          <div style="float: right">
            <div style="color: #99a9bf">Shoppings</div>
            <div>
              <count
                :startVal="startVal"
                :endVal="num.shopping"
                :duration="duration"
              ></count>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-card class="box-card">
        <div>
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </div>
      </el-card>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card class="box-card">
          <div><ve-radar :data="radarChat"></ve-radar></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div><ve-pie :data="ringChat" :settings="chartSetting"></ve-pie></div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div><ve-histogram :data="chartData"></ve-histogram></div>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="16">
        <el-card class="box-card">
          <el-table :data="tableData" stripe style="width: 100%;">
            <el-table-column
              prop="num"
              label="Order_No"
              align="center"
              header-align="center"
              width="300"
            >
            </el-table-column>
            <el-table-column
              prop="price"
              label="Price"
              align="center"
              header-align="center"
              width="300"
            >
              <template slot-scope="scope">
                ￥{{ scope.row.price }}
              </template>
            </el-table-column>
            <el-table-column
              prop="status"
              align="center"
              header-align="center"
              label="Status"
            >
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.status === 0 ? 'danger' : 'success'"
                  disable-transitions
                  >{{ scope.row.status === 0 ? "pending" : "success" }}</el-tag
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card :body-style="{ padding: '20px' }">
          <img src="../assets/t01389c26232ed1a364.jpg" class="image" />
          <div style="padding: 8px;" v-for="(item,index) in progresses" :key="item.name">
            <div>{{item.name}}</div>
            <el-progress :percentage="item.progress*100" v-if="item.progress===1" status="success"></el-progress>
            <el-progress :percentage="item.progress*100" v-else></el-progress>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import count from "vue-count-to";
export default {
  name: "home",
  components: {
    count
  },
  data() {
    //折线图方法
    this.chartSettings = {
      metrics: ["actual", "expected"],
      dimension: ["date"]
    };
    this.chartSetting = {
      roseType: "radius"
    };
    return {
      num: {},
      //时间
      duration: 5000,
      // 初始值
      startVal: 0,
      //折线图请求的数据
      chartData: {
        columns: ["date", "expected", "actual"],
        rows: []
      },
      //雷达图请求的数据
      radarChat: {
        columns: [
          "name",
          "sales",
          "ministration",
          "techology",
          "marketing",
          "delelopmer"
        ],
        rows: []
      },
      ringChat: {
        columns: ["name", "data"],
        rows: []
      },
      tableData: [],
      progresses: []
    };
  },
  methods: {},
  mounted() {
    //计数器
    this.$axios
      .req("api/homeData")
      .then(res => {
        if (res) {
          this.num = res.data;
          // console.log(this.num);
        }
      })
      .catch(error => {
        console.log(error);
      });
    //折线图
    this.$axios
      .req("api/homeChat")
      .then(res => {
        if (res) {
          // console.log(res);
          this.chartData.rows = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
    //雷达图
    this.$axios
      .req("api/radarChat")
      .then(res => {
        if (res) {
          // console.log(res);
          this.radarChat.rows = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.$axios
      .req("api/ringChat")
      .then(res => {
        if (res) {
          // console.log(res);
          this.ringChat.rows = res.data;
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.$axios
      .req("api/orderData")
      .then(res => {
        if (res) {
          this.tableData = res.data;
          // console.log(this.tableData);
        }
      })
      .catch(err => {
        console.log(err);
      });
    this.$axios
      .req("api/progress")
      .then(res => {
        if (res) {
          this.progresses = res.data;
          console.log(this.progresses);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>
<style scoped lang="scss">
img {
  width: 60px;
}
.box-card {
  line-height: 30px;
  margin-bottom: 40px;
}
.image {
  width: 100%;
  display: block;
}
</style>
