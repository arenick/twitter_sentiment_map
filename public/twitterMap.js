"use strict";

const twitterMap = {
    template:`
    <p>This is a test</p>
    `,
    controller: ["TwitterService", function(TwitterService) {
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