Backboneplate
=============

a Simple BackbonePlate with node.js

Usage:
  (on dev-tools)
    var primerLibro = new Libro ({ titulo: "a", autor:"b" });
    primerLibro.toJSON();
    primerLibro.get('titulo');
    primerLibro.set('autor','desconocido');
    primerLibro.get('titulo');
    primerLibro.set({ titulo:"lala", autor:"nñlk"});
    primerLibro.get('titulo');

    var ebook = new Book ({ id: '1'});
    //fetch -> Get DB
    ebook.fetch();
    //show db
    ebook.toJSON();

    // create a new element to test save() method
    var eb2 = new Book({titulo:'swsqw', autor:'122',desc:'23w2'});
    //call save() method to save the registry in the datos.json file
    eb2.save();
    eb2.toJSON();

    mongod bafore nothing

