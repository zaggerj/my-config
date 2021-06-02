import Mock from 'mockjs'
let params = Mock.mock({ // 数据池
    'userTableData|10': [{ // 图表过滤所需数据
        'test': '@ctitle',
        'time': '@date'
    }]
})

export default {
    getItemList: () => ({
        code: 200,
        data: params
    })
}