<template>
  <div>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="num1" name="first">
        <el-card class="box-card">
          <el-row v-for="(item, index) in list" :key="index">
            <el-col :span="7">{{ item.title }}</el-col>
            <el-col :span="3" :offset="11">{{ item.date }}</el-col>
            <el-col :span="2"><el-button @click="read(item,index)">标记已读</el-button></el-col>
          </el-row>
          <el-button type="primary" @click="allread">全部标为已读</el-button>
        </el-card>
      </el-tab-pane>
      <el-tab-pane :label="num2" name="second">
          <el-card class="box-card">
              <el-row v-for="(item, index) in list2" :key="index">
                  <el-col :span="7">{{ item.title }}</el-col>
                  <el-col :span="3" :offset="11">{{ item.date }}</el-col>
                  <el-col :span="2"><el-button @click="del(item,index)">删除</el-button></el-col>
              </el-row>
              <el-button type="danger" @click="alldel">全部删除</el-button>
          </el-card>
      </el-tab-pane>
      <el-tab-pane :label="num3" name="third"><el-card class="box-card">
          <el-row v-for="(item, index) in list3" :key="index">
              <el-col :span="7">{{ item.title }}</el-col>
              <el-col :span="3" :offset="11">{{ item.date }}</el-col>
              <el-col :span="2"><el-button type="warning" @click="restore(item,index)">还原</el-button></el-col>
          </el-row>
          <el-button type="danger" @click="empty">清空回收站</el-button>
      </el-card></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  name: "Tab",
  components: {},
  props: {},
  data() {
    return {
      activeName: "first",
      list: [
        {
          title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          date: "2018-9-12 20:00:00"
        },
        { title: "今晚十二点整发大红包，先到先得", date: "2018-9-12 21:00:00" }
      ],
      list2: [
          {
              title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
              date: "2018-9-12 20:00:00"
          }
      ],
      list3: [
          {
              title: "【系统通知】你的优惠劵已过期",
              date: "2018-9-12 20:00:00"
          }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
      read(item,index){
          this.list2.unshift(item)
          this.list.splice(index,1)
      },
      allread(){
        this.list2=this.list.concat(this.list2)
          this.list=[]
      },
      del(item,index){
        this.list3.unshift(item)
          this.list2.splice(index,1)
      },
      alldel(){
          this.list3=this.list2.concat(this.list3)
          this.list2=[]
      },
      restore(item,index){
        this.list2.unshift(item)
          this.list3.splice(index,1)
      },
      empty(){
        this.list3=[]
      }
  },
  mounted() {
    // this.message1 = "未读消息(" + this.list.length+")";
    // this.message2 = "已读消息(" + this.list2.length+")";
    // this.message3 = "回收站(" + this.list3.length+")";
  },
  created() {},
  filters: {},
  computed: {
      num1(){
          let message1="未读消息(" + this.list.length+")"
          return message1
      },
      num2(){
          let message2="未读消息(" + this.list2.length+")"
          return message2
      },
      num3(){
          let message3="未读消息(" + this.list3.length+")"
          return message3
      }
  },
  watch: {},
  directives: {}
};
</script>

<style scoped lang="scss">
.el-row {
  line-height: 40px;
  border-bottom: 1px solid #d2d2d2;
  margin: 10px 0;
}
</style>
