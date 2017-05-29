module.exports = function (grunt) {
    grunt.initConfig({
        qunit: {
            all: ['tests/js/index.html']
        }
    });
    grunt.loadNpmTasks('grunt-contrib-qunit');
};