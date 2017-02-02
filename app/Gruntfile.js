/*jslint node:true */
'use strict';

module.exports = function (grunt) {
    // Load the project's grunt tasks from a directory
    require('grunt-config-dir')(grunt, {
        configDir: require('path').resolve('tasks')
    });

    grunt.registerTask('compile-js', ['jslint', 'browserify']);
    grunt.registerTask('compile-css', ['sass', 'autoprefixer']);

    grunt.registerTask('build', ['compile-js'/*, 'uglify'*/, 'compile-css', 'cssmin']);
    grunt.registerTask('debug', ['sass']);
    grunt.registerTask('default', ['build', 'watch']);
};
