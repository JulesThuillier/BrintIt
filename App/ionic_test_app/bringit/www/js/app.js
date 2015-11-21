// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('bringit', ['ionic', 'bringit.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router, which uses the concept of states.
  // Learn more here: https://github.com/angular-ui/ui-router.
  // Set up the various states in which the app can be.
  // Each state's controller can be found in controllers.js.
  $stateProvider

  // Each tab has its own nav history stack:

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'

  })
  
    .state('myevents', {
    url: '/myevents',
    templateUrl: 'templates/myevents.html',

  })

  // If none of the above states are matched, use this as the fallback:
  $urlRouterProvider.otherwise('/login');

})
