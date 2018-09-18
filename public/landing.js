"use strict";

const landing = {
    templateUrl:"landing.html",
    controller: ["$location", function($location) {
        const vm = this;
        vm.redirect = () => {
        $location.path("/twitter-map");
        }
   }]
}
angular
    .module("App")
    .component("landing", landing);
