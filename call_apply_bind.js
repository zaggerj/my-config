let dog = {
    name: '旺旺',
    sayName: function () {
        console.log('我是', this.name)
    },
    eat: function (food1, food2) {
        console.log('我喜欢吃', food1 + food2)
    },
}
let cat = {
    name: '喵喵',
}

function fun() {
    console.log(this.name)
}
// call可以调用函数，call可以改变函数中this的指向
fun.call(cat)
dog.sayName() // 我是旺旺
dog.sayName.call(cat) // 我是喵喵
dog.eat('骨头')
dog.eat.call(cat, '鱼', '肉') // 传递参数依次传递
dog.eat.apply(cat, ['鱼', '肉']) // 传递参数，数组的方式
let bindFun = dog.eat.bind(cat, '鱼', '肉') // 传递参数，跟call一样，bind不会调用函数,会返回一个函数，然后来调用
bindFun()
