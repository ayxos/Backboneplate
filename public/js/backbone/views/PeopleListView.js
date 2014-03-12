var PeopleListItemView = Backbone.View.extend({

  tagName:"li",

  events: {
    'click #dele': 'delete'
  },

  initialize:function () {
    console.log('creating a new list item view');
    // this.template = _.template(tpl.get('people-list-item'));
    // this.template = _.template("<li> nombre: <%= name %> <br> age: <%= age %> <br> id: <%= _id %> <input id='dele' type='submit' value='Erase'> </li>");
    this.template = _.template("<br><ul><li> name: <%= name %> <br></li> <li>surname: <%= surname %> <br></li> <li>age: <%= age %> <br> </li><li><input id='dele' type='submit' value='Erase'> </li></ul>");
    this.model.bind("change", this.render, this);
    this.model.bind("destroy", this.close, this);
  },

  ale:function(){
    alert('click del');
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

  tagName:'ul',

  initialize:function () {
    this.collection.bind("reset", this.render, this);
    this.collection.bind("add", function (people) {
      console.log('add new peoplelistItemview');
      $(this.el).append(new PeopleListItemView({model:people}).render().el);
    });
  },

  render:function (eventName) {
    console.log('render listview' + this.collection);
    _.each(this.collection.models, function (people) {
      $(this.el).append(new PeopleListItemView({model:people}).render().el);
    }, this);
    return this;
  }
});