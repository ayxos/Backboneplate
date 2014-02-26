var express = require('express'),
  path  = require('path'),
  fs    = require('fs'),
  http = require('http'),
  uuid    = require('node-uuid');

var app = express(),
  baseDeDatos = fs.readFileSync('./routes/datos.json').toString();

var datos = JSON.parse(baseDeDatos);

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


// Pagina de Inicio: http:localhost:4000
app.get('/', function (req,res){
  res.render( 'index', {
    title : 'Backbone boilerplate System with Node/Express',
    footer : '@2014 by M.A.P.S Powered by Node.js, Express, Backbone '
  });
});

// API REST

// Mostrar todos los libros
app.get('/libros', function(req,res) {
  res.send(datos);
});

// Mostrar el detalle de un libro
app.get('/libros/:id', function(req,res,next) {
  var dato;

  for ( var i=0; i<datos.length; i++ ) {
    var libro = datos[i];

    if (libro.id === req.params.id) {
      dato = libro;
    }
  }

  if (dato) {
    res.send(dato);
  } else {
    res.statusCode = 500;
    return res.send('No se encuentra el id.');
  }

});

// POST: crear un nuevo libro.
app.post('/libros', function (req, res){
  req.body.id = uuid.v1(4);

  datos.push(req.body);

  res.send(200, {id: req.body.id});
});

// PUT: Actualizar un libro.
app.put('/libros/:id', function (req, res){
  var libro;

  for (var i = datos.length - 1; i >= 0; i--) {
    libro = datos[i];

    if(libro.id === req.params.id){
      datos[i] = req.body;
    }
  }

  res.send(200);
});

// DELETE: Eliminar un libro.
app.delete('/libros/:id', function (req,res) {

  var elementoEliminar;

  for ( var i=0; i<datos.length; i++ ) {
    var libro = datos[i];

    if (libro.id === req.params.id) {
      elementoEliminar = i;
    }
  }

  datos.splice(elementoEliminar, 1);

  res.send(200);

});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});