const fs = require("fs");
const path = require("path");
const { Cookie, CookieJar } = require("tough-cookie");

const defaultCookieFile = path.resolve(__dirname, ".data/cookies.json");

module.exports = bindAxios;

/**
 * 
 * @param {import("axios").AxiosInstance} axios 
 * @returns 
 */
function bindAxios(axios) {
    const cookiejar = fs.existsSync(defaultCookieFile)
        ? CookieJar.deserializeSync(fs.readFileSync(defaultCookieFile, "utf-8"))
        : new CookieJar();
    axios.interceptors.request.use(function(config) {
        let headers = cookiejar.getSetCookieStringsSync(config.baseURL);
        config.headers = config.headers || {};
        config.headers["Cookie"] = headers;
        return config;
    });
    axios.interceptors.response.use(function(response) {
        let headers = response.headers["set-cookie"];
        if(!Array.isArray(headers)) {
            headers = [headers];
        }
        for(let hdr of headers) {
            cookiejar.setCookieSync(hdr, response.config.baseURL);
        }
        return response;
    });
    process.on("beforeExit", function(){
        const obj = cookiejar.serializeSync();
        fs.writeFileSync(defaultCookieFile, JSON.stringify(obj));
    });
}