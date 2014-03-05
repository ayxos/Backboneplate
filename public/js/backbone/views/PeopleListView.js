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

  initialize:function () {
    // this.template = _.template(tpl.get('people-list-item'));
    this.template = _.template("<li> nombre: <%= name %> <br> id: <%= _id %> </li>");
    this.model.bind("change", this.render, this);
    this.model.bind("destroy", this.close, this);
  },

  render:function (eventName) {
    $(this.el).html(this.template(this.model.toJSON()));
    return this;
  }

});