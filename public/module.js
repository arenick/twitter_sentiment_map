"use strict";

angular
    .module("App")
    .config(["$routeProvider", function($routeProvider) {
        $routeProvider
            .when("/map", {
                template: `<twitter-map></twitter-map>`
            })
    }
])