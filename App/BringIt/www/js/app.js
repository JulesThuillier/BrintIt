// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var handleOpenURL = function(url) {
    window.localStorage.setItem("external_load", url);
};

angular.module('app', ['ionic', 'ionic-timepicker', 'ionic-datepicker', 'ionic.service.core', 'ionic.service.analytics', 'ionic.service.core', 'satellizer', 'app.controllers', 'app.routes', 'app.services', 'app.directives', 'ngCordova'])

.run(function($ionicPlatform, $ionicAnalytics) {
    
  $ionicPlatform.ready(function() {
      
  //  $ionicAnalytics.register();
      
    var push = new Ionic.Push({
    "debug": true
    });

    push.register(function(token) {
      console.log("Device token:",token.token);
    });
      
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }   
    if(typeof window.localStorage.getItem("external_load") !== undefined){
        console.log(window.localStorage.getItem("external_load"));
        window.localStorage.removeItem("external_load");
        $location.path("/");
    }
  });
})

.constant('SERVER', {
  url: 'http://159.203.8.64:3000'
})

.config(function($httpProvider) {
    //Enable cross domain calls
    $httpProvider.defaults.useXDomain = true;
})

.config(function($authProvider, SERVER) {
    
    $authProvider.baseUrl = SERVER.url;
    $authProvider.authHeader = 'Authorization';
    $authProvider.authToken = 'Bearer';
    $authProvider.storageType = 'localStorage';
    $authProvider.httpInterceptor = true;

    if (ionic.Platform.isIOS() || ionic.Platform.isAndroid()) {
      $authProvider.cordova = true;
    }
    
    $authProvider.facebook({       
      clientId: '1269819853044211',
        redirectUri: 'http://localhost:8100/'      
    });

    $authProvider.google({
      clientId: '762548628265-oketfgkinmk4annlk9jlppn1teueb859.apps.googleusercontent.com',
        redirectUri: 'http://localhost:8100/'
    });
    
    $authProvider.github({
      clientId: 'GitHub Client ID'
    });

    $authProvider.linkedin({
      clientId: 'LinkedIn Client ID'
    });

    $authProvider.instagram({
      clientId: 'Instagram Client ID'
    });

    $authProvider.yahoo({
      clientId: 'Yahoo Client ID / Consumer Key'
    });

    $authProvider.live({
      clientId: 'Microsoft Client ID'
    });

    $authProvider.twitch({
      clientId: 'Twitch Client ID'
    });

    // No additional setup required for Twitter

    $authProvider.oauth2({
      name: 'foursquare',
      url: '/auth/foursquare',
      clientId: 'Foursquare Client ID',
      redirectUri: window.location.origin,
      authorizationEndpoint: 'https://foursquare.com/oauth2/authenticate',
    });

  });