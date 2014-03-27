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