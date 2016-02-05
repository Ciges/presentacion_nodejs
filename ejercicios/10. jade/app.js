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