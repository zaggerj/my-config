# 1. Vue 开发基础

## 1.1. 课程安排

时间：2021--5-8（周六上午：9:00-12:00）

- 9:00-9:50 前几次作业回顾
- 9:50-10:00 课间休息
- 10:00-10:50 vue入门
- 10:50-11:00 课间休息
- 11:00-12:00 问题答疑和讨论加上布置作业

## 1.2. 一、Vue 入门

目的：从宏观，或者第三者角度，来观察vue是什么。

### 1.2.1. 1.Vue 介绍

#### 1.2.1.1. 是一套用于构建用户界面的渐进式框架

- 渐进式代表的含义是：主张最少。
- 每个框架都不可避免会有自己的一些特点，从而会对使用者有一定的要求，这些要求就是主张，主张有强有弱，
- 它的强势程度会影响在业务开发中的使用方式。
- 简单说就是对于vue中你不熟悉不太把握的模块或者功能，你可以不用它，或者你可以用你熟悉有把握的技术进行代替。
- 这样感觉很友好，相对于其他框架硬要求少了，你可以逐渐性的使用框架。
- 总的来说，它给你提供足够的 optional，但并不主张很多 required。

#### 1.2.1.2. Vue 起一个什么角色

- 为了实现前后端分离的开发理念，开发前端 SPA（single page web application） 项目，实现数据绑定，路由配置，项目编译打包等一系列工作的技术框架。
- Vue 系列
  Vue 有著名的全家桶系列，包含了:
  - [vue-router](http://router.vuejs.org)
  - [vuex](http://vuex.vuejs.org)
  - [vue-resource](https://github.com/pagekit/vue-resource)
  - 再加上构建工具 vue-cli，
  - less、sass 等 css 预处理语言
-加起来就是一个完整的 vue 项目的核心构成： 1. 项目构建工具 2. 路由 3. 状态管理 4. http 请求工具。

### 1.2.2. 2.Vue 安装

- 直接用 `<script>` 引入：`<script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>`
- npm install vue
- vue-cli，CLI 工具假定用户对 Node.js 和相关构建工具有一定程度的了解。如果你是新手，我们强烈建议先在不用构建工具的情况下通读指南，在熟悉 Vue 本身之后再使用 CLI。

### 1.2.3. Vue 特点

#### 1.2.3.1. 特性： 1.轻量级的框架（相对而言） 2.双向数据绑定 3.指令 4.插件化

#### 1.2.3.2. 优点

1. 简单：官方文档很清晰，比 Angular 简单易学。（国内框架，demo，文档多）
2. 快速：异步批处理方式更新 DOM。（同时进行）
3. 组合：用解耦的、可复用的组件组合你的应用程序。（功能由不同的单个功能组件构成）
4. 紧凑：~18kb min+gzip，且无依赖。
5. 强大：表达式 & 无需声明依赖的可推导属性 (computed properties)。
6. 对模块友好：可以通过 NPM、Bower 或 Duo 安装，不强迫你所有的代码都遵循 Angular 的各种规定，使用场景更加灵活。

#### 1.2.3.3. 缺点

1. 不支持 IE8。
2. 入门教程很多，但是高阶教程和文档比较缺少，需要自己挖掘，或者阅读源码。

### 1.2.4. 二、Vue的架构模式

#### 1.2.4.1. MVVM 模式

![](http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/b70bbe1ac598dadb607eabfd6ed5acff)

#### 1.2.4.2. 模式特定

- MVVM 模式采用双向绑定（data-binding）：
- View 的变动，自动反映在 ViewModel，反之亦然。
- Vue，Angular 和 Ember 都采用这种模式，
- 相比于 Angular，Vue 提供了更加简洁、更易于理解的 API，使得我们能够快速的上手并使用 Vue.js

#### 1.2.4.3. MVVM 模式

##### 1.2.4.3.1. 优点

1.低耦合 viewmodel 和视图是相互不影响的
2.双向绑定 数据更新，视图更新。视图更新，数据更新
3.可重复性 一个viewmodel可用于不同view
4.可独立开发 （页面设计和业务逻辑相互不影响 ）
5.可测试，业务逻辑和页面ui测试也相对独立

##### 1.2.4.3.2. 缺点

1.不方便寻找问题 可能是model 也有可能是view
2.如果一个大模块model 长期持有会占有很大内存
3.新人上手viewmodel调用复杂度会变高，找不到定义地方

#### 1.2.4.4. Vue的MVVM模式体现在哪里

![](http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/255997bc398904b66c858537a30a63fb)

- 首先ViewModel通过Data Bindings让Model中的数据实时的在View(DOM)中显示。
- 其次ViewModel通过DOM的Listener来监听DOM事件(点击，滚动等)，并且通过methods中的操作，来改变Model中的数据。

顾名思义：MVVM就是Model-View-ViewModel
Model就是数据模型（亦指数据层）可以是我们固定死的数据，也可以是来自服务器请求来的数据。
> 理解：对应需求界面时，可以是在脑海中构思的数据结构，也可以是在我们实际编码中会用到的数据组织结构；业务中，对应了我们想要显示到视图上的数据，也是我们需要在程序生命周期中可能需要更新的数据。

```vue
data: function () {
        return {
            importShow: false,
            syncing: false,
            searchText: "",
            config: {
                host: "",
                port: null
            },
            columns: [{
                type: "selection",
                width: 60,
                align: "center"
            }, {
                title: this.$t("account"),
                key: "username",
                sortable: "custom"
            }],
            data: [],
            selection: [],
            selectionIds:[]
        }
    }
```

View就是页面DOM（亦指视图层）主要就是向用户展示信息的。
> 理解：可以是我们的index.html，也可以是每个组件的template模板，然后再加上css的修饰，在基本的视图结构上的”化妆“让视图更加的美观。

```
<Input class="pull-right search" :placeholder="$t('please_input')" v-model="searchText" @on-change="onSearch">
 <Icon type="ios-search" slot="prefix" />
</Input>
```

ViewModel在vue中就是指vue实例（亦指数据模型层）充当View与Model之间通信的桥梁。
> 理解：就是vue实现的核心，它将**View**和**Model**分离, 实现了**逻辑**与**展示** 的分离, 使得我们可以不用像之前一样需要频繁地操作**DOM**, 也不需要手动地去更新数据(model)和页面(view)。这一切, ViewModel 都已经为我们做好了。

`txt
这里没法用几句代码进行理解，宏观上来讲，ViewModel是Vue实现的一套机制，包含DOM事件监听，双向数据绑定等一系列内部实现方式编制起来的一个整体。`

### 1.2.5. 三、数据驱动和组件式编程

#### 1.2.5.1. `<center>`**双向绑定实现原理**`</center>`

![](http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/e6a51b5e152aa58eeece62c9ae18ae21)

#### 1.2.5.2. 理解实际业务中数据的双向绑定

当vue的页面载入时，ViewModel会对业务数据（M），设置Observer,也就是给数据设置了getter和setter，同时也会对视图中的(V)，{{expr}}或者v-xxx指令，设置Watcher。
以输入框input和一个span显示文字为例子：

##### 1.2.5.2.1. 模板例子

```view
<div id="app">
 <input type="text" v-model="text">
 {{text}}
</div>
```

##### 1.2.5.2.2. model例子

``` model
var vm = new Vue({
 el: 'app',
 data: {
 text: 'hello world'
 }
})
```

##### 1.2.5.2.3. 双向绑定的过程

1. vue中data中的text绑定到输入框和文本节点中了。
2. 当用户的行为，对输入框内容进行改变时，vue实例中data中的数据也进行更改。
3. data中的数据改变时，会继续触发setter，接着会通知watcher对视图进行更新，这样输入框和文本节点span的内容也发生改变。

##### 1.2.5.2.4. 原理深究

![](http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/e1f4c8b2d094bea8a868e4f5db5e1539)

##### 1.2.5.2.5. Object.defineProperty

[Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)方法就是Vue 的双向数据绑定的核心所在。
首先明确一下它的用法，它用来监听对象的属性，这里监听set和get操作。

##### 1.2.5.2.6. defineProperty用法

```js
let obj={
 a:1
}
let val=1
let newVal=2
Object.defineProperty(obj,'a',{
 get(){
  console.log('数据被获取')
  return val
 },
 set(){
  console.log('数据被修改/设置')
  val = newVal
 }
})
```

##### 1.2.5.2.7. defineProperty原理和应用

[Object.defineProperty](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)，方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。

见[Vue实现双向绑定的原理一文](https://www.w3cplus.com/vue/vue-two-way-binding-object-defineproperty.html)

##### 1.2.5.2.8. 例子

![](http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/63d76b39867bd502ff5331eae6bfa3a8)

##### 1.2.5.2.9. Observer和Watcher

- `__ob__`: Observer这些数据是vue这个框架对数据设置的监控器，一般都是不可枚举的。
- observe的功能就是用来监测数据的变化。实现方式是给非VNode的对象类型数据添加一个Observer。
- 如果已经添加过则直接返回，否则在满足一定条件下去实例化一个Observer对象实例。
- Observer是一个类,它的作用是给对象属性添加getter和setter,用于 依赖收集 和 派发更新。

#### 1.2.5.3. 组件化

- 每一个应用界面都可以看作是组件构成的
- 每一个组件都可以看做是一个ViewModel,界面又可以抽象为ViewModel Tree

##### 1.2.5.3.1. 组件化图示

![](http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/e8b9671cec3f00581909b30b52e2a92b)

#### 1.2.5.4. 在Vue.js中注册组件

##### 1.2.5.4.1. 扩展Vue来定义一个可复用的组件类与全局注册该组件

```vue
var MyComponent = vue.extend({
      template:'<p>{{message}}</p>',
      paramAttributes:['msg']
})

Vue.component(‘my-component’ , MyComponent)
```

##### 1.2.5.4.2. 实际项目中如何使用

```vue
// 实际应用中我们可能用得比较多
// 通过 Babel 和 webpack 使用 ES2015 模块
<template></template>
<script>
import xxx from "../xxx"

export default {
 name: "name",
 components: {xxx},
 data: function () {
  return {
 
  }
 },
 methods: {
  someClickcb : function (){}
 }
}
</script>

思考和问题：一个vue项目中，一个xxx.vue文件为什么可以别识别为一个vue组件，从而可以在别的组件中进行引用？
```

## 1.3. 回顾问题

官网说，这个vue文件会被loader编译成一个模板的vue.js文件，其中template部分会被添加到export
default的对象中成为template属性。
一个.vue文件最终是一个Vue对象。template是在编译时被放入的，但是最终也会被编译成render function。

### 1.3.1. 可以学习一下，源码beforeCreate如下

```vue
// 源码中是如何处理周期函数的：
callHook(vm, 'beforeCreate')

export function callHook (vm: Component, hook: string) {
  const handlers = vm.$options[hook]
  if (handlers) {
    for (let i = 0, j = handlers.length; i < j; i++) {
      try {
        handlers[i].call(vm)
      } catch (e) {
        handleError(e, vm, `${hook} hook`)
      }
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook)
  }
}
```

## 1.4. 布置作业, 讨论思路

### 1.4.1. 一、作业一：登录界面

1. 使用vue-router，搭建前端路由，把之前的三次作业链接起来，通过一个导航，点击不同路由，跳转不同页面。
2. 写一个登陆界面，说明：

- 界面样式不限
- 界面功能：包含两种登陆模式：1. 帐号密码登录 2. 验证码登录
- 页面元素包含：
- 帐号输入框，密码输入框。（帐号密码登录方式）
- 帐号输入框，验证码输入框，验证码点击一次后，倒计时60秒之后才可以点击。（验证码登录）
- 登陆按钮，登录完成之后，进行跳转，跳转到之前三次页面的主界面。

### 1.4.2. 二、作业二：实现一个todolist前端界面

1. 使用vue-router，搭建前端路由，实现左侧菜单，菜单内容包括：dashboard，todolist。
2. dashboard界面，展示todolist分类，每个分类的个数。
3. todolist的列表展示字段分别为：标题，内容，截止日期，类型，状态（代办，完成，删除），操作（编辑，完成，代办，删除）
4. 三个操作，删除按钮一直存在，状态是完成状态，可以点击代办变为代办；状态是代办，可以点击完成，变为完成状态。
5. todo还可以新增，新增字段包含：标题，内容，截止日期，类型。
6. 类型：工作，个人，学习。
