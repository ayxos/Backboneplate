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