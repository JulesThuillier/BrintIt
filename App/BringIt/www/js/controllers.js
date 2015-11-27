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
   



.controller('createEventCtrl', function($scope, $rootScope, $ionicPopup, EventCreator) {
    

    $scope.details = {
        title: '',
        description: '',
        datetime: '',
        address: ''
    };
    
    var date = new Date();

  function timePickerCallback(val) {
      if (typeof (val) === 'undefined') {
        console.log('Time not selected');
      } else {
          
        var selectedTime = new Date(val * 1000);
        date.setUTCHours(selectedTime.getUTCHours());
        date.setUTCMinutes(selectedTime.getUTCMinutes());
          console.log(date.toJSON());
        $scope.details.datetime = date.getUTCDate() + '/'+ (date.getUTCMonth()+1) + '/'+ date.getUTCFullYear() + "   " + date.getUTCHours() + 'h'+ date.getUTCMinutes();
      }
  }
    
    
    $scope.slots = $rootScope.$new(true);
    $scope.slots.epochTime = 12600;
    $scope.slots.format = 24;
    $scope.slots.step = 15;
    $scope.slots.callback = timePickerCallback;
    $scope.slots.titleLabel = 'Select your time';  //Optional
    $scope.slots.setLabel = 'Set';  //Optional
    $scope.slots.closeLabel = 'Close2';  //Optional
    $scope.slots.setButtonType = 'button-positive';  //Optional
    $scope.slots.closeButtonType = 'button-stable';  //Optional
    
    
    var datePickerCallback = function (val) {
      if (typeof(val) === 'undefined') {
        console.log('No date selected');
      } else {
          
        date.setUTCFullYear(val.getUTCFullYear());
        date.setUTCMonth(val.getUTCMonth());
        date.setUTCDate(val.getUTCDate());
          
        $scope.details.datetime = date.getUTCDate() + '/'+ (date.getUTCMonth()+1) + '/'+ date.getUTCFullYear() + "   " + date.getUTCHours() + 'h'+ date.getUTCMinutes();
          
        showTimePicker($scope.slots, $ionicPopup);
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
        from: new Date(), //Optional
        to: new Date(2020, 8, 25),  //Optional
        callback: function (val) {  //Mandatory
            datePickerCallback(val);
        },
        dateFormat: 'dd-MM-yyyy', //Optional
        closeOnSelect: false //Optional
    };

    $scope.updateEvent = function() {
        EventCreator.title = $scope.details.title;
        EventCreator.descrition = $scope.details.descrition;
        EventCreator.date = date.toJson();
        EventCreator.address = $scope.details.address;
    };
    
    $scope.sendInvitations = function() {
        EventCreator.sendInvitations();
    }
})
   
.controller('addPeopleCtrl', function($scope, $cordovaContacts, $ionicPlatform, EventCreator) {
    
    $scope.data = {
        searchterm: '',
        contacts: [],
        contactsSelected: []
    };

    $scope.shouldShowDelete = false;
    $scope.listCanSwipe = true
    
    var contactsSelected = [];

    $scope.invite = function(contact) {
        contactsSelected.unshift(contact);
        $scope.data.contactsSelected = contactsSelected;
        EventCreator.addInvited(contact.displayName, contact.phoneNumbers[0].value);
    };
    
    $scope.uninvite = function(item){
      if(!item) return false;
      EventCreator.removeInvited(item);
      $scope.data.items.splice(item, 1);
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
    
 // TODO update find algorithm quality and return (displayname / first and last name, split multi phone number, email...)
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
  };

    
})
   
.controller('thingsToBringCtrl', function($scope, EventCreator) {
    $scope.data = {
        item: '',
        items: []
    };
    
    $scope.shouldShowDelete = true;
    $scope.shouldShowReorder = false;
    $scope.listCanSwipe = true
    
    // Add new item
    $scope.addItem = function() {
        if($scope.data.item != null && $scope.data.item != ""){
            var valueToPush = { };
            valueToPush.name = $scope.data.item;
            valueToPush.quantity = 1;
            $scope.data.items.unshift(valueToPush);
            console.log("'" + $scope.data.item + "' added to list.");
            $scope.data.item = "";
            
            EventCreator.addItemShoppingList(valueToPush.name, valueToPush.quantity);
        }
    };
    
    // Remove Item
    $scope.removeItem = function(item) {
        EventCreator.removeItemShoppingList(item);
        $scope.data.items.splice(item, 1);
    };
    
    // Increase item quantity
    $scope.quantityPlus = function(item) {
        console.log("increasing quantity");
        $scope.data.items[item].quantity++;
        EventCreator.updateItemQuantityShoppingList(item, $scope.data.items[item].quantity);
    };
    
    // Decrease item quantity
    $scope.quantityMinus = function(item) {
        if($scope.data.items[item].quantity == 1){
            EventCreator.removeItemShoppingList(item);
            $scope.data.items.splice(item, 1);
        }
        else {
            $scope.data.items[item].quantity--;
            EventCreator.updateItemQuantityShoppingList(item, $scope.data.items[item].quantity);
        }
    };
    
})
   
.controller('bringSomethingCtrl', function($scope) {

})
      
.controller('peopleInvitedCtrl', function($scope) {

})
   
.controller('eventDetailsCtrl', function($scope) {

});
    