<template>
  <div id="app">
    <div id="nav">
      <router-link to="/home">
        <el-button type="primary" plain>第一次作业</el-button>
      </router-link>
      <router-link to="/about">
        <el-button type="primary" plain>第二次作业</el-button>
      </router-link>
      <router-link to="/role">
        <el-button type="primary" plain>第三次作业</el-button>
      </router-link>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  computed: {

  },
};
</script>

<style lang="less" scoped>
#nav{
  position: fixed;
  bottom: 50%;
  right: 30px;
  transform: translateY(50%);
  display: inline-block;
  z-index: 9999;
  a{
    display: block;
    margin: 20px 0;
    .el-button{
      opacity: 0.5;
    }
    .is-plain:focus{
      opacity: 1;
    }
    .is-plain:hover{
      opacity: 1;
    }
      
  }
}
</style>
