"use strict";

function TwitterService ($http, $sce, $timeout) {
    const vm = this;

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
    

    let deStringify = function(obj) {
        // console.log(obj);
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        // console.log(p); 
        return str.join("&");
    }


    vm.topEmotion = (emotionArr) => {
        let counts = {};
        let compare = 0;
        let mostFrequent = 0;
        let stateEmotion = emotionArr; 
        // console.log(emotionArr.length);
        for(let i = 0, len = stateEmotion.length; i < len; i++){
            // console.log("running");
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
            // console.log(stateEmotion);
            // console.log(mostFrequent);
            return mostFrequent;
    }

    vm.loop = (entry, aggregator) => {
    
        let sentimentCollector = aggregator;                   
        let urlReplace = entry.replace(/(?:https?|ftp):\/\/[\n\S]+/gi, '');
        let specialReplace = urlReplace.replace(/[^a-zA-Z0-9]/gi, "+");
        let params = specialReplace.replace(/\s/gi , "+");            
 
        let url = `http://www.datasciencetoolkit.org/text2sentiment/${params}`;
        
        let trust = $sce.trustAsResourceUrl(url); 
        return $http.jsonp(trust, {params : params}).then((rep) => {
           //console.log(rep); 
           sentimentCollector.push(rep.data.score);
           //console.log(sentimentCollector);
           return sentimentCollector;
       
        });
    }

    vm.averager = (arr) => {
           //  console.log(ret); 
                //  console.log(ret.length); 
                let ret = arr; 
                let avgCol = 0
                let i = 1
                let notZero = 0

                for(i; i < ret.length; i++){
                   //  console.log(i + "   i");
                   //  console.log(ret[i] + "  ret[i]");
                   //  console.log(avgCol + "   avgCol"); 
                    if(ret[i] === 0){

                    }
                    else{
                        avgCol  += ret[i];
                        notZero++
                       }
                    
                }
               //  console.log(avgCol);
               //  console.log(notZero); 
                let avg = avgCol / notZero; 
                return avg; 
               //  console.log(avg + "   average"); 
    }

    vm.averageSorter = (num, returned) => {
        let avg = num; 
        let ret = returned; 

        if(avg > 0){
            let upAvg = avg * 100; 
            let lightness = 180 - (Math.log(avg) * 2); 
            // console.log(avg + "  " + upAvg + "   " + ret[0]);
            // console.log(typeof lightness + "  " + lightness);
            let color = `rgba(82, ${lightness}, 93, 0.6)`;  
            simplemaps_usmap_mapdata.state_specific[ret[0]].color = color; 
            simplemaps_usmap.refresh(); 
        }
         else if(avg < 0){
            let color = "rgba(255, 51, 81, 1)";
            simplemaps_usmap_mapdata.state_specific[ret[0]].color = color; 
            simplemaps_usmap.refresh(); 
         }
         else if(avg === 0){
             let color = "rgba(255, 210, 27, 1)";
             simplemaps_usmap_mapdata.state_specific[ret[0]].color = color; 
             simplemaps_usmap.refresh(); 
         }
    }

 

  

    vm.getAllTweets = () => {
        
        let textSentimentApi = (usState, stateName) => {  
            return $http({
            method: "POST",
            url: "/search/all/" + usState + "/" + stateName,
            headers: {
                'Content-Type': undefined
              }, 
            data: {'test': stateName}
         }).then((response) => {

            //  console.log(response.data);
             
             let sentimentCollector = [response.data.stateName];
       
             let averageArr = [];
             
             let promise = new Promise((resolve, reject) => {
             for(let i = 0; i < response.data.text.length; i++){
               averageArr = vm.loop(response.data.text[i], sentimentCollector);  
             }

            // console.log(response);

             //console.log(averageArr); 
             resolve(averageArr);  
             }).then((ret) => {
                let avg = vm.averager(ret); 
                vm.averageSorter(avg, ret);

             }).catch((error) => {
                 console.log(error); 
                throw error; 
             });

            // console.log(promise);
            return vm.tweets = response;                

         });
        }
        
        let smallStateKeys = Object.keys(smallStates);//for testing 
        let stateKeys = Object.keys(states); 
        // console.log(smallStateKeys.length);
        for(let i = 0; i < stateKeys.length; i++){

            // let state = states.stateKeys[i]; 
            textSentimentApi(smallStates[smallStateKeys[i]], smallStateKeys[i]); 

        }
        }
        vm.getAllTweets();
  
   
    vm.getState = (state) => {
        let theState = states[state]; 
        console.log(theState);
   
        return $http({
            method: "GET",
            url: "/state/" + theState
        }).then((response) => {
            const p = new Promise((resolve, reject) => {
                vm.stateData = { emotion: [], text: []};
                for (let i = 0; i < response.data.text.length; i++) {
                    vm.loopThroughTweets(response.data.text[i]);
                }
                resolve(vm.stateData);
            });
            p.then((response) => {
                console.log(response); 
                let emData = vm.topEmotion(response);
                console.log(emData); 
                return response;
            });
            return p;
            // vm.topEmotion(vm.stateEm);
        });
        // return twitterCall;
    };
    // vm.stateEm = [];
    vm.stateData = { emotion: [], text: []};
    vm.loopThroughTweets = (tweet) => {
        return $http({
            // "async": true,
            // "crossDomain": true,
            url: "https://apis.paralleldots.com/v3/emotion",
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
                'text': tweet,
                'api_key': 'tS1eyB0dc50cFmtNbr5o5YjMDyxMdlCW7FKwuBaOzAo'
            },
            transformRequest: deStringify
        }).then((response) => {
            vm.stateData.emotion.push(response.data.emotion);
            vm.stateData.text.push(response.config.data.text);
        });
    };

// To Embed Tweets- Still Being Worked Out

    vm.embedTweets = (state) => {
        let theState = states[state];
        return $http({
            method: "GET",
            url: "/state/" + theState
        }).then((response) => {
            console.log(response);
            return response;
            // console.log(response.data.statuses[0].entities.urls[0].expanded_url)
            // let tweetUrl = response.data.statuses[0].entities.urls[0].expanded_url
            // return $http({
            //     method: "GET",
            //     url: `https://publish.twitter.com/oembed?url=${tweetUrl}`
            // }).then((response) => {
            //     console.log(response)
            //     return response
            // });
        
        })
    }
// vm.embedTweets("MI");
}

    angular
        .module("App")
        .service("TwitterService", TwitterService)



