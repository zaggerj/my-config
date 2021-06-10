# angular初识

## 原则

- 概念概述

- 边学边练

- 类比vue
  - directive： ng-repeat ng-disabled ng-show ng-hide ng-if
  - 模块的概念
  - 数据模型 controller vue中的data和method
  - 事件监听 ng-click ng-change

## 概念概述

- Template 模板，带有附加标记的HTML
- Directives 指令，使用带有自定义属性和自定义元素的扩展HTML
- Model 模型，在视图中显示给用户并与互用交互的数据
- Scope 范围，域，存储模型的上下文，以便控制器、指令和表达式可以访问它
- Expressions 表达式，从作用于访问变量和函数
- Compiler 编译器，解析模板并实例化指令和表达式
- Filter 过滤器，将用于显示的表达式的值设置为用户的格式
- View 视图，用户看到的内容（DOM）
- Data binding 数据绑定，在模型和视图之间同步数据
- Controller 视图背后的业务逻辑
- Dependency Injection 依赖注入，创建和链接对象和函数
- Injector 依赖注入器，依赖注入的容器
- Module 模组，模块，应用程序包含不同部分的容器，包含，控制器、服务、过滤器、指令（配置注入器）
- Service 服务，独立于视图的可复用业务逻辑

## 例子 example

### Template

``` html
<div ng-app ng-init="qty=1;cost=2">
     <b>Invoice:</b>
 
     <div>
         <label>Quantity(数量):</label> <input type="number" min="0" ng-model="qty">
     </div>
     <div>
         <label>Costs(单价):</label> <input type="number" min="0" ng-model="cost">
     </div>
     <div>
         <b>Total(总价):</b> {{qty * cost | currency}}
     </div>
 </div>
```

- 在Angular里，这种带新标记的HTML，称为模板(template)
- 当Angular启动你的应用时，它就会使用它自己的“编译器(compiler)”解析并处理模板中这种新的标记。
- 而经过加载，转换和渲染之后的DOM，就称为视图(view)。
- 新的标记有2种：
  - 第1种叫指令(directive)。它可以把特殊的行为附给属性或者元素。
  - 第2种是（大名鼎鼎的）双大括号。
      当编译器遇到它的时候，
      会把它换成算好的值。模板中的表达式，就是一段可以读写变量的JavaScript代码片段。
      注意，这里的变量不是全局变量。就像函数里的变量只在函数里有效一样，这些变量也有自己的作用域。
      Angular提供一个作用域(scope)的概念，用来存放可供表达式调用的变量。
      （上面就是在介绍表达式要调用变量嘛，不然解释变量是谁家的变量干嘛）能够从作用域下调出来的变量，
      我们就统称为模型(model)。（有没有感觉MVC里的M和V很形象地展现了？）

