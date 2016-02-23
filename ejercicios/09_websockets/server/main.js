var express = require('express');
var app = express(); 
var server = require('http').Server(app);  
var io = require('socket.io')(server); 

var messages = [
    {
        id: 1,
        text: "hola soy un mensaje",
        author: "Carlos"
    }];


app.use(express.static("./public"));

app.get('/', function(req, res) {
    res.status(200).send("Servidor para el ejercicio de websockets arrancado");
});

io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('messages', messages); 

    socket.on('new-message', function(data) {
        messages.push(data);
        
        // Reenviamos el mensaje a todos los clientes
        io.sockets.emit('messages', messages);
    });
});




server.listen(8080, function() {  
    console.log('Servidor corriendo en http://localhost:8080');
});
