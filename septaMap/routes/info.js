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
        if (body && body.bus){
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

router.get('/route/:id/stop/', function(req, res, next){
    const routeID = req.params.id;
    const lat = req.query.lat;
    const long = req.query.long
    const options = {
        url: `http://www3.septa.org/hackathon/Stops/${routeID}`,
        json: true
    };
    let longDelta = 10;
    let latDelta = 10;
    let closestIdx = -1;
    let idx = -1;
    request.get(options, function(error, response, body) {
        if (body){
            for (item of body){
                idx++;
                const bodyLat = item["lat"];
                const bodyLong = item["lng"];
                const newLatDelta = Math.abs(lat-bodyLat);
                const newLongDelta = Math.abs(long-bodyLong);

                if (newLatDelta < latDelta && newLongDelta < longDelta){
                    latDelta = newLatDelta;
                    longDelta = newLongDelta
                    closestIdx = idx;
                }
            }
            res.json(body[closestIdx]);
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