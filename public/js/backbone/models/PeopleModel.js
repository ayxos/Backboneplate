var PeopleModel = Backbone.Model.extend({
  idAttribute: '_id',

  initialize: function(){
    console.log("Model has been initzialized");
  },
  defaults: {
    name: 'Untitled',
    surname: 'Unknown',
    age: '0'
  },

  displayString: function() {
    return this.get('Name');
  }
});

var PeopleCollection = Backbone.Collection.extend({
  idAttribute: '_id',
  model: PeopleModel,
  url: "api/entries",

  // initialize: function() {
  //   return this.filter(function(pers) {
  //     console.log(pers.get('edad') < 18);
  //     return pers.get('edad') < 18;
  //   });
  // }

});