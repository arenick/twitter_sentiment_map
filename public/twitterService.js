
"use strict";
function TwitterService ($http, $sce) {
    const vm = this;
    vm.getAllTweets = () => {
        return $http({
            method: "GET",
           url: "/search/all",
                 
        }).then((response) => {
            let data = {}; 
            let sentimentArray = [];
            console.log(response);
            let loop = (entry) => {
                let urlReplace = entry.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
                console.log(urlReplace);
                let specialReplace = urlReplace.replace(/[^a-zA-Z0-9]+\s/g, "+");
                let hashReplace = specialReplace.replace(/#/g, "+")
                console.log(hashReplace);
                let params = hashReplace.replace(/\s/g , "+");
                
                console.log(typeof entry)
                let url = `http://www.datasciencetoolkit.org/text2sentiment/${params}`;
                console.log(url);
                
                let trust = $sce.trustAsResourceUrl(url); 
                return $http.jsonp(trust, {params : params}).then((rep) => {
                    console.log(rep); 
                });
            }
            for(let i = 0; i < response.data.text.length; i++){
                loop(response.data.text[i]); 
            }
           return vm.tweets = response;                
        })
        }
        vm.getAllTweets();
}

angular
.module("App")
.service("TwitterService", TwitterService)

