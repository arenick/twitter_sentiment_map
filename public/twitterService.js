"use strict";

function TwitterService ($http, $sce) {
    const vm = this;

    let deStringify = function(obj) {
        console.log(obj);
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        console.log(str); 
        return str.join("&");
    }

    vm.topEmotion = (emotionArr) => {
        let counts = {};
        let compare = 0;
        let mostFrequent = 0;
        console.log(emotionArr.length);
        for(let i = 0, len = stateEmotion.length; i < len; i++){
            console.log("running");
            let word = vm.stateEmotion[i];
            if (counts[word] === undefined){
                counts[word] = 1;
            } else {
                counts[word] = counts[word] + 1;
            }
            if (counts[word] > compare){
                compare = counts[word];
                mostFrequent =  stateEmotion[i];
            }
        }
            console.log(stateEmotion);
            console.log(mostFrequent);
            return mostFrequent;
    }

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
        "Wisconsin": "7dc5c6d3bfb10ccc",
        "Wyoming": "5669366953047e51"
    }
    

    vm.getAllTweets = () => {

        let textSentimentApi = (usState) => {  
            return $http({
            method: "GET",
            url: "/search/all/" + usState
         }).then((response) => {
             console.log(response.data);
             let data = {}; 
             let sentimentArray = [];
             let loop = (entry) => {
                 console.log(entry);
                 let urlReplace = entry.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
                 let specialReplace = urlReplace.replace(/[^a-zA-Z0-9]+\s/g, "+");
                 let hashReplace = specialReplace.replace(/#/g, "+")
                 let params = hashReplace.replace(/\s/g , "+");            
            
                 let url = `http://www.datasciencetoolkit.org/text2sentiment/${params}`;
                 
                 let trust = $sce.trustAsResourceUrl(url); 
                 return $http.jsonp(trust, {params : params}).then((rep) => {
                     console.log(rep); 
                 });
             }
             for(let i = 0; i < response.data.text.length; i++){
                 loop(response.data.text[i]); 
                 
             }
            return vm.tweets = response;                
         });
        }
        

        let stateKeys = Object.keys(states); 
        console.log(stateKeys + "  " + stateKeys.length);
        for(let i = 0; i < stateKeys.length; i++){
            // let state = states.stateKeys[i]; 
            console.log(typeof stateKeys[i]); 
            console.log(states[stateKeys[i]]);
            textSentimentApi(states[stateKeys[i]]); 
        }

        
        }


        vm.getAllTweets();














    
    vm.getMichigan = ($scope) => {
        return $http({
           method: "GET",
           url: "/state", 
        }).then((response) => {
            let stateEmotion = []; 
            let stateEm = null; 
            let sentimentArray = [];
            let loop = (entry) => {
                return $http({
                    // "async": true,
                    // "crossDomain": true,
                    url: "https://apis.paralleldots.com/v3/emotion",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        'text': entry,
                        'api_key': 'DZEgFpGj5tlOGYaIYZ2hQAjDy2ARxY98tLs2Gsepptw'
                    },
                    transformRequest: deStringify
                    }).then((response) => {
                stateEmotion.push(response.data.emotion);
                console.log(stateEmotion);
                let counts = {};
                let compare = 0;
                let mostFrequent = 0;
                console.log(stateEmotion.length);
                for(let i = 0, len = stateEmotion.length; i < len; i++){
                    let word = stateEmotion[i];
                    if (counts[word] === undefined){
                        counts[word] = 1;
                    } else {
                        counts[word] = counts[word] + 1;
                    }
                    if (counts[word] > compare){
                        compare = counts[word];
                        mostFrequent =  stateEmotion[i];
                    }
            }
            console.log(stateEmotion);
            console.log(mostFrequent);
            return mostFrequent;

                return stateEmotion;
                }).catch((error) => {
                    console.log(error);
                });
            }

            for(let i = 0; i < response.data.text.length; i++){
            let stateEm =  loop(response.data.text[i]); 
            console.log(stateEm); 
            }
            return stateEmotion;
                       
           }).then((ret) => {
            console.log(ret); 
           }).catch((error) => { 
               console.log(error);
           });  
        }
       



}

// vm.store = () => {
//     let counts = {};
//     let compare = 0;
//     let mostFrequent = 0;
//     console.log(stateEmotion.length);
//         for(let i = 0, len = stateEmotion.length; i < len; i++){
//             console.log("running");
//             let word = vm.stateEmotion[i];
//             if (counts[word] === undefined){
//                 counts[word] = 1;
//             } else {
//                 counts[word] = counts[word] + 1;
//             }
//             if (counts[word] > compare){
//                 compare = counts[word];
//                 mostFrequent =  stateEmotion[i];
//             }
//         }
//         console.log(stateEmotion);
//         console.log(mostFrequent);
//         return mostFrequent;
// }
    // vm.store = () => {
    //     console.log(stateEmotion);
    //     // vm.stateEmotion = ["apple","pear","grapes","apple","apple"];
    //     let counts = {};
    //     let compare = 0;
    //     let mostFrequent = 0;
    //     console.log(stateEmotion.length);
    //         for(let i = 0, len = stateEmotion.length; i < len; i++){
    //             let word = vm.stateEmotion[i];
    //             if (counts[word] === undefined){
    //                 counts[word] = 1;
    //             } else {
    //                 counts[word] = counts[word] + 1;
    //             }
    //             if (counts[word] > compare){
    //                 compare = counts[word];
    //                 mostFrequent =  stateEmotion[i];
    //             }
    //         }
    //         console.log(stateEmotion);
    //         console.log(mostFrequent);
    //         return mostFrequent;
    // }

angular
.module("App")
.service("TwitterService", TwitterService)


