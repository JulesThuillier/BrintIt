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
  

.factory('EventCreator', function(SERVER, $http) {

  var event = {
      event_id: '',
      title: '',
      description: '',
      date: '',
      address: '',
      people: [],
      shoppingList: []  
  };
  
    // Add new Item
    event.addItemShoppingList = function(name, quantity) {
    if(!name || !quantity) return false;

    var valueToPush = { };
    valueToPush.name = name;
    valueToPush.quantity = quantity;
    event.shoppingList.unshift(valueToPush);
    };

    // Update Item quantity
    event.updateItemQuantityShoppingList = function(item, quantity) {
    if(!item || !quantity) return false;
    event.shoppingList[item]
    event.shoppingList[item].quantity = quantity;
    };

    // Remove Item
    event.removeItemShoppingList = function(item) {
    if(!item) return false;
    event.shoppingList.splice(item, 1);
    };
  
    // Add a person to invitation list
    event.addInvited = function(name, phone) {
    var valueToPush = { };
      // TODO: Get first and last name
    valueToPush.firstName = name;
    valueToPush.laststName = '';
    valueToPush.phone = phone;
    event.people.unshift(valueToPush); 
    };
    
    event.setTitle = function(title) {
        if(!title) return false;
        event.title = title;
    };
  
    // Remove a person from invitation list
    event.removeInvited = function(user) {
        if(!user) return false;
        event.people.splice(user, 1);
    };

    

    event.setDescription = function(description) {
        console.log("Description set to : " + description);
        if(!description) return false;
        event.description = description;
    };

    event.setDate = function(date) {
        console.log("Date set to : " + date);
        if(!date) return false;
        event.date = date;
    };

    event.setAddress = function(address) {
        if(!address) return false;
        event.address = address;
    };
    
    // Send invitations
    event.sendInvitations = function() {
      console.log("Factory Send invits");
    this.sendEventToDB();
    };
  
    event.sendEventToDB = function(){
      console.log("Factory upload event to DB");
      var parameter = JSON.stringify(event);
      $http.post(SERVER.url + "/events/new", parameter, {headers: {'Content-Type': 'application/json'} }).
      success(function(data){
        console.log(data);

      }).
      error(function(data, status, headers, config) {
        console.log(data);
      });

    };

  return event;
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