require( './routes/model_db' ); //for DB mongoose.

var express = require('express');
var routes = require('./routes'); // Para las funciones con la DB
var http = require('http');
var path = require('path');


var app = express();

app.set('port', process.env.PORT || 8001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());

app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// Pagina de Inicio: http:localhost:PORT
app.get('/', routes.getAll);

// API
app.post('/api/entries', routes.postnew);
app.get('/api/entries', routes.getTodo);
app.get('/api/entries/:id', routes.getById);
app.put('/api/entries/:id', routes.putById);
app.delete('/api/entries/:id', routes.deleteById);

// // API BackBone
// app.get('/api', routes.getApi);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});