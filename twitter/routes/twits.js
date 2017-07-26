const express = require('express');
const router = express.Router();

router.get('/user/:userID/twit', function(req, res, next){
    //TODO get a random tweet from person's timeline
    console.log(req.params.userID);
});

router.get('/user?userSearch=userString', function(req, res, next){
    //TODO look up a user in the twitter API
    console.log(req.query.userString);
});

module.exports = router;