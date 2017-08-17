const path = require('path');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');

const artists = require('./routes/artists');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//middleware
app.use(logger('tiny'));

app.use('/api/v1/', artists);
app.use(express.static(__dirname + '/client/dist/'));

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