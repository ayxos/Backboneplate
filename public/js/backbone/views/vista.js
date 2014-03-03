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