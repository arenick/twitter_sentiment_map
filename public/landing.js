"use strict";

const landing = {
    template:`
    <p>Welcome to our page</p>
    <button ng-click="$ctrl.redirect();">Click Me</button>
    `,
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
