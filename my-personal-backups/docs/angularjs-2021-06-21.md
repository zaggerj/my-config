# angular初识

## 一、原则

- 概念概述

- 边学边练

- 类比vue
  - directive： ng-repeat ng-disabled ng-show ng-hide ng-if
  - 模块的概念
  - 数据模型 controller vue中的data和method
  - 事件监听 ng-click ng-change

## 二、概念概述

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

## 三、例子 example

### 1. Template，View，Directive，Scope，Model，Expressions,Filter

#### 1.1  代码

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

#### 1.2. 理解

- 在Angular里，这种带新标记的HTML，称为模板(template)
- 当Angular启动你的应用时，它就会使用它自己的“编译器(compiler)”解析并处理模板中这种新的标记。
- 而经过加载，转换和渲染之后的DOM，就称为视图(view)。
- 新的标记有2种：
  - 第1种叫指令(directive)。它可以把特殊的行为附给属性或者元素。
  - 第2种是（大名鼎鼎的）双大括号。
    - 当编译器(compiler)遇到它的时候，会把它换成算好的值。模板中的表达式，就是一段可以读写变量的JavaScript代码片段。
    - 注意，这里的变量不是全局变量。就像函数里的变量只在函数里有效一样，这些变量也有自己的作用域。
    - Angular提供一个作用域(scope)的概念，用来存放可供表达式调用的变量。能够从作用域下调出来的变量，我们就统称为模型(model)。
  ![](https://www.showdoc.com.cn/server/api/attachment/visitfile/sign/f04c166e60dfff8a99872f46841f5f93)

- 注：如果你要访问DOM，先自定义一个指令吧。
- 一个过滤器可以把表达式所表达的内容格式化之后展示给用户。上面例子里，过滤器currency把一个数字格式化成了钱的样子。
- Angular的犀利之处在于它提供动态绑定：只要数据变了，表达式就会自动被重新计算，再通过更新DOM来展示出来。这就是（传说中的）“双向数据绑定”的概念。

### 2. Controller：控制器

#### 2.1.  代码

html：

```html
 <!DOCTYPE html>
 <html>
 <head>
     <meta charset="UTF-8">
     <script src="../../angularjs1.3.15/angular.min.1.3.15.js"></script>
     <script src="invoice1.js"></script>
     <title>Adding UI logic: Controllers</title>
 </head>
 <body>
 <div ng-app="invoice1" ng-controller="InvoiceController as invoice">
     <b>Invoice:</b>
     <div>
         Quantity: <input type="number" min="0" ng-model="invoice.qty" required>
     </div>
     <div>
         Costs: <input type="number" min="0" ng-model="invoice.cost" required>
         <select ng-model="invoice.inCurr">
             <option ng-repeat="c in invoice.currencies">{{c}}</option>
         </select>
     </div>
     <div>
         <b>Total:</b>
     <span ng-repeat="c in invoice.currencies">
       {{invoice.total(c) | currency:c}}
     </span>
         <button class="btn" ng-click="invoice.pay()">Pay</button>
     </div>
 </div>
 </body>
 </html>
```

js（invoice1.js）：

```js
angular.module('invoice1', [])
    .controller('InvoiceController', function () {
        this.qty = 1;
        this.cost = 2;
        this.inCurr = 'EUR';
        this.currencies = ['USD', 'EUR', 'CNY'];
        this.usdToForeignRates = {
            USD: 1,
            EUR: 0.74,
            CNY: 6.09
        };

        this.total = function total(outCurr) {
            return this.convertCurrency(this.qty * this.cost, this.inCurr, outCurr);
        };
        this.convertCurrency = function convertCurrency(amount, inCurr, outCurr) {
            return amount * this.usdToForeignRates[outCurr] / this.usdToForeignRates[inCurr];
        };
        this.pay = function pay() {
            window.alert("Thanks!");
        };
    });
```

#### 2.2.  理解

- 首先，这次创建了个新JavaScript文件，其中包含一个所谓的“控制器”。也就是说，这个JavaScript文件包含一个构造函数，而正是这个构造函数会创建一个真正的控制器实例。控制器的目的就是把变量和方法暴露给表达式和指令来使用。
- 除了增加控制器代码的文件外，我们还在HTML中添加了一个ng-controller指令。这个指令告诉Angular，InvoiceController负责为这个元素和它的子元素里的指令服务(前面说过，控制器给表达式和指令提供变量和方法)。
- InvoiceController as invoice这个语法同时还告诉Angular，创建一个InvoiceController的实例，并且在当前作用域里存储它的时候命名为invoice。

![](https://www.showdoc.com.cn/server/api/attachment/visitfile/sign/92dfba2a21c96cc0c1fc16bc08b0b34b)

- 所有表达式里用到的变量，都添加了控制器实例的前缀，这样变量就都可以从控制器里获取了。例子里使用控制器中的变量和方法的有：

 1. ng-repeat把currencies(介是一个array。你看，repeat，是吧)展示了出来；
 2. {{invoice.total(c) | currency:c}}调用了方法。

- 这些绑定都是动态的，DOM会在函数结果变动之后自动更新。写着pay的按钮使用了ngClick指令，这个指令会在按钮被点击之后执行指定的函数

### 3. Services ：服务 - 独立于界面展示的业务逻辑

最好是把跟界面展示无关的逻辑放进服务(service)里，从而在应用的其他部分需要的时候，可以重复使用。

#### 3.1. 代码

index.html

```html
<!DOCTYPE html>
 <html>
 <head>
     <meta charset="UTF-8">
     <script src="../../angularjs1.3.15/angular.min.1.3.15.js"></script>
     <script src="invoice2.js"></script>
     <script src="finance2.js"></script>
     <title>Adding Service</title>
 </head>
 <body>
 <div ng-app="invoice2" ng-controller="InvoiceController as invoice">
     <b>Invoice:</b>
     <div>
         Quantity: <input type="number" min="0" ng-model="invoice.qty" required >
     </div>
     <div>
         Costs: <input type="number" min="0" ng-model="invoice.cost" required >
         <select ng-model="invoice.inCurr">
             <option ng-repeat="c in invoice.currencies">{{c}}</option>
         </select>
     </div>
     <div>
         <b>Total:</b>
     <span ng-repeat="c in invoice.currencies">
       {{invoice.total(c) | currency:c}}
     </span>
         <button class="btn" ng-click="invoice.pay()">Pay</button>
     </div>
 </div>
 </body>
```

finance2.js：

```js
angular.module('finance2', [])
     .factory('currencyConverter', function () {
         var currencies = ['USD', 'EUR', 'CNY'];
         var usdToForeignRates = {
             USD: 1,
             EUR: 0.74,
             CNY: 6.09
         };
         var convert = function (amount, inCurr, outCurr) {
             return amount * usdToForeignRates[outCurr] / usdToForeignRates[inCurr];
         };
         return {
             currencies: currencies,
             convert: convert
         };
     });
```

invoice2.js：

```js
angular.module('invoice2', ['finance2'])
    .controller('InvoiceController', ['currencyConverter', function (currencyConverter) {
        this.qty = 1;
        this.cost = 2;
        this.inCurr = 'EUR';
        this.currencies = currencyConverter.currencies;
        this.total = function total(outCurr) {
            return currencyConverter.convert(this.qty * this.cost, this.inCurr, outCurr);
        };
        this.pay = function pay() {
            window.alert("Thanks!");
        };
    }]);
```

#### 3.2. 理解

- 将一些函数和变量的定义移动到了模块finance2中
- 通过“依赖注入”加载currencyConverter服务
- 依赖注入是一种设计模式，它控制对象和方法的创建，以及它们如何获取它们的依赖项。Angular中的所有内容(指令，过滤器，控制器，服务，…)都是使用依赖注入创建并串起来的。
- 在Angular里，依赖注入的容器叫做“注入器”。
- 在使用DI之前，首先要有个地方把所有要用到的组件登记一下。在Angular里，完成这个工作的叫做“模块”。当Angular启动的时候，它会根据ng-app找到入口模块并去载配置，也包括入口模块所依赖的其他模块的配置。
- 在上例中，模板里包含这样一个指令ng-app=”invoice2”。这个指令告诉Angular去用invoice2这个模块作为这个应用的主模块。angular.module(‘invoice2’, [‘finance2’])则指明invoice2依赖于finance2这个模块。由此，Angular使用InvoiceController这个控制器和currencyConverter这个服务。
- 对于服务，有多种方法来定义它们的工厂(请参阅服务指南)。在上面的例子中，我们使用了一个函数，它返回 currencyConverter 函数作为服务的工厂。
- InvoiceController 如何获得对 currencyConverter 函数的引用？在 Angular 中，这是通过简单地在构造函数上定义参数来实现的。有了这个，注入器就能够按照正确的顺序创建对象，并将以前创建的对象传递到依赖于它们的对象的工厂中。在我们的示例中，InvoiceController 有一个名为 currencyConverter 的参数。通过这个，Angular 知道了控制器和服务之间的依赖关系，并以服务实例作为参数调用控制器。
- 最后一个更改是我们现在将一个数组传递给 module.controller 函数，而不是一个普通函数。数组首先包含控制器所需的服务依赖项的名称。数组中的最后一个条目是控制器构造函数。使用这个数组语法来定义依赖关系，这样 DI 在缩小代码之后也能正常工作，这很可能会将控制器构造函数的参数名重命名为 a。
