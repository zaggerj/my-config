const chalk = require("chalk");
const { decode } = require("html-entities");
const Diff = require("diff");
const { toWeekHours } = require("./holiday");
const UserNames = require("./users.json");
const ActionNames = require("./actions.json");
const ResolvedNames = require("./resolutions.json");
const UserRoles = require("./roles.json");

const BugStatusNames = {
    active: "激活",
    resolved: "已解决",
    closed: "关闭"
};
const SharedFieldNames = {
    id: "编号",
    product: "产品编号",
    branch: "分支编号",
    module: "模块编号",
    project: "迭代编号",
    plan: "产品计划编号",
    story: "需求编号",
    storyVersion: "需求版本",
    title: "标题",
    severity: "严重程度",
    pri: "优先级",
    type: "类型",
    os: "操作系统",
    browser: "浏览器",
    hardware: "硬件",
    steps: "复现步骤",
    status: "状态",
    confirmed: "确认状态",
    activatedCount: "激活次数",
    activatedDate: "激活日期",
    mailto: "",
    openedBy: "创建者",
    openedDate: "创建时间",
    openedBuild: "发现于版本",
    assignedTo: "指派给",
    assignedDate: "指派时间",
    deadline: "截止日期",
    resolvedBy: "解决者",
    resolution: "解决方案",
    resolvedBuild: "解决于版本",
    resolvedDate: "解决时间",
    closedBy: "关闭者",
    closedDate: "关闭时间",
    duplicateBug: "重复Bug",
    lastEditedBy: "最后编辑者",
    lastEditedDate: "最后编辑时间"
};
const StoryStatusNames = {
    Pass: "通过",
    active: "激活",
    changed: "已变更"
};

module.exports = {
    stripHtml, actions2text, eachPromise, getTimeConsumingInfo
};

/**
 * 删除禅道生成的 html 里面的标签，并对空白进行格式化
 * @param {string} html 
 * @param {"comment" | "bug-steps" | "diff"} from
 */
function stripHtml(html, from) {
    html = html.replace(/<img.+?src="(.*?)" alt="(.*?)"\s*\/>/g, function(_, src, alt){
        if(src.indexOf("{") === 0) {
            return `![${alt}](/zentao/file-read-${src.substring(1, src.length - 1)})`;
        } else {
            return `![${alt}](${src})`;
        }
    });
    html = html.replace(/<br\s*\/?>/g, "\n");
    html = html.replace(/<[^>]+>/g, "");
    let lines = html.split(/\r?\n/).map(x => decode(x).trim()).filter(x => x.length > 0);
    if(from === "bug-steps") {
        lines = lines.map(x => x.startsWith("【") ? x : "    " + x);
    } else if(from === "comment") {
        if(lines.length > 1) {
            lines = lines.map(x => "    " + x);
            lines.unshift("");
        }
    } else if(from === "diff") {
        lines = lines.map(x => /^\d+-/.test(x) ? chalk.red(x) : chalk.green(x));
    }
    return lines.join("\n");
}

/**
 * 将禅道识别的的变更信息重新格式化
 * @param {string} html 
 */
function diff2text(oldText, newText) {
    let lineno = 0;
    let lines = [];
    Diff.diffLines(oldText, newText).forEach((change, idx, a) => {
        let i = 1, len = change.count, value = change.value, indexL = 0, indexR = 0, cline;
        if(!change.removed && !change.added) {
            lineno += len;
            return;
        }
        for(; i <= len; i++) {
            lineno++;
            indexR = value.indexOf("\n", indexL);
            if(indexR > -1) {
                cline = value.substring(indexL, indexR + 1);
            } else {
                cline = value.substring(indexL) + "\n";
                if(idx + 1 === a.length) {
                    cline = cline.trimEnd();
                }
            }
            if(change.removed) {
                lines.push(chalk.red(String(lineno).padStart(2, " ") + " | - " + cline));
            } else {
                lines.push(chalk.green(String(lineno).padStart(2, " ") + " | + " + cline));
            }
            indexL = indexR + 1;
        }
        if(change.removed) {
            lineno -= len;
        }
    });
    return lines.join("");
}

/**
 * 将禅道Bug, 需求下面的备注，指派给等历史信息转换为格式化的文本
 * 可以使用 22113 查看效果
 * @param {ISharedAction[]} actions 
 */
function actions2text(actions) {
    return Object.values(actions).map(x => {
        let text = `${x.date} ${UserNames[x.actor] || x.actor} ${ActionNames[x.action] || x.action}`;
        switch(x.action) {
            case "opened":
                break;
            case "assigned":
                text += ` ${UserNames[x.extra] || x.extra}`;
                if(x.comment) {
                    text += ` 并备注: ${stripHtml(x.comment, "comment")}`;
                }
                break;
            case "commented":
                text += `: ${stripHtml(x.comment, "comment")}`;
                break;
            case "edited":
                if(x.comment) {
                    text += ` 并备注: ${stripHtml(x.comment, "comment")}`;
                }
                text += "\n  下面是变更详情：\n" + x.history.map((item, i) => {
                    let text, diff;
                    switch(item.field) {
                        case "steps":
                            diff = diff2text(stripHtml(item.old, "bug-steps"), stripHtml(item.new, "bug-steps"));
                            if(diff.length > 0) {
                                text = `复现步骤 变更差异为：\n${diff}`;
                            } else {
                                text = `复现步骤 变更了，但纯文本无差异`;
                            }
                            break;
                        case "status":
                            text = `Bug 状态 从 ${BugStatusNames[item.old]} 变更为 ${BugStatusNames[item.new]}`;
                            break;
                        case "resolvedBy":
                        case "assignedTo":
                            text = `${SharedFieldNames[item.field]} 从 ${UserNames[item.old] || item.old} 变更为 ${UserNames[item.new] || item.new}`;
                            break;
                        case "resolvedDate":
                            text = `解决时间 从 ${item.old.indexOf("0") === 0 ? "无" : item.old} 变更为 ${item.new || "无"}`;
                            break;
                        case "resolution":
                            text = `解决状态 从 ${ResolvedNames[item.old]} 变更为 ${ResolvedNames[item.new]}`;
                            break;
                        default:
                            text = `${SharedFieldNames[item.field] || item.field} 从 ${item.old} 变更为：${item.new}`;
                            break;
                    }
                    return `    ${i + 1}. ${text}`;
                }).join("\n");
                break;
            case "resolved":
                text += ` ${ResolvedNames[x.extra]}`;
                if(x.comment) {
                    text += ` 并备注: ${stripHtml(x.comment, "comment")}`;
                }
                break;
            case "activated":
                x.history.forEach(item => {
                    if(item.field === "assignedTo") {
                        text += ` ${UserNames[item.new]}`;
                    }
                });
                if(x.comment) {
                    text += ` 并备注: ${stripHtml(x.comment, "comment")}`;
                }
                break;
            case "changed":
                if(x.comment) {
                    text += ` 并备注: ${stripHtml(x.comment, "comment")}`;
                }
                text += ":\n" + x.history.map((item, i) => {
                    let text, diff;
                    switch(item.field) {
                        case "title":
                            text = "标题 变更为: " + item.new;
                            break;
                        case "spec":
                            diff = diff2text(stripHtml(item.old), stripHtml(item.new));
                            if(diff.length > 0) {
                                text = `需求描述 变更差异为：\n${diff}`;
                            } else {
                                text = `需求描述 变更了，但纯文本无差异`;
                            }
                            break;
                        case "verify":
                            diff = diff2text(stripHtml(item.old), stripHtml(item.new));
                            if(diff.length > 0) {
                                text = `验收标准 变更差异为：\n${diff}`;
                            } else {
                                text = `验收标准 变更了，但纯文本无差异`;
                            }
                            break;
                        case "version":
                            text = `版本号 从 ${item.old} 变更为 ${item.new}`;
                            break;
                        case "status":
                            text = `需求状态 从 ${StoryStatusNames[item.old]} 变更为 ${StoryStatusNames[item.new]}`;
                            break;
                        case "assignedTo":
                            text = `指派给 从 ${UserNames[item.old]} 变更为 ${UserNames[item.new]}`;
                            break;
                        case "reviewedBy":
                            text = `评审人 从 ${UserNames[item.old]} 变更为 ${UserNames[item.new]}`;
                            break;
                        case "reviewedDate":
                            text = `评审时间 从 ${item.old.indexOf("0") === 0 ? "无" : item.old} 变更为 ${item.new.indexOf("0") === 0 ? "无" : item.new}`;
                            break;
                        default:
                            text = `${item.field} 从 ${item.old} 变更为：${item.new}`;
                            break
                    }
                    return `    ${i + 1}. ${text}`;
                }).join("\n");
                break;
            case "reviewed":
                text += ` ${StoryStatusNames[x.extra]}`;
                if(x.comment) {
                    text += ` 并备注: ${stripHtml(x.comment, "comment")}`;
                }
                break;
            case "linked2project":
                text += ` ${stripHtml(x.extra)}`;
                break;
        }
        return text;
    }).join("\n");
}

/**
 * @template T
 * @param {T[]} arr 
 * @param {{(item: T) => Promise}} factory 
 * @param {number} limit 
 * @returns {Promise}
 */
function eachPromise(arr, factory, limit) {
    return new Promise((resolve) => {
        let index = 0, queued = 0;
        (function loop(){
            if(index >= arr.length) {
                return resolve();
            }
            while(index < arr.length && queued < limit) {
                let element = arr[index++];
                factory(element).then(function(){
                    queued--;
                    loop();
                });
                queued++;
            }
        })();
    });
}

/**
 * 获取 bug, 需求 的耗时情况
 * @param {IBug|IStory} obj 
 * @returns {ITimeConsume[]}
 */
function getTimeConsumingInfo(obj) {
    let date = null;
    /**@type {ITimeConsume[]} */
    const userHours = [];
    Object.values(obj.actions || {}).forEach(action => {
        if(!date) {
            date = action.date;
        }
        action.history.forEach(item => {
            if(item.field === "assignedTo") {
                userHours.push({
                    user: item.old,
                    role: UserRoles[item.old],
                    hours: toWeekHours(date, action.date)
                });
                date = action.date;
            }
        });
    });
    return userHours;
}