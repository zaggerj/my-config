<template>
    <div>
        <el-button @click="getFormEmpty()" class="btn">创建账号</el-button>
        <el-dialog title="创建账号" :visible.sync="dialogAddTableVisible">
            <el-form :model="form" :rules="rules">
                <el-form-item
                    label="账号"
                    prop="id"
                    :label-width="formLabelWidth"
                >
                    <el-input v-model="form.id" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="密码"
                    prop="password"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        v-model="form.password"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="确认密码"
                    prop="vpassword"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        v-model="form.vpassword"
                        autocomplete="off"
                        prop="password"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="姓名"
                    prop="name"
                    :label-width="formLabelWidth"
                >
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="性别"
                    prop="sex"
                    :label-width="formLabelWidth"
                >
                    <el-input v-model="form.sex" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item
                    label="邮箱"
                    prop="email"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        v-model="form.email"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="电话"
                    prop="phone"
                    :label-width="formLabelWidth"
                >
                    <el-input
                        v-model="form.phone"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogAddTableVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="addMember()">确 定</el-button>
            </div>
        </el-dialog>

        <el-button @click="deleteMemberConfirm()" class="btn">删除</el-button>
        <el-dialog title="删除确认" :visible.sync="dialogdeleteMemberConfirm">
            <el-form :model="form">
                <el-form-item label="本次操作将删除所有被选中的账户">
                </el-form-item>
                <el-form-item label="需进行二次确认，请输入ok"> </el-form-item>
                <el-input v-model="form.ifdelete" autocomplete="off"></el-input>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogdeleteMemberConfirm = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="deleteMemberConfirm()"
                    >确 定</el-button
                >
            </div>
        </el-dialog>

        <el-button @click="getEditMember()" class="btn">编辑账号</el-button>
        <el-dialog title="编辑账号" :visible.sync="dialogEditTableVisible">
            <el-form :model="form">
                <el-form-item label="账号" :label-width="formLabelWidth">
                    <el-input
                        v-model="form.id"
                        autocomplete="off"
                        disabled
                    ></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input
                        v-model="form.password"
                        autocomplete="off"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" :label-width="formLabelWidth">
                    <el-input
                        v-model="form.vpassword"
                        autocomplete="off"
                        type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" :label-width="formLabelWidth">
                    <el-input v-model="form.sex" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" :label-width="formLabelWidth">
                    <el-input
                        v-model="form.email"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
                <el-form-item label="电话" :label-width="formLabelWidth">
                    <el-input
                        v-model="form.phone"
                        autocomplete="off"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="editMember()"
                    >确 定</el-button
                >
            </div>
        </el-dialog>

        <el-button @click="changePasswordConfirm()" class="btn"
            >重置密码</el-button
        >
        <el-dialog
            title="重置密码确认"
            :visible.sync="dialogVPasswordConfirmVisible"
        >
            <el-form :model="form">
                <el-form-item label="本次操作将重置所选服务账户的登陆密码">
                </el-form-item>
                <el-form-item label="需进行二次确认，请输入ok"> </el-form-item>
                <el-input
                    v-model="form.ifeditPassword"
                    autocomplete="off"
                ></el-input>
            </el-form>

            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogVPasswordConfirmVisible = false"
                    >取 消</el-button
                >
                <el-button type="primary" @click="changePassword()"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <el-input
            v-model="input"
            placeholder="请输入内容"
            style="width:300px"
            class="btn"
        ></el-input>
        <el-button @click="searchMember()" class="btn">模糊搜索</el-button>

        <el-table
            :data="newtableData"
            border
            style="width: 100%,align:center"
            @selection-change="handleSelectionChange"
        >
            <el-table-column type="selection"></el-table-column>
            <el-table-column prop="id" label="账号" width="200">
            </el-table-column>

            <el-table-column prop="type" label="账号类型" width="200">
            </el-table-column>

            <el-table-column prop="name" label="姓名" width="200">
            </el-table-column>

            <el-table-column prop="sex" label="性别" width="200">
            </el-table-column>

            <el-table-column prop="email" label="邮箱" width="250">
            </el-table-column>

            <el-table-column prop="phone" label="电话" width="250">
            </el-table-column>
            s
            <el-table-column prop="role" label="组织角色" width="250">
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage4"
            :page-sizes="[5, 10, 20, 30]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            class="fenye"
        >
        </el-pagination>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                input: "",
                tableData: [
                    {
                        id: "001",
                        type: "服务账户",
                        name: "赵一",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "002",
                        type: "服务账户",
                        name: "钱二",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "003",
                        type: "服务账户",
                        name: "孙三",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "004",
                        type: "服务账户",
                        name: "李四",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "005",
                        type: "服务账户",
                        name: "周5",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "006",
                        type: "服务账户",
                        name: "吴一",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "007",
                        type: "服务账户",
                        name: "郑二",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "008",
                        type: "服务账户",
                        name: "王三",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "009",
                        type: "服务账户",
                        name: "冯四",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "0010",
                        type: "服务账户",
                        name: "张5",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "011",
                        type: "服务账户",
                        name: "张一",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "012",
                        type: "服务账户",
                        name: "张二",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "013",
                        type: "服务账户",
                        name: "张三",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "014",
                        type: "服务账户",
                        name: "张四",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "015",
                        type: "服务账户",
                        name: "张5",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "016",
                        type: "服务账户",
                        name: "张一",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "017",
                        type: "服务账户",
                        name: "张二",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "018",
                        type: "服务账户",
                        name: "张三",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "019",
                        type: "服务账户",
                        name: "张四",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "020",
                        type: "服务账户",
                        name: "张5",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "021",
                        type: "服务账户",
                        name: "张一",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "022",
                        type: "服务账户",
                        name: "张二",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "023",
                        type: "服务账户",
                        name: "张三",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "024",
                        type: "服务账户",
                        name: "张四",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "025",
                        type: "服务账户",
                        name: "张5",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "026",
                        type: "服务账户",
                        name: "张一",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "027",
                        type: "服务账户",
                        name: "张二",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "028",
                        type: "服务账户",
                        name: "张三",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "029",
                        type: "服务账户",
                        name: "张四",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "030",
                        type: "服务账户",
                        name: "张5",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "031",
                        type: "服务账户",
                        name: "张一",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "032",
                        type: "服务账户",
                        name: "张二",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "033",
                        type: "服务账户",
                        name: "张三",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "034",
                        type: "服务账户",
                        name: "张四",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "035",
                        type: "服务账户",
                        name: "张5",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "036",
                        type: "服务账户",
                        name: "张一",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "037",
                        type: "服务账户",
                        name: "张二",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "038",
                        type: "服务账户",
                        name: "张三",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "039",
                        type: "服务账户",
                        name: "张四",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "040",
                        type: "服务账户",
                        name: "张5",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "041",
                        type: "服务账户",
                        name: "张一",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "042",
                        type: "服务账户",
                        name: "张二",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "043",
                        type: "服务账户",
                        name: "张三",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "044",
                        type: "服务账户",
                        name: "张四",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "045",
                        type: "服务账户",
                        name: "张5",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "046",
                        type: "服务账户",
                        name: "张一",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "047",
                        type: "服务账户",
                        name: "张二",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "048",
                        type: "服务账户",
                        name: "张三",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "049",
                        type: "服务账户",
                        name: "张四",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "050",
                        type: "服务账户",
                        name: "张5",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "051",
                        type: "服务账户",
                        name: "张一",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "052",
                        type: "服务账户",
                        name: "张二",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "053",
                        type: "服务账户",
                        name: "张三",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "054",
                        type: "服务账户",
                        name: "张四",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "055",
                        type: "服务账户",
                        name: "张5",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "056",
                        type: "服务账户",
                        name: "张一",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "057",
                        type: "服务账户",
                        name: "张二",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "058",
                        type: "服务账户",
                        name: "张三",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "059",
                        type: "服务账户",
                        name: "张四",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "060",
                        type: "服务账户",
                        name: "张5",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                ],
                //调整按钮，表格样式
                //创建账号对话框
                dialogAddTableVisible: false,
                //编辑账号对话框
                dialogEditTableVisible: false,
                //删除确认对话框
                dialogdeleteMemberConfirm: false,
                //重置密码确认对话框:
                dialogVPasswordConfirmVisible: false,
                form: {
                    id: "",
                    password: "",
                    vpassword: "",
                    name: "",
                    sex: "",
                    email: "",
                    phone: "",
                    ifdelete: "",
                    ifeditPassword: "",
                },
                rules: {
                    id: [
                        {
                            required: true,
                            message: "请输入id",
                            trigger: "blur",
                        },
                        {
                            min: 3,
                            max: 5,
                            message: "长度在 3 到 5 个字符",
                            trigger: "blur",
                        },
                    ],
                    password: [
                        {
                            required: true,
                            message: "请输入密码",
                            trigger: "blur",
                        },
                        {
                            min: 3,
                            max: 5,
                            message: "长度在 3 到 5 个字符",
                            trigger: "blur",
                        },
                    ],
                    vpassword: [
                        {
                            required: true,
                            message: "请再次输入密码",
                            trigger: "blur",
                        },
                        {
                            min: 3,
                            max: 5,
                            message: "长度在 3 到 5 个字符",
                            trigger: "blur",
                        },
                    ],
                    name: [
                        {
                            required: true,
                            message: "请输入姓名",
                            trigger: "blur",
                        },
                        {
                            min: 2,
                            max: 5,
                            message: "长度在 2到 5 个字符",
                            trigger: "blur",
                        },
                    ],
                    sex: [
                        {
                            required: true,
                            message: "请输入sex",
                            trigger: "blur",
                        },
                        {
                            min: 1,
                            max: 5,
                            message: "长度在 1 到 5 个字符",
                            trigger: "blur",
                        },
                    ],
                    email: [
                        {
                            required: true,
                            message: "请输入email",
                            trigger: "blur",
                        },
                        {
                            min: 1,
                            max: 20,
                            message: "长度在 1 到 20 个字符",
                            trigger: "blur",
                        },
                    ],
                    phone: [
                        {
                            required: true,
                            message: "请输入电话号码",
                            trigger: "blur",
                        },
                        {
                            min: 8,
                            max: 11,
                            message: "长度在8-11之间",
                            trigger: "blur",
                        },
                    ],
                },
                formLabelWidth: "120px",
                CheckboxChoose: [],
                passwords: {
                    password: "",
                    passwords: "",
                },
                currentPage1: 4,
                currentPage2: 3,
                currentPage3: 2,
                currentPage4: 1,
                everyPage: 5,
                currentPage: 1,
                newtableData: [
                    {
                        id: "001",
                        type: "服务账户",
                        name: "张一",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "002",
                        type: "服务账户",
                        name: "张二",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "003",
                        type: "服务账户",
                        name: "张三",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "004",
                        type: "服务账户",
                        name: "张四",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                    {
                        id: "005",
                        type: "服务账户",
                        name: "张5",
                        sex: "男",
                        email: "123456789@qq.com",
                        phone: "12345678910",
                        role: "成员",
                        password: "123",
                        vpassword: "123",
                    },
                ],
                newtableDateSearch: [],
            };
        },
        methods: {
            //表格置空
            getFormEmpty() {
                this.dialogAddTableVisible = true;
                //将表格里面的数据都置空
                this.form.id = "";
                this.form.password = "";
                this.form.vpassword = "";
                this.form.name = "";
                this.form.sex = "";
                this.form.email = "";
                this.form.phone = "";
            },
            //添加成员
            addMember: function() {
                // this.tableData.push(this.form);
                this.tableData.push({
                    id: this.form.id,
                    type: "服务账户",
                    name: this.form.name,
                    sex: this.form.sex,
                    email: this.form.email,
                    phone: this.form.phone,
                    role: "成员",
                    password: this.form.password,
                    vpassword: this.form.vpassword,
                });
                this.dialogAddTableVisible = false;
            },
            //多选框选择
            handleSelectionChange(val) {
                this.multipleSelection = val;
                // console.log(val);
                this.CheckboxChoose.splice(
                    0,
                    this.CheckboxChoose.length,
                    ...val
                );
                //将一个数组的值依次加入另外一个数组的方法
                // .arr.splice(0, .arr.length, ...selection)
            },

            //获取要编辑的成员
            getEditMember: function() {
                this.dialogEditTableVisible = true;
                if (this.CheckboxChoose.length == 1) {
                    //将被选中的框的内容赋值到form表单中
                    this.form.id = this.CheckboxChoose[0].id;
                    this.form.password = this.CheckboxChoose[0].password;
                    this.form.vpassword = this.CheckboxChoose[0].vpassword;
                    this.form.type = "服务账号";
                    this.form.name = this.CheckboxChoose[0].name;
                    this.form.sex = this.CheckboxChoose[0].sex;
                    this.form.email = this.CheckboxChoose[0].email;
                    this.form.phone = this.CheckboxChoose[0].phone;
                    this.form.role = "成员";
                }
            },
            //编辑成员信息,并且存到tableData里面
            editMember: function() {
                // console.log(this.tableData);
                // console.log(this.CheckboxChoose);
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].id == this.CheckboxChoose[0].id) {
                        //将form表单中的内容赋值到tableData数组中
                        this.tableData[i].id = this.form.id;
                        this.tableData[i].type = "服务账户";
                        this.tableData[i].name = this.form.name;
                        this.tableData[i].sex = this.form.sex;
                        this.tableData[i].email = this.form.email;
                        this.tableData[i].phone = this.form.phone;
                        this.tableData[i].role = "成员";
                        this.tableData[i].password = this.form.password;
                        this.tableData[i].vpassword = this.form.vpassword;
                        this.dialogEditTableVisible = false;
                        break;
                    }
                }
            },
            //随机生成字符串
            RandomStr(a) {
                var d,
                    e,
                    b =
                        "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
                    c = "";
                for (d = 0; a > d; d += 1)
                    (e = Math.random() * b.length),
                        (e = Math.floor(e)),
                        (c += b.charAt(e));
                return c;
            },

            //重置密码
            changePassword: function() {
                this.dialogVPasswordConfirmVisible = false;
                for (let i = 0; i < this.tableData.length; i++) {
                    if (this.tableData[i].id == this.CheckboxChoose[0].id) {
                        //将form表单中的内容赋值到tableData数组中
                        //随机生成一个字符串，然后成为新的密码
                        //将随机生成的字符串修改为当前数据的密码
                        this.tableData.password = this.RandomStr(5);
                        this.tableData.vpassword = this.RandomStr(5);
                        alert("重置密码成功");
                        this.form.ifeditPassword = "";
                        break;
                    }
                }
            },
            //重置密码确认
            changePasswordConfirm: function() {
                this.dialogVPasswordConfirmVisible = true;
                if (this.form.ifeditPassword == "ok") {
                    //实现随机生成密码并且改密码，
                    this.changePassword();
                }
            },

            //删除成员,将不变的数组放在外循环，要变的数组放在内循环，不去控制数组索引，会更稳定
            deleteMember: function() {
                for (let i = 0; i < this.CheckboxChoose.length; i++) {
                    for (let j = 0; j < this.tableData.length; j++) {
                        if (this.CheckboxChoose[i].id == this.tableData[j].id) {
                            this.tableData.splice(j, 1);
                            break;
                        }
                    }
                }
            },
            // 确认删除
            deleteMemberConfirm: function() {
                this.dialogdeleteMemberConfirm = true;
                // 判断置空
                // this.form.ifdelete = "";
                if (this.form.ifdelete == "ok") {
                    this.form.ifdelete = "";
                    this.deleteMember();
                    this.dialogdeleteMemberConfirm = false;
                    this.showForm();
                }
            },

            //分页处理
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

            //实现模糊搜索
            //模糊搜素
            searchMember() {
                this.newtableDateSearch.splice(
                    0,
                    this.newtableDateSearch.length
                );
                //输入框的数组
                let inputArr = this.input.split("");
                for (let i = 0; i < this.tableData.length; i++) {
                    let flag = true;
                    let arr = this.tableData[i].name.split("");
                    for (let j = 0; j < inputArr.length && flag == true; j++) {
                        for (let k = 0; k < arr.length; k++) {
                            if (inputArr[j] == arr[k]) {
                                this.newtableDateSearch.push(this.tableData[i]);
                                flag = false;
                                break;
                            }
                        }
                    }
                }
                //根据当前分页情况重新展示数据
                this.showsearchForm();
            },

            //将模糊搜索的数据进行分页展示
            showsearchForm() {
                this.newtableData.splice(0, this.newtableData.length);
                for (
                    let i = (this.currentPage - 1) * this.everyPage;
                    i <= this.currentPage * this.everyPage - 1 &&
                    i < this.newtableDateSearch.length;
                    i++
                ) {
                    this.newtableData.push(this.newtableDateSearch[i]);
                }
            },
        },
        // 待添加:显示当前密码
    };
</script>

<style>
    table {
        border-collapse: collapse;
        width: 100%;
    }
    table th {
        border: 1px solid rgb(228, 224, 236);
        margin: 0;
        width: 12.5%;
        text-align: center;
    }

    .item td {
        border: 1px solid rgb(228, 224, 236);
        margin: 0;
        width: 12.5%;
        text-align: center;
    }

    /*按钮的样式*/
    .btn {
        float: left;
        margin-right: 15px !important;
        margin-bottom: 15px;
    }

    /*分页的样式*/
    .fenye {
        float: left;
    }
</style>
