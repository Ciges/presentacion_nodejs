name: inverse
layout: true
class: center, middle, inverse
---
# Aplicaciones escalables con Node.js
![logo](./images/logo.png)


*José M. Ciges - Febrero 2016*

.footnote[Código disponible en la carpeta ["Ejercicios"](./ejercicios/) (zip [aquí](./ejercicios_nodejs.zip))]
---
layout: true
class: center, middle
---
# Qué es Node.js y por qué usarlo
---
layout: false
.left-column[
  ## ¿Qué es?
]
.right-column[
  Es un entorno de desarollo para aplicaciones en JavaScript
  - Motor V8 de Google
  - Creado en 2009 por Ryan Dalh para [Joyent](https://www.joyent.com/)
  - En 2014 se creó la [fundación Node.js](https://nodejs.org/en/foundation/). En 2015 sale la versión 4.0
]
---
.left-column[
  ## ¿Qué es?
  ## ¿Por qué usarlo?
]
.right-column[
Es un entorno de desarollo para aplicaciones en JavaScript
  - Motor V8 de Google
  - Creado en 2009 por Ryan Dalh para [Joyent](https://www.joyent.com/)
  - En 2014 se creó la [fundación Node.js](https://nodejs.org/en/foundation/). En 2015 sale la versión 4.0

**Multiplataforma**
  - ¡JavaScript!
]
---
.left-column[
  ## ¿Qué es?
  ## ¿Por qué usarlo?
]
.right-column[
Es un entorno de desarollo para aplicaciones en JavaScript
  - Motor V8 de Google
  - Creado en 2009 por Ryan Dalh para [Joyent](https://www.joyent.com/)
  - En 2014 se creó la [fundación Node.js](https://nodejs.org/en/foundation/). En 2015 sale la versión 4.0

**Multiplataforma**
  - ¡JavaScript!

**Gran rendimiento**
  - E/S orientada a eventos y **asíncrona**
  - Gestión de eventos en un **único hilo** no bloqueante
  - Los eventos se añaden a una cola de eventos
  - Escaso consumo de recursos
]

---
.left-column[
  ## Instalación
]
.right-column[
  Descargamos de http://nodejs.org el instalador para Windows

  Para Linux descargamos el paquete .tar.xz

  ```bash
  cd /opt
  xz -d node-v4.2.6-linux-x64.tar.xz
  tar -xvf node-v4.2.6-linux-x64.tar
  export PATH=/opt/node-v4.2.6-linux-x64/bin:$PATH
  ```

  Un primer script :-)

  ```bash
  $ node -e "console.log('Versión de Node.js ' + process.version)"
  Versión de Node.js v4.2.6
  ```
]
---
layout: false
.left-column[
  ## npm
]
.right-column[
- [npm](http://www.npmjs.com) es la herramienta de gestion de paquetes de Node.js
  ```bash
  npm install
  ```
]
---
.left-column[
  ## npm
]
.right-column[
- [npm](http://www.npmjs.com) es la herramienta de gestion de paquetes de Node.js
  ```bash
  npm install
  ```
- Se instalan las dependencias indicadas en el *package.json*
- Por defecto la instalación es *local*
- Instalación global: (como administrador)
  ```bash
  npm install -g node-dev
  ```
]
---
.left-column[
  ## npm
  ## módulos interesantes
]
.right-column[
- [node-dev](https://www.npmjs.com/package/node-dev): Reinicia la aplicación en caso de modificación de algún archivo
- [jshint](https://www.npmjs.com/package/jshint):  Revisa nuestro código en busca de errores de sintaxis y fallos de "estilo"
- [express](https://www.npmjs.com/package/express):  Framework para el desarrollo de servidores web
- [forever](https://www.npmjs.com/package/forever):  Herramienta para dejar procesos en ejecución *"en background"*
- [pm2](http://pm2.keymetrics.io/):  Gestión de procesos y **balanceador de carga** para sistemas en producción
]
---
layout: true
class: center, middle
---
# Desarrollando con Node.js
---
layout: false
Programación **asíncrona**

  ```JavaScript
  process.stdin.on('data', function(data) {
      process.stdout.write("\nHas escrito " + data.toString().trim() + "\n");
  });

  process.stdout.write ("¿Cuál es tu hobby favorito?: ");
  ```
--
Funciones temporales

```JavaScript
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
```
---

## Definiendo clases
```JavaScript
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
```
--
- Definición de clases en JavaScript
- Definición de *eventos* y *herencia* &rarr; Módulos **["events"](https://nodejs.org/dist/latest-v4.x/docs/api/events.html#events_class_eventemitter)** y **["util"](https://nodejs.org/dist/latest-v4.x/docs/api/util.html)**

---
## Flujos de entrada y salida con streams
```JavaScript
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

```
--
- Node.js está orientado a *eventos*
- Además de las funcionas asíncronas tenemos las equivalentes síncronas &rarr; Módulo **["fs"](https://nodejs.org/dist/latest-v4.x/docs/api/fs.html)**
---
## Servicio web con el módulo ["http"](https://nodejs.org/dist/latest-v4.x/docs/api/https.html#https_https_request_options_callback)
```JavaScript
var http = require('http');
var v8 = require('v8');

var puerto = 9000;

var servidor = http.createServer(function(req, res)    {
    res.writeHead(200, {"Content-Type": "text/plain"});
    res.write("Servidor creado con NodeJS " + process.version + "\n");
    res.write("Estado de la memoria\n");
    res.write(JSON.stringify(v8.getHeapStatistics(), null, "\t"));
    res.end();
});

servidor.listen(puerto);
console.log(`Servidor arrancado en el puerto ${puerto}`);
```
---
## Servicio web con el módulo ["http"](https://nodejs.org/dist/latest-v4.x/docs/api/https.html#https_https_request_options_callback) *(2)*
```JavaScript
var http = require("http");
var fs = require("fs");
var path = require("path");

var port = 9000;

http.createServer(function(req, res) {

  console.log(`${req.method} request for ${req.url}`);

  if (req.url === "/") {
    fs.readFile("./public/index.html", "UTF-8", function(err, html) {
      res.writeHead(200, {"Content-Type": "text/html"});
      res.end(html);
    });

  } else if (req.url.match(/.css$/)) {

    var cssPath = path.join(__dirname, 'public', req.url);
    var fileStream = fs.createReadStream(cssPath, "UTF-8");

    res.writeHead(200, {"Content-Type": "text/css"});

    fileStream.pipe(res);
```
---
## Servicio web con el módulo ["http"](https://nodejs.org/dist/latest-v4.x/docs/api/https.html#https_https_request_options_callback) *(2)*
```JavaScript
  } else if (req.url.match(/.jpg$/)) {

    var imgPath = path.join(__dirname, 'public', req.url);
    var imgStream = fs.createReadStream(imgPath);

    res.writeHead(200, {"Content-Type": "image/jpeg"});

    imgStream.pipe(res);

  } else {
    res.writeHead(404, {"Content-Type": "text/plain"});
    res.end("404 File Not Found");
  }

}).listen(port);

console.log(`File server running on port ${port}`);
```
- Hay mejores maneras de hacer ésto &rarr; módulo **["express"](https://www.npmjs.com/package/express)**
---

## Servicio web con Express

```bash
npm init
npm install express -save
```
--
index.js
```JavaScript
var express = require("express");

var app = express();
var puerto = 3000;

app.use(function(req, res, next) {
    console.log(`${req.method} request for '${req.url}'`);
    next();
});

app.use(express.static("./public"));
app.get('/', function(req, res) {
    res.send(`Servidor Express operativo en el puerto ${puerto}`);
});
app.listen(puerto);
```
--
```bash
node index
```

---
## Servicio web con Express *(ejemplo 2)*

``` JavaScript
var express = require("express");
var bodyParser = require("body-parser");

...

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

...

app.use(express.static("./public"));

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

...
```
---
.left-column[
  ## WebSockets
]
.right-column[
- Permite la comunicación entre los clientes (navegadores web u otros) y el servidor
- Las conexiones **se mantienen**
- Programamos el lado servidor (servidor de sockets) y la comunicación desde la aplicación
- A un mismo servidor se conectan múltiples clientes
- Tiene que haber soporte desde el navegador (ver [aquí](http://caniuse.com/#search=websockets))
- Hay múltiples librerías, usaremos **Socket.IO**, wrapper que facilita su uso
]

---
## Aplicaciones Cliente/Servidor con WebSockets

###  Servidor

```JavaScript
...
var express = require('express');
var app = express(); 
var server = require('http').Server(app);  
var io = require('socket.io')(server); 

...

io.on('connection', function(socket) {
    console.log('Alguien se ha conectado con Sockets');
    socket.emit('messages', messages); 
    socket.on('new-message', function(data) {
        messages.push(data);
        // Reenviamos el mensaje a todos los clientes
        io.sockets.emit('messages', messages);
    });
});
``` 

.footnote[Ejercicio completo [aquí](./ejercicios/09_websockets/), obtenido de [este tutorial de Carlos Azaustre](https://carlosazaustre.es/blog/websockets-como-utilizar-socket-io-en-tu-aplicacion-web/)]
---
## Aplicaciones Cliente/Servidor con WebSockets *(2)*

### Cliente

```JavaScript
// Nos conectamos al servidor
var socket = io.connect('http://elladogeekde.ciges.net:8080', { 'forceNew': true });
socket.on('messages', function(data)    {
    console.log(data);
    render(data);
});

// Modificación del HTML de la web
function render(data) { ... };

function addMesage(e) {
    var payload = {
        author: document.getElementById('username').value,
        text: document.getElementById('texto').value,
    }
    socket.emit('new-message', payload);
    return false;
}

```

.footnote[Ejercicio completo [aquí](./ejercicios/09_websockets/), obtenido de [este tutorial de Carlos Azaustre](https://carlosazaustre.es/blog/websockets-como-utilizar-socket-io-en-tu-aplicacion-web/)]
---
.left-column[
  ## JADE
]
.right-column[
  Lenguaje de plantillas HTML desarrollado por el creador de Express
  - Variables, estructuras de control ...

```jade
h1.titulo Ejemplo con Jade

h2.creditos Desarrollado por #{author}

p Jade es un lenguaje de plantillas que se usa comunmente con:

ul
    li a(href="http://nodejs.org/en/") Node.js
    li a(href="http://expressjs.com/es/") Express
```

Con ["express-generator"](https://www.npmjs.com/package/express-generator) podemos crear una estructura MVC inicial
- Plantillas JADE en *"views"*
- Controlador y lógica en *"routes"*

]

.footnote[Enlace interesante: [*"Jade Syntax Documentation by example"*](https://naltatis.github.io/jade-syntax-doc)]
---
## Ejemplo con Express + Jade

```JavaScript
var express = require('express'),
    http = require('http'),
    jade = require('jade') ;
 
var app = express() ;
var port = 3000;
 
app.set( 'views', './views' ) ;
app.set( 'view engine', 'jade' ) ;
app.engine( 'jade', jade.__express ) ;
 
app.locals = {
    author: 'Ciges',
} ;
 
app.get( '/', function( req, res ) {
    res.render( 'index' ) ;
}) ;
 
var server = app.listen( port, function() {
    console.log( 'App disponible en el puerto', port) ;
});
```

---

.left-column[
  ## Acceso a MongoDB
]
.right-column[
  - MongoDB es una base de datos NoSQL que permite almacenar registros sin una estructura definida, con un alto rendimiento y escalabilidad
  - MongoDB proporciona un [driver para Node.js](https://docs.mongodb.org/getting-started/node/)
  - Disponemos además de paquetes como:
    - **[Monk](https://www.npmjs.com/package/monk)**, una capa que simplifica y mejora la sintaxis de acceso
    - [Mongoose](http://mongoosejs.com/), un ORM complejo
]

---
## Acceso a MongoDB *(2)*

```JavaScript
...
var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/express_mongodb_db');
...
/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});
...
```
- Un ejemplo completo usando una arquitectura MVC y JADE está disponible

.footnote[El ejercicio está basado en [este tutorial de Christopher Buecheler](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/)]
---

layout: true
class: center, middle
---
# Herramientas para la gestión de proyectos
---
layout:false
.left-column[
  ## Despliegue de proyectos con [Grunt](http://gruntjs.com)
]
.right-column[
[Grunt](http://gruntjs.com) nos permite automatizar los distintos pasos de despliegue de un proyecto
  - Preprocesado de CSS
  - Compresión de JavaScript
  - Optimización de imágenes
  - *"Watches"*: Ejecución de procesos en cuanto se cambia el código
  
Se usa en la *fase de desarrollo* y se definen las tareas en el archivo *"gruntfile.js"*
]

---

## Despliegue de proyectos con [Grunt](http://gruntjs.com) *(2)*

Instalación de Grunt:
```bash
npm install -g grunt-cli
npm install grunt --save-dev
npm install grunt-contrib-jshint --save-dev
npm install grunt-contrib-less --save-dev
npm install grunt-contrib-watch --save-dev
```

Ejecución en un proyecto:
```bash
npm install
grunt
```

.footnote[Otras herramientas interesantes: [browserify](http://browserify.org/) y [bower](http://bower.io/)]

---

## Ejemplo: Desplegando Ghost en un servidor

Instalación y ejecución (doc completa [aquí](https://www.howtoinstallghost.com/vps-manual/))

```bash
cd /var/www
curl -L -O https://ghost.org/zip/ghost-latest.zip
unzip -d ghost ghost-latest.zip
cd ghost
npm install --production
npm install forever -g
NODE_ENV=production forever start index.js
```

Para desarrollo
```bash
cd /var/www/
git clone https://www.github.com/TryGhost/Ghost.git ghost
cd ghost/
git submodule update --init
npm install -g grunt-cli
npm install
grunt init
```

.footnote[Una vez arrancado y configurado queda disponible en el **puerto 2368**]

---

## Depuración de código

Usamos el módulo [node-inspector]()

```bash
npm install -g node-inspector
node-debug app.js
```

Y se abre en el navegador un entorno que nos permitirá depurar:
![captura](./images/node-inspector_screenshot.png)

---

## Control de la calidad del código

- [mocha](https://www.npmjs.com/package/mocha) y [chai](https://www.npmjs.com/package/chai) para tests unitarios
     - Creación de "mocks": nock, rewire, sinon
- [istanbul](https://www.npmjs.com/package/istanbul) para cobertura de código
:- [supertest](https://www.npmjs.com/package/supertest) test para aplicaciones HTTP (como las hechas con Express)

---

## Alojamiento

Para alojar nuestas aplicaciones Node.js necesitaremos:

- Un servidor virtual o hosting compartido con acceso de shell
  - [DigitalOcean](https://www.digitalocean.com/pricing/)
  - [Vultr](https://www.vultr.com/pricing/)
  - [Amazon](https://aws.amazon.com/es/ec2/pricing/)
  - [Google Cloud](https://cloud.google.com/products/calculator/)

- Y entre los hostings gratuítos podemos nombrar:
  - [RedHat OpenShift](https://www.openshift.com/pricing/index.html): hasta 3 aplicaciones gratuítas
  - [Microsoft Azure](https://azure.microsoft.com/en-us/free/): 1 mes gratuíto y un crédito inicial de 200 $
  - [Modulus](https://modulus.io/pricing): 1 mes gratuíto y un crédito inicial de 15 $
  - [Heroku](https://www.heroku.com/pricing): Gratis para uso puntual

---

## Agradecimientos, aplausos y preguntas

Esta resumen de la tecnología Node.js ha sido posible gracias, entre otros, fundamentalmente a:
- **[Alberto Basalo](http://www.albertobasalo.com/)**, profesor del curso *"Desarrollo Profesional de aplicaciones escalables con Node.js"*, impartido por [Vitae Consultores](http://www.vitaedigital.com/)
- [Alex Banks](http://www.lynda.com/Alex-Banks/4865699-1.html), profesor del curso [*"Node.js Essential Training"* en Lynda.com](http://www.lynda.com/Node-js-tutorials/Node-js-Essential-Training/417077-2.html)
- [Christopher Buecheler](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/) y [Carlos Azaustre](https://carlosazaustre.es), en cuyos blogs se encuentran artículos excelentes

![icono](./images/icon-question.png)

.footnote[Esta presentación ha sido hecha con tiempo, cariño, [Sublime Text](https://www.sublimetext.com) y [Remark](http://remarkjs.com/) :-)]
