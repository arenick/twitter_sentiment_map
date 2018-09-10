
"use strict";
function TwitterService ($http) {
    const vm = this;
    vm.getAllTweets = () => {
        return $http({
            method: "GET",
           url: "/search",
                 
        }).then((response) => {
            console.log(response.data);
           return vm.tweets = response;         
        })
        }
        vm.getAllTweets();
}

angular
.module("App")
.service("TwitterService", TwitterService)

