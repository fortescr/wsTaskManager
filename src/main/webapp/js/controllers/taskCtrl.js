	angular
    .module('app')

    .controller('taskCtrl', taskCtrl)


taskCtrl.$inject = ['$scope', 'Data', 'toastr', 'Notification'];

function taskCtrl($scope, Data, toastr, Notification) {
	
	var openedToasts = [];

	$scope.getTasks = function(){
	  	Data.get('task/tasks').then(function(result){
			 if(result.status == 200) {
			   $scope.tasks = result.data;
			 }
		});
	};
  	$scope.remove = function(task){
  		Data.put('task/remove', task).then(function (result) {
			if(result.status == 200){
				openedToasts.push(toastr[Notification.options.type]("", "Registro excluido com sucesso!"));
				$scope.getTasks();
			}
		});
	};
	
	$scope.status = function(task){
  		Data.put('task/status', task).then(function (result) {
			if(result.status == 200){
				openedToasts.push(toastr[Notification.options.type]("", "Status alterado com sucesso!"));
			}else{
				openedToasts.push(toastr[Notification.options.type]("", "Ocorreu um erro, tente novamente."));
			}
		});
	};
	
	$scope.getTasks();
};