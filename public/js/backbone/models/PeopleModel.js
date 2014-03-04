var PeopleModel = Backbone.Model.extend({
  initialize: function(){
      console.log("Music is the answer");
    },
  defaults: {
    Name: 'Untitled',
    Surname: 'Unknown',
    Age: '0'
  },

  displayString: function() {
    return this.get('Name');
  }
});

var PeopleCollection;
PeopleCollection = Backbone.Collection.extend({
  model: PeopleModel,
  url: "/api/entries/",

  initialize: function() {
    return this.filter(function(pers) {
      console.log(pers.get('edad') < 18);
      return pers.get('edad') < 18;
    });
  }

});