const fs = require("fs");
const path = require("path");

const ZentaoAPI = require("./api");

if(module === require.main) main();

function main(){
    let type = process.argv[2] || "user";
    const extraArgs = process.argv.slice(3);
    let cfgfile = "./config.json";
    let data = JSON.parse(fs.readFileSync(cfgfile, "utf-8"));
    ZentaoAPI.createSession(data).then((user) => {
        let result;
        switch(type) {
            case "user":
            case "project":
            case "bug":
            case "story":
                let method = "show" + type.charAt(0).toUpperCase() + type.substring(1) + "Info";
                result = ZentaoAPI[method](user, data, ...extraArgs);
                break;
            case "dept":
                ZentaoAPI.showDepartmentInfo();
                break;
            case "cache":
                result = new ZentaoAPI.Project(data.project).cache();
                break;
        }
        return result;
    });
}