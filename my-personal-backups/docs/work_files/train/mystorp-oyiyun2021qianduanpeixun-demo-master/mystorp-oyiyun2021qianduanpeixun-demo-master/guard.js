const fs = require("fs");
const { JSDOM, VirtualConsole } = require("jsdom");

let testCount = 0, failureTestCount = 0;
Promise.all(process.argv.slice(2).map(x => runTest(x)))
    .then(stats => {
        let totalCase = 0, failCase = 0;
        for(let i = 0, len = stats.length; i < len; i++) {
            totalCase += stats[i].total;
            failCase += stats[i].fail;
        }
        console.log(`test stats: ${totalCase - failCase}/${totalCase}`);
        return stats.map(x => x.code).every(x => x === 0);
    }).then(isAllZero => {
        process.exit(isAllZero ? 0 : 1);
    });

function runTest(testFile){
    if(!fs.existsSync(testFile)) {
        console.log("测试文件不存在，忽略！");
        return {code: 0, fail: 0, total: 0};
    }
    let userFile = testFile.replace(".test.js", ".js");
    if(!fs.existsSync(userFile)) {
        console.log("找不到 " + userFile + "，忽略！");
        userFile = testFile.replace(".test.js", ".html");
        if(!fs.existsSync(userFile)) {
            console.log("找不到 " + userFile + "，忽略！");
            return {code: 1, fail: 0, total: 0};
        }
    }
    const isHtml = /\.html$/i.test(userFile);
    const domOptions = {runScripts: "dangerously"};
    const dom = isHtml ? JSDOM.fromFile(userFile, domOptions) : fromjs(userFile, domOptions);
    return dom.then(function(x){
        if(typeof x.window.run !== "function") {
            console.log("找不到 run 函数");
            return {code: -1, fail: 0, total: 0};
        }
        x.window.eval(fs.readFileSync("./node_modules/chai/chai.js", "utf-8"));
        x.window.eval(`var expect = chai.expect`);
        let failureCount = 0;
        let test = findTestCases(fs.readFileSync(testFile, "utf-8"));
        if(test.setup) {
            x.window.eval(test.setup);
        }
        test.cases.forEach(function({code: testCode, title}){
            try {
                x.window.eval(testCode);
            } catch(e) {
                console.log(e);
                failureCount++;
                console.log("测试失败：" + title);
            }
        });
        return {code: failureCount,total: test.cases.length, fail: failureCount};
    });
}

function fromjs(file, domOptions) {
    return new Promise(function(resolve, reject){
        fs.readFile(file, "utf-8", function(error, result){
            if(error) {
                reject(error);
            } else {
                let dom = new JSDOM(`<!DOCTYPE html>
                    <html><head><title>${file}</title></head>
                    <body><script type="text/javascript">${result}</script></body>
                    </html>`, domOptions);
                resolve(dom);
            }
        });
    });
}

function findTestCases(code) {
    let cases = [];
    let casere = /^\s*\/\/\s*TestCase:/;
    let casecode, casetitle, setupcode = [];
    code.split(/\r?\n/).forEach(line => {
        if(casere.test(line)) {
            if(casecode && casecode.length > 0) {
                cases.push({code: casecode.join("\n"), title: casetitle});
            }
            casetitle = line.replace(casere, "").trim();
            casecode = [];
        } else {
            if(casecode){
                casecode.push(line);
            } else {
                setupcode.push(line);
            }
        }
    });
    if(casecode.length > 0) {
        cases.push({code: casecode.join("\n"), title: casetitle});
    }
    return {cases, setup: setupcode.join("\n")};
}
