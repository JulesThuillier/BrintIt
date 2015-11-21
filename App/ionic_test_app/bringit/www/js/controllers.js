angular.module('bringit.controllers', ['ionic', 'ngCordova', 'bringit.services'])

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state, $cordovaOauth) {
    $scope.data = {};
 
    $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('myevents');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
    
     $scope.facebookLogin = function() {
        $cordovaOauth.facebook("1269819853044211", ["thuillierjules@gmail.com"]).then(function(result) {
            // results
            console.log(JSON.stringify(result));
            $state.go('myevents');
        }, function(error) {
            // error
            console.log(error);
        //    $state.go('myevents');
        });
    }
     
     $scope.googleLogin = function() {
        $cordovaOauth.google("762548628265-oketfgkinmk4annlk9jlppn1teueb859.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
            console.log(JSON.stringify(result));
        }, function(error) {
            console.log(error);
        });
    }

    // $cordovaOauth.dropbox(string appKey);
    // $cordovaOauth.digitalOcean(string clientId, string clientSecret);
    // $cordovaOauth.google(string clientId, array appScope);
    // $cordovaOauth.github(string clientId, string clientSecret, array appScope);
    // $cordovaOauth.linkedin(string clientId, string clientSecret, array appScope, string state);
    // $cordovaOauth.instagram(string clientId, array appScope);
    // $cordovaOauth.box(string clientId, string clientSecret, string state);
    // $cordovaOauth.reddit(string clientId, string clientSecret, array appScope);
    // $cordovaOauth.twitter(string consumerKey, string consumerSecretKey);
    // $cordovaOauth.meetup(string consumerKey);
    // $cordovaOauth.foursquare(string clientId);
    // $cordovaOauth.salesforce(string loginUrl, string clientId);
    // $cordovaOauth.strava(string clientId, string clientSecret, array appScope);
});
