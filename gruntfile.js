module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Clean up old assets
    clean: ['build/assets'],

    //Copy html
    // Copy 
    copy: {
      html: {
        expand: true,
        src: '**/*.html',
        dest: 'build', 
        cwd: 'source'
      },
    
     config: {
        expand: true,
        src: '*.config',
        dest: 'build', 
        cwd: 'source'
      },
  
      assets: {
        expand: true,
        src: '**/*',
        dest: 'build/assets',
        cwd: 'source/files'
      },

      fontassets: {
        expand: true,
        src: '**/*',
        dest: 'build/assets/fonts',
        cwd: 'source/fonts'
      },

      ical: {
        expand: true,
        src: '**/*',
        dest: 'build/assets/ical',
        cwd: 'source/ical'
      },

      pdf: {
        expand: true,
        src: '**/*',
        dest: 'build/assets/pdf',
        cwd: 'source/pdf'
      },

      video: {
        expand: true,
        src: '**/*',
        dest: 'build/assets/video',
        cwd: 'source/video'
      },

      json: {
        expand: true,
        src: '**/*',
        dest: 'build/assets/json',
        cwd: 'source/json'
      },

      imgassets: {
        expand: true,
        src: '**/*',
        dest: 'build/assets/img',
        cwd: 'source/img'
      },

      dist: {
        expand: true,
        src: '**/*',
        dest: '../website/assets', 
        cwd: 'build/assets'
      }
    },

    //Check JavaScript quality
    jshint: {
      all: ['source/js/components/**/*', 'source/js/helpers/**/*.js', 'source/js/scripts.js'],
      options: {
        jshintrc: '.jshintrc',
        reporterOutput: ''
      }
    },

    //Code Kit / PrePros script append/prepend processing
    codekit: {
      kitFiles: {
        files: [{
          expand: true,
          cwd: 'source',
          src: ['*.kit'],
          dest: 'build',
          ext: '.html'
        }]
      },
      
      jsinclude : {
        files : {
          'build/assets/js/scripts.js' : 'source/js/scripts.js',
		  'build/assets/js/jquery.js' : 'source/js/jquery/*.js'
        }
      }
    },

    //Minify the JavaScript into the build folder
    uglify: {
      scripts: {
        files: {
          'build/assets/js/min/scripts.min.js' : ['build/assets/js/scripts.js']  
        }
      }
    },

    // //Lint the SCSS as per coding standards
    sasslint: {
      options: {
        configFile: '.sass-lint.yml',
        'cache-config': true
      },
      target: [ 'source/scss/**/*.scss', '!source/scss/vendor**/*.scss' ]
    },

    sass: {
      dist: {
        options: {
          outputStyle: 'expanded',
          require: 'susy',
          sourceMap: true
        },
        files: {
          'build/assets/css/styles.css': 'source/scss/styles.scss'
        }
      }
    },

    // Post CSS
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer')({browsers: ['last 2 versions', 'last 4 iOS versions', 'last 4 Android versions', 'ie 9', 'ie 10']}),
          require('cssnano')() // minify the result
        ]
      },
      dist: {
        files: {
          'build/assets/css/styles.css':'build/assets/css/styles.css'
        }
      }
    },

    browserSync: {
      default_options: {
        bsFiles: {
          src: [
            "build/assets/css/*.css",
            "build/*.html"
          ]
        },
        options: {
          watchTask: true,
          server: {
            baseDir: "build/"
          }
        }
      }
    },

    accessibility: {
      options: {
        accessibilityLevel: 'WCAG2A',
        reportLevels: {
          notice: false,
          warning: false,
          error: true
        }
      },
      test: {
        src: ['build/*.html']
      }
    },

    validation: {
      files: {
        src: ['build/*.html']
      }
    },

    //Watch task with livereload
    watch: {
      html: {
        files: ['source/**/*.html', 'source/**/*.kit'],
        tasks: ['codekit:kitFiles','copy:html']
      },
      
      scripts: {
        files: ['source/js/**/*.js'],
        tasks: ['jshint','codekit:jsinclude']
      },

      styles: {
        files: 'source/scss/**/*.scss',
        tasks: ['sasslint', 'sass:dist', 'postcss']
      },

      video: {
        files: ['source/video/**/*'],
        tasks: ['copy:videoassets']
      },

      images: {
        files: ['source/img/**/*'],
        tasks: ['copy:imgassets']
      },

      ical: {
        files: ['source/ical/*'],
        tasks: ['copy:ical']
      },

      pdf: {
        files: ['source/pdf/*'],
        tasks: ['copy:pdf']
      },

      video: {
        files: ['source/video/*'],
        tasks: ['copy:video']
      },

      json: {
        files: ['source/json/*'],
        tasks: ['copy:json']
      },

      webConfig: {
        files: ['source/web.config'],
        tasks: ['copy:webConfig']
      },

      livereload: {
        files: ['build/**/*'],
        options: {
          livereload: true
        }
      }
    }
    

  });

  // Load JavaScript quality check task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load uglify task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  //Load SASS task
  grunt.loadNpmTasks('grunt-sass');

  // Load clean task
  grunt.loadNpmTasks('grunt-contrib-clean');

  //Load copy task
  grunt.loadNpmTasks('grunt-contrib-copy');

  //JavaScript append/prepend task
  grunt.loadNpmTasks('grunt-codekit');

  // Post CSS
  grunt.loadNpmTasks('grunt-postcss');
  
  //SASS lint
  grunt.loadNpmTasks('grunt-sass-lint');

  // Accessibility
  grunt.loadNpmTasks('grunt-accessibility');

  // HTML validation
  grunt.loadNpmTasks('grunt-w3c-html-validation');

  //Watch task
  grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-watch-nospawn');

  //Auto reload
  grunt.loadNpmTasks('grunt-browser-sync');

  //Load local grunt tasks
  // -- common-tasks.js - Common tasks across, pattern library, kitchen sink and build projects
  //grunt.loadTasks('./grunt-tasks');

  // Default task(s).
  grunt.registerTask('default', [
    'clean',
    'copy:html',
    // 'copy:assets',
    'copy:config',
    'copy:fontassets',
    'copy:imgassets',
    'copy:ical',
    'copy:pdf',
    'copy:json',
    'copy:video',
    'jshint',
    'codekit',
    // 'uglify',
    // 'validation',
    // 'accessibility',
    'sasslint',
    'sass:dist',
    'postcss',
    'browserSync',
    'watch'
  ]);

  grunt.registerTask('dist', [
    'clean',
    // 'copy:assets',
    'copy:config',
    'copy:fontassets',
    'copy:imgassets',
    'copy:ical',
    'copy:pdf',
    'copy:json',
    'copy:video',
    'jshint',
    'codekit',
    'uglify',
    'sasslint',
    'sass:dist',    
    'postcss',
    'copy:dist'
  ]);
};