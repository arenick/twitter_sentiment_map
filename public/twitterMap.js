"use strict";

const twitterMap = {
    templateUrl: "twitterMap.html"
    ,
    controller: ["TwitterService", "$location", "$timeout", function(TwitterService, $location, $timeout) {
        simplemaps_usmap.load();
        const vm = this;

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
            simplemaps_usmap.refresh();
            document.getElementById("container").innerHTML = "";
            twttr.ready(function (twttr) {
                TwitterService.embedTweets(stateName).then((response) => {
                   for (let tweetId of response.data.statuses) {
                    twttr.widgets.createTweet(tweetId.id_str, document.getElementById('container'), {cards: 'hidden'});
                   } 
                });
            });
            TwitterService.getState(stateName).then((response) => {
                let delayPull = function(){
                    let specState = document.getElementById('specificState');
                    let specEmotion = document.getElementById('itsEmotion'); 
                    let stateFullName = TwitterService.fullName[stateName]; 
                    specState.innerHTML = stateFullName; 
                    if(!response.emotion[0].emotion){
                        return; 
                    }
                    switch(response.emotion[0].emotion){
                        case 'Angry': 
                            console.log(stateName); 
                            console.log("switch angry"); 
                            specEmotion.innerHTML = "Angry"
                            break;
                        case 'Bored': 
                            console.log(stateName); 
                            console.log("switch bored"); 
                            specEmotion.innerHTML = "Bored"
                            break; 
                        case 'Excited': 
                            console.log(stateName); 
                            console.log("switch excited"); 
                            specEmotion.innerHTML = "Excited"
                            break;
                        case 'Fear': 
                            console.log(stateName); 
                            console.log("switch fear"); 
                            specEmotion.innerHTML = "Fearful"
                            break;
                        case 'Happy': 
                            console.log(stateName); 
                            console.log("switch happy");    
                            specEmotion.innerHTML = "Happy"
                            break; 
                        case 'Sad': 
                            console.log(stateName); 
                            console.log("switch sad"); 
                            specEmotion.innerHTML = "Sad"
                            break; 
                        case 'Sarcasm': 
                            console.log(stateName); 
                            console.log("switch sarcasm"); 
                            specEmotion.innerHTML = "Being Sarcastic"
                            break; 
                        default: 
                            console.log(stateName); 
                            console.log("switch defualt error"); 
                            specEmotion.innerHTML = "Happy"
                            break; 
                    }
                }
                $timeout(delayPull, 1500);
                // vm.tweetStuff = response.text;
            });
        });
    }] 
}

angular
    .module("App")
    .component("twitterMap", twitterMap);