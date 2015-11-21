angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])


.factory('User', function($http, $q, $localstorage, SERVER) {

  var o = {
    email: false,
    session_id: false
  }
})
  

.factory('Event', function() {

  var event = {
      event_id: false,
      title: false,
      description: false,
      date: false,
      address: false,
      people: [],
      things: []  
  }
})
  
 
.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
})

.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});