const debug = require("debug")("zentao:http");
const bindCookieHandler = require("./cookies");
const axios = require("axios").default.create({
    baseURL: "http://172.16.203.12/zentao/"
});

let sessionParams = {};

axios.interceptors.request.use(function(config){
    config.params = Object.assign({}, config.params || {}, sessionParams);
    if(!/.json$/i.test(config.url)) {
        config.url = config.url + ".json";
    }
    debug("request:", config.url);
    return config;
});

bindCookieHandler(axios);

axios.interceptors.response.use(function(response){
    let data = response.data;
    if(typeof data === "string") {
        debug(response.request.path, "=>", data);
        throw new Error("request error, maybe your url is wrong!\n" + data);
    } else {
        if(data.status === "success") {
            return typeof data.data === "string" ? JSON.parse(data.data) : data;
        } else {
            throw new Error(data.reason);
        }
    }
});

const sessionInterceptor = axios.interceptors.response.use(function(response) {
    if(response.sessionName && response.sessionID) {
        sessionParams[response.sessionName] = response.sessionID;
        axios.interceptors.response.eject(sessionInterceptor);
    }
    return response;
});

module.exports = axios;