module.exports = function (grunt) {
  // Automatically add all installed grunt tasks
  require('jit-grunt')(grunt);

  grunt.initConfig({
    clean: {
      all: {
        src: ['compiled/**/*.*', 'compiled/**']
      },
      react: {
        src: ['compiled/react/**/*.*', 'compiled/react/']
      },
      modules: {
        src: ['compiled/modules/**/*.*']
      },
      index: {
        src: ['index.js', 'index.js.map']
      }
    },

    babel: {
      options: {
        sourceMap: false,
        presets: ['env']
      },
      utils: {
        files: [{
          expand: true,
          cwd: 'utils/',
          src: ['**/*.js'],
          dest: 'compiled/modules/utils/'
        }]
      },
      react: {
        files: [{
          expand: true,
          cwd: 'react/',
          src: ['**/*.js'],
          dest: 'compiled/react/'
        }]
      },
      modules: {
        files: [{
          expand: true,
          cwd: 'modules/',
          src: ['**/*.js'],
          dest: 'compiled/modules/'
        }]
      },
      index: {
        options: {
          sourceMap: false
        },
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
      react: {
        src: ['./react/**/*.js', '!./node_modules/**/*.js']
      },
      modules: {
        src: ['./modules/**/*.js',]
      },
      tests: {
        // src: ['./test/*.js']
      },
      index:{
        src: ['index.es6.js', '!index.js']
      }
    },

    chmod: {
      options: {
        mode: '444'
      },
      all: {
        src: ['./compiled/**/*.*', 'index.js', '*.map']
      },
      react: {
        src: ['./compiled/react/**/*.js'],
      },
      modules: {
        src: ['./compiled/modules/**/*.js'],
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
      files: [
      // './utils/**/*.*', 
      './modules/**/*.*', 
      './test/**/*.*', 
      './public/**/*.*',
      './*.*',
      '!./index.js', 
      '!./*.map'
      ]
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
      react: {
        files: ['./react/**/*.js'],
        tasks: ['clean:react', 'eslint:react', 'babel:react', 'chmod:react']
      },
      modules: {
        files: ['./modules/**/*.js'],
        tasks: ['clean:modules', 'eslint:modules', 'babel:modules', 'chmod:modules']
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
    grunt.task.run('clean', 'eslint', 'babel', 'simplemocha',  'clean', 'gitadd', 'gitcommit', 'gitpush');
  });

  grunt.registerTask('build', 'Builds the project for deployment', () => {
    console.log("Building this project. Run npm start to start the server");
    grunt.task.run('clean', 'babel', 'simplemocha');
  });

  grunt.registerTask('default', ['clean','babel']);
  grunt.registerTask('serve', ['clean', 'babel', 'eslint', 'chmod', 'watch']);
} 