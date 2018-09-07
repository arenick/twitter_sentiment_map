const vm = this;
function twitterService($http) {
    const getTweets = () => {
        return $http({
            method: "GET",
            url: `https://api.twitter.com/1.1/search/tweets.json?q=%40twitterapi`
        }).then((response) => {
            console.log(response);
            console.log("hi")
            return response.data;
        });
    }
    getTweets();
    return {
        getTweets: getTweets
    }
}


angular
    .module("App")
    .service("twitterService", twitterService)
