<template>
  <div>
    <el-row>
      <el-col :span="24" style="background-color: #53996e;">
        <div style="float: right;margin-right: 20px">
          <el-button type="danger" @click="returns">返回</el-button>
          <el-button type="primary" @click="publish">发布</el-button>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        status-icon
      >
        <el-row>
          <el-col :span="24">
            <el-form-item label="文章标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="文章摘要" prop="abstract">
              <el-input v-model="ruleForm.abstract"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="4">
            <el-form-item label="作者" prop="author">
              <el-input v-model="ruleForm.author"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="类目" prop="category">
              <el-select v-model="ruleForm.category" placeholder="请选择">
                <el-option
                  :label="item.name"
                  :value="item.name"
                  v-for="(item, index) in category"
                  :key="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="来源" prop="source">
              <el-select v-model="ruleForm.source" placeholder="请选择">
                <el-option
                  :label="item.name"
                  :value="item.name"
                  v-for="(item, index) in source"
                  :key="item.name"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="重要性" prop="star">
              <el-select v-model="ruleForm.star" placeholder="请选择">
                <el-option
                  :label="item"
                  :value="item"
                  v-for="(item, index) in star"
                  :key="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="发布时间">
              <el-date-picker
                v-model="ruleForm.date"
                type="datetime"
                placeholder="选择日期时间"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <div>
          <mavon-editor v-model="ruleForm.text"></mavon-editor>
        </div>
        <div style="text-align: center;margin: 40px">
          <el-button type="primary" @click="publish">发布</el-button>
        </div>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Publishing",
  components: {},
  props: {},
  data() {
    return {
      ids: "",
      category: [
        { name: "Vue" },
        { name: "React" },
        { name: "Node.js" },
        { name: "性能优化" },
        { name: "JavaScript" },
        { name: "小程序" },
        { name: "工具类" },
        { name: "其他" }
      ],
      source: [{ name: "原创" }, { name: "转载" }, { name: "与他人合作" }],
      star: [1, 2, 3, 4, 5],
      ruleForm: {
        //文章标题
        title: "",
        //作者名
        author: "",
        //文章摘要
        abstract: "",
        //
        category: "",
        //来源
        source: "",
        //重要性
        star: "",
        //发布时间
        date: "",
        //发布内容
        text: ""
      },
      rules: {
        title: [
          { required: true, message: "文章标题不能为空", trigger: "blur" }
        ],
        abstract: [
          { required: true, message: "文章摘要不能为空", trigger: "blur" }
        ],
        category: [{ required: true, message: "请选择", trigger: "change" }],
        source: [{ required: true, message: "请选择", trigger: "change" }],
        star: [{ required: true, message: "请选择", trigger: "change" }],
        author: [{ required: true, message: "作者不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    publish() {
      this.$axios
        .req("api/article/update", {
          id: this.ids,
          title: this.ruleForm.title,
          abstract: this.ruleForm.abstract,
          author: this.ruleForm.author,
          category: this.ruleForm.category,
          source: this.ruleForm.source,
          star: this.ruleForm.star,
          text: this.ruleForm.text,
          date: this.ruleForm.date
        })
        .then(res => {
          if (res) {
            this.$message({
              type: "success",
              message: "编辑成功"
            });
            this.$router.push("/published");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    returns() {
      this.$router.go(-1);
    }
  },
  mounted() {
    this.ids = this.$route.query._id;
    this.$axios
      .req("api/article/article", {
        _id: this.ids
      })
      .then(res => {
        if (res) {
          this.ruleForm = res.data;
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
  margin-bottom: 30px;
}
.el-button {
  margin: 5px;
}
</style>
