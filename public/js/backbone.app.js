var PeopleCollection;

var PeopleModel = Backbone.Model.extend({
  Collection: PeopleCollection,
  initialize: function(){
      console.log("Music is the answer");
    },
  defaults: {
    Name: 'Untitled',
    Surname: 'Unknown',
    Age: '0'
  },
  url: "/api/entries/",
  displayString: function() {
    return this.get('Name');
  }
});
var Libro = Backbone.Model.extend();

var Book = Backbone.Model.extend({
  urlRoot:'/libros',
  //muestra un titulo al instanciar
  initialize: function(){
    console.log('A new instance has been created');

    //nueva instancia que anuncia cuando se mofdifica el modelo
    this.on('change', function(){
      console.log('the model has change');
    });

  },
  //por defecto añade atributos
  defaults: {
    autor: 'Deee'
  }
});

var Rectangulo = Backbone.Model.extend({

  initialize: function(){
    console.log('A new instance has been created');

    //nueva instancia que anuncia cuando se mofdifica el modelo
    this.on('change', function(){
      console.log('the model has change');
    });
  },

  defaults: {
    alto: 4,
    ancho: 3,
  },
  area: function() {
    return this.get('alto') * this.get('ancho');
  },
  toTemplateJSON: function() {
    var json = this.toJSON();
    json.area = this.area();
    return json;
  }
});

jade = (function(exports){
  
/*!
 * Jade - runtime
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Lame Array.isArray() polyfill for now.
 */

if (!Array.isArray) {
  Array.isArray = function(arr){
    return '[object Array]' == Object.prototype.toString.call(arr);
  };
}

/**
 * Lame Object.keys() polyfill for now.
 */

if (!Object.keys) {
  Object.keys = function(obj){
    var arr = [];
    for (var key in obj) {
      if (obj.hasOwnProperty(key)) {
        arr.push(key);
      }
    }
    return arr;
  }
}

/**
 * Merge two attribute objects giving precedence
 * to values in object `b`. Classes are special-cased
 * allowing for arrays and merging/joining appropriately
 * resulting in a string.
 *
 * @param {Object} a
 * @param {Object} b
 * @return {Object} a
 * @api private
 */

exports.merge = function merge(a, b) {
  var ac = a['class'];
  var bc = b['class'];

  if (ac || bc) {
    ac = ac || [];
    bc = bc || [];
    if (!Array.isArray(ac)) ac = [ac];
    if (!Array.isArray(bc)) bc = [bc];
    ac = ac.filter(nulls);
    bc = bc.filter(nulls);
    a['class'] = ac.concat(bc).join(' ');
  }

  for (var key in b) {
    if (key != 'class') {
      a[key] = b[key];
    }
  }

  return a;
};

/**
 * Filter null `val`s.
 *
 * @param {Mixed} val
 * @return {Mixed}
 * @api private
 */

function nulls(val) {
  return val != null;
}

/**
 * Render the given attributes object.
 *
 * @param {Object} obj
 * @param {Object} escaped
 * @return {String}
 * @api private
 */

exports.attrs = function attrs(obj, escaped){
  var buf = []
    , terse = obj.terse;

  delete obj.terse;
  var keys = Object.keys(obj)
    , len = keys.length;

  if (len) {
    buf.push('');
    for (var i = 0; i < len; ++i) {
      var key = keys[i]
        , val = obj[key];

      if ('boolean' == typeof val || null == val) {
        if (val) {
          terse
            ? buf.push(key)
            : buf.push(key + '="' + key + '"');
        }
      } else if (0 == key.indexOf('data') && 'string' != typeof val) {
        buf.push(key + "='" + JSON.stringify(val) + "'");
      } else if ('class' == key && Array.isArray(val)) {
        buf.push(key + '="' + exports.escape(val.join(' ')) + '"');
      } else if (escaped && escaped[key]) {
        buf.push(key + '="' + exports.escape(val) + '"');
      } else {
        buf.push(key + '="' + val + '"');
      }
    }
  }

  return buf.join(' ');
};

/**
 * Escape the given string of `html`.
 *
 * @param {String} html
 * @return {String}
 * @api private
 */

exports.escape = function escape(html){
  return String(html)
    .replace(/&(?!(\w+|\#\d+);)/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
};

/**
 * Re-throw the given `err` in context to the
 * the jade in `filename` at the given `lineno`.
 *
 * @param {Error} err
 * @param {String} filename
 * @param {String} lineno
 * @api private
 */

exports.rethrow = function rethrow(err, filename, lineno){
  if (!filename) throw err;

  var context = 3
    , str = require('fs').readFileSync(filename, 'utf8')
    , lines = str.split('\n')
    , start = Math.max(lineno - context, 0)
    , end = Math.min(lines.length, lineno + context);

  // Error context
  var context = lines.slice(start, end).map(function(line, i){
    var curr = i + start + 1;
    return (curr == lineno ? '  > ' : '    ')
      + curr
      + '| '
      + line;
  }).join('\n');

  // Alter exception message
  err.path = filename;
  err.message = (filename || 'Jade') + ':' + lineno
    + '\n' + context + '\n\n' + err.message;
  throw err;
};

  return exports;
})({});
function anonymous(locals, attrs, escape, rethrow, merge) {
attrs = attrs || jade.attrs; escape = escape || jade.escape; rethrow = rethrow || jade.rethrow; merge = merge || jade.merge;
var buf = [];
with (locals || {}) {
var interp;
buf.push('<h1>grunt jade</h1>');
}
return buf.join("");
}
var Vista = Backbone.View.extend({

  // Function que admita el paso de variables (es un JS). aqui usar los  tpl que genera grunt
  template: this.anonymous(),

  // template: _.template("<strong> Esta vista se pinta!! <br> nombre: <%= Name %> <br> apellido: <%= Surname %> <br> Edad: <%= Age %> </strong>"),

  events: {
    "click": "detectClick"
  },

  initialize: function() {
    console.log('template: ' + this.template);
    console.log('model: ' + this.model);
    this.model.listenTo(this.model, 'change', this.render);
  },

  detectClick: function(){
    alert('click');
  },

  render: function() {
    console.log("llego hasta aqui");
    this.el.innerHTML = this.template(this.model.toJSON());
    return this;
  }
});