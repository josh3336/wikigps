var http = require("http");
var handler = require("./request_handler");

var port = 8080;
var ip = "0.0.0.0";
var server = http.createServer(handler.handleRequest);
console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);