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

  // tagName:'ul',

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