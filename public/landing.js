"use strict";

const landing = {
    templateUrl:"landing.html",
    controller: ["$location", function($location) {
        const vm = this;
        vm.redirect = () => {
        console.log("hi");
        $location.path("/twitter-map");
        }

        let stateEmotion = ["apple","pear","grapes","apple","apple"];
        const counts = {};
        const compare = 0;
        const mostFrequent = 0;
        (function(array){
            console.log(array);
            for(let i = 0, len = stateEmotion.length; i < len; i++){
                let word = stateEmotion[i];
                if (counts[word] === undefined){
                    count[word] = 1;
                } else {
                    counts[word] = count[word] + 1;
                }
                if (counts[word] > compare){
                    compare = counts[word];
                    mostFrequent = stateEmotion[i];
                }
            }
            console.log(stateEmotion);
            return mostFrequent;
        })(stateEmotions);
    }]
}
angular
    .module("App")
    .component("landing", landing);
