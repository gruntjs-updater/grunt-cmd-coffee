/*
 * grunt-cmd-coffee
 * https://github.com/root/gr
 *
 * Copyright (c) 2013 Kevin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp'],
    },

    coffee: {
      all: {
        expand: true,
        cwd: 'test/fixtures',
        src: '**/*.coffee',
        dest: 'tmp/fixtures',
        ext: '.js',
      }
    },

    transport: {
      options: {
        debug: false
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'test/fixtures',
          src: ['**/*.js'],
          dest: 'tmp/fixtures'
        }]
      }
    },

    concat: {
      options: {
        noncmd: true
      },
      dist: {
        files: {
          'tmp/fixtures/all.js': ['tmp/fixtures/**/*.js']
        }
      },
    },

    // Configuration to be run (and then tested).
    cmd_coffee: {
      default_options: {
        options: {
          wrapper: true
        },
        files: {
          'tmp/fixtures/all_test.js': ['tmp/fixtures/all.js'],
        },
      },
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-cmd-transport');
  grunt.loadNpmTasks('grunt-cmd-concat');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'coffee', 'transport', 'concat', 'cmd_coffee', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
