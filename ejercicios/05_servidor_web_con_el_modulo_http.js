var http = require('http');
var v8 = require('v8');

var puerto = 9000;

var servidor = http.createServer(function(req, res)	{
	res.writeHead(200, {"Content-Type": "text/plain"});
	res.write("Servidor creado con NodeJS " + process.version + "\n");
	res.write("Estado de la memoria\n");
	res.write(JSON.stringify(v8.getHeapStatistics(), null, "\t"));
	res.end();
});

servidor.listen(puerto);
console.log(`Servidor arrancado en el puerto ${puerto}`);
