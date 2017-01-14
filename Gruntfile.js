/* global module:false,require:false */
module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        browserify: {
            dev: {
                files: {
                    'dist/react-audiolist-debug.js': ['src/main.jsx']
                },
                options: {
                    watch: true,
                    keepAlive: true,
                    transform: [
                        ["babelify", { presets: ["es2015","react"] }]
                    ],
                    browserifyOptions: {
                        debug: true
                    }
                }
            },
            prod: {
                files: {
                    'dist/react-audiolist.js': ['src/main.jsx']
                },
                options: {
                    transform: [
                        ["babelify", { presets: ["es2015","react"] }]
                    ],
                    browserifyOptions: {
                        debug: false
                    }
                }
            }
        },

        uglify: {
            prod: {
                files: {
                    'dist/react-audiolist.js': ['dist/react-audiolist.js']
                }
            }
        },
        env: {
            dev: {
                NODE_ENV: 'development'
            },
            prod: {
                NODE_ENV: 'production'
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['env:dev','browserify:dev']);
    grunt.registerTask('prod', ['env:prod','browserify:prod','uglify:prod']);

};

