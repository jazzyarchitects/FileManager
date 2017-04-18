module.exports = function (grunt) {
  // Automatically add all installed grunt tasks
  require('jit-grunt')(grunt);

  grunt.initConfig({
    clean: {
      utils: {
        src: ['compiled/*.*']
      },
      index: {
        src: ['index.js', 'index.js.map']
      }
    },

    babel: {
      options: {
        sourceMap: true,
        presets: ['env']
      },
      utils: {
        files: [
            {
                expand: true,
                cwd: 'utils/',
                src: ['*.js'],
                dest: 'compiled/'
            }
        ]
      },
      index: {
        files: {
          'index.js': 'index.es6.js'
        }
      }
    },

    simplemocha: {
      test: {
        src: ['./test/*.js']
      }
    },

    eslint: {
      options: {
        configFile: './.eslintrc.js',
        silent: true,
        fix: true
      },
      utils: {
        src: ['./utils/*.js', '!./node_modules/**/*.js']
      },
      tests: {
        src: ['./test/*.js']
      },
      index:{
        src: 'index.js'
      }
    },

    chmod: {
      options: {
        mode: '444'
      },
      utils: {
        src: ['compiled/*.js', 'index.js'],
      },
      index: {
        src: ['index.js']
      }
    },

    gitadd: {
      options: {
        cwd: '.',
        all: true
      },
      files: ['./utils/**/*.*', './test/**/*.*', './public/**/*.*', './*.*', '!./index.js', '!./*.map']
    },

    gitcommit: {
      default: {
        options: {
          message: grunt.option('message'),
        }
      }
    },

    gitpush: {
      default: {
        options: {
          remote: 'origin',
          branch: 'master'
          }
        }
    },

    watch: {
      utils: {
        files: ['./utils/*.js'],
        tasks: ['clean:utils', 'eslint:utils', 'babel:utils', 'chmod:utils']
      },
      index: {
        files: ['index.es6.js'],
        tasks: ['clean:index', 'eslint:index', 'babel:index', 'chmod:index']
      },
      tests: {
        files: ['./test/*.js'],
        tasks: ['eslint:tests']
      }
    }

  });

  grunt.loadNpmTasks("gruntify-eslint");
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-simple-mocha');

  grunt.registerTask('mocha', 'Alias for simplemocha', ()=>{
    grunt.task.run('simplemocha');
  });

  grunt.registerTask('test', 'Alias for simplemocha', ()=>{
    grunt.task.run('simplemocha');
  })

  grunt.registerTask('push', 'Adds all files and pushes to git repository', function() {
    let message = grunt.option('message');
    if(!message){
      return grunt.fail.fatal(`Commit message required. Specify using --message="Commit message" flag with grunt command`);
    }
    grunt.task.run('clean', 'eslint', 'babel', 'simplemocha', 'gitadd', 'gitcommit', 'gitpush');
  });

  grunt.registerTask('default', ['clean','babel']);
  grunt.registerTask('serve', ['clean', 'babel', 'eslint', 'chmod', 'watch']);
} 