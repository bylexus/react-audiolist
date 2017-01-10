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
                }
            },
            options: {
                watch: true,
                keepAlive: true,
                transform: [
                    ["babelify", {
                        presets: ["react", "es2015"]
                    }]
                ],
                browserifyOptions: {
                    debug: true
                }
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['browserify:dev']);

};

