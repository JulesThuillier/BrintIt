angular.module('app.controllers', [])
  
.controller('myEventsCtrl', function($scope) {

})
   
.controller('loginCtrl', function($scope, $auth, $ionicPopup, $state) {

    $scope.authenticate = function(provider) {
      $auth.authenticate(provider)
        .then(function() {
          $ionicPopup.alert({
            title: 'Success',
            content: 'You have successfully logged in!'
          })
        })
        .catch(function(response) {
          $ionicPopup.alert({
            title: 'Error',
            content: response.data ? response.data || response.data.message : response
          })

        });
    };
    
    $scope.login = function (user) {
        $auth.login(user)
          .then(function() {
              $ionicPopup.alert({
                title: 'Success',
                content: 'You have successfully logged in!'
              })
              $state.go('myEvents');
            })
            .catch(function(response) {
              $ionicPopup.alert({
                title: 'Error',
                content: response.data ? response.data || response.data.message : response
              })

            });
    };

    $scope.logout = function() {
      $auth.logout();
    };

    $scope.isAuthenticated = function() {
      return $auth.isAuthenticated();
    };

})


.controller('signupCtrl', function($scope, $auth, $ionicPopup, $state) {

    $scope.signup = function(user) {
      //  console.log("Singup for " + user.firstName + " " + user.lastName + "  Mail : " + user.email)
      $auth.signup(user)
          .then(function() {
              $ionicPopup.alert({
                title: 'Success',
                content: 'You have successfully signed up!'
              })
              $state.go('myEvents');
            })
            .catch(function(response) {
              $ionicPopup.alert({
                title: 'Error',
                content: response.data ? response.data || response.data.message : response
              })

            });
    };
})
   
.controller('createEventCtrl', function($scope) {

})
   
.controller('addPeopleCtrl',['$scope', 'Event', function($scope, $cordovaContacts, $ionicPlatform, Event) {
    $scope.addContact = function() {
    $cordovaContacts.save($scope.contactForm).then(function(result) {
      // Contact saved
    }, function(err) {
      // Contact error
    });
  };

  $scope.getAllContacts = function() {
    $cordovaContacts.find().then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
      $scope.contacts = allContacts;
    })
  };

  $scope.findContactsBySearchTerm = function (searchTerm) {
    var opts = {                                           //search options
      filter : searchTerm,                                 // 'Bob'
      multiple: true,                                      // Yes, return any contact that matches criteria
      fields:  [ 'displayName', 'name' ],                   // These are the fields to search for 'bob'.
      desiredFields: [id]    //return fields.
    };

 /*   if ($ionicPlatform.isAndroid()) {
      opts.hasPhoneNumber = true;         //hasPhoneNumber only works for android.
    };
*/
    $cordovaContacts.find(opts).then(function (contactsFound) {
      //$scope.contacts = contactsFound;
        return contactsFound;
    });
  };

  $scope.pickContactUsingNativeUI = function () {
    $cordovaContacts.pickContact().then(function (contactPicked) {
      $scope.contact = contactPicked;
    })
  }
  
  $scope.search = function() {

    	$scope.findContactsBySearchTerm($scope.data.search).then(
    		function(matches) {
    			$scope.data.contacts = matches;
    		}
    	)
    }
  
}])
   
.controller('thingsToBringCtrl', function($scope) {

})
   
.controller('bringSomethingCtrl', function($scope) {

})
      
.controller('peopleInvitedCtrl', function($scope) {

})
   
.controller('eventDetailsCtrl', function($scope) {

});
    