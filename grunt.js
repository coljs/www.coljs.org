module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

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

    /* Concat JS files */
    concat: {
      options: {
        separator: ';',
        banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %> */'
      },

      home: {
        src: ['lib/home/*.js'],
        dest: 'public/javascript/home.js'
      }
    },

    min: {},

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
        files: {
          '<%= dirs.dest %>/home.html'        : ['<%= dirs.src %>/home/*.jade'],
          '<%= dirs.dest %>/sponsors.html'    : ['<%= dirs.src %>/sponsors/*.jade'],
          '<%= dirs.dest %>/blog.html'        : ['<%= dirs.src %>/blog/*.jade'],
          '<%= dirs.dest %>/communities.html' : ['<%= dirs.src %>/communities/*.jade'],
          '<%= dirs.dest %>/hangouts.html'    : ['<%= dirs.src %>/hangouts/*.jade'],
          '<%= dirs.dest %>/about.html'       : ['<%= dirs.src %>/about/*.jade']
        }
      }
    },

    stylus: {
      compile: {
        options: {
          paths: [
            '<%= dirs.src %>/home',
            '<%= dirs.src %>/sponsors',
            '<%= dirs.src %>/blog',
            '<%= dirs.src %>/communities',
            '<%= dirs.src %>/hangouts',
            '<%= dirs.src %>/layout',
            '<%= dirs.src %>/about'
          ],
          urlfunc: 'embedurl' // use embedurl('test.png') in our code to trigger Data URI embedding
          /*use: [
            require('fluidity') // use stylus plugin at compile time
          ]*/
        },
        files: {
          '<%= dirs.dest %>/styles/home.css'        : '<%= dirs.src %>/home/home.styl',
          '<%= dirs.dest %>/styles/sponsors.css'    : '<%= dirs.src %>/sponsors/sponsors.styl',
          '<%= dirs.dest %>/styles/blog.css'        : '<%= dirs.src %>/blog/blog.styl',
          '<%= dirs.dest %>/styles/communities.css' : '<%= dirs.src %>/communities/communities.styl',
          '<%= dirs.dest %>/styles/hangouts.css'    : '<%= dirs.src %>/hangouts/hangouts.styl',
          '<%= dirs.dest %>/styles/about.css'       : '<%= dirs.src %>/about/about.styl'
        }
      }
    },

    watch: {
      files: ['<%= dirs.src %>/**/*'],
      task: ['compile']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');


  // Default task.
  grunt.registerTask('default', 'lint jade stylus concat min');
};
