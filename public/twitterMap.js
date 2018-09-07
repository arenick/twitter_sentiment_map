"use strict";

const twitterMap = {
    template:`
    <p>This is a test</p>
    `,
    controller: ["twitterService", function(twitterService) {
        const vm = this;
        vm.getTweets = (tweet) => {
            twitterService.getTweets(tweet).then((response) => {
                console.log(response);
                console.log(tweet);
            })
        }
    }] 
}

angular
    .module("App")
    .component("twitterMap", twitterMap);