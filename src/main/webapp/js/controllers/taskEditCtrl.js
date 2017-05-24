angular
.module('app')

.controller('taskEditCtrl', taskEditCtrl)

taskEditCtrl.$inject = ['$scope', 'Data', '$location', '$stateParams', '$templateCache', '$templateRequest', 'toastr', 'Notification'];

function taskEditCtrl($scope, Data, $location, $stateParams, $templateCache, $templateRequest, toastr, Notification) {

	var openedToasts = [];
	
	if($stateParams.id > 0){
		Data.get('task/getTask/'+$stateParams.id).then(function(result){
			$scope.task = result.data;
		});   
	}

	

	$scope.save = function(task){  		
		if(task.id == undefined){
			task.id=0;
		};

	
			if (task.id > 0){
				Data.put('task/edit', task).then(function (result) {
					if(result.status == 200){
						task.id=result.data;
						openedToasts.push(toastr[Notification.options.type]("", "Registro salvo com sucesso!"));
						$location.path("/tasks");
					}else{
						openedToasts.push(toastr[Notification.options.type]("", "Ocorreu um erro, tente novamente."));
					}
				});
			}else{
				Data.post('task/save', task).then(function (result) {
					if(result.status == 200){
						task.id=result.data;
						openedToasts.push(toastr[Notification.options.type]("", "Registro salvo com sucesso!"));
						$location.path("/tasks");
					}else{
						openedToasts.push(toastr[Notification.options.type]("", "Ocorreu um erro, tente novamente."));
					}
				});
			}
		

	};


};