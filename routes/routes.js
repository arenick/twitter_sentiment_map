"use strict";
const express = require("express");
const router = express.Router();
const https = require('https');
const request = require('request'); 
const pd = require('paralleldots');

const emotion = require('paralleldots/apis/emotion');

var Twit = require("twit");

  var T = new Twit({
    consumer_key: process.env.consumer_key,
    consumer_secret: process.env.consumer_secret,
    access_token: process.env.access_token,
    access_token_secret: process.env.access_token_secret,
     strictSSL: true,
 });


 const states =  {
    "AL": "288de3df481163e8", 
    "AK": "07179f4fe0500a32",
    "AZ": "a612c69b44b2e5da",
    "AR": "e8ad2641c1cb666c",
    "CA": "fbd6d2f5a4e4a15e",
    "CO": "e21c8e4914eef2b3",
    "CT": "e86b380cfefcced5",
    "DE": "3f5897b87d2bf56c",
    "FL": "4ec01c9dbc693497",
    "GA": "7142eb97ae21e839",
    "HI": "9dafd05b1158873b",
    "ID": "4723507d8ce23a60",
    "IL": "f54a2170ff4b15f7",
    "IN": "1010ecfa7d3a40f8",
    "IA": "3cd4c18d3615bbc9",
    "KS": "27c45d804c777999",
    "KY": "6ffcf3b0b904bbcb",
    "LA": "1c73ebb264e145ee",
    "ME": "463f5d9615d7d1be",
    "MD": "dea1eac2d7ef8878",
    "MA": "cd450c94084cbf9b",
    "MI": "67d92742f1ebf307",
    "MN": "9807c5c5f7a2c6ce",
    "MS": "43d2418301bf1a49",
    "MO": "2526edd24c06e60c",
    "MT": "d2ddff69682ae534",
    "NE": "ac9b9070f6d17a9a",
    "NV": "d374fb61a20fb74f",
    "NH": "226b21641df42460",
    "NJ": "65b4760a2b411e11", 
    "NM": "71d65c0e6d94efab",
    "NY": "27485069891a7938",
    "NC": "3b98b02fba3f9753",
    "ND": "7d893ca2441b0c21",
    "OH": "de599025180e2ee7",
    "OK": "bd3d2074a33fbd06",
    "OR": "df7fd3a3b9eff7ee",
    "PA": "dd9c503d6c35364b",
    "RI": "6d50765616ee2e60",
    "SC": "6057f1e35bcc6c20",
    "SD": "d06e595eb3733f42",
    "TN": "7f7d58e5229c6b6c",
    "TX": "e0060cda70f5f341",
    "UT": "1879ace9e02ace61",
    "VT": "9aa25269f04766ab",
    "VA": "5635c19c2b5078d1",
    "WA": "bc3a38d3d5999b4b",
    "WV": "2d83c71ce16cd187",
    "WI": "7dc5c6d3bfb10ccc",
    "WY": "5669366953047e51"
}

const smallStates = {
    "AL": "288de3df481163e8", 
    "AZ": "a612c69b44b2e5da",
    "AR": "e8ad2641c1cb666c",
    "WA": "bc3a38d3d5999b4b",
    "CA": "fbd6d2f5a4e4a15e",
    "MI": "67d92742f1ebf307",
}


var globalStore = {
    "AL": {}, 
    "AK": {},
    "AZ": {},
    "AR": {},
    "CA": {},
    "CO": {},
    "CT": {},
    "DE": {},
    "FL": {},
    "GA": {},
    "HI": {},
    "ID": {},
    "IL": {},
    "IN": {},
    "IA": {},
    "KS": {},
    "KY": {},
    "LA": {},
    "ME": {},
    "MD": {},
    "MA": {},
    "MI": {},
    "MN": {},
    "MS": {},
    "MO": {},
    "MT": {},
    "NE": {},
    "NV": {},
    "NH": {},
    "NJ": {}, 
    "NM": {},
    "NY": {},
    "NC": {},
    "ND": {},
    "OH": {},
    "OK": {},
    "OR": {},
    "PA": {},
    "RI": {},
    "SC": {},
    "SD": {},
    "TN": {},
    "TX": {},
    "UT": {},
    "VT": {},
    "VA": {},
    "WA": {},
    "WV": {},
    "WI": {},
    "WY": {},
    "selectedState": {}
}

 let iterator = 0; 

 let saveState =  ((key, stateName) => {
 return new Promise((resolve, reject) => {
    T.get('search/tweets', {q: `place:${key}`, count: 10, result_type: "popular"}, function(err, data, response) {
        
        if(err){
            console.log(err); 
            reject(err); 
            throw(err);
        }
        else{
            //console.log(data);
            let textArr = [stateName];
            for(let i = 0; i < data.statuses.length; i++){
                textArr.push(data.statuses[i].text); 
            }
            //console.log(textArr);
            //console.log(data.statuses[0].place.full_name);
        
            globalStore[stateName].data = data; 
            globalStore[stateName].statuses = data.statuses;
            globalStore[stateName].text = textArr;
            //console.log(globalStore[stateName]);
            resolve(textArr);
            return data; 
        }

});

 });
 });

let parrellDotsCall = (response, timer) => {
    //console.log(response);
    setTimeout(function(){ 
        let emotionArr = [] 
        for(let i = 1; i < 6; i++){
         let tweet = response[i];

            emotion(tweet,"en", 'tS1eyB0dc50cFmtNbr5o5YjMDyxMdlCW7FKwuBaOzAo')
        .then((response) => {
            console.log(response);
            emotionArr.push(response); 
        })
        .catch((error) => {
            console.log(error);
        }); 

        globalStore[response[0]].emotions = emotionArr; 
};
    }, timer);
}

let t2s = (response) => {
        let state = response[0];
        response.shift(); 
        
        for(let i = 0; i < response.length; i++){
            globalStore[state].sentiment = [];
            let entry = response[i]; 
            let urlReplace = entry.replace(/(?:https?|ftp):\/\/[\n\S]+/gi, '');
            let specialReplace = urlReplace.replace(/[^a-zA-Z0-9]/gi, "+");
            let params = specialReplace.replace(/\s/gi , "+"); 
            request(`http://www.datasciencetoolkit.org/text2sentiment/${params}`, (err, res, body) => {
                console.log(JSON.parse(body));
                globalStore[state].sentiment.push(JSON.parse(body));
            });
        }  
                       
}

 function intializeGetter() {
    let smallStateKeys = Object.keys(smallStates);//for testing 
    let stateKeys = Object.keys(states);
    for(let i = 0; i < smallStateKeys.length; i++){
        let timer = 30000 * i;
        saveState(smallStates[smallStateKeys[i]], smallStateKeys[i]).then((response) => {
           t2s(response); 
        }); 
    }
 }
 intializeGetter(); 

 function inter() { 
     iterator++; 
    console.log(`Hello!!!!   ${iterator}`);
    let smallStateKeys = Object.keys(smallStates);//for testing 
    let stateKeys = Object.keys(states);
    for(let i = 0; i < smallStateKeys.length; i++){
        saveState(smallStates[smallStateKeys[i]], smallStateKeys[i]); 
    }
     }
    setInterval(inter, 60000);

var tList = null;

var sanFransico = [ '-122.75', '36.8', '-121.75', '37.8'];

router.get("/state/:theState/", (req, res) => {
    // console.log(req); 
    let code = req.params.theState
    T.get('search/tweets', {q: `place:${code}`, count: 5, result_type: "popular"}, function(err, data, response) {
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



// var houston = '-95.37 29.7';
// T.get('search/tweets', {q: 'since:2017-04-04', geocode: '37.781157 -122.398720 1mi'},  (err, data, response) => {
//     console.log(response + "  response");
//     console.log(data + "   data");
//     console.log(err + "  error");
//   });

router.get("/test", (req, res) => {
    res.send(globalStore);
})

var houston = [ '-95.37', '29.7', '-94.37', '30.7']
router.get("/search/all/:usState/:stateName", (req,res) => {
    // T.get('geo/search', {query: "Midwest"}, (err, data, response) => {
    //     console.log(response);
    //     console.log(data);
    //     console.log(err);
    //     res.send(data);
    // }); 


//    console.log(req.params.stateName + "  Pay Attention Pay");


    let state = req.params.usState; 
    let stateName = req.params.stateName;

T.get('search/tweets', { q: `place:${state}`, count: 10, result_type: "popular"}, function(err, data, response) {
   //console.log(data);
//    console.log(stateName);
  let textArr = [];
  let obj = {};
  if(!data){
    // console.log("error:      " + data)
  }
  else{
    for(let i = 0; i < data.statuses.length; i++){
        textArr.push(data.statuses[i].text);
    
}
}

//   obj.current_state = req.params;
  
  obj.stateName = stateName; 
  obj.data = data; 
  obj.statuses = data.statuses;
  obj.text = textArr; 
 // console.log(obj);
  res.send(obj); 
 });

});

module.exports = router;

// const searchReddit = (subreddit) => {
//     const sub = document.querySelector("#subreddit").value;
//     const url = `https://www.reddit.com/r/${sub}.json`;
//     getRequest(url).then((data) => {
//       const jsonObj = JSON.parse(data);
//       console.log(jsonObj);
//     }).catch((error) => {
//       console.log(error);
//     })
//   }
  
//   function getRequest(url) {
//     return new Promise((resolve, reject) => {
//       const xhr = new XMLHttpRequest();
//       xhr.open("GET", url);
//       xhr.onload = () => {
//         resolve(xhr.responseText);
//       };
//       xhr.onerror = () => {
//         reject(xhr.statusText);
//       };
//       xhr.send();
//     });
//   };