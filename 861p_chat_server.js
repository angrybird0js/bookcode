
var http = require('http');
var ws = require('websocket-server');
var clientui = require('fs').readFileSync("wschatclient.html");
var httpserver = new http.Server();

httpserver.on("request", function (request, response) {
    if (request.url === "/") {
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write(clientui);
        response.end();
    }
    else {
        response.writeHead(404);
        response.end();
    }
});

var wsserver = ws.createServer({server: httpserver});
wsserver.on("connection", function(socket) {
    socket.send("채팅방에 오신것을 환영합니다");
    socket.on("message", function(msg) {
        wsserver.broadcast(msg);
    });
});

wsserver.listen(8000);