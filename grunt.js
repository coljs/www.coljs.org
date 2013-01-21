module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({
    lint: {
      all: ['grunt.js', 'lib/**/*.js']
    },

    jshint: {
      options: {
        browser: true
      }
    },

    concat: {},

    min: {},

    jade: {
      compile: {
        options: {
          data: {
            debug: false,
            timestamp: "<%= grunt.template.today() %>"
          },
          pretty: true
        },
        files: {
          "public/home.html"        : ["lib/home/*.jade"],
          "public/sponsors.html"    : ["lib/sponsors/*.jade"],
          "public/blog.html"        : ["lib/blog/*.jade"],
          "public/communities.html" : ["lib/communities/*.jade"],
          "public/hangouts.html"    : ["lib/hangouts/*.jade"],
          "public/about.html"       : ["lib/about/*.jade"]
        }
      }
    },

    stylus: {
      compile: {
        options: {
          paths: [
            'lib/home',
            'lib/sponsors',
            'lib/blog',
            'lib/communities',
            'lib/hangouts',
            'lib/layout',
            'lib/about'
          ],
          urlfunc: 'embedurl' // use embedurl('test.png') in our code to trigger Data URI embedding
          /*use: [
            require('fluidity') // use stylus plugin at compile time
          ]*/
        },
        files: {
          'public/styles/home.css'        : 'lib/home/home.styl',
          'public/styles/sponsors.css'    : 'lib/sponsors/sponsors.styl',
          'public/styles/blog.css'        : 'lib/blog/blog.styl',
          'public/styles/communities.css' : 'lib/communities/communities.styl',
          'public/styles/hangouts.css'    : 'lib/hangouts/hangouts.styl',
          'public/styles/about.css'       : 'lib/about/about.styl'
        }
      }
    },

    watch: {
      files: ['lib/**/*'],
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
