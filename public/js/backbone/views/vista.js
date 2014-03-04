var Vista = Backbone.View.extend({

  // Function que admita el paso de variables (es un JS). aqui usar los  tpl que genera grunt
  // template: 'this.anonymous()',
  // template: 'js/backbone/templates/tpl/people',
  // template: _.template("<strong> Esta vista se pinta!! <br> nombre: <%= Name %> <br> apellido: <%= Surname %> <br> Edad: <%= Age %> </strong>"),

  events: {
    'click #doit': 'detect',
    "click": "detectClick",
    "click .new" : "newWine"
  },

  initialize: function() {
    this.template = _.template(tpl.get('people'));
    console.log('template: ' + this.template);
    console.log('model: ' + this.model);
    this.model.listenTo(this.model, 'change', this.render);
  },

  newWine: function(event) {
    app.navigate("api/entries", true);
    return false;
  }

  detectClick: function(){
    alert('click');
  },

  detect: function(){
    alert('hpkjhlkjhlkjhlkhjkl');
  },

  render: function() {
    console.log("llego hasta aqui");
    this.el.innerHTML = this.template(this.model.toJSON());
    return this;
  }
});