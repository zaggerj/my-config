import Mock from 'mockjs'
let params = Mock.mock({ // 数据池
    'userTableData|100': [{ // 图表过滤所需数据
        'account': '@string',
        'name': '@cname',
        'typeAccount': '@word',
        'sex': '@integer(0,1)',
        'tel': '@integer(10000000000,19999999999)',
        'email': '@email',
        'userRole': '@integer(0,1)',
        'pass': '@integer'
    }]
})

export default {
    getItemList: () => ({
        code: 200,
        data: params
    })
}