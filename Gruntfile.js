module.exports = function(grunt) {
    var config = grunt.file.readJSON('grunt.config.json'),
        watchTasks = [], watchFiles = [],
        configObj = {config: config};

    function rename(dest, src) {
        return dest + src.slice(src.lastIndexOf('/'));
    }

    if(config.html){
        watchFiles.push(config.html.src);
        watchTasks.push('copy');
        configObj.copy = {
            html: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: config.html.src,
                        dest: config.html.dist,
                        filter: 'isFile',
                        rename: rename
                    },
                ]
            }
        };
    }
    //js
    if(config.js){
        //js压缩美化
        watchFiles.push(config.js.src);
        if(config.js.uglify){
            watchTasks.push('uglify');
            console.log('uglify enabled');
            configObj.uglify = {
                options: {
                    banner: '/*! <%= config.name %> <%= grunt.template.today("dd-mm-yyyy") %> */\n'
                },
                compress: {
                    files: [
                        {
                            expand: true,
                            filter: 'isFile',
                            src: config.js.src,
                            dest: config.js.dist,
                            ext: config.js.ext ? ".min.js" : ".js",
                            rename: rename
                        }
                    ]
                }
            };

            if(config.js.uglify && config.js.beautify){
                console.log('uglify.beautify enabled');
                configObj.uglify.beautify = {
                    options: {
                        beautify: true
                    },
                    files: [
                        {
                            expand: true,
                            filter: 'isFile',
                            src: config.js.src
                        }
                    ]
                };
            }
        }

        if(config.js.jshint){
            console.log('jshint enabled');
            configObj.jshint = {
                files: ['<%= config.js.src %>'],
                options: {
                    globals: {
                        jQuery: true,
                        console: true,
                        module: true
                    }
                }
            };
        }

    }

    //css
    if(config.css){
        watchFiles.push(config.css.src);
        if(config.css.cssmin){
            watchTasks.push('cssmin');
            console.log('cssmin enabled');
            configObj.cssmin = {
                compress: {
                    files: [
                        {
                            expand: true,
                            cwd: "",
                            src: config.css.src,
                            dest: config.css.dist,
                            ext: config.css.ext ? ".min.css" : ".css",
                            rename: rename
                        }
                    ]
                }
            };
        }//end if
    }

    //img
    if(config.img){
        watchFiles.push(config.img.src);
        if(config.img.imagemin){
            watchTasks.push('imagemin');
            console.log('imagemin enabled');
            configObj.imagemin = {                          // Task
                dynamic: {                         // Another target
                    files: [{
                        expand: true,                  // Enable dynamic expansion
                        cwd: '',                   // Src matches are relative to this path
                        src: config.img.src,   // Actual patterns to match
                        dest: config.img.dist,                 // Destination path prefix
                        rename: rename
                    }]
                }
            };
        }
    }

    configObj.watch = {
        options: {
            spawn: false,
        },
        files: watchFiles,
        tasks: watchTasks
    };

    //important
    grunt.initConfig(configObj);

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    var _tasks = watchTasks.slice();
    _tasks.push('watch');
    grunt.registerTask('default', _tasks);
};