const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//require routes
const index = require('./routes/index');
const twits = require('./routes/twits');

const app = express();

app.set('views', path.join(__dirname, 'app'));

//middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'app')));

//map routes to endpoints
app.use('/', index);
app.use('/api/v1/', twits);

//error handling
app.use(function(req, res, next){
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

//create server
const server = app.listen(3000, () => {
	const host = 'localhost';
	const port = server.address().port;
	console.log(`App listening at http://${host}:${port}`, host, port);
});

module.exports = app;


