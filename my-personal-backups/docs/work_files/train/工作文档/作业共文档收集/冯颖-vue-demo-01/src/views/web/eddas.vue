<template>
    <el-container>
        <el-header>
            <img :src="logo_url" />
            <el-menu mode="horizontal">
                <el-menu-item index="1" id="item1">首页</el-menu-item>
                <el-menu-item index="2">服务申请</el-menu-item>
                <el-menu-item index="3">桌面服务</el-menu-item>
                <el-menu-item index="4">应用服务</el-menu-item>
                <el-menu-item index="5">课程下载</el-menu-item>
                <el-menu-item index="6">个人中心</el-menu-item>
                <el-menu-item index="7">帮助中心</el-menu-item>
                <el-menu-item index="8"
                    ><img :src="right_url"
                /></el-menu-item>

                <el-submenu index="9">
                    <template slot="title">zxk</template>
                    <el-menu-item index="9-1">转至组织管理</el-menu-item>
                </el-submenu>
                <el-menu-item index="10">|</el-menu-item>
                <el-menu-item index="11">退出</el-menu-item>
            </el-menu>
        </el-header>
        <el-main>
            <div class="lunbo">
                <div class="block">
                    <span class="demonstration"></span>
                    <el-carousel trigger="click" height="600px">
                        <el-carousel-item v-for="item in 4" :key="item">
                            <h3 class="small"></h3>
                            <img
                                :src="lunbo_url"
                            />
                        </el-carousel-item>
                    </el-carousel>
                </div>
            </div>
            <div class="news">
                <div class="new_title">新闻中心</div>
                <div class="new_title_news">NEWS</div>
                <div class="newsList">
                    <el-table
                        :data="newtableData"
                        style="width: 100%"
                        :show-header="false"
                        class="form"
                    >
                        <el-table-column prop="title" label="" width="900">
                        </el-table-column>
                        <el-table-column prop="date" label="" width="180">
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        :current-page="currentPage4"
                        :page-sizes="[5, 10, 15, 20]"
                        :page-size="100"
                        layout="total, sizes, prev, pager, next, jumper"
                        :total="100"
                        class="fenye"
                    >
                    </el-pagination>
                </div>
            </div>
            <br />

            <div class="newsImgs">
                <div class="new_title">桌面预约服务</div>
                <div class="new_title_news">Desktop Reservation Service</div>
                <div class="images">
                    <div class="img-item">
                        <img
                            :src="img1_url"
                        />
                    </div>
                    <div class="img-item">
                        <img
                            :src="img2_url"
                        />
                    </div>
                    <div class="img-item">
                        <img
                            :src="img3_url"
                        />
                    </div>
                    <div class="img-item">
                        <img
                            :src="img4_url"
                        />
                    </div>
                    <div class="img-item">
                        <img
                            :src="img5_url"
                        />
                    </div>
                </div>
            </div>
            <div class="disk">
                <div class="disk-title">教学网盘服务</div>
                <div class="disk-content">
                    通过教学网盘，老师可以进行网上备课，将自己的教学心得及时记录下来，并上传到网盘，供学生课后下载学习，一方面有助于促进自身教育能力的提高，另一方面也可以为其他老师提供方便，有利于整体教学水平的提高。
                </div>
                <div class="disk-img">
                    <img
                        :src="right_url"
                    />
                </div>
            </div>

            <div class="work">
                <div class="work-img">
                    <img
                        :src="left_url"
                    />
                </div>
                <div class="work-right">
                    <div class="work-title">
                        作业空间服务
                    </div>
                    <div class="work-content">
                        通过网盘可为学生提供丰富的在线学习资源，学生获取知识的效率大大提高，方便老师布置作业，也方便学生提交作业，同时也方便老师批改作业，通过网盘为师生提供交流互动平台，良好的师生关系是确保课堂有效性的重要因素，它需在师生互动过程中逐步建立。
                    </div>
                </div>
            </div>
            <div class="footer">版权所有：武汉噢易云计算股份有限公司</div>
            </div></el-main>
            </div>
        </el-main>
    </el-container>
</template>

<script>
    export default {
        data() {
            return {
                logo_url:require('@/assets/imges/user.png'),
                lunbo_url:require('@/assets/imges/lunbo.png'),
                img1_url:require('@/assets/imges/img1.png'),
                img2_url:require('@/assets/imges/img2.png'),
                img3_url:require('@/assets/imges/img3.png'),
                img4_url:require('@/assets/imges/img4.png'),
                img5_url:require('@/assets/imges/img5.png'),
                right_url:require('@/assets/imges/use-right.png'),
                left_url:require('@/assets/imges/work-left.png'),


                tableData: [
                    {
                        title: "0震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "1震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "2震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "3震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "4震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "5震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "6震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "7震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "8震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "9震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "10震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "11震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "12震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "13震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "14震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "15震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "16震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "17震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "18震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "19震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "20震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "21震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "22震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "23震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "24震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "25震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "26震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "27震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "28震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "29震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "30震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "31震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "32震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "33震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "34震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "35震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "36震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "37震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "38震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "39震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "40震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "41震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "42震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "43震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "44震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "45震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "46震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "47震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "48震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "49震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "50震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "51震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "52震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "53震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "54震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "55震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "56震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "57震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "58震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "59震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "60震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "61震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                ],
                currentPage1: 4,
                currentPage2: 3,
                currentPage3: 2,
                currentPage4: 1,
                everyPage: 5,
                currentPage: 1,
                newtableData: [
                    {
                        title: "0震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "1震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "2震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "3震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                    {
                        title: "4震惊！xxxxxxxx",
                        date: "2016-05-02",
                    },
                ],
            };
        },
        methods: {
            handleSizeChange(val) {
                this.everyPage = val;
                this.showForm();
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.showForm();
                console.log(`当前页: ${val}`);
            },
            //表单显示显示当前页的新闻,截取到要显示的部分，
            showForm() {
                this.newtableData.splice(0, this.newtableData.length);
                for (
                    let i = (this.currentPage - 1) * this.everyPage;
                    i <= this.currentPage * this.everyPage - 1 &&
                    i < this.tableData.length;
                    i++
                ) {
                    this.newtableData.push(this.tableData[i]);
                    console.log(this.tableData[i]);
                }
            },
        },
    };
</script>
<style>
    body > .el-container {
        margin-bottom: 40px;
        background: greenyellow;
    }
    /**
    头部样式
     */
    .el-header {
        margin-top: -20px;
        text-align: center;
        height: 80px;
        background: #ffffff;
    }

    .el-main {
        text-align: center;
        height:2800px;
    }

    .el-col {
        border-radius: 4px;
    }

    .grid-content {
        border-radius: 4px;
        min-height: 36px;
        margin-top: 10px;
    }

    .grid-content .bg-purple img {
        width: 500px;
        height: 60px;
    }

    .grid-content .el-link {
        padding-top: 10px;
        font-size: 16px !important;
        font-weight: 500;
    }

    .el-header img {
        width: 500px;
        height: 60px;
        margin-left: 20px;
        float: left;
    }
    .el-header .el-menu {
        margin-right: 10px;
        float: right;
        width: 50%;
    }

    .el-header .el-menu .el-menu-item {
        color: #2b80c0;
        font-size: 16px;
        margin-right: -20px;
    }

    .el-header .el-menu .el-menu-item img {
        width: 40px;
        height: 40px;
        margin-top: 10px;
        border-radius: 50%;
    }

    .el-menu--horizontal > .el-menu-item.is-active {
        border-bottom: 2px solid #f29600 !important;
        color: #f29600 !important;
    }

    /**
    轮播图片样式
     */
    .lunbo {
        width: 100%;
        margin-top: -20px;
    }
    .lunbo img {
        width: 100%;
        margin-top: -35px;
        border: 1px solid #e8eaec;
        z-index: 9999;
        height: 620px;
    }

    .user-index[data-v-7050e704]
        .ivu-carousel
        .ivu-carousel-dots
        li.ivu-carousel-active
        > button {
        opacity: 1;
        width: 24px;
        background: #f7d652;
    }

    /**新闻 */
    .news {
        margin-top: -140px;
        /*  background: pink;*/
    }

    .news .new_title {
        color: #015595;
        font-size: 24px;
        line-height: 1.1;
        margin-bottom: 20px;
        text-align: center;
        margin-top: 150px;
    }
    /**新闻标题 */
    .news .new_title_news {
        color: #f2b100;
        font-size: 12px;
        margin-top: 10px;
    }

    .newsList {
        text-align: center;
        width: 70%;
        margin: 0 auto;
    }

    .el-table .warning-row {
        background: oldlace;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }

    .newsImgs .new_title {
        color: #015595;
        font-size: 24px;
        line-height: 1.1;
        margin-bottom: 20px;
        text-align: center;
        margin-top: 30px;
    }

    .newsImgs .new_title_news {
        color: #f2b100;
        font-size: 12px;
        margin-top: 10px;
    }

    /*桌面预约服务样式*/
    .images {
        width: 100%;
        height: 380px;
        float: left;
        margin-top: 20px;
    }

    .images .img-item {
        width: 20%;
        height: 380px;
        float: left;
    }

    .img-item img {
        width: 100%;
        height: 380px;
        background-color: rgba(1, 85, 149, 0.8);
    }

    /*教学网盘服务样式*/
    .disk {
        width: 100%;
        height: 300px;
        margin-top: 450px;
        align-content: center;
    }

    .disk .disk-title {
        font-size: 24px;
        color: #015595;
        padding-left: 0;
        text-align: left;
    }

    .disk .disk-content {
        font-size: 14px;
        color: #333;
        letter-spacing: 1px;
        line-height: 30px;
        width: 40%;
        text-align: left;
    }

    .disk .disk-img {
        width: 40%;
        height: 380px;
        float: right;
        margin-top: -150px;
    }

    /**作业空间服务样式*/
    .work {
        width: 100%;
        height: 300px;
        margin-top: 450px;
        align-content: center;
        margin-top: 30px;
        background:#F2F2F2;
    }

    .work-right {
        float: right;
        width: 50%;
    }

    .work .work-title {
        font-size: 24px;
        color: #015595;
        text-align: left;
    }

    .work .work-content {
        font-size: 14px;
        color: #333;
        letter-spacing: 1px;
        line-height: 30px;
        width: 80%;
        text-align: left;
        float: left;
        margin-top: 10px;
    }

    .work .work-img {
        width: 40%;
        height: 380px;
        float: left;
        margin-top: -10px;
    }

    .footer{
    width:100%;
    height:20px;
    background: #f5f7f9;
    color: #515a6e;
    font-size: 14px;
    float:inline-end;
    padding-bottom: 14px;
    padding-top:14px;
    padding-left:-200px;
    text-align: center;
    margin-top:-70px;
    float:left;
    }
</style>
