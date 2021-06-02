const http = require("http");
const urllib = require("url");
const fs = require("fs");
const path = require("path");

http.createServer(function(req, resp){
    let name = req.url.replace(/.json.*$/i, "").substring(1);
    console.log(`${req.method} ${req.url}`);
    fs.readdir(__dirname, function(error, names){
        let hit = false;
        for(let f of names) {
            if(f.indexOf(name) === 0) {
                hit = true;
                resp.setHeader("Content-Type", "application/json");
                fs.createReadStream(path.join(__dirname, f)).pipe(resp);
                break;
            }
        }
        if(!hit) {
            resp.statusCode = 404;
            resp.end("Not Found");
        }
    });
}).listen(4609);