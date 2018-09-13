"use strict";

const twitterMap = {
    templateUrl: "twitterMap.html"
    ,
    controller: ["TwitterService", "$location", function(TwitterService, $location) {
        simplemaps_usmap.load();
        const vm = this;
        vm.tweets=TwitterService.obj;
        console.log(vm.tweets);

        vm.getTweets = () => {
            TwitterService.getAllTweets().then((response) => {
                console.log(response);
                // console.log(tweet);
            }); 
        }
        
        document.getElementById('map').addEventListener("click", (e) => {
            console.log(e.target) 
        //    vm.tweets = TwitterService.getMichigan();
        TwitterService.getMichigan().then((response) => {
            console.log(response);
        })
    })
    }] 
}

angular
    .module("App")
    .component("twitterMap", twitterMap);