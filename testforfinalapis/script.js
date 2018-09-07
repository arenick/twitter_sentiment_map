"use strict"

// Certainly, let me give you ajax script
// var settings = {
// "async": true,
// "crossDomain": true,
// "url": "https://apis.paralleldots.com/v3/emotion",
// "method": "POST",
// "headers": {
// "Content-Type": "application/x-www-form-urlencoded",
// "Cache-Control": "no-cache",
// "Postman-Token": "809b1a64-cff1-41eb-a7dd-f0003a2e5d69"
// },
// "data": {
// "text": "It was great talking to Anand Prabhu Subramanian. Many congratulations to Anand Prabhu Subramanian and Vijay Gabale on winning the KDD 2018 Startup Research Award.",
// "api_key": <insert-api-key>
// }
// }

// $.ajax(settings).done(function (response) {
// console.log(response);
// });


const com = {
    template: `
    <button ng-click="$ctrl.re();" class="refresh" id="refresh">
        Refresh
    </button>
    <div class="tweets" id="tweets" ng-repeat="item in $ctrl.serve">
        {{item}}
        <button class="emtion" id="emtion" ng-click="$ctrl.getEmotion(item)">
        Get Emotions with data science toolkit
        </button>
        <button class="changeclass" id="changeid" ng-click="$ctrl.getEmo(item)">
        Get Emotion
        </button>
        <div class="emotion id="emotion" ng-repeat="things in $ctrl.emserve">
        </div>
    </div>
`,
controller: ["service" , function(service){
    let vm = this; 
    vm.serve = [1, 2, 3, 4, 5]; 
    vm.emserve = [];
    vm.re = () => {

    }

    vm.getEmotion = () => {
        console.log("Data Science Toolkit");
        service.dsctk();
    }

    vm.getEmo = () => {
        console.log("Get Emotion")
        service.pdots(); 
    }

}]
}


function service($http, $sce){
    let vm =  this; 
    vm.lon = "-83.04575";
    vm.lat = "42.33143";
    vm.sample = "This sentence is very good"
    vm.sampleURI = encodeURIComponent(vm.sample); 
    vm.durl = "http://www.datasciencetoolkit.org/text2sentiment"; 

    vm.dsctk = () => {

        const settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://apis.paralleldots.com/v3/emotion",
            "method": "POST",
            //"headers": {
            //"Content-Type": "application/x-www-form-urlencoded"
            //"Cache-Control": "no-cache",
            //"Postman-Token": "809b1a64-cff1-41eb-a7dd-f0003a2e5d69"
            //},
            "data": {
            "text": "It was great talking to Anand Prabhu Subramanian. Many congratulations to Anand Prabhu Subramanian and Vijay Gabale on winning the KDD 2018 Startup Research Award.",
            "api_key": "DZEgFpGj5tlOGYaIYZ2hQAjDy2ARxY98tLs2Gsepptw"
            }
            }

            let arr = [settings.data.text, settings.data.api_key];
            
            let angdata = {"text": "It was great talking to Anand Prabhu Subramanian. Many congratulations to Anand Prabhu Subramanian and Vijay Gabale on winning the KDD 2018 Startup Research Award.",
            "api_key": "DZEgFpGj5tlOGYaIYZ2hQAjDy2ARxY98tLs2Gsepptw"}; 


            return $http({
                // "async": true,
                // "crossDomain": true,
                url: "https://apis.paralleldots.com/v3/emotion",
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                data: {
                    'text': 'It was great talking to Anand Prabhu Subramanian. Many congratulations to Anand Prabhu Subramanian and Vijay Gabale on winning the KDD 2018 Startup Research Award.',
                    'api_key': 'DZEgFpGj5tlOGYaIYZ2hQAjDy2ARxY98tLs2Gsepptw'
                }, 
                transformRequest: function(obj) {
                    console.log(obj);
                    var str = [];
                    for(var p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                    console.log(str); 
                    return str.join("&");}
                }).then((response) => {
            console.log(response);
            }).catch((error) => {
                console.log(error);
            });
    }

    vm.pdots = () => {
        // let purl = "https://apis.paralleldots.com/v3/emotion";

        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://apis.paralleldots.com/v3/emotion",
            "method": "POST",
            "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            // "Cache-Control": "no-cache",
            // "Postman-Token": "809b1a64-cff1-41eb-a7dd-f0003a2e5d69"
            },
            "data": {
            "text": "It was great talking to Anand Prabhu Subramanian. Many congratulations to Anand Prabhu Subramanian and Vijay Gabale on winning the KDD 2018 Startup Research Award.",
            "api_key": "DZEgFpGj5tlOGYaIYZ2hQAjDy2ARxY98tLs2Gsepptw"
            }
            }
            
            jQuery.ajax(settings).done(function (response, el, em, iop){
            console.log(response);
            console.log(el); 
            console.log(em); 
            console.log(iop); 
            });
    }
}



angular.module("app", ["ngRoute"]).config(function($routeProvider){
    $routeProvider.otherwise({redirectTo: "/com"});
});

angular.module("app").service("service", service);
angular.module("app").component("com", com); 

