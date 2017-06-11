const webpackConfig = require('./webpack.config.js');
const fs = require('fs');
const path = require('path');

module.exports = function (grunt) {
  // Automatically add all installed grunt tasks
  require('jit-grunt')(grunt);

  grunt.initConfig({
    clean: {
      all: {
        src: ['compiled/**/*.*', 'compiled/**', 'public/js/bundle.js']
      },
      react: {
        src: ['compiled/react/**/*.*', 'compiled/react/', 'public/js/bundle.js']
      },
      reactServer: {
        src: ['compiled/react-server/**/*.js']
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
      reactServer: {
        files: [{
          expand: true,
          cwd: 'react/server-rendering/',
          src: ['**/*.js'],
          dest: 'compiled/react-server/'
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
      reactServer: {
        src: ['./react/server-rendering/**/*.js']
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
      reactServer: {
        src: ['./compiled/react-server/**/*.js']
      },
      react: {
        src: ['./public/js/bundle.js']
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
      './react/**/*.*',
      '!.public/js/bundle.js',
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
        files: ['./react/**/*.js', '!./react/server-rendering/**/*.js'],
        tasks: ['clean:react', 'eslint:react', 'webpack:dev', 'chmod:react', 'syncConstants']
        // tasks: ['clean:react', 'eslint:react', 'babel:react', 'chmod:react']
      },
      'react-server': {
        files: ['./react/server-rendering/**/*.js'],
        tasks: ['clean:reactServer', 'eslint:reactServer', 'babel:reactServer', 'chmod:reactServer']
      },
      common: {
        files: [ './modules/utils/crypto.js'],
        tasks: ['clean:modules', 'clean:react', 'eslint:modules', 'eslint:react', 'babel:modules', 'chmod:modules', 'webpack:dev', 'chmod:react']
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
    },
    webpack: {
      options: {
        stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
        cache: true
      },
      prod: webpackConfig,
      dev: webpackConfig
    }
  });

  grunt.loadNpmTasks("gruntify-eslint");
  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-webpack');

  grunt.registerTask('mocha', 'Alias for simplemocha', ()=>{
    grunt.task.run('simplemocha');
  });

  grunt.registerTask('syncConstants', function(){
    let original = fs.readFileSync(path.join(__dirname, 'react', 'constants.js')).toString();
    let json = original.substr(original.indexOf('{')+1);
    let baseURL = json.split(',')[0];
    let writeFileContent = fs.readFileSync(path.join(__dirname, 'react', 'server-rendering', 'constants.js')).toString();
    let firstPart = 'export default { ';
    let mainPart = writeFileContent.substr(writeFileContent.indexOf('{')+1).split(',')[0];
    let lastPart = writeFileContent.substr(writeFileContent.indexOf(','));
    let finalContent = firstPart+baseURL+","+lastPart;
    fs.writeFileSync(path.join(__dirname, 'react', 'server-rendering', 'constants.js'), finalContent);
    this.async()(true);
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
    grunt.task.run('clean', 'syncConstants', 'babel', 'webpack:dev');
  });

  grunt.registerTask('default', ['clean','babel']);
  grunt.registerTask('serve', ['clean', 'syncConstants', 'babel', 'eslint', 'webpack:dev', 'chmod', 'watch']);
} 