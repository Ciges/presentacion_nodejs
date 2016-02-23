var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");

var app = express();
var puerto = 9000;
var inventario = [
    {
        id: 1,
        name: "folletos informativos",
        qty: 45,
    },
    {
        id: 2,
        name: "boligrafos",
        qty: 45,
    }
];

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.use(function(req, res, next) {
    console.log(`${req.method} request for '${req.url}' - ${JSON.stringify(req.body)}`);
    next();
});

app.use(express.static("./public"));
app.use(cors());


app.get('/', function(req, res) {
    res.send(`Servidor Express operativo en e puerto ${puerto}`);
});

app.get("/inventario", function(req, res) {
    res.json(inventario);
});

app.post("/inventario", function(req, res) {
    inventario.push(req.body);
    res.json(inventario);
});

app.listen(puerto);
console.log(`Servidor Express operativo en e puerto ${puerto}`);

