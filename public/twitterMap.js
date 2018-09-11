"use strict";

const twitterMap = {
    templateUrl: "twitterMap.html"
    
    
    ,
    controller: ["TwitterService", "$location", function(TwitterService, $location) {
        simplemaps_usmap.load();
        const vm = this;
        
        vm.getTweets = () => {
            TwitterService.getAllTweets().then((response) => {
                console.log(response);
                // console.log(tweet);
            }); 

            
        }

        document.getElementById('map').addEventListener("click", (e) => {
            console.log(e.target) 
            TwitterService.getMichigan(); 
        });
    }] 
}

angular
    .module("App")
    .component("twitterMap", twitterMap);