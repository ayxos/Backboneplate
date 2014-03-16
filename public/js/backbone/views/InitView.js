var InitView = Backbone.View.extend({

  events: {
    'click #api': 'goToApi'
  },

  initialize:function (arg) {
    this.template = _.template("<p> Welcome to initView </p> <input id='api' type='submit' value='API'>");
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