const express = require('express');
const router = express.Router();

//GET home page
router.get('/', function(req, res, next){
	res.render('src/index.html');
});

module.exports = router;