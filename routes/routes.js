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

var sanFrancisco = ['-122.75', '36.8', '121.75', '37.8']

var stream = T.stream('statuses/filter', {
    locations: sanFrancisco
})

stream.on('tweet', function(tweet){
    console.log(tweet)
})
