# JS 原生API
* Boolean
* Number
* String
* Array
* Object
* Function
* Math
* Date
* RegExp
* Promise

## Boolean
```js
// falsy value: 0, -0, null, false, NaN, undefined
Boolean(falsyValue) // false
// truth value: [], {}, "false", ...
Boolean("false") // true
```
## String
字符类型？
```js
// 字符串长度
length
// 字符操作
charAt charCodeAt codePointAt fromCharCode fromCodePoint
// 查询操作
indexOf lastIndexOf startsWith endsWith includes
// 内容操作
split substr substring replace match toLowerCase toUpperCase trim padStart padEnd
```
## Array
```js
// 静态
isArray from of
// 数组长度
length
// 元素操作
pop push shift unshift splice reverse sort fill
// 迭代
forEach filter map every some reduce reduceRight
// 查询、合并
join slice concat indexOf lastIndexOf
```

## Object
```js
Object.assign
Object.create
Object.defineProperties
Object.defineProperty
object.hasOwnProperty
Object.is
Object.keys
toString
```

## Function
```js
apply
call
toString
```

## Math
```js
// 简单算法
abs min max
// 取整
ceil floor round trunc
// 随机数
random
// 乘方，开方
pow sqrt cbrt hypot
// 三角函数
sin cos tan asin acos atan
```

## Number
```js
isNaN
isInteger
isFinite
parseInt
parseFloat
toExponential
toFixed
toLocaleString
toPrecision
```

## Date
## JSON
## RegExp

## 素未谋面的API
* 学习
* 函数签名

## 考题
1. 写一个函数，它有一个数组参数，数组里面有4种类型的值：integer, float, string, boolean，它返回一个对象，对象的键为类型，值为个数，如：f([1, 2, Math.PI, true, "x"] 返回 {integer: 2, float: 1, boolean: 1, string: 1}
2. 写一个函数，它接受一个100以内的基础四则运算表达式，同时支持小括号，它返回这个表达式的值，如：f("(3+4)*10") 返回70
3. 写一个函数，它有两个参数：degree， type  。当 type 是  "sin" 时，返回 degree 对应的正弦值，当 type 是 "arcsin" 时，返回 degree 对应的反正弦值，当 type 是 "tan", "arctan", "cos", "arccos" 等时，返回对应的值
4. 给定一个日期，返回当天的星期数，如：f("2021-04-15") 返回 4
5. 已知 prompt 函数接受一个字符串用于提示，并返回用户输入的任意内容；已知 console.log(string) 可以输出字符串 string 的内容，请使用 prompt 和 console.log 实现一个交互式程序，并至少实现下列命令：
    1. help  显示使用帮助
    2. exit   退出交互式程序
    3. isnumber   接受一个参数，并显示参数是否是数字
    4. isboolean  接受一个参数，并显示参数是否是布尔值
    5. isprime      接受一个参数，并显示参数是否是素数
    6. isletter       接受一个参数，并显示参数是否是字母
    7. expr           接受一个参数，形如第二题的参数，显示第二题的结果
    8. create        接受一个参数，作为文件名，并在内存里面保存，无需写磁盘
    9. write          接受两个参数，一个是文件名，一个是内容，执行后写入到内存里面文件名对应的内容里面
    10. cat             接受一个参数，作为文件名，显示文件内容
    11. remove      接受一个文件名参数，删除内存中此文件
    12. list              显示内存里面的文件名列表
6. 已知函数getLogs() 返回git 日志，请将此日志解析为对象数组，并根据数组分别统计：提交数，提交者数，提交数的时间分布（上午中午下午晚上、周月等），提交者的时间分布，文件修改次数汇总，哪个作者提交的最少/多？哪个作者工作量大？哪些作者需要接受辅导？使用 Excel 表格记录上述信息。
![](http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/a641c04bd78ce374ac1c4d16d38f7689)[all.log](http://192.168.0.161:4999/server/index.php?s=/api/attachment/visitFile/sign/e0a37d7885fb6563abb7c03e34ab7c73 "[all.log")