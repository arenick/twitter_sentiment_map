"use strict";

const twitterMap = {
    templateUrl: "twitterMap.html"
    ,
    controller: ["TwitterService", "$location", "$timeout", function(TwitterService, $location, $timeout) {
        simplemaps_usmap.load();
        const vm = this;
        vm.tweets=TwitterService.obj;
        // console.log(vm.tweets);
        
        vm.getTweets = () => {
            TwitterService.getAllTweets().then((response) => {
                console.log(response);
                // console.log(tweet);
            }); 
        }

        document.getElementById("map").addEventListener("click", (e) => {
            let stateName = e.target.className.animVal.charAt(9) + e.target.className.animVal.charAt(10);
            console.log(stateName);
            if(!stateName){
                return; 
            }
            // simplemaps_usmap_mapdata.state_specific[stateName].color = "yellow";
            simplemaps_usmap.refresh();
            TwitterService.getState(stateName).then((response) => {
                let delayPull = function(){
                    console.log(response.emotion[0].emotion)
                    switch(response.emotion[0].emotion){
                        case 'Angry': 
                            console.log(stateName); 
                            console.log("switch angry"); 
                            simplemaps_usmap_mapdata.state_specific[stateName].color = 'rgba(255,51,81,1)';
                            simplemaps_usmap.refresh();  
                            break;
                        case 'Bored': 
                            console.log(stateName); 
                            console.log("switch bored"); 
                            simplemaps_usmap_mapdata.state_specific[stateName].color = 'rgba(82,176,93,1)';
                            simplemaps_usmap.refresh(); 
                            break; 
                        case 'Excited': 
                            console.log(stateName); 
                            console.log("switch excited"); 
                            simplemaps_usmap_mapdata.state_specific[stateName].color = 'rgba(255,149,26,1)';
                            simplemaps_usmap.refresh(); 
                            break;
                        case 'Fear': 
                            console.log(stateName); 
                            console.log("switch fear"); 
                            simplemaps_usmap_mapdata.state_specific[stateName].color = 'rgba(82,224,187,1)';
                            simplemaps_usmap.refresh(); 
                            break;
                        case 'Happy': 
                            console.log(stateName); 
                            console.log("switch happy");    
                            simplemaps_usmap_mapdata.state_specific[stateName].color = 'rgba(255,210,27,1)';
                            simplemaps_usmap.refresh(); 
                            break; 
                        case 'Sad': 
                            console.log(stateName); 
                            console.log("switch sad"); 
                            simplemaps_usmap_mapdata.state_specific[stateName].color = 'rgba(93,145,227,1)';
                            simplemaps_usmap.refresh(); 
                            break; 
                        case 'Sarcasm': 
                            console.log(stateName); 
                            console.log("switch sarcasm"); 
                            simplemaps_usmap_mapdata.state_specific[stateName].color =  'rgba(255,71,27,1)';
                            simplemaps_usmap.refresh(); 
                            break; 
                        defualt: 
                            console.log(stateName); 
                            console.log("switch defualt error"); 
                            simplemaps_usmap_mapdata.state_specific[stateName].color = 'rgba(0,0,0,1)';
                            simplemaps_usmap.refresh(); 
                            break; 
                    }
                }
                $timeout(delayPull, 500);
                vm.tweetStuff = response.text;
            });
        });

    }] 
}

angular
    .module("App")
    .component("twitterMap", twitterMap);