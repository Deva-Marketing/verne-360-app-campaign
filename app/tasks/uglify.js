/*jslint node:true */
'use strict';

module.exports = function uglify(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // Options
    return {
        build: {
            files: [{
                expand: true,
                cwd: '../htdocs/landing/js',
                src: '**/*.js',
                dest: '../htdocs/landing/js'
            }]
        }
    };
};
