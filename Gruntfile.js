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
        globals: {
          window: true,
          document: true,
          location: true,
          define: true,
          require: true,
          requirejs: true,
          $: true,
        },
        // ignores: ['public/js/backbone/*.js']
      },
      all: ['Gruntfile.js', 'public/js/backbone/*.js']
    },

    concat: {
      options: {
        // define a string to put between each file in the concatenated output
        separator: ';\n'
      },
      dist: {
        // the files to concatenate
        src: ['public/js/backbone/*.js','public/vendor/jquery/jquery.min.js','public/vendor/bootstrap/dist/js/bootstrap.min.js','public/vendor/underscore/underscore-min.js','public/vendor/backbone/backbone-min.js'],
        // the location of the resulting JS file
        dest: 'public/js/vendors.min.js'
      }
    },

    uglify: {
      my_target: {
        files: {
          'public/js/vendors.min.js': ['public/js/vendors.min.js']
        }
      }
    },

    clean: ['public/*.html', 'public/js/*.js', 'public/css/*.min.css'],

    cssmin: {
      build: {
        files: {
          'public/css/style.min.css': [ 'public/css/style.css', 'public/vendor/bootstrap/dist/css/bootstrap.min.css' ]
        }
      }
    }

    // watch: {
    //   options: {
    //     livereload: true,
    //     event: ['added', 'changed']
    //   },
    //   clean: ['public/*.html'],
    // }

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


  //default task
  grunt.registerTask('default', ['jshint', 'clean', 'concat', 'uglify', 'cssmin']);

};