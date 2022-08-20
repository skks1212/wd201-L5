const http = require("http");
const fs = require("fs");
const readline = require("readline");

let homeContent = "";
let projectContent = "";
let registerContent = "";

const lineDetail = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const loadFile = () => {
    lineDetail.question(`Please provide the full file path to the register page - `, (path) => {
        fs.readFile(path, function (err, page) {
            if (err) {
                console.error("ERROR : Could not access file.");
                loadFile();
            }
            registerContent = page;
        });
    });
}
loadFile();

fs.readFile("pages/home.html", function (err, home) {
    if (err) {
        throw err;
    }
    homeContent = home;
});
  
fs.readFile("pages/project.html", function (err, project) {
    if (err) {
        throw err;
    }
    projectContent = project;
});

http
    .createServer(function (request, response) {
        let url = request.url;
        response.writeHeader(200, { "Content-Type": "text/html" });
        switch (url) {
            case "/project":
                response.write(projectContent);
                response.end();
                break;
            case "/register":
                response.write(registerContent);
                response.end();
                break;
            default:
                response.write(homeContent);
                response.end();
                break;
        }
    })
    .listen(3000);