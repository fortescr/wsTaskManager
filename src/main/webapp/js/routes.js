angular
.module('app')
.config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

	$urlRouterProvider.otherwise('/home');

	$ocLazyLoadProvider.config({
		debug: false
	});

	$stateProvider
	.state('app', {
		abstract: true,
		templateUrl: 'views/common/layouts/full.html',
		ncyBreadcrumb: {
			label: 'Root',
			skip: true
		}                
	})

	.state('app.main', {
		url: '/tasks',
		templateUrl: 'views/pages/taskList.html',
		resolve: {     
			loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([				                         
				                         {
				                        	 files: ['js/libs/angular-toastr.tpls.min.js']
				                         }
				                         ]);
			}],
			loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files: ['js/controllers/taskCtrl.js']
				});
			}],                    
		}
	})        
	.state('app.taskEdit', {
		url: '/taskEdit/:id',
		templateUrl: 'views/pages/taskEdit.html',
		resolve: {        
			loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
				return $ocLazyLoad.load([				                         
				                         {
				                        	 files: ['js/libs/angular-toastr.tpls.min.js']
				                         }
				                         ]);
			}],            
			loadMyCtrl: ['$ocLazyLoad', function($ocLazyLoad) {
				return $ocLazyLoad.load({
					files: ['js/controllers/taskEditCtrl.js']
				});
			}]
		}
	})   
}]);
