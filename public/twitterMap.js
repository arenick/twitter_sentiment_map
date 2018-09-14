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
                let f = function(){
                    console.log(response.emotion[0].emotion)
                //     switch(response.emotion[0].emotion){
                //         case 'Angry': 
                //             console.log("switch angry"); 
                //             simplemaps_usmap_mapdata.state_specific[stateName].color = '#ff3351'; 
                //         case 'Bored': 
                //             simplemaps_usmap_mapdata.state_specific[stateName].color = '#52b05d';
                //         case 'Excited': 
                //             simplemaps_usmap_mapdata.state_specific[stateName].color = '#ff951a';
                //         case 'Fear': 
                //             simplemaps_usmap_mapdata.state_specific[stateName].color = '#52e0bb';
                //         case 'Happy': 
                //             simplemaps_usmap_mapdata.state_specific[stateName].color = '#ffd21b';
                //         case 'Sad': 
                //             simplemaps_usmap_mapdata.state_specific[stateName].color = '#ffd21b';
                //     }
                }
                $timeout(f, 1000);
                vm.tweetStuff = response.text;
            });
        });

    }] 
}

angular
    .module("App")
    .component("twitterMap", twitterMap);