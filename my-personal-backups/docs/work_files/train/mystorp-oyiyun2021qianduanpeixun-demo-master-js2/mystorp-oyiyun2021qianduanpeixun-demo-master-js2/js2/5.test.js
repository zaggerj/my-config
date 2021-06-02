// setup test environments
var inputs = [];
var inputIndex = 0;
var outputs = [];
function reset(strings){
    inputIndex = 0;
    inputs = strings;
    outputs = [];
}
function prompt(str){
    if(inputIndex < inputs.length) {
        return inputs[inputIndex++];
    } else {
        return "exit";
    }
}
console.log = function(s){ outputs.push(s); };

// TestCase: exit
reset(["exit"]);
expect((run(), outputs)).to.deep.equal([]);
// TestCase: undefined, exit
reset(["isnumberx", "isbooleany", "isprimez", "isletter0", "exit"]);
expect((run(), outputs)).to.deep.equal(["command-not-found", "command-not-found", "command-not-found", "command-not-found"]);
// TestCase: help, exit
reset(["help", "exit"]);
expect((run(), outputs)).to.have.lengthOf(1);
// TestCase: isnumber, exit
reset(["aaa", "[]", "323", "000", "true"].map(x => `isnumber ${x}`).concat("exit"));
expect((run(), outputs)).to.deep.equal(["aaa", "[]", "323", "000", "true"].map(x => `${x} ${/^\d+$/.test(x) ? "是" : "不是"}数字`));
// TestCase: isboolean, exit
reset(["aaa", "[]", "0", "false", "true"].map(x => `isboolean ${x}`).concat("exit"));
expect((run(), outputs)).to.deep.equal(["aaa", "[]", "0", "false", "true"].map(x => `${x} ${/^(true|false)$/.test(x) ? "是" : "不是"}布尔值`));
// TestCase: isprime, exit
reset(["2", "[]", "0", "3", "true"].map(x => `isprime ${x}`).concat("exit"));
expect((run(), outputs)).to.deep.equal(["2", "[]", "0", "3", "true"].map(x => `${x} ${/^(2|3)$/.test(x) ? "是" : "不是"}素数`));
// TestCase: isletter, exit
reset(["2", "[]", "0", "b", "3", "true", "a"].map(x => `isletter ${x}`).concat("exit"));
expect((run(), outputs)).to.deep.equal(["2", "[]", "0", "b", "3", "true", "a"].map(x => `${x} ${/^(a|b)$/.test(x) ? "是" : "不是"}字母`));
// TestCase: expr, exit
reset(["2*3", "3+4", "5-6", "60/2", "(3-2)*5", "(3+2)/2", "(3+2)+2"].map(x => `expr ${x}`).concat("exit"));
expect((run(), outputs)).to.deep.equal(["2*3", "3+4", "5-6", "60/2", "(3-2)*5", "(3+2)/2", "(3+2)+2"].map(x => `${x} = ${eval(x)}`));
// TestCase: create, write, cat, remove, list, exit
reset([
    "create file.js",
    "write file.js console.log('hello, world!')",
    "cat file.js",
    "list",
    "remove file.js",
    "list", "exit"]);
expect((run(), outputs)).to.deep.equal([
    "file.js created!",
    "write file.js successful.",
    "console.log('hello, world!')",
    JSON.stringify(["file.js"]),
    "remove file.js successful.",
    JSON.stringify([])
]);