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

    eslint: {
      options: {
        configFile: './.eslintrc.js',
        silent: true,
        fix: true
      },
      utils: {
        src: ['./utils/*.js', '!./node_modules/**/*.js'],
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
      files: ['./utils/**/*.*','./*.*', '!./index.js', '!./*.map']
    },

    watch: {
      utils: {
        files: ['utils/*.js'],
        tasks: ['clean:utils', 'eslint:utils', 'babel:utils', 'chmod:utils']
      },
      index: {
        files: ['index.es6.js'],
        tasks: ['clean:index', 'eslint:index', 'babel:index', 'chmod:index']
      }
    }

  });

  grunt.loadNpmTasks("gruntify-eslint");
  grunt.loadNpmTasks('grunt-git');

  grunt.registerTask('gitpush', 'Adds all files and pushes to git repository', function() {
    let message = grunt.option('message');
    if(!message){
      return grunt.fail.fatal(`Commit message required. Specify using --message="Commit message" flag with grunt command`);
    }
    console.log(message);
  });

  grunt.registerTask('default', ['clean','babel']);
  grunt.registerTask('serve', ['clean', 'babel', 'eslint', 'chmod', 'watch']);
}