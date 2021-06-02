<!--
 * @Description: vue课件-第二次课程
 * @Author: zagger
 * @Date: 2021-05-09 23:09:52
 * @LastEditors: zagger
 * @LastEditTime: 2021-05-10 12:46:22
-->

# 1. 课程安排

时间：2021--5-10（周一上午：9:00-12:00）

- 9:00-9:50 前几次作业回顾
- 9:50-10:00 课间休息
- 10:00-10:50 结合项目讲解vue实践基础
- 10:50-11:00 课间休息
- 11:00-12:00 问题答疑和讨论加上布置作业

# 2. vue 基础语法组成

## 2.1. vue实例

一个**Vue 应用**由一个通过 new Vue 创建的

- 根 Vue 实例，
- 以及可选的嵌套的、可复用的组件树
- 组成。

## 2.2. vue生命周期

## 2.3. computed和watch

### 2.3.1. computed

#### 2.3.1.1. computed使用场景

- 模板语法逻辑有点深了
- 用来显示的变量，需要通过转换或者计算时
- 一些数据需要随着其他数据变动而变动

#### 2.3.1.2. computed完整的语法形式

- 应该是同时包含getter和setter

```js
computed: {
  fullName: {
    // getter
    get: function () {
      return this.firstName + ' ' + this.lastName
    },
    // setter
    set: function (newValue) {
      var names = newValue.split(' ')
      this.firstName = names[0]
      this.lastName = names[names.length - 1]
    }
  }
}
```

#### 2.3.1.3. computed 两条铁律

- 优先使用computed
- 计算属性是基于它们的响应式依赖进行缓存的
- 只在相关响应式依赖发生改变时它们才会重新求值

### 2.3.2. watch

#### 2.3.2.1. watch使用场景

- 当需要在数据变化时执行异步或开销较大的操作

#### 2.3.2.2. watch语法

```js
  watch: {
    // 如果 `question` 发生改变，这个函数就会运行
    question: function (newQuestion, oldQuestion) {
      this.answer = 'Waiting for you to stop typing...'
      this.debouncedGetAnswer()
    }
  }
```

## 2.4. v-for

### 2.4.1. unique key

#### 2.4.1.1. 默认高效的策略

- 使用“就地更新”的策略：数据项的顺序被改变，Vue 将不会移动 DOM 元素来匹配数据项的顺序，而是就地更新每个元素，并且确保它们在每个索引位置正确渲染
- 刻意依赖默认行为以获取性能上的提升

- **你需要为每项提供一个唯一 key attribute**

#### 2.4.1.2. 例子

```html
<div v-for="item in items" v-bind:key="item.id">
  <!-- 内容 -->
</div>
```

### 2.4.2. 数组更新

#### 2.4.2.1. vue变种方法

##### 2.4.2.1.1. 特点

- 就是被vue包装过了
- 变更了原数组值
- 会触发视图更新！！！

##### 2.4.2.1.2. 变种包含

- push()
- pop()
- shift()
- unshift()
- splice()
- sort()
- reverse()

#### 2.4.2.2. 非变更方法

##### 2.4.2.2.1. 非变种包含

- filter
- concat
- slice

##### 2.4.2.2.2. 使用

-用新数组替换旧数组

```js
example1.items = example1.items.filter(function (item) {
  return item.message.match(/Foo/)
})
```

### 2.4.3. 响应式原理

#### 2.4.3.1. 对象

```js
// 单个属性
this.$set(this.someObject,'b',2);

// 多个属性
// 代替 `Object.assign(this.someObject, { a: 1, b: 2 })`
this.someObject = Object.assign({}, this.someObject, { a: 1, b: 2 })
```

#### 2.4.3.2. 数组

Vue 不能检测以下数组的变动：  

1. 当你利用索引直接设置一个数组项时，例如：`vm.items[indexOfItem] = newValue`
2. 当你修改数组的长度时，例如：`vm.items.length = newLength`  

解决方法：  

1. `vm.$set(vm.items, indexOfItem, newValue)`
2. `vm.items.splice(indexOfItem, 1, newValue)`

#### 2.4.3.3. 声明响应式 property

#### 2.4.3.4. 异步更新队列

- 开启一个队列，并缓冲在同一事件循环中发生的所有数据变更
- 同一个 watcher 被多次触发，只会被推入到队列中一次
- 下一个的事件循环“tick”中，Vue 刷新队列并执行实际 (已去重的) 工作
- 组件不会立即重新渲染。当刷新队列时，组件会在下一个事件循环“tick”中更新
- $nextTick() 返回一个 Promise 对象，所以await this.$nextTick() 执行完成之后，刷新队列已经完成了

## 2.5. 作业

1. vue 事件 的写法有哪些？自己有哪些理解？

2. vue 几个es6方法,分别如何使用？

3. 插值，v-text,v-html区别?

- 如果只是单独展示Vue对象里的数据，建议使用“v-text”指令。

- 如果要同时展示用户前台数据，那么就需要用插值表达式，但是不要忘记和“v-cloak”属性一起使用（同时需要设置样式[v-cloak]{display:none;}）。

- 如果Vue对象传递过来的数据含有HTML标签，则使用v-html

## 2.6. 项目操作流程

1. 登录
2. user列表中首先创建一个账号,创建账号 需要勾选角色;
3. role包含的功能菜单有哪些?

- sumary,account  user role(默认有一个角色，是全部菜单功能)，作用：
- 账号登录，账号有什么样的菜单，
- 功能列表:
     1. 概要 => sumary
     2. userPage user
     3. rolePage role
     4. todoPage todo

4. todo列表，每个账号登录进todo，userid对应的todo；

5. 近两天，等培训完了，优先给接口url，url返回的数据字段和结构。你们先做**界面渲染和页面架构组织**。
6. 主界面：登录跳转界面。
   1. 面包屑
   2. header部分，结构，左侧是一个icon，右侧是登录的个人账号显示，退出登录。

### 2.6.1. es6和commonjs写法异同点 （-- 罗凯疑问 --）

``` js
// api.js
import Axios from "axios";
import {user} from "axios";
function ajax () {
    Axios.get(url).then(() => {
    // ignore
    })
}
// es6
export default {}

// 声明user
var user = function () {}
// 到处user
export {
    user
}
// commonjs
module.exports.user = 
// xxxx 错误的用法
exports = {
  // 一些属性
}
// commonjs 引用
const var = require()
```

### 2.6.2. 需要下去理解的两个es6的东西

1. 变量结构赋值，课后理解和文档输出
2. Promise对象
