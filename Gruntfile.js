module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            options: {
                browserifyOptions: {
                    standalone: 'cetver.validationFilters.php',
                }
            },
            dist: {
                files: {
                    'js/dist/cetver.validationFilters.compiled.js': ['js/src/cetver.validationFilters.js']
                }
            }
        },

        concat: {
            dist: {
                src: [
                    'js/dist/cetver.validationFilters.compiled.js',
                    'js/src/cetver.validationFilters.jquery.js'
                ],
                dest: 'js/dist/cetver.validationFilters.js'
            },
        },

        clean: {
            js: ['js/dist/cetver.validationFilters.compiled.js']
        },

        uglify: {
            dist: {
                files: {
                    'js/dist/cetver.validationFilters.min.js': ['js/dist/cetver.validationFilters.js']
                }
            }
        },

        qunit: {
            options: {
                puppeteer: {
                    args: ['--no-sandbox']
                }
            },
            all: ['tests/js/index.html']
        }
    });

    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('default', [
        'browserify',
        'concat',
        'clean',
        'uglify'
    ]);

    grunt.registerTask('test', [
        'qunit'
    ]);
};