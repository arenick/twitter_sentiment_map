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

const states =  {
    "Alabama": "288de3df481163e8", 
    "Alaska": "07179f4fe0500a32",
    "Arizona": "a612c69b44b2e5da",
    "Arkansas": "e8ad2641c1cb666c",
    "California": "fbd6d2f5a4e4a15e",
    "Colorado": "e21c8e4914eef2b3",
    "Connecticut": "e86b380cfefcced5",
    "Delaware": "3f5897b87d2bf56c",
    "Florida": "4ec01c9dbc693497",
    "Georgia": "7142eb97ae21e839",
    "Hawaii": "9dafd05b1158873b",
    "Idaho": "4723507d8ce23a60",
    "Illinois": "f54a2170ff4b15f7",
    "Indiana": "1010ecfa7d3a40f8",
    "Iowa": "3cd4c18d3615bbc9",
    "Kansas": "27c45d804c777999",
    "Kentucky": "6ffcf3b0b904bbcb",
    "Louisiana": "1c73ebb264e145ee",
    "Maine": "463f5d9615d7d1be",
    "Maryland": "dea1eac2d7ef8878",
    "Massachusetts": "cd450c94084cbf9b",
    "Michigan": "67d92742f1ebf307",
    "Minnesota": "9807c5c5f7a2c6ce",
    "Mississippi": "43d2418301bf1a49",
    "Missouri": "2526edd24c06e60c",
    "Montana": "d2ddff69682ae534",
    "Nebraska": "ac9b9070f6d17a9a",
    "Nevada": "d374fb61a20fb74f",
    "New Hampshire": "226b21641df42460",
    "New Jersey": "65b4760a2b411e11", 
    "New Mexico": "71d65c0e6d94efab",
    "New York": "27485069891a7938",
    "North Carolina": "3b98b02fba3f9753",
    "North Dakota": "7d893ca2441b0c21",
    "Ohio": "de599025180e2ee7",
    "Oklahoma": "bd3d2074a33fbd06",
    "Oregon": "df7fd3a3b9eff7ee",
    "Pennsylvania": "dd9c503d6c35364b",
    "Rhode Island": "6d50765616ee2e60",
    "South Carolina": "6057f1e35bcc6c20",
    "South Dakota": "d06e595eb3733f42",
    "Tennessee": "7f7d58e5229c6b6c",
    "Texas": "e0060cda70f5f341",
    "Utah": "1879ace9e02ace61",
    "Vermont": "9aa25269f04766ab",
    "Virginia": "5635c19c2b5078d1",
    "Washingston": "bc3a38d3d5999b4b",
    "West Virginia": "2d83c71ce16cd187",
    "Wisconsin": "7dc5c6d3bfb10ccc"
}

const cities = {
    "NY": "27485069891a7938",
    "LA": "3b77caf94bfc81fe",
    "DEN": "b49b3053b5c25bf5",
    "SF": "5a110d312052166f"
}

router.get("/state", (req, res) => {
    console.log(req); 
    T.get('search/tweets', {q: 'place:5635c19c2b5078d1', count: 20, reult_type: "popular"}, function(err, data, response) {
        console.log(data.statuses.length);
        let textArr = []; 
        let obj = {}; 
        for(let i = 0; i < data.statuses.length; i++){
            textArr.push(data.statuses[i].text); 
        }

        obj.data = data; 
        obj.statuses = data.statuses;
        obj.text = textArr; 
        res.send(obj); 
    })
});


// var houston = '-95.37 29.7';
// T.get('search/tweets', {q: 'since:2017-04-04', geocode: '37.781157 -122.398720 1mi'},  (err, data, response) => {
//     console.log(response + "  response");
//     console.log(data + "   data");
//     console.log(err + "  error");
//   });


var houston = [ '-95.37', '29.7', '-94.37', '30.7']
router.get("/search/all", (req,res)=>{

    // T.get('geo/search', {query: "Midwest"}, (err, data, response) => {
    //     console.log(response);
    //     console.log(data);
    //     console.log(err);
    //     res.send(data);
    // });

T.get('search/tweets', { q: 'place:dd9c503d6c35364b', count: 20, result_type: "popular"}, function(err, data, response) {
   
  console.log(data.statuses.length);
  let textArr = [];
  let obj = {};
  for(let i = 0; i < data.statuses.length; i++){
    textArr.push(data.statuses[i].text);
  }

  obj.data = data; 
  obj.statuses = data.statuses;
  obj.text = textArr; 
  res.send(obj); 
 });

});

module.exports = router;

