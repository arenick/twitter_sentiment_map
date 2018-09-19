"use strict";

const landing = {
    templateUrl:"landing.html",
    controller: ["$location", "$timeout", function($location, $timeout) {
        const vm = this;
        vm.runBirds = () => {
            let larry = document.querySelectorAll('.bird'); 
            let bigBird = document.getElementById('bigbird'); 
            let xMover = document.getElementById('xMover');
            for(let i = 0; i < larry.length; i++){
                console.log(larry[i]);
                larry[i].style  = 'animation-play-state: running'; 
            }
            bigBird.style = 'animation-play-state: running';
            xMover.style = 'animation-play-state: running';
        }
        vm.redirect = () => {
        let fadeOut = (el, step) => {
            let opac = 1;  
            let steps = setInterval(function () {
                if (opac <= 0){
                    
                    clearInterval(steps);
                }
                el.style.opacity = opac;
                opac -= 0.1;
            }, step);
        } 

        vm.runBirds(); 
        
        let whiteCircle = document.getElementById('whiteCircle');
        fadeOut(whiteCircle, 100);
        let changeWait = () => {
            $location.path("/twitter-map");
        }
        $timeout(changeWait, 6000);    
        
    }

   }]
}
angular
    .module("App")
    .component("landing", landing);
