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
            simplemaps_usmap_mapdata.state_specific[stateName].color = "yellow";
            simplemaps_usmap.refresh();
            TwitterService.getState(stateName).then((response) => {
                $timeout([console.log(response)], [10000]);
                vm.tweetStuff = response.text;
            });
        });

    }] 
}

angular
    .module("App")
    .component("twitterMap", twitterMap);