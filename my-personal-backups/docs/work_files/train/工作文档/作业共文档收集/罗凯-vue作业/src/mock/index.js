// 保存模拟数据路径
import Mock from 'mockjs'
import itemList from './itemList'
import aboutTableList from './aboutTable'

Mock.mock(/\/itemList\/getItemList/, 'get', itemList.getItemList)
Mock.mock(/\/aboutTableList\/getItemList/, 'get', aboutTableList.getItemList)