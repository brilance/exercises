const path = require('path');
const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

const info = require('./routes/info');

//middleware
app.use(logger('dev'));

app.use('/api/v1/', info);
app.use(express.static(__dirname + '/septa-client/dist/'));

//error handling
app.use(function(req, res, next){
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

//create server
const server = app.listen(process.env.PORT || 3000, () => {
	const host = 'localhost';
	const port = server.address().port;
	console.log(`App listening at http://${host}:${port}`, host, port);
});

module.exports = app;