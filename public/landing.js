"use strict";

const landing = {
    template:`
    <p>Welcome to our page</p>
    `,
    controller: ["$location", function($location) {
        const vm = this;
        //create function that directs you to map page
        $location.path("/map");
    }]
}
angular
    .module("App")
    .component("landing", landing);
