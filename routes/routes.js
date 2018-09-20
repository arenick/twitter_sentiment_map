"use strict";
const express = require("express");
const router = express.Router();
const https = require('https');
const request = require('request'); 
const pd = require('paralleldots');

const emotion = require('paralleldots/apis/emotion');

var Twit = require("twit");

  var T = new Twit({
    consumer_key: process.env.Consumer_Key,
    consumer_secret: process.env.Consumer_Secret,
    access_token: process.env.Access_Token,
    access_token_secret: process.env.Access_Token_Secret,
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

// these objects store all the tweets for each state. refreshes every 16 minutes
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

// averages the scores for all 5 tweets and returns an overall score for each state

let averager = (arr) => {

    let ret = arr; 
    let averagedState = ret[0];
    ret.shift();
    let avgCol = 0
    let i = 1
    let notZero = 0

    for(i; i < ret.length; i++){
        if(ret[i] === 0){

        }
        else{
            avgCol  += ret[i];
            notZero++
           }
        }
    let avg = avgCol / notZero; 
    globalStore[averagedState].avg = avg; 
}

 let iterator = 0; 

 let saveState =  ((key, stateName) => {
 return new Promise((resolve, reject) => {
    T.get('search/tweets', {q: `place:${key}`, count: 10, result_type: "popular"}, function(err, data, response) {
        
        if(err){
            console.log(typeof err); 
            reject(err); 
        }
        else{
            let textArr = [stateName];
            for(let i = 0; i < data.statuses.length; i++){
                textArr.push(data.statuses[i].text); 
            }
        
            globalStore[stateName].data = data; 
            globalStore[stateName].statuses = data.statuses;
            globalStore[stateName].text = textArr;
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
        console.log(response);
        console.log(globalStore);
        if(response == null){
            return;
        }
        let state = response[0];
        response.shift(); 
        let scoreArr = [state]; 
        globalStore[state].sentiment = [];
        
        for(let i = 0; i < response.length; i++){
            let entry = response[i]; 
            let urlReplace = entry.replace(/(?:https?|ftp):\/\/[\n\S]+/gi, '');
            let specialReplace = urlReplace.replace(/[^a-zA-Z0-9]/gi, "+");
            let params = specialReplace.replace(/\s/gi , "+"); 
            request(`http://www.datasciencetoolkit.org/text2sentiment/${params}`, (err, res, body) => {
                console.log(typeof body); 
                if(!body || typeof body == "undefined"){
                    let rwo = Math.random();
                    let theNum = Math.random() * 3;  
                    if(rwo < 0.5){
                        theNum = theNum * -1
                    }
                    scoreArr.push(theNum); 
                }
                else if(body.includes("<") || body.includes(">")){
                    let rwo = Math.random();
                    let theNum = Math.random() * 3;  
                    if(rwo < 0.5){
                        theNum = theNum * -1
                    }
                    scoreArr.push(theNum); 
                }
              
                else{
                let scoreJSON = JSON.parse(body);  
                scoreArr.push(scoreJSON.score); 
                console.log(scoreArr);
                }
                });
            
            } 
        
        globalStore[state].sentiment = scoreArr; 
        setTimeout(function(){
            console.log(globalStore[state].sentiment)
            averager(scoreArr);
        }, 10000);       
}

 function intializeGetter() {
    let smallStateKeys = Object.keys(smallStates);//for testing 
    let stateKeys = Object.keys(states);
    for(let i = 0; i < stateKeys.length; i++){
        let timer = 30000 * i;
        saveState(states[stateKeys[i]], stateKeys[i]).then((response) => {
           t2s(response); 
        }).catch((err) => {
            console.log(err + "!!!!!!!!!!!");
        });     
    }
 }
 intializeGetter(); 
 function inter() { 
     iterator++; 
    let smallStateKeys = Object.keys(smallStates);//for testing 
    let stateKeys = Object.keys(states);
    for(let i = 0; i < stateKeys.length; i++){
        saveState(states[stateKeys[i]], stateKeys[i]).then((response) => {
            t2s(response); 
        }).catch((err) => {
            console.log(err + "!!!!!!!!!!!");
        }); 
    }
     }
   setInterval(inter, 960000); 

router.get("/state/:theState/", (req, res) => {
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

router.get("/test", (req, res) => {
    res.send(globalStore);
})

router.get("/search/all/", (req,res) => {
      res.send(globalStore);

});

module.exports = router;
