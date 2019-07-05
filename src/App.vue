<template>
  <div id="app">
    <router-view v-if="$route.path==='/'||$route.path==='/register'"/>
    <el-container v-else>
      <el-header><navigation></navigation></el-header>
      <el-container>
        <el-aside width="200px"><asides></asides></el-aside>
        <el-main><router-view/></el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  import navigation from "./views/Navigation"
  import asides from "./views/Asides"
  export default {
    components: {
      navigation,
      asides
    }
  }
</script>
<style lang="scss">
/*#app {*/
/*  font-family: "Avenir", Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*}*/
/*#nav {*/
/*  padding: 30px;*/
/*  a {*/
/*    font-weight: bold;*/
/*    color: #2c3e50;*/
/*    &.router-link-exact-active {*/
/*      color: #42b983;*/
/*    }*/
/*  }*/
/*}*/
.el-header, .el-footer {
  background-color: #244c6e;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  /*text-align: center;*/
  /*line-height: 200px;*/
}

.el-main {
  background-color: #E9EEF3;
  color: #333;
  /*text-align: center;*/
  /*line-height: 160px;*/
  font-weight: bold;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  /*line-height: 260px;*/
}

.el-container:nth-child(7) .el-aside {
  /*line-height: 320px;*/
}
</style>
