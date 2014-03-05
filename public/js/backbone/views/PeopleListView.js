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