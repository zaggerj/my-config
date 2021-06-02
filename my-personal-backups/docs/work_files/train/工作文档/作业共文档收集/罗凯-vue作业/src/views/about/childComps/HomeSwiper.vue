<template>
  <div id="homeSwiper">
    <el-carousel :interval="5000" arrow="always">
      <el-carousel-item v-for="(item,index) in swiperList" :key="index">
        <img :src="item.url" alt="">
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  name: "HomeSwiper",
  props: {
    msg: String,
  },
  data() {
    return {
      swiperList:[
        {url:require('../../../assets/imgs/banner1.5e74b1d8.png')},
        {url:require('../../../assets/imgs/banner1.5e74b1d8.png')},
        {url:require('../../../assets/imgs/banner1.5e74b1d8.png')}
      ]
    };
  },
  methods: {

  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#homeSwiper{
  min-width: 1140px;
  /deep/ .el-carousel{
    .el-carousel__container{
      height: 582px;
    }
    .el-carousel__indicators{
      .el-carousel__button{
        background-color: #1e6aa2;
        opacity: 1;
      }
      .is-active{
        button{
         background-color: #f7d652
        }
      } 
    }
    
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
