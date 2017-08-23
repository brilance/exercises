const request = require('request'); // "Request" library
const express = require('express');
const router = express.Router();

router.get('/route/:id', function(req, res, next){
    const routeID = req.params.id;
    const options = {
        url: `http://www3.septa.org/beta/TransitView/${routeID}`,
        json: true
    };
    request.get(options, function(error, response, body) {
        if (body.bus){
            res.json(body.bus);
        }
        else{
            const error = {
                error:true,
                errorMsg:"Invalid route"
            }
            res.json(error);
        }
    });
});

module.exports = router;