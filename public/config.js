angular
    .module("App")
    .config(["$routeProvider", function($routeProvider) {
        $routeProvider
            .when("/twitter-map", {
                template: `<twitter-map></twitter-map>`
            })
            .when("/landing", {
                template: `<landing></landing>`
            })
            .otherwise({redirectTo: "/landing"});
    }
])