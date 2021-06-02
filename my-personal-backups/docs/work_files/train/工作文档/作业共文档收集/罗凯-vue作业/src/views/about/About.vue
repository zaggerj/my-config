<template>
  <div id="about">
    <nav-bar />
    <home-swiper />
    <news />
    <desktop />
    <serves />
    <footer>
      版权所有：武汉噢易云计算股份有限公司
    </footer>
  </div>
</template>

<script>
import NavBar from './childComps/NavBar.vue'
import HomeSwiper from './childComps/HomeSwiper.vue'
import News from './childComps/News.vue'
import Desktop from './childComps/Desktop.vue'
import Serves from './childComps/Serves.vue'

export default {
  name: "About",
  components:{
    NavBar,
    HomeSwiper,
    News,
    Desktop,
    Serves,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* @import "../../assets/css/base.css" */
#about footer{
  height: 32px;
  line-height: 32px;
  background-color: #e6e8ea;
  text-align: center;
  color: #515a6e;
  font-size: 14px;
}

</style>
