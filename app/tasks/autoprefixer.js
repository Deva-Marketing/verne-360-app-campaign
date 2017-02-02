/*jslint node:true */
'use strict';

module.exports = function autoprefixer(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Options
    return {
        build: {
            files: [{
                expand: true,
                flatten: true,
                src: '../htdocs/landing/css/*.css',
                dest: '../htdocs/landing/css/'
            }]
        }
    };
};
