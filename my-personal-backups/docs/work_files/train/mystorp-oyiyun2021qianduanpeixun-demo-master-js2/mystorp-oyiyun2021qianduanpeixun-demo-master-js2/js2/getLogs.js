/**
 * 此文件仅仅用于第 6 题
 * 写代码时可以直接将此文件复制到 6.js
 * 当在浏览器里面使用时，需要提供 http 服务器否则无法使用请求获取日志文件
 * 当在 node 里面使用时，all.log 文件需要存放在 js2/ 目录下
 */

if(typeof exports !== "undefined") {
    module.exports = getLogs;
}

function getLogs() {
    if(typeof window !== "undefined") {
        return fetch("/all.log").then(resp => resp.text());
    }
    return new Promise(function(resolve, reject) {
        require("fs").readFile("all.log", "utf-8", function(error, result) {
            if(error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}
