var PeopleModel = Backbone.Model.extend({
  idAttribute: '_id',

  initialize: function(){
    console.log("Model has been initzialized");
  }

});

var PeopleCollection = Backbone.Collection.extend({
  idAttribute: '_id',
  model: PeopleModel,
  url: "api/entries",

});