module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                files: {
                    'build/build.js': ['.tmp/concat/scripts/*.js']
                }
            }
        },
        clean: {
            build: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'build/{,*/'
                    ]
                }]
            }
        },
        ngAnnotate: {
            build: {
                files: [{
                    expand: true,
                    cwd: 'app/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');


    // Default task(s).
    grunt.registerTask('default', [
        'clean',
        'ngAnnotate',
        'uglify'
    ]);

};