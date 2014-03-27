module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: ['public/js/backbone.app.js'],
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        laxcomma: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        indent: 2,
        devel: true,
        globals: {
          window: true,
          document: true,
          location: true,
          define: true,
          require: true,
          requirejs: true,
          Backbone: true,
          PeopleCollection:true,
          PeopleModel:true,
          // Here places words gloabla that not need tobe defined
          $: true,
          _:true,
          Mustache:true,
          Rectangulo:true,
        },
        // ignores: ['public/vendor/**/*.js','public/vendors.min.js','public/backbone.app.js','public/js/backbone/templates/**/*.js']
      },
    },

    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: '\n'
      },
      vendor: {
        // the files to concatenate
        src: ['public/vendor/jquery/jquery.min.js','public/vendor/bootstrap/dist/js/bootstrap.min.js','public/vendor/underscore/underscore-min.js','public/vendor/backbone/backbone-min.js'],
        // the location of the resulting JS file
        dest: 'public/js/vendors.min.js'
      },
      backbone: {
        // the files to concatenate
        src: ['public/js/backbone/**/*.js', '!public/js/backbone/routers/router.js', 'public/js/backbone/routers/router.js'],
        // the location of the resulting JS file
        dest: 'public/js/backbone.app.js'
      }

    },

    uglify: {
      vendors: {
        files: {
          'public/js/vendors.min.js': ['public/js/vendors.min.js']
        }
      },
      backbonemin: {
        files: {
          'public/js/backbone.app.js': ['public/js/backbone.app.js']
        }
      }
    },

    clean: ['public/*.html', 'public/js/vendors.min.js', 'public/css/*.min.css', 'public/js/backbone/templates/tpl/*'],

    jade: {
      compile: {
        options: {
          client: false,
          pretty: true
        },
        files: [ {
          cwd: "public/js/backbone/templates",
          src: "**/*.jade",
          dest: "public/js/backbone/templates/tpl",
          expand: true,
          ext: ".html"
        } ]
      }
    },

    watch: {
      options: {
        event: ['added', 'changed']
      },
      jade: {
        files: ['public/js/backbone/templates/*.jade'],
        tasks: ['newer:jade','jade']
      },
      backbone: {
        files: ['public/js/backbone/**/*.js'],
        tasks: ['jshint','concat:backbone','uglify:backbonemin']
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Compile Jade templates to HTML !!!IMPORTANT there is another contrib from jade to JS
  grunt.loadNpmTasks('grunt-contrib-jade');
  // Remove files
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Compile Jade templates to JavaScript
  // grunt.loadNpmTasks('grunt-jade');
  // watch newer files
  grunt.loadNpmTasks('grunt-newer');

  //production task
  grunt.registerTask('production', ['clean','jade', 'concat', 'jshint', 'uglify']);

  //default task
  grunt.registerTask('default', ['clean','jade', 'concat','jshint']);

  //untest task
  grunt.registerTask('notest', ['clean','jade', 'concat']);


};