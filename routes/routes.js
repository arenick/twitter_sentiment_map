"use strict";
const express = require("express");
const router = express.Router();
const twitAPI = require("../.env");



var Twit = require("twit")
var T = new Twit({
   consumer_key: twitAPI.consumer_key,
   consumer_secret:twitAPI.consumer_secret,
   access_token: twitAPI.access_token,
   access_token_secret: twitAPI.access_token_secret,
    strictSSL: true,
});

var tList = null;

var sanFransico = [ '-122.75', '36.8', '-121.75', '37.8']




// var houston = '-95.37 29.7';
// T.get('search/tweets', {q: 'since:2017-04-04', geocode: '37.781157 -122.398720 1mi'},  (err, data, response) => {
//     console.log(response + "  response");
//     console.log(data + "   data");
//     console.log(err + "  error");
//   });


var houston = [ '-95.37', '29.7', '-94.37', '30.7']
router.get("/search", (req,res)=>{

    T.get('geo/search', {query: "Detroit"}, (err, data, response) => {
        console.log(response);
        console.log(data);
        console.log(err);
        res.send(data);
    });

T.get('search/tweets', { q: 'place:67d92742f1ebf307'}, function(err, data, response) {
   
  res.send(data);
 });
});

module.exports = router;

