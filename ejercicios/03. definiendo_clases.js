var EventEmitter = require('events').EventEmitter;
var util = require('util');

/* Definimos la clase */
var Person = function(name) {
	this.name = name;
};
util.inherits(Person, EventEmitter);

var mario = new Person("Mario Covarrubias");
mario.on('speak', function (message) {
	console.log(`${this.name}: ${message}`)
});

mario.emit('speak', "El conocimiento no sirve de nada si no se comparte");