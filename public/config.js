angular
    .module("App")
    .config(["$routeProvider", function($routeProvider) {
        $routeProvider
            .when("/twitter-map", {
                template: `<twitter-map></twitter-map>`
            })
            .when("/landing", {
                template: `<landing class="landingHold"></landing>`
            })
            .otherwise({redirectTo: "/landing"});
    }
])