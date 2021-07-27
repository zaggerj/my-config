// 闭包：函数嵌套函数，内部函数就是闭包
function outerFun() {
    let a = 10
    function innerFun() {
        console.log(a)
    }
    return innerFun
}

let fun = outerFun()

// let a = 10
// let b = 20
// function fun() {
//     let a = 30
//     let c = 40
//     function fun() {
//         let a = 50
//         let b = 60
//     }
// }

// 应用
// 问题：两个全局变量，两个全局的函数
// let a = 10
// let b = 20
// function add() {
//     return a + b
// }
// function sub() {
//     return a - b
// }
// let result1 = add()
// let result2 = sub()
// console.log(result1, result2)

let module = (function () {
    let a = 10
    let b = 20
    function add() {
        return a + b
    }
    function sub() {
        return a - b
    }
    let result1 = add()
    let result2 = sub()
    console.log(result1, result2)
    return {
        add,
        sub,
    }
})()

let result1 = module.add()
let result2 = module.sub()
console.log(result1, result2)
