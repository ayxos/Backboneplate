var PeopleModel = Backbone.Model.extend({
  idAttribute: '_id',

  initialize: function(){
    console.log("Model has been initzialized");
  }

});

var PeopleCollection = Backbone.Collection.extend({
  idAttribute: '_id',
  model: PeopleModel,
  url: "api/entries",

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
var InitView = Backbone.View.extend({

  events: {
    'click #api': 'goToApi'
  },

  initialize:function (arg) {
    // this.template = _.template("<p> Welcome to initView </p> <input id='api' type='submit' value='API'>");
    this.template = _.template(tpl.get('home'));
    this.router = arg;
  },

  goToApi: function() {
    this.router.navigate("/api", true);
  },

  render:function (eventName) {
    console.log('init rendering....');
    $(this.el).html(this.template());
    return this;
  }

});
var ModalView = Backbone.View.extend({

  initialize: function() {
    this.template = _.template(tpl.get('modal_layout'));
    console.log('new modal');
  },

  events: {
    'click [data-action="close-modal"]': 'close',
    'click #overlay': 'close'
  },

  close: function(e) {
    this.overlay.removeClass('md-overlay md-show');
    this.closeModal.removeClass('md-show');
    this.modal.removeClass('md-show');
    this.modal.removeAttr('style');
    this.$body.removeAttr('style');
    this.contentRegion.close();
  },

  show: function(view) {
    this.view = view;
    this.render();
  },

  onRender: function() {
    this.$body = $('body');
    this.overlay = this.$el.find('#overlay');
    this.closeModal = this.$el.find('[data-action="close-modal"]');
    this.modal = this.$el.find('.md-modal');

    this.contentRegion.show(this.view);

    this.$body.css({
      overflow: 'hidden'
    });

    this.overlay.addClass('md-overlay md-show');
    this.closeModal.addClass('md-show');
    this.modal.addClass('md-show');
  }

  // render: function(){
  //   $(this.el).html(this.template());
  //   return this;
  // }

});
var PeopleListItemView = Backbone.View.extend({

  tagName:"tr",

  events: {
    'click #dele': 'delete'
  },

  initialize:function () {
    console.log('creating a new list item view ' + this.model);
    // this.template = _.template(tpl.get('people-list-item'));
    this.template = _.template("<td> <%= name %> </td> <td> <%= surname %> </td> <td> <%= age %> </td> <td> <%= _id %> <td> <input id='dele' type='submit' value='X'> </td>");
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

  tagName:'tbody',

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
    'click #home': 'home',
    'click #doit': 'createNew',
    'click [data-action="openModal"]':'openModal'
  },

  initialize: function(options) {
    this.template = _.template(tpl.get('people'));
    console.log('collection: ' + this.collection + 'router ' + options.router);
    this.router = options.router;
  },

  home: function(){
    Backbone.history.navigate('/', true);
  },

  createNew: function(event) {
    console.log('createing a new doit : ' + this.collection + ' var ' + this.$el.find('#name').val() + this.$el.find('#surname').val() + this.$el.find('#age').val());
    this.model = new PeopleModel({
      name: this.$el.find('#name').val(),
      surname: this.$el.find('#surname').val(),
      age: this.$el.find('#age').val()
    });
    var id;
    this.collection.create(this.model, {
      success: function(response) {
        id = response.get('_id');
      }
    });

    this.model.set({
      '_id': id
    });

    this.$el.find('#name').val('');
    this.$el.find('#surname').val('');
    this.$el.find('#age').val('');

    $('#bbdd').append(new PeopleListItemView({ model: this.model }).render().el);

    return this;
  },

  openModal: function(){
    // $('#modal').html(new ModalView(this).render().el);
    var modal = new ModalView();
    var self = this;
    var ex = new exModalView({ model: this.model });
    modal.show(ex);

  },

  render: function() {
    // console.log("PeopleView render");
    $(this.el).html(this.template());
    // this.el.innerHTML = this.template(this.model.toJSON());
    return this;
  }
});
var exModalView = Backbone.View.extend({

  initialize: function(){
    this.template = _.template(tpl.get('modal_example'));
  },

  onRender: function() {
    this.mdModal = $('.md-modal');
    this.mdModal.css({
      width: 'auto'
    });
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

  routes: {
    '' : 'home',
    'api' : 'getAll'
  },

  home: function(){
    console.log('router.js: loading backbone data' );
    this.initView = new InitView(this);
    $('#backbone').html( this.initView.render().el );
  },

  getAll: function(callback) {
    this.peopleCol = new PeopleCollection();
    console.log('this: ' + this);
    this.peopleView = new PeopleView({ collection: this.peopleCol, router: this });
    $('#backbone').html( this.peopleView.render().el );
    if (this.peopleList) {
      if (callback) {callback();}
    } else {
      console.log('peopleCol: ' + this.peopleCol);
      this.peopleCol.fetch({success: function() {
        console.log('before: ' + this.app.peopleCol);
        this.peopleColView = new PeopleListView({collection: this.app.peopleCol});
        $('#bbdd').html( this.peopleColView.render().el );
        if (callback) {callback();}
      }});
    }
  },

  api: function() {
    console.log('loading api');
  }

});

tpl.loadTemplates(['people', 'home', 'modal_layout', 'modal_example'], function() {
  console.log('iniciando app');
  this.app = new AppRouter({});
  Backbone.history.start();
});