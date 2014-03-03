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
