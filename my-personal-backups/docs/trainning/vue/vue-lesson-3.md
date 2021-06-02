<!--
 * @Description: 
 * @Author: zagger
 * @Date: 2021-05-10 12:59:43
 * @LastEditors: zagger
 * @LastEditTime: 2021-05-10 13:01:48
-->

# 1. 课程安排

时间：2021--5-11（周二下午：14:00-15:45）

- 14:00-14:50 作业回顾 + vue补充
- 14:50-15:00 课间休息
- 15:00-15:45 问题答疑和讨论加上布置作业

# 2. vue 补充学习

## 2.1. v-html | v-text | v-pre | v-cloak

- v-html: 希望解析出html
- v-text：替换标签内的内容
- v-pre：跳过该元素与子元素的编译过程，用于显示原本的Mustache语法
- v-cloak：斗篷，遮住在某些时候可能会显示出来的未编译的瞬间

## 2.2. v-bind

- 属性值的动态绑定
- 例如： `v-bind:href` | `v-bind:src`
- v-bind语法糖: `:src` | `:href`
- 动态绑定class：
  - 对象语法：
    - `:class="{'active': isActive}"`
    - `:class="{'active': isActive, 'line': isLIne}"`
    - `:class="classes"`
  - 数组语法：
    - `:class="'active'"`
    - `class="title" :class="['active', 'line']"`
- 动态绑定style
  - 对象语法：
    - `:style="{color: currentColor, fontSize: fontSize + 'px'}"`
  - 数组语法：
    - `:style="[baseStyles, overridingStyle]"`

## 2.3. 计算属性复杂例子

```vue
data: {
    books: [
        {name: 'js编程艺术',price: 99, count:3},
        {name: 'js设计模式',price: 112, count:2},
        {name: 'js算法',price: 89, count:1},
    ]
},
computed: {
    totalPrice() {
        return this.books.reduce((total, b) => total + b.price * b.count, 0)
    }
}
```

## 2.4. 计算属性缓存

- 多次引用，只会计算一次

```vue
<div id="app">
    <div> {{fullName}}</div>
    <div> {{fullName}}</div>
    <div> {{fullName}}</div>
</div>
```

## 2.5. 事件监听

### 2.5.1. v-on基础

- v-on 监听事件监听器
- 缩写：@
- 预期：Function | inline Statement | Object
- 参数：event
  
### 2.5.2. v-on基础例子

```vue
<button v-on:click="count++">
<button v-on:click="onBtnClick">
<!-- 简写 -->
<button @click="count++">
<button @click="onBtnClick">
```

### 2.5.3. v-on参数

- 不用参数，可以不用()
- 回调函数默认有一个参数，name默认会将原生事件event参数传递过去
- 入股需要同时传入某个参数，可以把$event传入

### 2.5.4. v-on参数例子

```vue
<button @click="handleAdd">
<button @click="handleAdd(10, $event)">
```

```vue
methods: {
    handleAdd(event) {
        console.log(event)
        this.count++
    },
    handleAddTen(count,event) {
        console.log(event)
        this.count += 10
    }
}
```

### 2.5.5. v-on修饰符

- .stop 调用evnet.stopPropagation()
- .prevent 调用event.preventDefault()
- .{KeyCode | keyAlias} 特定键位触发时才触发的回调
- .native 监听组件根元素的原生事件
- .once 只触发一次回调

### 2.5.6. v-on修饰符实例

```vue
<!-- 停止冒泡 -->
<button @click.stop="doThis"></button>
<!-- 阻止默认行为 -->
<button @click.prevent="doThis"></button>
<!-- 阻止默认行为，没有表达式 -->
<button @submit.prevent></button>
<!-- 串联修饰符 -->
<button @click.stop.prevent="doThis"></button>
<!-- 键修饰符，键别名 -->
<button @keyup.enter="onEnter"></button>
<!-- 键修饰符，键代码 -->
<button @keyup.13="onEnter"></button>
<!-- 点击回调只会触发一次 -->
<button @click.once="doThis"></button>
```

## 2.6. v-model

### 2.6.1. v-model原理

- v-bind绑定一个value属性
- v-on指定给当前元素绑定input事件

`<input type="text" v-model="message">`
`<input type="text" v-bind:value="message" v-on:input="message=$event.target.value">`

### 2.6.2. v-model: radio

```vue
<label for="male">
    <input type="radio" :value="abc" v-model="gender" id="male" />男
</label>
<label for="female">
    <input type="radio" value="female" v-model="gender" id="female" />女
</label>
...
data: {
    gender: '',
    abc: 'male'
}
```

### 2.6.3. v-model: checkbox

- 单个
  - v-model为布尔值
  - 此时input的value并不影响v-model的值
- 多个
  - v-model是一个数组
  - 选中，就会把input的value添加到数组

### 2.6.4. checkbox例子

```vue
<label for="checkbox">
    <input type="checkbox" v-model="checked" id="check">同意协议
</label>
<p>{{checked}}</p>
<label><input type="checkbox" v-model="hobbies" value="篮球">篮球</label>
<label><input type="checkbox" v-model="hobbies" value="足球">足球</label>
<label><input type="checkbox" v-model="hobbies" value="台球">台球</label>
<p>{{hobbies}}</p>
```

### 2.6.5. v-model: select

- 单选： v-model绑定一个值
- 多选： v-model绑定的是一个数组

### 2.6.6. v-model修饰符

- lazy: 让数据在时区焦点或者回车时才会更新 v-model.lazy="message"
- number: 输入的内容自动转成数字类型 v-model.number="age"
- trim: 过滤掉内容左右两边的空格 v-model.trim="message"

## 2.7. 作业和任务

### 2.7.1. angular 仓库：

- ngconsole 管理台前端代码逻辑 5.3.0-vpc-bug
- ngconsole_resources 主版本，OEM，语言，英文。。。，资源 5.3.0-vpc
     1. 项目先跑起来package.json
     2. 遇到什么问题，直接来问我。

- 6887 管理台部分-系统设置菜单中的更改替换为修改说明 2021-05-13 0.5天 黄子杰 -- 冯颖
- 6981 【系统 -系统设置 - 通用设置】服务器时间同步策略加入设置周期 2021-05-13 0.5天 黄子杰 -- 罗凯

### 2.7.2. 技术部 - 临时任务 安排罗凯和冯颖做 时间未定

- 分支：`http://172.16.203.254/zhangyao/pmv5-fe`