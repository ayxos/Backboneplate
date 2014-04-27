require( './routes/model_db' ); //for DB mongoose.

var express        = require('express')
  , methodOverride = require('method-override')
  , logger         = require('morgan')
  , favicon        = require('static-favicon')
  , Jade           = require('jade')
  , bodyParser     = require('body-parser')
  , app            = express();

var routes = require('./routes'); // Para las funciones con la DB
var http = require('http');
var path = require('path');


app.set('port', process.env.PORT || 8001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser());
app.use(methodOverride());

// app.use(app.router);
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