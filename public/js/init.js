$(function() {

  var personas = new PeopleCollection();
  // personas.add([
  //  { Name: 'Fulano', Surname: 'de Tal', Age: 18 },
  //  { Name: 'Mengano', Surname: 'de Cual', Age: 26 }
  // ]);

  var people = new PeopleModel();

  var vista = new Vista({
    model: people,
    el: ".persona"
  });

  // $('#backbone').append(vista.render().el);
  $('#backbone').append(vista.render());

});