<template>
  <div id="app">
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <Header></Header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <Aside></Aside>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

<script>

import Header from "@/layout/Header";
import Aside from "@/layout/Aside";
export default {
  name: 'App',
  components: {
    Aside,
    Header
  }
}
</script>

<style>

.el-header, .el-footer {
  background-color: #003576;
  color: #333;
  text-align: center;
  line-height: 150px;
  min-height: 100px;
  margin-top: -7px;
  margin-right: -5px;
}

.el-aside {
  background-color: #444;
  color: #333;
  text-align: center;
  min-height: 650px;

}



.el-main {
  background-color: #ffffff;
  color: #042359;
  text-align: center;


}

body > .el-container {
  margin-bottom: 40px;

}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

</style>
