"use strict";

const landing = {
    templateUrl:"landing.html",
    controller: ["$location", function($location) {
        const vm = this;
        vm.redirect = () => {
        console.log("hi");
        $location.path("/twitter-map");
        }
    }]
}
angular
    .module("App")
    .component("landing", landing);
