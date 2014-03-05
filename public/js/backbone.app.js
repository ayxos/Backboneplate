var PeopleModel = Backbone.Model.extend({
  idAttribute: '_id',

  initialize: function(){
    console.log("Music is the answer");
  },
  defaults: {
    Name: 'Untitled',
    Surname: 'Unknown',
    Age: '0'
  },

  displayString: function() {
    return this.get('Name');
  }
});

var PeopleCollection;
PeopleCollection = Backbone.Collection.extend({
  model: PeopleModel,
  url: "api/entries",

  initialize: function() {
    return this.filter(function(pers) {
      console.log(pers.get('edad') < 18);
      return pers.get('edad') < 18;
    });
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

var tpl = {

  // Hash of preloaded templates for the app
  templates: {},

  // Recursively pre-load all the templates for the app.
  // This implementation should be changed in a production environment. All the template files should be
  // concatenated in a single file.
  loadTemplates: function(names, callback) {
    var that = this;
    var loadTemplate = function(index) {
      var name = names[index];
      console.log('Loading template: ' + name);
      var path = 'tpl/';
      var path_abs = 'js/backbone/templates/tpl/';
      $.get(path_abs + name + '.html', function(data) {
        that.templates[name] = data;
        index++;
        if (index < names.length) {
          loadTemplate(index);
        } else {
          callback();
        }
      });
    }
    loadTemplate(0);
  },

  // Get template by name from hash of preloaded templates
  get: function(name) {
    return this.templates[name];
  }

};
var peopleListView = Backbone.View.extend({

  tagName:'ul',

  initialize:function () {
    this.model.bind("reset", this.render, this);
    var self = this;
    this.model.bind("add", function (people) {
      $(self.el).append(new peopleListItemView({model:people}).render().el);
    });
  },

  render:function (eventName) {
    _.each(this.model.models, function (people) {
      $(this.el).append(new peopleListItemView({model:people}).render().el);
    }, this);
    return this;
  }
});

var peopleListItemView = Backbone.View.extend({

  tagName:"li",

  events: {
    'click #dele': 'deleteWine'
  },

  initialize:function () {
    // this.template = _.template(tpl.get('people-list-item'));
    this.template = _.template("<li> nombre: <%= name %> <br> age: <%= age %> <br> id: <%= _id %> <input id='dele' type='submit' value='Erase'> </li>");
    this.model.bind("change", this.render, this);
    // this.model.bind("destroy", this.close, this);
  },

  ale:function(){
    alert('click del');
  },

  deleteWine: function() {
    this.model.destroy({
      success: function() {
        console.log('Wine deleted successfully');
      }
    });
    return false;
  },

  render:function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }

});
var PeopleView = Backbone.View.extend({

  // Function que admita el paso de variables (es un JS). aqui usar los  tpl que genera grunt
  // template: 'this.anonymous()',
  // template: 'js/backbone/templates/tpl/people',
  // template: _.template("<strong> Esta vista se pinta!! <br> nombre: <%= Name %> <br> apellido: <%= Surname %> <br> Edad: <%= Age %> </strong>"),

  events: {
    'click #doit': 'saveModel',
    "click .new" : "newWine"
  },

  initialize: function() {
    this.template = _.template(tpl.get('people'));
    console.log('template: ' + this.template);
    console.log('model: ' + this.model);
    // this.model.listenTo(this.model, 'change', this.render);
  },

  newWine: function(event) {
    app.navigate("api/entries", true);
    return false;
  },

  detect: function(){
    alert('hpkjhlkjhlkjhlkhjkl');
  },

  saveModel: function() {
    console.log('obtengo name : ' + $('#name').val() );
    this.model.set({
      name: $('#name').val(),
      grapes: $('#surname').val(),
      country: $('#age').val()
    });
    if (this.model.isNew()) {
      var self = this;
      app.peopleList.create(this.model, {
        success: function() {
          alert('now its saved');
          // app.navigate('wines/'+self.model.id, false);
        }
      });
    } else {
      this.model.save();
    }

    return false;
  },


  render: function() {
    console.log("PeopleView render");
    $(this.el).html(this.template());
    // this.el.innerHTML = this.template(this.model.toJSON());
    return this;
  }
});
Backbone.View.prototype.close = function () {
  console.log('Closing view ' + this);
  if (this.beforeClose) {
    this.beforeClose();
  }
  this.remove();
  this.unbind();
};

var AppRouter = Backbone.Router.extend({

  initialize: function() {
    $('#backbone').html( new PeopleView().render().el );
  },

  routes: {
    ""      : "list"
  },

  list: function() {
    console.log('router.js: loading backbone data');
    this.before();
  },

  before: function(callback) {
    if (this.peopleList) {
      if (callback) callback();
    } else {
      var peopleList = new PeopleCollection();
      peopleList.fetch({success: function() {
        $('#sidebar').html( new peopleListView({model: peopleList}).render().el );
        if (callback) callback();
      }});
    }
  }

});

tpl.loadTemplates(['people'], function() {
  console.log('iniciando app');
  var app = new AppRouter();
  Backbone.history.start();
});