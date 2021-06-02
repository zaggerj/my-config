/// <reference path="./types.d.ts"/>
const debug = require("debug")("zentao:api");
const chalk = require("chalk");
const Table = require("cli-table3");
const { decode } = require("html-entities");
const { stripHtml, actions2text, getTimeConsumingInfo } = require("./utils");
const http = require("./http");
const {toWeekHours} = require("./holiday");
const {
    syncProjectBugs, syncProjectStories,
    findBugById, findStoryById,
    loadProjectBugs, loadProjectStories
} = require("./data");


class Chainable {
    constructor(obj) {
        this._obj = obj;
        // TODO: clone
        this._result = obj;
    }
    reset(){
        this._result = this._obj;
        return this;
    }
    end(fn){
        // TODO: clone
        let ret = this._result;
        if(typeof fn === "function") {
            fn(ret);
        }
        return ret;
    }
}

function oneOf(...args) {
    return function(val) {
        let hit = false;
        for(let i = 0, len = args.length; i < len; i++) {
            let arg = args[i];
            switch(typeof arg) {
                case "string":
                    hit = arg === val;
                    break;
                case "number":
                    hit = arg === val * 1;
                    break;
                case "function":
                    hit = arg(val);
                    break;
                case "object":
                    if(arg instanceof Date) {
                        hit = arg - val === 0;
                        break;
                    } else if(arg instanceof RegExp) {
                        hit = arg.test(val);
                        break;
                    }
                default:
                    console.error(`can't handle args[${i}]: ${arg}`);
            }
            if(hit) { break; }
        }
        return hit;
    };
}

class BugAnalyzer extends Chainable {
    /**
     * 
     * @param {Array} bugs 
     */
    constructor(bugs) {
        super(bugs);
    }
    /**
     * 
     * @param {Function} fn 
     * @returns this
     */
    _eachBug(fn) {
        /**@type {Array<IBug>} */
        this._result = this._result.filter(fn);
        return this;
    }
    /**
     * 根据指定的 bug 状态对 bug 进行过滤
     * @param {"active" | "resolved" | "closed"} val bug 状态
     */
    status(val) {
        const filter = oneOf(...arguments)
        return this._eachBug(x => filter(x.status));
    }
    author(val) {
        const filter = oneOf(...arguments)
        return this._eachBug(x => filter(x.openedBy));
    }
    owner(val) {
        const filter = oneOf(...arguments)
        return this._eachBug(x => filter(x.assignedTo));
    }
    resolution(){
        const filter = oneOf(...arguments)
        return this._eachBug(x => filter(x.resolution));
    }
    title(keyword){
        return this._eachBug(x => {
            switch(typeof keyword) {
                case "string":
                    return decode(x.title).indexOf(keyword) > -1;
                case "function":
                    return keyword(decode(x.title));
                case "object":
                    if(keyword instanceof RegExp) {
                        return keyword.test(decode(x.title));
                    }
            }
        });
    }
    /**
     * 根据指定的日期进行过滤
     * @param {string|Date|Function} date 日期
     */
    openDate(date){
        const filter = oneOf(...[].map.call(arguments, (date) => {
            if(!(date instanceof Date)) {
                date = new Date(date);
            }
            date.setHours(0, 0, 0, 0);
            return date;
        }));
        return this._eachBug(x => {
            let date = new Date(x.openedDate);
            date.setHours(0, 0, 0, 0);
            return filter(date);
        });
    }
    /**
     * 
     * @param {number|Function} hour 
     */
    openHour(hour) {
        let args = [...arguments];
        if(args.length === 0 || hour === "*") {
            args = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        }
        const filter = oneOf(...args);
        return this._eachBug(x => {
            let date = new Date(x.openedDate);
            return filter(date.getHours());
        });
    }
    resolveDate() {
        const filter = oneOf(...[].map.call(arguments, (date) => {
            if(!(date instanceof Date)) {
                date = new Date(date);
            }
            date.setHours(0, 0, 0, 0);
            return date;
        }));
        return this._eachBug(x => {
            let date = new Date(x.resolvedDate);
            date.setHours(0, 0, 0, 0);
            return filter(date);
        });
    }
    resolveHour(hour) {
        let args = [...arguments];
        if(args.length === 0 || hour === "*") {
            args = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
        }
        const filter = oneOf(...args);
        return this._eachBug(x => {
            let date = new Date(x.resolvedDate);
            return filter(date.getHours());
        });
    }
    /**
     * 过滤被激活的bug
     */
    activated(){
        return this._eachBug(x => x.activatedCount * 1 > 0);
    }
    /**
     * 过滤已经超时的bug
     */
    timeout(from, hours){
        if(typeof from === "number") {
            hours = from;
            from = Date.now();
        }
        return this._eachBug(x => {
            return toWeekHours(x.assignedDate, from) > hours;
        });
    }
    severity12() {
        return this._eachBug(x => x.severity * 1 <= 2);
    }
    severity34() {
        return this._eachBug(x => x.severity * 1 > 2);
    }
    stats(){
        let bugs = this._result;
        let activeBugs = bugs.filter(x => x.status === "active");
        let total = bugs.length;
        let activeTotal = activeBugs.length;
        let maybeClose = bugs.filter(x => x.status === "resolved" && x.openedBy === x.assignedTo);
        let bugTypeStats = bugs.reduce((h, b) => {
            h[b.type] = (h[b.type] + 1) || 1;
            return h;
        }, {});
        let resolutionStats = bugs.reduce((h, b) => {
            if(b.resolution.length > 0) {
                h[b.resolution] = (h[b.resolution] + 1) || 1;
            }
            return h;
        }, {});
        let authorStats = bugs.reduce((h, b) => {
            h[b.openedBy] = (h[b.openedBy] + 1) || 1;
            return h;
        }, {});
        let resolverStats = bugs.reduce((h, b) => {
            h[b.resolvedBy] = (h[b.resolvedBy] + 1) || 1;
            return h;
        }, {});
        let openHourStats = bugs.reduce((h, b) => {
            let d = new Date(b.openedDate);
            let key = d.getHours();
            if(isNaN(key)) { return h; }
            if(key < 10) {
                key = "0" + key;
            }
            h[key] = (h[key] + 1) || 1;
            return h;
        }, {});
        let resolveHourStats = bugs.reduce((h, b) => {
            let d = new Date(b.resolvedDate);
            let key = d.getHours();
            if(isNaN(key)) { return h; }
            if(key < 10) {
                key = "0" + key;
            }
            h[key] = (h[key] + 1) || 1;
            return h;
        }, {});
        return {
            total, activeTotal, maybeClose,
            bugTypeStats, resolutionStats, authorStats,
            resolverStats, openHourStats, resolveHourStats
        };
    }
    /**
     * 统计耗时
     */
    elapsedStats() {
        const bugs = this._result;
        return bugs.map(bug => {
            let totalHours = toWeekHours(bug.openedDate, bug.resolvedDate);
            let userHours = [];
            let date;
            bug.actions && Object.values(bug.actions).forEach(action => {
                if(!date) {
                    date = action.date;
                }
                action.history.forEach(item => {
                    if(item.field === "assignedTo") {
                        userHours.push([item.old, toWeekHours(date, action.date)]);
                        date = action.date;
                    }
                });
            });
            return {totalHours, userHours};
        });
    }
}

class User {
    static getAll() {
        return http.get("company-browse-0-bydept-id-0-500-1").then(resp => {
            return resp.users;
        });
    }
    constructor(username, password, project, product) {
        this.username = username;
        this.password = password;
        this.project = String(project);
        this.product = String(product);
    }
    profile(){
        return http.get(`my-profile.json?onlybody=yes`);
    }
    /**
     * 登录
     * @returns {Promise}
     */
    login() {
        let {username, password} = this;
        return this.profile().catch((e) => {
            return http.get(`user-login-L3plbnRhby8=`, {
                params: {
                    account: username,
                    password,
                    get: ""
                }
            }).then(data => {
                this.data = data;
                return this;
            });
        });
    }
    /**
     * 
     * @returns {Promise<IBug[]>}
     */
    bugs(){
        const myProjectId = this.project;
        return http.get(`my-bug-assignedTo-id_desc-0-500-1`).then(resp => {
            let { users, bugs } = resp;
            bugs = bugs.filter(b => b.project === myProjectId);
            bugs.forEach(bug => {
                bug.assignedToRealName = users[bug.assignedTo];
            });
            return bugs;
        });
    }
    /**
     * 
     * @returns {Promise<ITask[]>}
     */
    tasks(){
        const myProjectId = this.project;
        return http.get("my-task-assignedTo-id_desc-0-500-1").then(resp => {
            return Object.values(resp.tasks).filter(task => task.project === myProjectId);
        });
    }
    /**
     * 
     * @returns {Promise<IProject[]>}
     */
    projects(){
        return http.get(`my-project`).then(resp => resp.projects);
    }
    /**
     * 
     * @returns {Promise<IStory[]>}
     */
    stories(){
        return http.get(`my-story-assignedTo-id_desc-0-500-1`).then(resp => Object.values(resp.stories));
    }
    dynamics(){
        return http.get("my-dynamic").then(resp => Object.values(resp.dateGroups));
    }
}

class Project {
    constructor(id) {
        this.id = id;
    }
    /**
     * 
     * @returns {Promise<IBug[]>}
     */
    bugs(){
        let myProjectId = this.id;
        return http.get(`project-bug-${myProjectId}-status,id_desc-0--0-0-5000-1`).then(resp => {
            let { users, bugs } = resp;
            bugs.forEach(bug => {
                bug.assignedToRealName = users[bug.assignedTo];
            });
            return loadProjectBugs(myProjectId, bugs);
        });
    }
    /**
     * 
     * @returns {Promise<ITask[]>}
     */
    tasks(){
        return http.get(`project-task-${this.id}-unclosed-0--0-2000-1`).then(resp => Object.values(resp.tasks));
    }
    /**
     * 
     * @returns {Promise<IStory[]>}
     */
    stories(){
        let myProjectId = this.id;
        return http.get(`project-story-${this.id}-order_desc-byModule-0-0-1000-1`).then(resp => {
            let stories = Object.values(resp.stories);
            return loadProjectStories(myProjectId, stories);
        });
    }
    dynamics(){
        return http.get("project-dynamic-" + this.id).then(resp => Object.values(resp.dateGroups));
    }
    cache() {
        Promise.all([
            this.stories().then(stories => syncProjectStories(this.id, stories)),
            this.bugs().then(bugs => syncProjectBugs(this.id, bugs))
        ]).then(([status1, status2]) => {
            let ids = Object.keys(status1);
            let total = ids.length;
            let updated = ids.filter(x => status1[x]).length;
            console.log(`共计 ${total} 条需求，更新了 ${updated} 条`);
            ids = Object.keys(status2);
            total = ids.length;
            updated = ids.filter(x => status2[x]).length;
            console.log(`共计 ${total} 条 Bug，更新了 ${updated} 条`);
        });
    }
}

/**
 * 显示当前用户在当前迭代下面的任务、bug 情况
 * @param {User} user 
 */
function showUserInfo(user, config) {
    Promise.all([
        user.projects(),
        user.tasks(),
        user.bugs()
    ]).then(([projects, tasks, bugs]) => {
        const project = projects.filter(x => x.id === config.project)[0];
        console.log(`# 当前项目：${decode(project.name)}`);
        console.log("## 分配给我的任务：");
        displayTasks(tasks);
        console.log("## 指派给我的 Bug：");
        displayBugs(bugs);
    });
}

/**
 * 
 * @param {IBug[]} bugs 
 */
function displayBugs(bugs) {
    const today = new Date;
    const todaystr = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate).padStart(2, "0");
    let activeBugs = bugs.filter(x => x.status === "active");
    let todayBugs = bugs.filter(x => x.openedDate.startsWith(todaystr));
    let expired36 = 0, expired72 = 0, activated = 0, unconfirmed = 0, severity12 = 0;
    let table = new Table({
        head: ["ID", "级别", "指派给", "标题"].map(x => chalk.cyan(x)),
        style: {border: [], head: []}
    });
    bugs.forEach(bug => {
        let styleFn = (s) => s;
        if(bug.confirmed === "0") {
            unconfirmed++;
        }
        if(bug.severity === "2" || bug.severity === "1") {
            severity12++;
        }
        // 取最大的耗时项
        let consumingInfo = getTimeConsumingInfo(bug)
                                .filter(x => x.role === "dev" || x.role === "pm")
                                .sort((a, b) => a.hours > b.hours ? -1 : 1);
        let hours = consumingInfo.length === 0 ? 0 : consumingInfo.pop().hours;
        if(hours >= 36) {
            if(hours >= 72) {
                expired72++;
            } else {
                expired36++;
            }
            styleFn = chalk.white.bgRed;
        } else if(hours > 20) {
            styleFn = chalk.yellow;
        }
        if(bug.activatedCount > 0) {
            activated++;
            styleFn = chalk.red;
        }
        if(bug.status === "active") {
            table.push([styleFn(bug.id), styleFn(bug.severity), styleFn(bug.assignedToRealName), styleFn(decode(bug.title))]);
        }
    });
    console.log(table.toString());
    let statText = `共计 ${bugs.length} 条 Bug`;
    if(todayBugs.length > 0) {
        statText += `，今天增加了 ${todayBugs.length} 条`;
    }
    if(activeBugs.length > 0) {
        statText += `，${activeBugs.length} 条待解决`;
    }
    if(unconfirmed > 0) {
        statText += `，${unconfirmed} 条未确认`;
    }
    if(severity12 > 0) {
        statText += `，${severity12} 条 2 级`;
    }
    if(expired36 > 0) {
        statText += `，${expired36} 条超过 36 小时未解决`;
    }
    if(expired72 > 0) {
        statText += `，${expired72} 条超过 72 小时未解决`;
    }
    if(activated > 0) {
        statText += `，${activated} 条被激活`;
    }
    console.log(chalk.bold.magenta(statText));
}
/**
 * 
 * @param {ITask[]} tasks 
 */
function displayTasks(tasks) {
    const today = new Date;
    const now = today.getTime();
    const todaystr = today.getFullYear() + "-" + String(today.getMonth() + 1).padStart(2, "0") + "-" + String(today.getDate).padStart(2, "0")
    let activeTasks = tasks.filter(x => x.status === "wait");
    let todayTasks = tasks.filter(x => x.finishedDate.startsWith(todaystr));
    let expired = 0, storyChanged = 0, noStory = 0;
    let table = new Table({
        head: ["ID", "指派给", "名称"].map(x => chalk.cyan(x)),
        style: {border: [], head: []}
    });
    tasks.forEach(task => {
        let d = new Date(task.finishedDate);
        let styleFn = (s) => s;
        if(task.needConfirm) {
            styleFn = chalk.red;
            storyChanged++;
        }
        if(d >= now) {
            styleFn = chalk.white.bgRed
            expired++;
        }
        if(!task.storyID) {
            noStory++;
        }
        if(task.status === "wait") {
            table.push([styleFn(task.id), styleFn(task.assignedToRealName), styleFn(decode(task.name))])
        }
    });
    console.log(table.toString());
    let statText = `共计 ${tasks.length} 条任务`;
    if(todayTasks.length > 0) {
        statText += `，今天有 ${todayTasks.length} 条要完成`;
    }
    if(activeTasks.length > 0) {
        statText += `，${activeTasks.length} 条待完成`;
    }
    if(storyChanged > 0) {
        statText += `，${storyChanged} 条需求发生变更`;
    }
    if(expired > 0) {
        statText += `，${expired} 条已过期`;
    }
    if(noStory > 0) {
        statText += `，${noStory} 条未关联需求`;
    }
    console.log(chalk.bold.magenta(statText));
}

function showProjectInfo(user, config) {
    let project = new Project(config.project);
    Promise.all([
        user.projects(),
        project.tasks(),
        project.bugs()
    ]).then(([projects, tasks, bugs]) => {
        const project = projects.filter(x => x.id === config.project)[0];
        console.log(`# 当前迭代：${decode(project.name)}`);
        console.log("## 迭代任务：");
        displayTasks(tasks);
        console.log("## 迭代 Bug：");
        displayBugs(bugs);
    });
}

function showBugInfo(user, config, bugId) {
    if(!bugId || !/^\d+$/.test(bugId)) {
        console.error("bug id must be numbers!");
        return;
    }
    const render = bug => {
        console.log(chalk.cyan(bug.id + " " + decode(bug.title)));
        console.log(stripHtml(bug.steps, "bug-steps"));
        console.log("\n");
        console.log(chalk.magenta(actions2text(bug.actions)));
    };
    findBugById(bugId).catch((e) => {
        debug(e);
        return http.get(`bug-view-${bugId}`).then(resp => {
            let { bug, actions } = resp;
            bug.actions = actions;
            return bug;
        });
    }).then(render);
}

function showStoryInfo(user, config, storyId) {
    if(!storyId || !/^\d+$/.test(storyId)) {
        console.error("story id must be numbers!");
        return;
    }
    const render = resp => {
        const { story, actions, version } = resp;
        console.log(chalk.cyan(story.id + " " + decode(story.title)));
        console.log(stripHtml(story.spec));
        console.log(stripHtml(story.verify));
        console.log("\n");
        console.log(chalk.magenta(actions2text(actions)));
    };
    findStoryById(storyId).catch((e) => {
        debug(e);
        return http.get(`story-view-${storyId}`).then(resp => {
            let { story, actions } = resp;
            story.actions = actions;
            return story;
        })
    }).then(render);
}

function showDepartmentInfo() {
    http.get(`company-browse-0-bydept-id-0-500-1`).then(resp => {
        /**@type {IUser[]} */
        const users = resp.users;
        const roles = users.reduce((h, i) => {
            h[i.account] = i.role;
            return h;
        }, {});
        // users.forEach(u => console.log(`${u.realname} => ${u.role}`));
        console.log(JSON.stringify(roles, null, 4))
    });
}

function createSession(config){
    debug("session arguemnts:", config);
    return http.get("api-getSessionID").then(() => {
        return new User(config.user, config.password, config.project, config.product).login();
    });
}

module.exports = {
    User, Project, BugAnalyzer,
    createSession, showUserInfo, showProjectInfo,
    showBugInfo, showStoryInfo, showDepartmentInfo
};