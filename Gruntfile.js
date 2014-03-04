module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    jshint: {
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
          $: true,
          _:true,
          Mustache:true,
          Rectangulo:true,
        },
        ignores: ['public/vendor/**/*.js','public/vendors.min.js','public/backbone.app.js','public/js/backbone/templates/**/*.js']
      },
      all: ['public/js/backbone/**/*.js']
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
        src: ['public/js/backbone/**/*.js'],
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


    // jade: {
    //   amd: {
    //     files: {
    //       'public/js/backbone/templates/tpl/': ['public/js/backbone/templates/*.jade']
    //     },
    //     options: {
    //       wrap: {
    //         wrap: false,
    //         amd: false,
    //         node: false,
    //         dependencies: 'jade'
    //       },
    //     // options: {
    //     //   client: true,
    //     //   wrapper: "jst",
    //     //   processName: function(str) { return str.match(/^test\/fixtures\/(.*)\.jade$/)[1]; },
    //     // }
    //       runtime: true
    //     }
    //   }
    // },
    jade: {
      amd: {
        src: ['public/js/backbone/templates/*.jade'],
        dest: 'public/js/backbone/templates/tpl/',
        wrapper: {
          amd: true,
          dependencies: 'jade'
        }
      }
    },

    cssmin: {
      build: {
        files: {
          'public/css/style.min.css': [ 'public/css/style.css', 'public/vendor/bootstrap/dist/css/bootstrap.min.css' ]
        }
      }
    },

    watch: {
      options: {
        event: ['added', 'changed']
      },
      stylus: {
        files: ['public/**/*.css'],
        tasks: ['cssmin']
      },
      jade: {
        files: ['public/js/templates/*.jade'],
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

  // Compile Jade templates to JavaScript !!!IMPORTANT there is another contrib from jade to JS
  grunt.loadNpmTasks('grunt-contrib-jade');
  // Compress & minify CSS
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  // Remove files
  grunt.loadNpmTasks('grunt-contrib-clean');
  // Compile Jade templates to JavaScript
  grunt.loadNpmTasks('grunt-jade');
  // watch newer files
  grunt.loadNpmTasks('grunt-newer');

  //production task
  grunt.registerTask('production', ['jshint', 'clean','jade', 'concat', 'uglify', 'cssmin']);
  //default task
  grunt.registerTask('default', ['jshint', 'clean','jade', 'concat', 'cssmin']);

};