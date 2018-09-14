"use strict";

const twitterMap = {
    templateUrl: "twitterMap.html"
    ,
    controller: ["TwitterService", "$location", function(TwitterService, $location) {
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
            vm.tweetStuff = {};
            vm.stateName = e.target.className.animVal.charAt(9) + e.target.className.animVal.charAt(10);
            // simplemaps_usmap_mapdata.state_specific[stateName].color = "yellow";
            simplemaps_usmap.refresh();
            TwitterService.getState(vm.stateName).then((response) => {
                console.log(response)
                console.log(response.emotion[0].emotion);
                vm.tweetStuff = response.text;
                vm.emotion = response.emotion[0].emotion
                vm.changeColor(vm.stateName);

            });
        });
        vm.changeColor = (stateName) => {
                if (vm.emotion == "sad") {
                    simplemaps_usmap_mapdata.state_specific[stateName].color = "red";
                } else if (vm.emotion == "fear") {
                    simplemaps_usmap_mapdata.state_specific[stateName].color = "orange";
                } else if (vm.emotion == "bored") {
                    simplemaps_usmap_mapdata.state_specific[stateName].color = "yellow";
                } else if (vm.emotion == "happy") {
                    simplemaps_usmap_mapdata.state_specific[stateName].color = "green";
                } else if (vm.emotion == "excited") {
                    simplemaps_usmap_mapdata.state_specific[stateName].color = "blue";
                } else if (vm.emotion == "sarcasm") {
                    simplemaps_usmap_mapdata.state_specific[stateName].color = "brown";
                } else if (vm.emotion == "angry") {
                    simplemaps_usmap_mapdata.state_specific[stateName].color = "black";
                }
            }
    }] 
}

angular
    .module("App")
    .component("twitterMap", twitterMap);