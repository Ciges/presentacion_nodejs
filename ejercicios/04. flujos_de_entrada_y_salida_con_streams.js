var fs = require("fs");

var stream = fs.createReadStream("./descargas/node-v4.2.6-linux-x64.tar.xz", "UTF-8");

var datos = "";
var bytes = 0;

stream.once("data", function() {
	console.log("Empezamos a leer el archivo\n\n");
});

stream.on("data", function(fragmento) {
	process.stdout.write(`leido fragmento de ${fragmento.length} bytes \n`);
	datos += fragmento;
	bytes += fragmento.length;
});

stream.on("end", function() {
	console.log(`\nLectura del archivo finalizada, total de bytes leidos: ${bytes}\n\n`);
});

