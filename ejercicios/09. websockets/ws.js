var WebSocketServer = require("ws").Server;
var wss = new WebSocketServer({ port: 9000 });

wss.on("connection", function(ws) {

	ws.send("Bienvenido al servidor de chat");

});