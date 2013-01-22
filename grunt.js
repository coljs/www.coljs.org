var fs = require('fs');

module.exports = function (grunt) {

  //options
  var concatOpts = {};
  var minifyOpts = {};
  var jadeFiles = {};
  var stylusFiles = {};
  var stylusPaths = [];

  //Builds options for frameworks used to avoid naming files individually
  var pages = fs.readdirSync('./lib');
  pages.forEach(function(page) {
    if (page == 'layout') return;

    concatOpts[page] = {
      src: ['<%= dirs.src %>' + page + '/*.js'],
      dest: '<%= dirs.dest %>/javascript/' + page + '.js'
    };

    minifyOpts[page] = {
      src: ['<%= dirs.dest %>/javascript/' + page + '.js'],
      dest: '<%= dirs.dest %>/javascript/' + page + '.min.js'
    };

    jadeFiles['<%= dirs.dest %>/' + page + '.html'] = ['<%= dirs.src %>/' + page + '/*.jade'];
    stylusFiles['<%= dirs.dest %>/styles/' + page + '.css' ] = '<%= dirs.src %>/' + page + '/*.styl';
    stylusPaths.push('<%= dirs.src %>/' + page);
  });

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    meta: {
      banner: '/* <%= pkg.name %> - v<%= pkg.version %> - ' +
              '<%= grunt.template.today("yyyy-mm-dd") %> */'
    },

    dirs: {
      src: 'lib',
      dest: 'public'
    },

    lint: {
      all: ['grunt.js', '<%= dirs.src %>/**/*.js']
    },

    jshint: {
      options: {
        browser: true
      }
    },

    /* Concat JS files per page*/
    concat: concatOpts,

    min: minifyOpts,

    jade: {
      compile: {
        options: {
          data: {
            debug: false,
            timestamp: '<%= grunt.template.today() %>',
            banner: '<!-- <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> -->'
          },
          pretty: true
        },
        files: jadeFiles
      }
    },

    stylus: {
      compile: {
        options: {
          /* paths for @import() to look for */
          paths: stylusPaths,
          urlfunc: 'embedurl' // use embedurl('test.png') in our code to trigger Data URI embedding
          /*use: [
            require('blah') // use stylus plugin at compile time
          ]*/
        },
        files: stylusFiles
      }
    },

    watch: {
      files: ['<%= dirs.src %>/**/*'],
      task: ['default']
    },

    exec: {
      add: {
        command: 'git add public/*',
        stdout: true
      },

      commit: {
        command: 'git commit -m "Despliega últimos cambios" 2>&1',
        stdout: true
      },

      deploy: {
        command: 'git push origin HEAD:gh-pages 2>&1',
        stdout: true
      }
    },

    copy: {
      dist: {
        files: {
          '<%= dirs.dest %>/javascript/': 'third-party/**/*.js'
        }
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-exec');

  grunt.registerTask('deploy', 'lint jade stylus concat min copy exec');
  grunt.registerTask('default', 'lint jade stylus concat copy');
};
