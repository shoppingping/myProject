<template>
  <el-container>
  <el-main>
    <router-view></router-view>
  </el-main>
</el-container>
</template>

<script>
import { Navbar } from '@/views/layout/components'

	const BG = require("../../../static/images/bg.png");

export default {
  name: 'layout',
  components: {
    Navbar
  }
}
</script>

<style scoped>
  .el-main {
    background:url("../../../static/images/bg.png");
    background-size: 100%;
    color: #333;
    text-align: center;
    padding:0;
  }

</style>
