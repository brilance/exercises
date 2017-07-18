const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');
const db = mongojs('mongodb://localhost:27017/ng2todoapp', ['todos']);

//GET all todos
router.get('/todos', function(req, res, next){
	db.todos.find(function(err, todos){
		if (err){
			res.send(err);
		}
		else{
			res.json(todos);
		}
	});
});

//GET todo with given id
router.get('/todo/:id', function(req, res, next){
	db.todos.findOne({
		_id: mongojs.ObjectId(req.params.id)	
	}, function(err, todos){
		if (err){
			res.send(err);
		}
		else{
			res.json(todos);
		}
	});
});

//POST a new todo
router.post('/todo', function(req, res, next){
	const todo = req.body;
	if (!todo.text || !(todo.isCompleted + '')) {
		res.status(400);
		res.json({
			'error':"Invalid Data"
		});
	}
	else{
		db.todos.save(todo, function(err, result){
			if (err){
				res.send(err);
			}
			else{
				res.json(result);
			}
		});
	}
});

//PUT a todo to update
router.put('/todo/:id', function(req, res, next){
	const todo = req.body;
	const updObj = {};

	if (todo.isCompleted){
		updObj.isCompleted = todo.isCompleted;
	}
	if (todo.text){
		updObj.text = todo.text;
	}

	if (!updObj.text || !updObj.isCompleted+''){
		res.status(400);
		res.json({
			"error":"Invalid Data"
		});
	}
	else{
		db.todos.update({
			_id:mongojs.ObjectId(req.params.id)
		}, updObj, {}, function(err, result){
			if (err){
				res.send(err);
			}
			else{
				res.json(result);
			}
		});
	}
});

//DELETE a todo
router.delete('/todo/:id', function(req, res){
	db.todos.remove({
		_id:mongojs.ObjectId(req.params.id)
	}, '', function(err, result){
		if (err){
			res.send(err);
		}
		else{
			res.json(result);
		}
	});
});

module.exports = router;