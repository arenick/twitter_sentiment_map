
"use strict";
function TwitterService ($http) {
    const vm = this;
    vm.getAllTweets = () => {
        return $http({
            method: "GET",
           url: "/search",
                 
        }).then((response) => {
            for (let i=0; i<40; i++) {
            console.log(response.data.statuses[i].text);
        //    return vm.tweets = response; 
            }        
        })
        }
        vm.getAllTweets();
}

angular
.module("App")
.service("TwitterService", TwitterService)

