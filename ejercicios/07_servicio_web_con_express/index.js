var express = require("express");

var app = express();
var puerto = 9000;

app.use(function(req, res, next) {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use(express.static("./public"));
app.get('/', function(req, res) {
    res.send(`Servidor Express operativo en e puerto ${puerto}`);
});
app.listen(puerto);
console.log(`Servidor Express operativo en e puerto ${puerto}`);

