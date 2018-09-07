const vm = this;
function twitterService($http) {
    const getTweets = () => {
        return $http({
            method: "GET",
            url: `https://api.twitter.com/oauth/authenticate?oauth_token=`

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
