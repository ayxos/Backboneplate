var mongoose = require( 'mongoose' );
//To use the model I created a variable regModel
var regModel = mongoose.model( 'Model_name');


exports.getAll = function (req, res){
  regModel.find(function (err, entries) {
    if (!err) {
      res.render( 'index', {
          title : 'RestAPI Backbone with Mongoose and Node/Express'
      });
    } else {
      console.log(err);
    }
  });
};

exports.getApi = function (req, res){
  regModel.find(function (err, entries) {
    if (!err) {
      res.render('api');
    } else {
      console.log(err);
    }
  });
};

exports.getTodo = function (req, res){
  regModel.find(function (err, entries) {
    if (!err) {
      res.send(entries);
    } else {
      console.log(err);
    }
  });
};

exports.postnew = function (req, res){
  var entry;
  console.log("POST: " + req.params + req.body + req.query);
  entry = new regModel();
  for (key in req.body){
    entry[key] = req.body[key];
  }
  entry.save(function (err) {
    if (!err) {
      console.log("created");
      res.send(201,entry);
    } else {
      console.log(err);
      res.send(500, "created error");
    }
  });
};

exports.getById = function (req, res){
  regModel.findById(req.params.id, function (err, entry) {
    if (!err) {
      res.send(entry);
    } else {
      console.log(err);
    }
  });
};


exports.putById = function (req, res){
  console.log(req.body);
  regModel.findById(req.params.id, function (err, entry) {
    for (key in req.body){
      entry[key] = req.body[key];
    }
    entry.save(function (err) {
      if (!err) {
        console.log("updated");
        //Es imprescindible devolver datos, en este caso las llaves
        res.send(201, entry);
      } else {
        console.log(err);
        res.send(500, "updated error");
      }
      // res.send(entry);
    });
  });
};

exports.deleteById = function (req, res){
  // console.log(req);
  console.log('DELETED: ' + req.params.id);
  //hay que fijarse en si es QUERY o UN Param
  regModel.findById(req.params.id, function (err, entry) {
    entry.remove(function (err) {
      if (!err) {
        console.log("removed");
        res.send(201, "Removed: ");
      } else {
        console.log(err);
        res.send(500, "removed error");
      }
    });
  });
};