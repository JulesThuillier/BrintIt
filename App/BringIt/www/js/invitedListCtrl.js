
angular.module('app.controllers')
  
.controller('invitedListCtrl', ['$scope', function($scope, $cordovaContacts, $ionicPlatform) {
    
    $scope.data = {
        searchterm: '',
        contacts: [],
        contactsSelected: []
    };

    
    var contactsSelected = [];
    console.log("Hello");
    
    $scope.invite = function(contact) {
        contactsSelected.push(contact);
        $scope.data.contactsSelected = contactsSelected;
  };

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

  $scope.findContactsBySearchTerm = function () {
      console.log($scope.data.searchterm);
    if($scope.data.searchterm.length >= 3){
        function onSuccess(contacts) {
            
            // Filtering contacts to display only those with phone number, and search only those who start with the search term
            var contactFiltered= [];
            for (var i = 0; i < contacts.length; i++) {
                
                if(contacts[i].phoneNumbers != null){
                    var contactAddedToList = false;
                    if(contacts[i].displayName != null){
                        console.log(contacts[i].displayName);
                        if(contacts[i].displayName.toString().toLowerCase().startsWith($scope.data.searchterm.toString().toLowerCase())){
                            contactFiltered.push(contacts[i]);
                            contactAddedToList = true;
                        }
                    }
                    if((contacts[i].name != null) && !contactAddedToList){
                        if(contacts[i].name.familyName != null && contacts[i].name.familyName.toString().toLowerCase().startsWith($scope.data.searchterm.toString().toLowerCase())){
                            contactFiltered.push(contacts[i]);
                            contactAddedToList = true;   
                        }
                        else if(contacts[i].name.formatted != null && contacts[i].name.formatted.toString().toLowerCase().startsWith($scope.data.searchterm).toString().toLowerCase()){
                            contactFiltered.push(contacts[i]);
                            contactAddedToList = true;   
                        }
                        else if(contacts[i].name.givenName != null && contacts[i].name.givenName.toString().toLowerCase().startsWith($scope.data.searchterm.toString().toLowerCase())){
                            contactFiltered.push(contacts[i]);
                            contactAddedToList = true;   
                        }
                    } 
                }
            }
            console.log(contactFiltered);
         //   $scope.contacts = [];
            $scope.data.contacts = angular.copy(contactFiltered);
         //   $scope.$apply();
        };

        function onError(contactError) {
            console.log('onError! ' + contactError);
            $scope.contacts = [];
            $scope.$apply();
        };
      
        var options      = new ContactFindOptions();
        options.filter   = $scope.data.searchterm;
        options.multiple = true;
        options.desiredFields = [navigator.contacts.fieldType.id, navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name , navigator.contacts.fieldType.phoneNumbers, navigator.contacts.fieldType.photos ];
        options.hasPhoneNumber = true;
//        var fields       = [navigator.contacts.fieldType.searchterm, navigator.contacts.fieldType.name];
        var fields       = [navigator.contacts.fieldType.displayName, navigator.contacts.fieldType.name];
        
        
        navigator.contacts.find(fields, onSuccess, onError, options);
    }
    else if ($scope.data.searchterm.length <= 1) {
        $scope.contacts = [];
        $scope.$apply();
    }
  };

  $scope.pickContactUsingNativeUI = function () {
    navigator.contacts.pickContact().then(function (contactPicked) {
      $scope.contact = contactPicked;
    })
  }
  
}]);