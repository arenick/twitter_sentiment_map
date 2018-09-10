"use strict";

const twitAPI = require("../.env");

var Twit = require("twit")
var T = new Twit({
   consumer_key: twitAPI.consumer_key,
   consumer_secret:twitAPI.consumer_secret,
   access_token: twitAPI.access_token,
   access_token_secret: twitAPI.access_token_secret,
    strictSSL: true,
});

var tList

var sanFransico = [ '-122.75', '36.8', '-121.75', '37.8']

var houston = [ '-95.37', '29.7', '-94.37', '30.7']
T.get('search/tweets', { q: sanFransico, count: 2 }, function(err, data, response) {
    console.log(data)
  })
