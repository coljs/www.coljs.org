module.exports = function (grunt) {

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
    concat: {
      home: {
        src: ['<%= dirs.src %>/home/*.js'],
        dest: '<%= dirs.dest %>/javascript/home.js'
      },

      sponsors: {
        src: ['<%= dirs.src %>/sponsors/*.js'],
        dest: '<%= dirs.dest %>/javascript/sponsors.js'
      },

      blog: {
        src: ['<%= dirs.src %>/blog/*.js'],
        dest: '<%= dirs.dest %>/javascript/blog.js'
      },

      communities: {
        src: ['<%= dirs.src %>/communities/*.js'],
        dest: '<%= dirs.dest %>/javascript/communities.js'
      },

      hangouts: {
        src: ['<%= dirs.src %>/hangouts/*.js'],
        dest: '<%= dirs.dest %>/javascript/hangouts.js'
      },

      about: {
        src: ['<%= dirs.src %>/about/*.js'],
        dest: '<%= dirs.dest %>/javascript/about.js'
      }
    },

    min: {
      dist: {
        src: ['<%= dirs.dest %>/javascript/**/*.js'],
        dest: '<%= dirs.dest %>/javascript/*.min.js'
      }
    },

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
          /* paths for @import() to look for */
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
            require('blah') // use stylus plugin at compile time
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
      task: ['default']
    },

    exec: {
      add: {
        command: 'git add public/*',
        stdout: true
      },

      commit: {
        command: 'git commit -m "Despliega últimos cambios"',
        stdout: true
      },

      deploy: {
        command: 'git push origin HEAD:gh-pages',
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
