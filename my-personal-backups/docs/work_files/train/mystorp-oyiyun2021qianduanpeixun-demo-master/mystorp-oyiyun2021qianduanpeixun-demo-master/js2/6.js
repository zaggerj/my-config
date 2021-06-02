if(typeof exports !== "undefined") {
    global.getLogs = require("./getLogs");
    module.exports = run;
}

// 统计 demo
function analyzeDemo(x) {
    const names = {
        'chenjie <chenjie@os-easy.com>': "陈杰",
        'Windy <luochengfeng@126.com>': "罗乘凤",
        'huangqiong <huangqiong@os-easy.com>': "黄琼",
        'baiyu <baiyu@os-easy.com>': "白雨",
        'ezzze <ezzze@163.com>': "韩晓祥",
        'zhutao <allen@morningcloud.cn>': "朱涛",
        'shankj <nowplay@126.com>': "佚名",
        'allen <allen@morningcloud.cn>': "朱涛",
        'ajc <madfox.fw@gmail.com>': "陈杰",
        'huangqiong <563985175@qq.com>': "黄琼",
        'AJC <chenjie@os-easy.com>': "陈杰",
        'liyinhui <liyinhui@os-easy.com>': "佚名",
        '黄琼 <huangqiong@os-easy.com>': "黄琼",
        'fancyguo <779581450@qq.com>': "郭咏梅",
        'Jay.Han <ezzzehxx@gmail.com>': "韩晓祥",
        '韩晓祥 <hanxiaoxiang@os-easy.com>': "韩晓祥",
        '陈杰 <chenjie@os-easy.com>': "陈杰",
        'fancy_guo <779581450@qq.com>': "郭咏梅",
        'fancy_guo <guoyongmei@os-easy.com>': "郭咏梅",
        '郭卫平 <guoweiping@os-easy.com>': "郭卫平",
        'zhangyao <593233820@qq.com>': "张垚",
        'tulang <tulang@os-easy.com$ git config --global user.email tulang@os-easy.com>': "涂浪",
        'tulang <tulang@os-easy.com>': "涂浪",
        'zhangyao <zhangyao@os-easy.com>': "张垚",
        '黄子杰 <908386236@qq.com>': "黄子杰",
        '0obuwawao0 <tggbuwawa@126.com>': "魏聪",
        'weicong <weicong@os-easy.com>': "魏聪",
        'zagger <huangzijie@os-easy.com>': "黄子杰",
        '魏聪 <weicong@os-easy.com>': "魏聪",
        'wangchuan <wangchuan@os-easy.com>': "王川",
        'libo <libo@os-easy.com>': "佚名",
        'unknown <huangzijie@os-easy.com>': "黄子杰",
        'wangchuan <1379688105@qq.com>': "王川",
        'jiazhihao <jiazhihao@os-easy.com>': "贾志浩",
        'root <root@LAPTOP-8L0FI0QD.localdomain>': "佚名",
        'tianyiwen <tianyiwen@os-easy.com>': "田怡文",
        'tianyiwen <tianyiwen@oseasy.com>': "田怡文"
    };
    let authors = {};
    let files = {};
    for(let xc of x.reverse()) {
        if(authors[names[xc.Author]] > 0) {
            authors[names[xc.Author]]++;
        } else {
            authors[names[xc.Author]]= 1;
        }
        for(let file of xc.files) {
            let [flags, filepath, filepath2] = file.split(/\s+/);
            if(!files[filepath]) {
                files[filepath] = {exists: false, modifiedTimes: 0, names: []};
            }
            files[filepath].modifiedTimes++;
            if(flags === "A" || flags === "M") {
                files[filepath].exists = true;
                files[filepath].names.push(filepath);
            } else if(flags === "D") {
                files[filepath].exists = false;
            } else if(flags.indexOf("R") === 0) {
                files[filepath].names.push(filepath2)
            } else {
                console.log("can not parse `" + file + "`");
            }
        }
    }
    let existsFiles = 0, deletedFiles = 0;
    Object.keys(files).forEach(filepath => {
        let o = files[filepath];
        if(o.exists) {
            existsFiles++;
        } else {
            deletedFiles++;
        }
    })
    return {authors, files: {exists: existsFiles, deleted: deletedFiles}};
}

/**
 * git log 数据格式：
 * commit 
 * Merge:
 * Author: 
 * Date: 
 *
 * message
 *
 * files
 *
 * commit
 */
function run(logText){
    let obj = {}, isMessage = false, messagebuf = [], files = [], isFileList = false;
    const commits = [];
    logText.split(/\r?\n/).forEach(line => {
        let metare = /^(\w+):\s+(.*?)$/;
        if(line.startsWith("commit ")) {
            if(Object.keys(obj).length > 0) {
                obj.message = messagebuf.join("\n");
                obj.files = files;
                commits.push(obj);
                obj = {};
                messagebuf = [];
                isMessage = false;
                files = [];
                isFileList = false;
            }
            obj.commit = line.replace("commit ", "");
        } else if(metare.test(line)) {
            let [, key, value] = metare.exec(line);
            obj[key] = value;
        } else if(line.length === 0) {
            if(isMessage) {
                isFileList = true;
            } else {
                isMessage = true;
            }
        } else if(isFileList) {
            files.push(line);
        } else if(isMessage) {
            messagebuf.push(line);
        }
    });
    if(Object.keys(obj).length > 0) {
        obj.message = messagebuf.join("\n");
        obj.files = files;
        commits.push(obj);
    }
    return analyzeDemo(commits);
}
