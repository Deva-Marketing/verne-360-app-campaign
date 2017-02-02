/*jslint node:true */
'use strict';

module.exports = function watch(grunt) {
    grunt.loadNpmTasks('grunt-contrib-watch');

    return {
        // watchify all build sub tasks
        browserify: {
            files: ['public/js/**/*.js'],
            tasks: ['compile-js']
        },
        sass: {
            files: ['public/css/**/*.scss'],
            tasks: ['compile-css']
        }
        // we don't need a copyto watch task
        // by default, kraken loads from /public when in dev or stag env
        // I don't expect the default task to be run in prd so
        // there should be no need for copyto in watch
    };
};
