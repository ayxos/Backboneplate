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