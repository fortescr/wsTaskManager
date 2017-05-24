module.exports = function(grunt) {
  grunt.initConfig({
	uglify : {
      options : {
        mangle : false
      },

      my_target : {
        files : {
          'wsTaskManager/js/app.min.js' : [ 'js/app.js' ],
		  'wsTaskManager/js/controllers.min.js' : [ 'js/controllers.js' ],
		  'wsTaskManager/js/notificationFactory.min.js' : [ 'js/notificationFactory.js' ],
		  'wsTaskManager/js/routes.min.js' : [ 'js/routes.js' ],
		  'wsTaskManager/js/data.min.js' : [ 'js/data.js' ],
		  'wsTaskManager/js/controllers/taskEditCtrl.min.js' : [ 'js/controllers/taskEditCtrl.js' ],
		  'wsTaskManager/js/controllers/taskListCtrl.min.js' : [ 'js/controllers/taskListCtrl.js' ]		  		  
        }
      }
	}
  });
 
// Plugins do Grunt
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );


  // Tarefas que ser�o executadas
  grunt.registerTask( 'default', [ 'uglify' ] );
};