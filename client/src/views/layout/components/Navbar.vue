<template>
  <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b">
      <el-menu-item index="0">
        <i class="el-icon-menu"></i>
        <span slot="title">菜单管理</span>
      </el-menu-item>
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>合同管理</span>
        </template>
        <el-menu-item-group>
          <template slot="title">合同管理</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">缴费管理</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-document"></i>
        <span slot="title">消息管理</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span slot="title">物业管理</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">物业管家员管理</span>
      </el-menu-item>
      <el-menu-item index="6">
        <i class="el-icon-setting"></i>
        <span slot="title">报事管理</span>
      </el-menu-item>
      <el-menu-item index="11">
          <i class="el-icon-setting"></i>
          <span slot="title">门禁管理</span>
        </el-menu-item>
        <el-menu-item index="12">
          <i class="el-icon-setting"></i>
          <span slot="title">房屋管理</span>
        </el-menu-item>
        <el-menu-item index="13">
          <i class="el-icon-setting"></i>
          <span slot="title">访客管理</span>
        </el-menu-item>
      <el-menu-item index="7">
        <i class="el-icon-setting"></i>
        <span slot="title">门岗预约</span>
      </el-menu-item>
      <el-menu-item index="8">
        <i class="el-icon-setting"></i>
        <span slot="title">客服管理</span>
      </el-menu-item>
      <el-menu-item index="9">
        <i class="el-icon-setting"></i>
        <span slot="title">系统管理</span>
      </el-menu-item>
      <el-menu-item index="10">
        <i class="el-icon-setting"></i>
        <span slot="title">会员管理</span>
      </el-menu-item>
      <el-submenu index="12">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>cms管理</span>
        </template>
        <el-menu-item-group>
          <!-- <template slot="title">通知管理</template> -->
          <el-menu-item index="1-1">通知管理</el-menu-item>
          <el-menu-item index="1-2">banner管理</el-menu-item>
          <el-menu-item index="1-3">发帖管理</el-menu-item>
          <el-menu-item index="1-3">文章管理</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
        <el-menu-item index="12">
          <i class="el-icon-setting"></i>
          <span slot="title">统计报表</span>
        </el-menu-item>

      
    </el-menu>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  components: {
  },
  computed: {
    // ...mapGetters([
    //   'sidebar',
    //   'avatar'
    // ])
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  }
}
</script>
<style scoped>
</style>