var maxTime = 15000;
var passTime = 1000;
var contador = 0;

setInterval(function () {
	console.log("Ummmm .... han pasado " + Math.floor(contador/1000) + " segundos");
	contador += passTime;
}, passTime);

setTimeout(function() {
	console.log("Quedan 5 segundos para terminar");
}, maxTime - 5*1000);

setTimeout(function () {
	console.log("Se ha superado el tiempo máximo de " + maxTime / 1000 + " segundos")
	process.exit();
}, maxTime);