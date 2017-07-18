import {$http} from './xhr-factory';
import {Todo} from './todo';

export const TodoFactory = {

	getAll: function(){
		return $http.get('/api/v1/todos');
	},

	get: function(id:string){
		return $http.get('/api/v1/todo/'+id);
	},

	save: function(todo:Todo){
		return $http.post('/api/v1/todo', todo);
	},

	update: function(todo:Todo){
		return $http.put('/api/v1/todo/'+todo._id, todo);
	},

	delete: function(id:string){
		return $http.delete('/api/v1/todo/'+id);
	}
	
};