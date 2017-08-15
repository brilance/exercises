const request = require('request'); // "Request" library
const express = require('express');
const router = express.Router();
let token = null;

//GET all todos
router.get('/artist', function(req, res, next){
    getAuth().
    then((token)=>{
        if (req.query.searchTerm){
            const options = {
                url: `https://api.spotify.com/v1/search?q=artist:${req.query.searchTerm}&type=artist`,
                headers: {
                    'Authorization': 'Bearer ' + token
                },
                json: true
            };
            request.get(options, function(error, response, body) {
                res.json(body.artists.items);
            });
        }
    });
});

function getAuth(){
    if (token !== null){
        return Promise.resolve(token);
    }
    else{
        return new Promise((resolve, reject) => {
            // application requests authorization
            const client_id = 'b8ff75c9ee1c42c79daae3cffe3465fd'; // Your client id
            const client_secret = '9802e5ac83a34152a63095634488b6ba'; // Your secret

            const authOptions = {
                url: 'https://accounts.spotify.com/api/token',
                headers: {
                    'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
                },
                form: {
                    grant_type: 'client_credentials'
                },
                json: true
            };

            request.post(authOptions, function(error, response, body) {
                if (!error && response.statusCode === 200) {
                    // use the access token to access the Spotify Web API
                    const token = body.access_token;
                    resolve(token);
                }
                else{
                    reject(error);
                }
            });
        })
    }
}

module.exports = router;
    