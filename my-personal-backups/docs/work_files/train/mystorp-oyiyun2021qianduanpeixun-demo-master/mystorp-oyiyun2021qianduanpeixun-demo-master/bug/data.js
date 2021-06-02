const http = require("./http");
const fs = require("fs");
const path = require("path");
const debug = require("debug")("zentao:data");
const { eachPromise } = require("./utils");

module.exports = {
    syncProjectBugs, syncProjectStories,
    findBugById, findStoryById,
    loadProjectBugs, loadProjectStories
};

/**
 * 
 * @param {string} project
 * @param {IBug[]} array 
 * @param {number} limit 
 */
function syncProjectBugs(project, array, limit = 20) {
    return syncFn(project, "bug", array, limit);
}

/**
 * 
 * @param {string} project
 * @param {IStory[]} array 
 * @param {number} limit 
 */
function syncProjectStories(project, array, limit = 20) {
    return syncFn(project, "story", array, limit);
}

/**
 * 
 * @param {string} project
 * @param {"bug" | "story"} type
 * @param {IBug[]|IStory[]} array 
 * @param {number} limit 
 * @returns {Promise<ISyncResult>}
 */
function syncFn(project, type, array, limit = 20){
    const dir = path.resolve(__dirname, `.data/${type}/${project}`);
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir, {recursive: true});
    }
    /**@type {ISyncResult} */
    let syncStatus = {};
    return eachPromise(array, (item) => {
        const itemFile = path.join(dir, item.id + ".json");
        if(fs.existsSync(itemFile)) {
            let cachedItem = JSON.parse(fs.readFileSync(itemFile, "utf-8"));
            if(cachedItem.lastEditedDate === item.lastEditedDate) {
                syncStatus[item.id] = false;
                return Promise.resolve();
            }
        }
        debug(`sync ${type} ${item.id} ...`);
        return http.get(`${type}-view-${item.id}`).then(data => {
            let obj = data[type];
            obj.actions = data.actions;
            fs.writeFileSync(itemFile, JSON.stringify(obj));
            syncStatus[obj.id] = true;
        }, function(err){
            console.error(err.stack);
            syncStatus[item.id] = false;
        });
    }, limit).then(() => syncStatus);
}

function loadProjectStories(project, array) {
    return loadFn(project, "story", array);
}

function loadProjectBugs(project, array) {
    return loadFn(project, "bug", array);
}

/**
 * @template {IBug|IStory} T
 * @param {string} project
 * @param {"bug" | "story"} type
 * @param {T[]} array 
 * @param {number} limit 
 * @returns {Promise<T[]>}
 */
function loadFn(project, type, array, limit = 50) {
    const dir = path.resolve(__dirname, `.data/${type}/${project}`);
    debug(`load from: ${dir}`);
    return eachPromise(array, function(item) {
        return new Promise(function(resolve, reject){
            const itemFile = path.join(dir, item.id + ".json");
            fs.readFile(itemFile, "utf-8", function(error, result) {
                if(error) {
                    debug(`${type} ${item.id} has no cache.`);
                    return reject(error);
                }
                const cachedItem = JSON.parse(result);
                if(cachedItem.lastEditedDate !== item.lastEditedDate) {
                    debug(`cache of ${type} ${item.id} is not latest!`);
                }
                item.actions = cachedItem.actions;
                resolve(item);
            });
        });
    }, limit).then(() => array);
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<IBug>}
 */
function findBugById(id) {
    return findById("bug", id);
}

/**
 * 
 * @param {string} id 
 * @returns {Promise<IStory>}
 */
function findStoryById(id) {
    return findById("story", id);
}

/**
 * 
 * @param {"bug" | "story"} type 
 * @param {string} id 
 * @returns {Promise<IBug|IStory>}
 */
function findById(type, id) {
    debug(`find ${type} ${id} from cache.`);
    return new Promise((resolve, reject) => {
        const dir = path.resolve(__dirname, `.data/${type}`);
        fs.readdir(dir, function(error, files) {
            if(error) {
                return reject(error);
            }
            let itemFile = null;
            for(let project of files) {
                itemFile = path.join(dir, project, id + ".json");
                if(fs.existsSync(itemFile)) {
                    break;
                }
                itemFile = null;
            }
            if(!itemFile) {
                return reject("not found!");
            }
            fs.readFile(itemFile, "utf-8", function(error, result) {
                if(error) {
                    return reject(error);
                }
                resolve(JSON.parse(result));
            });
        });
    });
}