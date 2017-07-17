const express = require('express');
const mongoClient = require('mongodb').MongoClient;

const app = express();

const url = "mongodb://localhost:27017";

app.route('/inventory').get(function(req, res){
	mongoClient.connect(url, function(err, db){
		let htmlStr = "";
		let cursor = db.collection('inventory').find();
		cursor.forEach(item => htmlStr += `<div>${JSON.stringify(item)}</div>`);
		setTimeout(function(){res.send(htmlStr)}, 500);//should use promises for this
		db.close();
	});
});

var server = app.listen(3000, ()=>{});