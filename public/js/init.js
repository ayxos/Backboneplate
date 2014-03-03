// var vista = new Vista ({model: Rectangulo});
// var v = new Vista();

$(function() {
  var people = new PeopleModel();

  var vista = new Vista({
    model: people
  });

  $('#backbone').html(vista.render().el);

});