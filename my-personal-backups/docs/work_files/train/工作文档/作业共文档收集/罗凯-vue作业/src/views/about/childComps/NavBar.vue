<template>
  <div id="navBar" class="clearfix">
    <div class="nav_logo">
      <img src="../../../assets/imgs/user.png" alt="">
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      text-color="#2b80c0"
      active-text-color="#f29600"
      mode="horizontal"
      @select="handleSelect"
    >
      <el-menu-item index="1">首页</el-menu-item>
      <el-menu-item index="2">服务申请</el-menu-item>
      <el-menu-item index="3">桌面服务</el-menu-item>
      <el-menu-item index="4">应用服务</el-menu-item>
      <el-menu-item index="5">课程下载</el-menu-item>
      <el-menu-item index="6">个人中心</el-menu-item>
      <el-menu-item index="7">帮助中心</el-menu-item>
      <el-submenu index="8" class="nav_user">
        <template slot="title">
          <el-avatar size="small" :src="circleUrl"></el-avatar>
          zxk
        </template>
        <el-menu-item index="8-1">转至组织管理</el-menu-item>
      </el-submenu>
      <li class="nav_user" style="float: left;height: 60px;line-height: 60px;">
        <el-divider direction="vertical"></el-divider>
      </li>
      <el-menu-item index="9" class="nav_user">退出</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: {
    msg: String,
  },
  data() {
    return {
      circleUrl:'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
      activeIndex: "1",
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#navBar {
  padding: 0 50px;
  line-height: 60px;
  height: 60px;
  .nav_logo {
    float: left;
    height: 100%;
    img{
      vertical-align: middle;
    }
  }
  .el-menu-demo{
    float: right;
    border-bottom:none;
    /deep/ .el-menu-item{
      padding: 0;
      margin: 0 20px;
      height: 50px;
      line-height: 50px;
    }
    /deep/ .el-submenu{
      .el-submenu__title{
        height: 50px;
        line-height: 50px;
      }
    }
  }
}
@media screen and (max-width:1260px){
    .el-menu-demo{
      display: none;
    }
}
@media screen and (max-width:1466px){
    .el-menu-demo /deep/ .nav_user{
      display: none;
    }
}
.clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
    content: "";
    display: block;
    height: 0;
    clear:both;
    visibility: hidden;
}
.clearfix{
    *zoom: 1;
}
</style>
