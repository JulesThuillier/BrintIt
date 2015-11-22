angular.module('app.controllers', ['ngCordova'])
  
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
   
.controller('addPeopleCtrl', function($scope, $cordovaContacts, $ionicPlatform) {
    $scope.addContact = function() {
    navigator.contacts.save($scope.contactForm).then(function(result) {
      // Contact saved
    }, function(err) {
      // Contact error
    });
  };

  $scope.getAllContacts = function() {
    navigator.contacts.find().then(function(allContacts) { //omitting parameter to .find() causes all contacts to be returned
      $scope.contacts = allContacts;
    })
  };

  $scope.findContactsBySearchTerm = function (searchTerm) {
    if(searchTerm.length >= 3){
        function onSuccess(contacts) {
             
            // Filtering contacts to display only those with phone number, and search only those who start with the search term
            var contactFiltered= [];
            for (var i = 0; i < contacts.length; i++) {
                
                if(contacts[i].phoneNumbers != null){
                    var contactAddedToList = false;
                    if(contacts[i].displayName != null){
                        console.log(contacts[i].displayName);
                        if(contacts[i].displayName.startsWith(searchTerm)){
                            contactFiltered.push(contacts[i]);
                            contactAddedToList = true;
                        }
                    }
                    if((contacts[i].name != null) && !contactAddedToList){
                        if(contacts[i].name.familyName != null && contacts[i].name.familyName.startsWith(searchTerm)){
                            contactFiltered.push(contacts[i]);
                            contactAddedToList = true;   
                        }
                        else if(contacts[i].name.formatted != null && contacts[i].name.formatted.startsWith(searchTerm)){
                            contactFiltered.push(contacts[i]);
                            contactAddedToList = true;   
                        }
                        else if(contacts[i].name.givenName != null && contacts[i].name.givenName.startsWith(searchTerm)){
                            contactFiltered.push(contacts[i]);
                            contactAddedToList = true;   
                        }
                    }
                }
            }
            console.log(contactFiltered);
            $scope.contacts = contactFiltered;
        };

        function onError(contactError) {
            console.log('onError! ' + contactError);
            $scope.contacts = [];
        };
      
        var options      = new ContactFindOptions();
        options.filter   = searchTerm;
        options.multiple = true;
        options.desiredFields = [navigator.contacts.fieldType.id, navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name , navigator.contacts.fieldType.phoneNumbers, navigator.contacts.fieldType.photos ];
        options.hasPhoneNumber = true;
//        var fields       = [navigator.contacts.fieldType.searchTerm, navigator.contacts.fieldType.name];
        var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        
        
        navigator.contacts.find(fields, onSuccess, onError, options);
    }
    else if (searchTerm.length <= 1) {
        $scope.contacts = [];;
    }
  };

  $scope.pickContactUsingNativeUI = function () {
    navigator.contacts.pickContact().then(function (contactPicked) {
      $scope.contact = contactPicked;
    })
  }
  
})
   
.controller('thingsToBringCtrl', function($scope) {

})
   
.controller('bringSomethingCtrl', function($scope) {

})
      
.controller('peopleInvitedCtrl', function($scope) {

})
   
.controller('eventDetailsCtrl', function($scope) {

});
    