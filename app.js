var express = require('express'),
  path  = require('path'),
  http = require('http'),
  routes = require('./routes'); // Para las funciones con la DB

var app = express();

app.set('port', process.env.PORT || 8001);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
// Add POST, PUT, DELETE methods to the app
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.methodOverride());

app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));


// Pagina de Inicio: http:localhost:PORT
app.get('/', routes.Main );

// API REST

// Mostrar todos los libros
app.get('/libros', routes.ShowAll );

// Mostrar el detalle de un libro
app.get('/libros/:id', routes.getById );

// POST: crear un nuevo libro.
app.post('/libros', routes.createNew );

// PUT: Actualizar un libro.
app.put('/libros/:id', routes.update );

// DELETE: Eliminar un libro.
app.delete('/libros/:id', routes.del );

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});