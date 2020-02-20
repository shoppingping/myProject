<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family:'MicrosoftYaHei,Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  width:100%;
  height: 100%;
  min-width:1200px;
  min-height: 615px;
}
section{
  width:100%;
  height: 100%;
}
.el-main{
  width:100%;
  height: 100%;
}
</style>
