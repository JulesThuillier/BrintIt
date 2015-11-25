angular.module('app.controllers', ['ngCordova', 'ionic-timepicker'])
  
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


.controller('signupCtrl', function($scope, $auth, $ionicPopup, $state, $http, SERVER) {
    
    $scope.user = {
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    };

    $scope.signup = function(user) {
        console.log($scope.user);
        
        
    $http.post(SERVER.url + "/auth/signup", user).then(function (res){
            console.log(res.data);
            
        });
        
        
    /*  $auth.signup(user)
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

            });*/
    };
})
   
.controller('createEventCtrl', function($scope, $ionicPopup) {
    
    function timePickerCallback(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
        var selectedTime = new Date(val * 1000);
        console.log('Selected epoch is : ', val, 'and the time is ', selectedTime.getUTCHours(), ':', selectedTime.getUTCMinutes(), 'in UTC');
      }
    }
    
    $scope.timePickerObject = {
        inputEpochTime: ((new Date()).getHours() * 60 * 60),  //Optional
        step: 15,  //Optional
        format: 12,  //Optional
        titleLabel: 'Select your time',  //Optional
        setLabel: 'Set',  //Optional
        closeLabel: 'Close',  //Optional
        setButtonType: 'button-positive',  //Optional
        closeButtonType: 'button-stable',  //Optional
        callback: function (val) {    //Mandatory
        timePickerCallback(val);
        }
    };
    
    var datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
        console.log('Selected date is : ', val)
        showTimePicker($scope.timePickerObject, $ionicPopup);
      }
    };
    
    $scope.datepickerObject = {
        titleLabel: 'Title',  //Optional
        todayLabel: 'Today',  //Optional
        closeLabel: 'Close',  //Optional
        setLabel: 'Set',  //Optional
        setButtonType : 'button-assertive',  //Optional
        todayButtonType : 'button-assertive',  //Optional
        closeButtonType : 'button-assertive',  //Optional
        inputDate: new Date(),  //Optional
        mondayFirst: true,  //Optional
        templateType: 'popup', //Optional
        showTodayButton: 'true', //Optional
        modalHeaderColor: 'bar-positive', //Optional
        modalFooterColor: 'bar-positive', //Optional
        from: new Date(2012, 8, 2), //Optional
        to: new Date(2018, 8, 25),  //Optional
        callback: function (val) {  //Mandatory
            datePickerCallback(val);
        },
        dateFormat: 'dd-MM-yyyy', //Optional
        closeOnSelect: false //Optional
    };

})
   
.controller('addPeopleCtrl', function($scope, $cordovaContacts, $ionicPlatform) {
    
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
  
})
   
.controller('thingsToBringCtrl', function($scope) {
    $scope.data = {
        item: '',
        items: []
    };
    
    $scope.shouldShowDelete = true;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
    
    $scope.addItem = function() {
        if($scope.data.item != null && $scope.data.item != ""){
            var valueToPush = { };
            valueToPush.name = $scope.data.item;
            valueToPush.quantity = 1;
            $scope.data.items.unshift(valueToPush);
            console.log("'" + $scope.data.item + "' added to list.");
            $scope.data.item = "";
        }
    };
    
    $scope.quantityPlus = function(item) {
        console.log("increasing quantity");
        $scope.data.items[item].quantity++;
     //  item.quantity++;
    };
    
    $scope.quantityMinus = function(item) {
        if($scope.data.items[item].quantity == 1){
            $scope.data.items.splice(item, 1);
        }
        else {
            $scope.data.items[item].quantity--;
        }
    };
})
   
.controller('bringSomethingCtrl', function($scope) {

})
      
.controller('peopleInvitedCtrl', function($scope) {

})
   
.controller('eventDetailsCtrl', function($scope) {

});
    