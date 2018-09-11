
"use strict";


function TwitterService ($http, $sce) {
    const vm = this;

    let deStringify = function(obj) {
        console.log(obj);
        var str = [];
        for(var p in obj)
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
        console.log(str); 
        return str.join("&");
    }

    vm.getAllTweets = () => {
        return $http({
           method: "GET",
           url: "/search/all",
                 
        }).then((response) => {
            let data = {}; 
            let sentimentArray = [];
            let loop = (entry) => {
                let urlReplace = entry.replace(/(?:https?|ftp):\/\/[\n\S]+/g, '');
                let specialReplace = urlReplace.replace(/[^a-zA-Z0-9]+\s/g, "+");
                let hashReplace = specialReplace.replace(/#/g, "+")
                let params = hashReplace.replace(/\s/g , "+");            
           
                let url = `http://www.datasciencetoolkit.org/text2sentiment/${params}`;
                
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
    
    vm.getMichigan = () => {
        return $http({
           method: "GET",
           url: "/state", 
        }).then((response) => {
            let stateEmotion = []; 
            let sentimentArray = [];
            let loop = (entry) => {
                return $http({
                    // "async": true,
                    // "crossDomain": true,
                    url: "https://apis.paralleldots.com/v3/emotion",
                    method: "POST",
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded"
                    },
                    data: {
                        'text': entry,
                        'api_key': 'DZEgFpGj5tlOGYaIYZ2hQAjDy2ARxY98tLs2Gsepptw'
                    },
                    transformRequest: deStringify
                    }).then((response) => {
                console.log(response);
                stateEmotion.push(response.data.emotion);
                console.log(stateEmotion);
                }).catch((error) => {
                    console.log(error);
                });
            }
            for(let i = 0; i < response.data.text.length; i++){
                loop(response.data.text[i]); 
            }
            console.log(stateEmotion);
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
                return mostFrequent;
            })(stateEmotion);
            
           return vm.tweets = response;            
           }).catch((error) => { 
               console.log(error);
           });  
        }
        vm.getAllTweets();
}

angular
.module("App")
.service("TwitterService", TwitterService)

