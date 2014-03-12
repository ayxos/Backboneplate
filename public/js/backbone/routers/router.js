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