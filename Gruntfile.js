module.exports = function (grunt) {
  // Automatically add all installed grunt tasks
  require('jit-grunt')(grunt);

  grunt.initConfig({
    babel: {
      options: {
        sourceMap: true,
        presets: ['env']
      },
      dist: {
        files: [
            {
                expand: true,
                cwd: 'utils/',
                src: ['*.js'],
                dest: 'compiled/'
            }
        ]
      }
    },

    eslint: {
      options: {
        configFile: './.eslintrc.js',
        silent: true
      },
      src: ['./utils/*.js', '!./node_modules/**/*.js']
    },

    watch: {
      utils: {
        files: ['utils/*.js'],
        tasks: ['eslint', 'babel']
      }
    }
  });

  grunt.loadNpmTasks("gruntify-eslint");

  grunt.registerTask('default', ['babel']);
  grunt.registerTask('serve', ['babel', 'eslint', 'watch']);
}