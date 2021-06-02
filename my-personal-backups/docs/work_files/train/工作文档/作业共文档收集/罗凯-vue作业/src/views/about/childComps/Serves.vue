<template>
  <div id="serve">
    <div>
      <div class="serveItem">
        <div class="serve_content">
          <h4>教学网盘服务</h4>
          <p>通过教学网盘，老师可以进行网上备课，将自己的教学心得及时记录下来，并上传到网盘，供学生课后下载学习，一方面有助于促进自身教育能力的提高，另一方面也可以为其他老师提供方便，有利于整体教学水平的提高。</p>
        </div>
        <div class="serve_picture">
          <img src="../../../assets/imgs/use-right.240c44c6.png" alt="">
        </div>
      </div>
    </div>
    <div style="background-color: #fcfcfc;">
      <div class="serveItem">
        <div class="serve_picture">
          <img src="../../../assets/imgs/work-left.cb00a4af.png" alt="">
        </div>
        <div class="serve_content">
          <h4>作业空间服务</h4>
          <p>通过网盘可为学生提供丰富的在线学习资源，学生获取知识的效率大大提高，方便老师布置作业，也方便学生提交作业，同时也方便老师批改作业，通过网盘为师生提供交流互动平台，良好的师生关系是确保课堂有效性的重要因素，它需在师生互动过程中逐步建立。</p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "Serves",
  props: {
    msg: String,
  },
  data() {
    return {
      
    };
  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
#serve {
  .serveItem{
    height: 200px;
    position: relative;
    min-width: 1024px;
    max-width: 1540px;
    margin: 0 auto;
    padding: 60px 50px;
    display: flex;
  }
  .serve_content {
    flex: 1;
    h4{
      font-size: 24px;
      color: #015595;
    }
    p{
      font-size: 14px;
      margin-top: 10px;
      color: #333;
      letter-spacing: 1px;
      line-height: 30px;
    }
  }
  .serve_picture {
     flex: 1;
     display: flex;
     justify-content: center;
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
