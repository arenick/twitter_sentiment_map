"use strict";

const twitterMap = {
    template:`
    <p>This is a test</p>
    <div class="us_map" id="map"></div>

    `,
    controller: ["TwitterService", "$location", function(TwitterService, $location) {
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