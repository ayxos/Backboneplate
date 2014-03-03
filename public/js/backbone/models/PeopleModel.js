var PeopleModel = Backbone.Model.extend({
  Collection: PeopleCollection,
  initialize: function(){
      console.log("Music is the answer");
    },
  defaults: {
    Name: 'Untitled',
    Surname: 'Unknown',
    Age: '0'
  },
  url: "/api/entries/",
  displayString: function() {
    return this.get('Name');
  }
});