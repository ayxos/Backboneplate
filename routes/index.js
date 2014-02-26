var fs    = require('fs'),
  uuid = require('node-uuid'), //para generar identificadores unicos
  baseDeDatos = fs.readFileSync('./routes/datos.json').toString(),
  datos = JSON.parse(baseDeDatos);


exports.Main = function (req, res){
  res.render( 'index', {
      title : 'RestAPI System with Mongoose and Node/Express',
      footer : '@2014 by M.A.P.S Powered by Node.js, Express, MongoDB '
  });
};

exports.ShowAll = function (req, res){
  res.send(datos);
};

exports.getById = function (req, res){
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
};

exports.createNew = function (req, res){
  req.body.id = uuid.v1(4);
  datos.push(req.body);
  console.log(req);
  res.send(200, {id: req.body.id});
};

exports.update = function (req, res){
  var libro;

  for (var i = datos.length - 1; i >= 0; i--) {
    libro = datos[i];

    if(libro.id === req.params.id){
      datos[i] = req.body;
    }
  }

  res.send(200);
};

exports.del = function (req, res){
   var elementoEliminar;

  for ( var i=0; i<datos.length; i++ ) {
    var libro = datos[i];

    if (libro.id === req.params.id) {
      elementoEliminar = i;
    }
  }

  datos.splice(elementoEliminar, 1);

  res.send(200);
};
