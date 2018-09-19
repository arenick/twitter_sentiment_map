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

    const avgStore =  {
        "AL": null, 
        "AK": null,
        "AZ": null,
        "AR": null,
        "CA": null,
        "CO": null,
        "CT": null,
        "DE": null,
        "FL": null,
        "GA": null,
        "HI": null,
        "ID": null,
        "IL": null,
        "IN": null,
        "IA": null,
        "KS": null,
        "KY": null,
        "LA": null,
        "ME": null,
        "MD": null,
        "MA": null,
        "MI": null,
        "MN": null,
        "MS": null,
        "MO": null,
        "MT": null,
        "NE": null,
        "NV": null,
        "NH": null,
        "NJ": null, 
        "NM": null,
        "NY": null,
        "NC": null,
        "ND": null,
        "OH": null,
        "OK": null,
        "OR": null,
        "PA": null,
        "RI": null,
        "SC": null,
        "SD": null,
        "TN": null,
        "TX": null,
        "UT": null,
        "VT": null,
        "VA": null,
        "WA": null,
        "WV": null,
        "WI": null,
        "WY": null
    }


    const smallStates = {
        "AL": "288de3df481163e8", 
        "AZ": "a612c69b44b2e5da",
        "AR": "e8ad2641c1cb666c",
        "WA": "bc3a38d3d5999b4b",
        "CA": "fbd6d2f5a4e4a15e",
        "MI": "67d92742f1ebf307",
    }

    vm.fullName = {
        "AL": "Alabama", 
        "AK": "Alaska",
        "AZ": "Arizona",
        "AR": "Arizona",
        "CA": "Califonia",
        "CO": "Colorado",
        "CT": "Connecticut",
        "DE": "Delaware",
        "FL": "Florida",
        "GA": "Georgia",
        "HI": "Hawaii",
        "ID": "Idaho",
        "IL": "Illinois",
        "IN": "Indiana",
        "IA": "Iowa",
        "KS": "Kansas",
        "KY": "Kentucy",
        "LA": "Louisiana",
        "ME": "Maine",
        "MD": "Montana",
        "MA": "Maryland",
        "MI": "Michigan",
        "MN": "Minnesota",
        "MS": "Mississippi",
        "MO": "Misouri",
        "MT": "Montana",
        "NE": "Nebraska",
        "NV": "Nevada",
        "NH": "New Hampshire",
        "NJ": "New Jersey", 
        "NM": "New Mexico",
        "NY": "New York",
        "NC": "North Carolina",
        "ND": "North Dakota",
        "OH": "Ohio",
        "OK": "Oklamhoma",
        "OR": "Oregon",
        "PA": "Pennsylvania",
        "RI": "Rhode Island",
        "SC": "South Carolina",
        "SD": "South Dakota",
        "TN": "Tennessee",
        "TX": "Texas",
        "UT": "Utah",
        "VT": "Vermont",
        "VA": "Virginia",
        "WA": "Washington",
        "WV": "West Virginia",
        "WI": "Wisconsin",
        "WY": "Wyoming"
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
            return mostFrequent;
    }

    vm.averageSorter = (num, state) => {
        let avg = num; 
        let ret = state; 

        if(avg > 3){
            let upAvg = avg * 100; 
            let lightness = 180 - (Math.log(avg) * 2); 
            // console.log(avg + "  " + upAvg + "   " + ret);
            // console.log(typeof lightness + "  " + lightness);
            let color = `#5d91e3`;  
            simplemaps_usmap_mapdata.state_specific[ret].color = color; 
            simplemaps_usmap.refresh_state(ret)
        }
         else if(avg > 2){
            let color = "#52e0bb";
            simplemaps_usmap_mapdata.state_specific[ret].color = color; 
            simplemaps_usmap.refresh_state(ret)
         }
         else if(avg > 1){
             let color = "#52b05d";
             simplemaps_usmap_mapdata.state_specific[ret].color = color; 
             simplemaps_usmap.refresh_state(ret)
         } else if(avg > -1){
            let color = "#ffd21b";
            simplemaps_usmap_mapdata.state_specific[ret].color = color; 
            simplemaps_usmap.refresh_state(ret)
        } else if(avg > -2){
            let color = "#ff951a";
            simplemaps_usmap_mapdata.state_specific[ret].color = color; 
            simplemaps_usmap.refresh_state(ret)
        } else if(avg > -3){
            let color = "#ff471b";
            simplemaps_usmap_mapdata.state_specific[ret].color = color; 
            simplemaps_usmap.refresh_state(ret)
        } else if(avg >= -5){
            let color = "#ff3351";
            simplemaps_usmap_mapdata.state_specific[ret].color = color; 
            simplemaps_usmap.refresh_state(ret)
        }
    }
//  this function populates the colors on the map upon loading

    vm.tester = () => {
        return $http({
            medthod: "GET", 
            url: "/search/all"
        }).then((response) => {
            console.log(response); 
        })
    }

    setInterval(vm.tester, 5000); 
  
    vm.getAllTweets = () => {  
            return $http({
            method: "GET",
            url: "/search/all/"
         }).then((response) => {
            let stateKeys = Object.keys(states); 
            let smallStateKeys = Object.keys(states);
           
            for(let i = 0; i < stateKeys.length; i++){
                let stateAvg = response.data[stateKeys[i]].avg; 
                let state = stateKeys[i]; 
                //stateAverage = vm.averager(indStateSentiment); 
                vm.averageSorter(stateAvg, state);  
            }
         });
        }
    vm.getAllTweets();

  
   
    vm.getState = (state) => {
        let theState = states[state]; 
        let stateAb = state;
        console.log(theState);
   
        return $http({
            method: "GET",
            url: "/state/" + theState
        }).then((response) => {
            console.log(response);
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
        });
    };
    // loopThroughTweets is accessing the text-to-sentiment api
    vm.stateData = { emotion: [], text: []};
    vm.loopThroughTweets = (tweet) => {
        return $http({
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

// To Embed Tweets
    vm.embedTweets = (state) => {
        let theState = states[state];
        return $http({
            method: "GET",
            url: "/state/" + theState
        }).then((response) => {
            console.log(response);
            return response;
        })
    }
}

    angular
        .module("App")
        .service("TwitterService", TwitterService)



