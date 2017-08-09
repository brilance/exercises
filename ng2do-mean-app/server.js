//based on tutorial at http://thejackalofjavascript.com/developing-a-mean-app-with-angular-2-0/

const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const cors = require('cors');

//require routes
const index = require('./routes/index');
const todos = require('./routes/todos');

const app = express();

//view engine for this exercise: ejs
/*app.set('views', path.join(__dirname, 'quickstart'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);*/

//middleware
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'quickstart')));

//map routes to endpoints
app.use('/', index);
app.use('/api/v1/', todos);

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