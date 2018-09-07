"use strict";
var Twit = require("twit")
var T = new Twit({
    consumer_key:"sXog1WOrtuXuXwVscXZAuF1je",
   consumer_secret:"3Eloweb4qIuTYVNzkN9oEd48oVEOYRyGiwaQ7CZtGPIVfDd3JO",
   access_token: "98767917-QoSIeOafCk7CzkH1bn91c7Abs1NCrlxDlEqcA6Vt9",
   access_token_secret: "SP8pVezpLVA6i6oRfUR4MbPsNrd5I6G4IkWviRP8eOr4h",
    strictSSL: true,
});

var sanFrancisco = ['-122.75', '36.8', '121.75', '37.8']

var stream = T.stream('statuses/filter', {
    locations: sanFrancisco
})

stream.on('tweet', function(tweet){
    console.log(tweet)
})
