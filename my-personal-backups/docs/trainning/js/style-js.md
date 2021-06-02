# 编码问题

这里总结此次培训，学员们代码里面的常见问题。


## JS 编码风格
为什么需要编码风格？编码首先是个人行为，这意味着每个人可以尽情发挥自己的自由，其次，编码是一种持续性的行为，从可持续发展角度来说，它应当让阅读者易于理解、维护，因此不应当有破坏持续性的“自由”。

但是，每个人的思考和行为方式区别都很大，在一个3-5人的小团队可能看不出问题，如果团队成员有几十个，上百个，如果没有行之有效的统一的编码风格，那么团队里面的每个人都会很累，统一的编码风格可以让你在接触新的代码时，产生这就是我写的代码的错觉，这种错觉会大大提升工作效率。

目前我们没有明确的编码风格标准，没有的原因是目前业界的相关标准很多，而且每个标准里面活多或少有一些硬性限制，目前不太方便直接纳入到团队里面。业界目前流行的标准是下面几个：
* [Airbnb](https://github.com/lin-123/javascript)
* [Standard](https://github.com/standard/standard/blob/master/docs/README-zhcn.md)
* [Idiomatic ](https://github.com/rwaldron/idiomatic.js/tree/master/translations/zh_CN)
* [Google](https://google.github.io/styleguide/jsguide.html)
* [jQuery](https://contribute.jquery.org/style-guide/js/)


建议大家把上面的文档都读至少3遍，可能有些本来理解有错误的地方，看了之后就懂了，后面在合适的情况，我们会结合大家的编码风格考虑引入最恰当的风格标准。
除了一般风格标准外，有一些非标准但是也和风格关系很大的，我在下面单独列出来。
* 命名
      // 命名是程序员终生的必修课，好的命名非常有利于代码的编写过程，差的命名等同于慢性自杀
      // 不推荐
      var a1 = true, a2 = false, a3 = true, a4 = false;
      if(a1 || a2 && a3 || a4) {}
      // 推荐, is + word, has + word, should + word 是布尔值命名的经典用法
      var isNumber = true, hasString = false, shouldWait = true, isObject = false;
      // 不推荐, 单词和复数在代码里面出现的频率不算高，也不算低，输入变量名时，编辑器通常会同时显示这两个变量，由于两个变量名差别太小，很可能会发生失误
      var token, tokens = [];
      // 推荐, 数组命名可以使用 word+Array, word+List, word+Collection, 不易产生失误时，用 words 也是一个很好的选择
      var token, tokenList;
* 变量声明
      // 不推荐
      var i;
      i = 0;
      // 推荐
      var i = 0;
* console.log
   * 这是一个非常接地气并且容易上瘾的 API
   * 如果你确实非常依赖于它，那暂时是无解的
   * 你可以使用断点调试来替换它，console.log 仅仅显示了一瞬间的信息，在执行前后，程序的运行和你的预期是否完全一致是无法证明的，断点调试可以让你看到每一行代码的执行情况，进而让你对代码有更强的控制力
* 注释
    * 注释的作用不仅仅是为代码做批注
    * 注释可以从对文件内容划分区域，不同的区域写不同的代码
    * 注释可以标记函数的参数类型，变量的类型，进而为代码建议列表提供支撑，参考 [type-checking-javascript-files](https://www.typescriptlang.org/docs/handbook/type-checking-javascript-files.html)
    * 注释可以记录文件变更历史，很多小型开源项目使用这种方式
    * 注释可以记录版权，很多开源项目里面都有版权声明
    * 注释可以记录变量作用，函数作用等，参考 [JSDOC](https://jsdoc.app/)

## CSS 编码风格
这里不赘述，阅读几遍下面的标准即可：

[Airbnb](https://github.com/Zhangjd/css-style-guide)
[Google](https://google.github.io/styleguide/htmlcssguide.html)

## 编码思路
编码思路是一个开发者解决问题时，他的编程语言熟悉度、个人经验、逻辑能力这三者的综合体现。
### 编程语言熟悉度
### 个人经验
* 经验对解决问题的帮助是 0 和 1 的关系，要么能，要么不能。
* 经验的好处是有用，大脑处理速度很快，不需要思考就可以做决定。
* 经验的缺陷是很难跳出经验的局限，直到撞墙
* 经验始终在增长

### 逻辑能力
* [硬]/脑回路
  * 天赋
  * 智商
* [软]/赋能
  * 框架：vue/jQuery/new API
  * 站在巨人的肩膀上

## 学习