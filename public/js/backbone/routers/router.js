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
    alert('list');
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