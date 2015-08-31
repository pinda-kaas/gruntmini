module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n',
                report: 'min',
                mangle: false
            },
            build: {
                files: {
                    'dist/script.js': ['.tmp/concat/scripts/*.js']
                }
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        'dist/{,*/'
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

        wiredep: {
            app: {
                src: ['app/index.html'],
                ignorePath: /\.\.\//
            }

        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: 'app',
                        dest: 'dist',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '*.html',
                            'images/{,*/}*.{webp}',
                            'styles/fonts/{,*/}*.*'
                        ]
                    }
                ]
            }
            ,
            styles: {
                expand: true,
                cwd: 'app/styles',
                dest: '.tmp/styles/',
                src: '/**/*.css'
            }
        },
        useminPrepare: {
            html: 'app/index.html',
            options: {
                dest: 'dist',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

        // Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['dist/{,*/}*.html'],
            css: ['dist/styles/**/*.css'],
            js: ['dist/{,*/}*.js'],
            options: {
                assetsDirs: [
                    'dist',
                    'dist/images',
                    'dist/styles'
                ],
                patterns: {
                    js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g, 'Replacing references to images']]
                }
            }
        }

    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-wiredep');

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-contrib-concat');

    // Default task(s).
    grunt.registerTask('default', [
        'clean:dist',
        'wiredep',

        'useminPrepare',
        'concat',
        'ngAnnotate',
        'copy:dist',
        'uglify',
        'usemin'
    ]);

};