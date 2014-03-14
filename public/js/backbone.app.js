var PeopleModel = Backbone.Model.extend({
  idAttribute: '_id',

  initialize: function(){
    console.log("Model has been initzialized");
  },
  defaults: {
    name: 'Untitled',
    surname: 'Unknown',
    age: '0'
  },

  displayString: function() {
    return this.get('Name');
  }
});

var PeopleCollection = Backbone.Collection.extend({
  idAttribute: '_id',
  model: PeopleModel,
  url: "api/entries",

  // initialize: function() {
  //   return this.filter(function(pers) {
  //     console.log(pers.get('edad') < 18);
  //     return pers.get('edad') < 18;
  //   });
  // }

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
    };
    loadTemplate(0);
  },

  // Get template by name from hash of preloaded templates
  get: function(name) {
    return this.templates[name];
  }

};
var PeopleListItemView = Backbone.View.extend({

  // tagName:"li",

  events: {
    'click #dele': 'delete'
  },

  initialize:function () {
    console.log('creating a new list item view ' + this.model);
    // this.template = _.template(tpl.get('people-list-item'));
    this.template = _.template("<br><ul><li> name: <%= name %> <br></li> <li>surname: <%= surname %> <br></li> <li>age: <%= age %> <br> </li><li><input id='dele' type='submit' value='Erase'> </li></ul>");
    this.model.bind("change", this.render, this);
    this.model.bind("destroy", this.close, this);
  },

  delete: function() {
    this.model.destroy({
      success: function() {
        console.log('People deleted successfully');
      }
    });
    return false;
  },

  render:function (eventName) {
    console.log('rendering....');
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }

});

var PeopleListView = Backbone.View.extend({

  tagName:'ul',

  initialize:function () {
    this.collection.bind("reset", this.render, this);
    this.collection.bind('add', this.add, this);
  },

  render:function (eventName) {
    _.each(this.collection.models, function (people) {
      $(this.el).append(new PeopleListItemView({model:people}).render().el);
    }, this);
    return this;
  }
});
var PeopleView = Backbone.View.extend({

  // Function que admita el paso de variables (es un JS). aqui usar los  tpl que genera grunt
  // template: 'this.anonymous()',
  // template: 'js/backbone/templates/tpl/people',
  // template: _.template("<strong> Esta vista se pinta!! <br> nombre: <%= Name %> <br> apellido: <%= Surname %> <br> Edad: <%= Age %> </strong>"),

  events: {
    'click #doit': 'createNew'
  },

  initialize: function() {
    this.template = _.template(tpl.get('people'));
    console.log('template: ' + this.template);
    console.log('collection: ' + this.collection);
    console.log('model: ' + this.model);
    // this.model.listenTo(this.model, 'change', this.render);
  },

  createNew: function(event) {
    console.log('createing a new doit : ' + this.collection + ' var ' + this.$el.find('#name').val() + this.$el.find('#surname').val() + this.$el.find('#age').val());
    this.model = new PeopleModel({
      name: this.$el.find('#name').val(),
      surname: this.$el.find('#surname').val(),
      age: this.$el.find('#age').val()
    });
    this.collection.create(this.model);

    this.$el.find('#name').val('');
    this.$el.find('#surname').val('');
    this.$el.find('#age').val('');

    $('#sidebar').append(new PeopleListItemView({ model: this.model }).render().el);

    return this;
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
    this.peopleCol = new PeopleCollection();
    this.peopleView = new PeopleView({ collection: this.peopleCol });
    $('#backbone').html( this.peopleView.render().el );
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
      if (callback) {callback();}
    } else {
      console.log('peopleCol: ' + this.peopleCol);
      this.peopleCol.fetch({success: function() {
        console.log('before: ' + this.app.peopleCol);
        this.peopleColView = new PeopleListView({collection: this.app.peopleCol});
        $('#sidebar').html( this.peopleColView.render().el );
        if (callback) {callback();}
      }});
    }
  }

});

tpl.loadTemplates(['people'], function() {
  console.log('iniciando app');
  this.app = new AppRouter({});
  Backbone.history.start();
});