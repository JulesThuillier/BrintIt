angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
      
        
    .state('myEvents', {
      url: '/events',
      templateUrl: 'templates/myEvents.html',
      controller: 'myEventsCtrl',
      onEnter: function($state, $auth){
          if(!$auth.isAuthenticated()){
            $state.go('login');
          }
      }
    })
        
      
    
      
        
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl',
      onEnter: function($state, $auth){
          if($auth.isAuthenticated()){
            $state.go('events');
          }
      }
    })
        
      
    
      
        
    .state('signup', {
      url: '/signup',
      templateUrl: 'templates/signup.html',
      controller: 'signupCtrl'
    })
        
      
    
      
        
    .state('eventCreatorTab.createEvent', {
      url: '/createeventdetails',
      views: {
        'tab4': {
          templateUrl: 'templates/createEvent.html',
          controller: 'createEventCtrl'
        }
      }
    })
        
      
    
      
        
    .state('eventCreatorTab.createEventAddPeople', {
      url: '/createeventaddpeople',
      views: {
        'tab5': {
          templateUrl: 'templates/createEventAddPeople.html',
          controller: 'addPeopleCtrl'
        }
      }
    })
        
      
    
      
        
    .state('eventCreatorTab.thingsToBring', {
      url: '/createeventbringlist',
      views: {
        'tab6': {
          templateUrl: 'templates/createEventShoppingList.html',
          controller: 'thingsToBringCtrl'
        }
      }
    })
        
      
    
      
        
    .state('eventTab.bringSomething', {
      url: '/eventbringlist',
      views: {
        'tab3': {
          templateUrl: 'templates/bringSomething.html',
          controller: 'bringSomethingCtrl'
        }
      }
    })
        
      
    
      
    .state('eventTab', {
      url: '/eventtab',
      abstract:true,
      templateUrl: 'templates/eventTab.html'
    })
      
    
      
        
    .state('eventTab.peopleInvited', {
      url: '/eventpeople',
      views: {
        'tab2': {
          templateUrl: 'templates/peopleInvited.html',
          controller: 'peopleInvitedCtrl'
        }
      }
    })
        
      
    
      
        
    .state('eventTab.eventDetails', {
      url: '/eventdetails',
      views: {
        'tab1': {
          templateUrl: 'templates/eventDetails.html',
          controller: 'eventDetailsCtrl'
        }
      }
    })
        
      
    
      
    .state('eventCreatorTab', {
      url: '/eventcreatortab',
      abstract:true,
      templateUrl: 'templates/eventCreatorTab.html'
    })
      
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/events');

});