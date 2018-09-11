"use strict";
// simplemaps_usmap.load();
const twitterMap = {
    template:`
    <div  class="us_map" id="map"></div>
    `,
    controller: ["TwitterService", "$location", function(TwitterService, $location) {
        simplemaps_usmap.load();
        const vm = this;
        vm.getTweets = () => {
            TwitterService.getAllTweets().then((response) => {
                console.log(response);
                console.log(tweet);
            })
        }
    }] 
}

angular
    .module("App")
    .component("twitterMap", twitterMap);