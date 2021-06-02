<template>
  <div id="desktop" class="clearfix">
    <div class="desktop_body">
      <div class="desktop_title">
        <p>桌面预约服务</p>
        <small>Desktop Reservation Service</small>
      </div>
      <el-row >
        <el-col :span="4" class="item1 item">
          <div class="item_wrapper">
            <div class="item_btn">
              <img src="../../../assets/imgs/电脑.png" alt="">
              <h2>基础实验桌面</h2>
            </div>
          </div>
          <a href="#" class="by-btn">立即预约</a>
        </el-col>
        <el-col :span="4" class="item2 item">
          <div class="item_wrapper">
            <div class="item_btn">
              <img src="../../../assets/imgs/3D.png" alt="">
              <h2>3D渲染桌面</h2>
            </div>
          </div>
          <a href="#" class="by-btn">立即预约</a>
        </el-col>
        <el-col :span="4" class="item3 item">
          <div class="item_wrapper">
            <div class="item_btn">
              <img src="../../../assets/imgs/文件夹.png" alt="">
              <h2>开发者桌面</h2>
            </div>
          </div>
          <a href="#" class="by-btn">立即预约</a>
        </el-col>
        <el-col :span="4" class="item4 item">
          <div class="item_wrapper">
            <div class="item_btn">
              <img src="../../../assets/imgs/大数据.png" alt="">
              <h2>大数据桌面</h2>
            </div>
          </div>
          <a href="#" class="by-btn">立即预约</a>
        </el-col>
        <el-col :span="4" class="item5 item">
          <div class="item_wrapper">
            <div class="item_btn">
              <img src="../../../assets/imgs/人工智能.png" alt="">
              <h2>人工智能桌面</h2>
            </div>
          </div>
          <a href="#" class="by-btn">立即预约</a>
        </el-col>
      </el-row>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Desktop",
  props: {
    msg: String,
  },
  data() {
    return {
      
    };
  },
  created(){
    
  },
  methods: {
    
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">

#desktop .desktop_body .el-row .item:hover .item_wrapper{
  background-color: rgba(232, 186, 0, 0.9);
  opacity: 0.9;
}
#desktop .desktop_body .el-row .item:hover .item_btn{
  padding-bottom: 20%;
}
#desktop .desktop_body .el-row .item:hover .by-btn{
  bottom: 50px;
  opacity: 1;
}
#desktop .desktop_body .el-row .item .by-btn:hover{
  background-color: rgba(232, 186, 0, 0.924);
}
#desktop{
  .desktop_body{
    min-width: 1200px;
    margin: auto;
    .desktop_title{
      padding: 20px;
      p{
        margin: 5px;
        color: #015595;
        font-size: 24px;
        display: flex;
        justify-content: center;
      }
      small{
        color: #f2b100;
        font-size: 12px;
        display: flex;
        justify-content: center;
      }
    }
    .el-row{
      .el-col-4{
        width: 20%;
        height: 20vw;
        position: relative;
        overflow: hidden;
        .item_wrapper{
          position: absolute;
          width: 100%;
          height:100%;
          display: flex;
          justify-content: center;
          transition-duration: 1s;
          text-align: center;
          align-items: center;
          background-color: rgba(1, 85, 149, .8);
          .item_btn{
            bottom: 0;
            z-index: 3;
            transition-duration: 1s;
            color: #fff;
            h2{
              font-weight: 600;
            }
          }
        }
        .by-btn{
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          color: #fff;
          opacity: 0;
          text-decoration-line: none;
          transition-duration: .5s;
          border: 1px solid;
          border-radius: 5px;
          padding: 5px 10px;
        }
      }
      .item1{
        background: url('../../../assets/imgs/basic-desk.ad28a0d8.png') no-repeat center center;
        background-size: 100% 100%;
      }
      .item2{
        background: url('../../../assets/imgs/d3-desk.4f1a71b5.png') no-repeat center center;
        background-size: 100% 100%;
      }
      .item3{
        background: url('../../../assets/imgs/dev-desk.798745a2.png') no-repeat center center;
        background-size: 100% 100%;
      }
      .item4{
        background: url('../../../assets/imgs/data-desk.0d7a68d6.png') no-repeat center center;
        background-size: 100% 100%;
      }
      .item5{
        background: url('../../../assets/imgs/god-desk.b4e0ffb1.png') no-repeat center center;
        background-size: 100% 100%;
      }
    }
  }
}
#news /deep/ .el-table--border td, 
#news /deep/ .el-table--border th, 
#news /deep/ .el-table__body-wrapper .el-table--border.is-scrolling-left~.el-table__fixed{
  border-right: none;
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
ul,li{ padding:0;margin:0;list-style:none}
</style>
