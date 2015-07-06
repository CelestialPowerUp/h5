module.exports = function(grunt) {

  // build task(s).
  grunt.registerTask('build', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

  // test task(s).
  grunt.registerTask('test', 'Log some stuff.', function() {
    grunt.log.write('Logging some stuff...').ok();
  });

};