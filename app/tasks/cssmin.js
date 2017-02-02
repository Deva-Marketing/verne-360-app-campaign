/*jslint node:true */
'use strict';

module.exports = function cssmin(grunt) {
    // Load task
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    // Options
    return {
        build: {
            options: {
                keepSpecialComments: 0
            },
            files: [{
                expand: true,
                cwd: '../htdocs/landing/css',
                src: ['*.css', '!*.min.css'],
                dest: '../htdocs/landing/css',
                ext: '.css'
            }]
        }
    };
};
