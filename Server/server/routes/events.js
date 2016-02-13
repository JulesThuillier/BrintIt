var express = require('express');
var router = express.Router();

/* GET events listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/*
 |--------------------------------------------------------------------------
 | Generate Unique ID
 |--------------------------------------------------------------------------
 */

// TODO : make sure its unique (or when searching the event in /get, check if the event is not passed)
function generateUniqueId() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 6; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
}


/*
 |--------------------------------------------------------------------------
 | Create a Shadow User
 |--------------------------------------------------------------------------
 */

function createShadowUser(req, firstName, lastName, phone) {
    var db = req.db;
    var User = db.get('usercollection');
    
    // Check ther is no user with that phone number
    var myUser = findUserByPhone(req, phone);
      if(myUser){
          console.log("There was an error while creating a shadow user. Code : 1, user already exists");
          return myUser;
      }

        // Create a new user
        User.insert({
            "firstName" : firstName,
            "lastName": lastName,
            "phone": phone,
            "type": "shadowUser"
        }, function(err, result) {
          if (err) {
              console.log("There was an error while creating a shadow user. Code : 2");
              return;
          }
            // Return the created user
            console.log("User created " + result._id);
            return result;
        });
}


/*
 |--------------------------------------------------------------------------
 | Find a User by its phone number
 |--------------------------------------------------------------------------
 */
function findUserByPhone(req, phone){
    var db = req.db;
    var User = db.get('usercollection');
    User.findOne({ phone: phone }, function(err, existingUser) {
        if (existingUser) {
          console.log("User found by phone");
          return existingUser;
        }
    });
}

/*
 |--------------------------------------------------------------------------
 | Create new event
 |--------------------------------------------------------------------------
 */
router.post('/new', function(req, res) {
    console.log("Hello New Event : ");
    var db = req.db;
    var Events = db.get('eventcollection');
    var User = db.get('usercollection');
    console.log(req.body);
    
    var data = req.body;
    
    var title = data.title;
    var description = data.description;
    var address = data.address;
    var date = data.date;
    var invited = data.people;
    var shoppingList = data.shoppingList;
        
    var invitedList = [{}];
    var smsInvitation = [{
      user_id: '',
      phone: '',
      token: '', 
    }];
      
    for (var i = 0; i < invited.length; i++) {
        var firstName = invited[i].firstName;
        var lastName = invited[i].lastName;
        var phone = invited[i].phone; 
	console.log(phone);        
        // We are checking if the user is in the database
        var user = findUserByPhone(req, phone);
	console.log(user._id);        
        // If not we create a shadow user
        if(!user){
            user = createShadowUser(req, firstName, lastName, phone);
        }
        
        // Create a unique token for shadow user to invite them via SM
	var type = user.firstName;

        if(type){
	if(type == "shadowUser"){
            var newSMSInvitation = {};
            newSMSInvitation.user_id = user._id;
            newSMSInvitation.phone = user.phone;
            newSMSInvitation.token = generateUniqueId();
            smsInvitation.push(newSMSInvitation); 
            
            // List all users ids in the event
	    var newInvitation = {};
            newInvitation.id = user._id;
            newInvitation.token = newSMSInvitation.token;
            invitedList.push(newInvitation);
        }}
        else {
            // List all users ids in the event
	    var newInvitation = {};
            newInvitation.id = user._id;
            invitedList.push(newInvitation);
        }        
    }
    
    // Add Event to DB
    Events.insert({
        "title": title,
        "description": description,
        "address": address,
        "date": date,
        "invited": invitedList,
        "shoppingList": shoppingList
    }, function (err, result) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the event to the database.");
        }
        else {
            return res.send(smsInvitation);      
        }
    });
});


/*
 |--------------------------------------------------------------------------
 | Get list of event
 |--------------------------------------------------------------------------
 */
router.get('/list', function(req, res, next) {
    
  var id = req.body.user_id;
  var db = req.db;
  var Events = db.get('eventcollection');
// TODO: correct the search
  User.findOne({ email: req.body.email }, {}, function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email and/or password' });
    }
  res.send('respond with a resource');
  });
});


/*
 |--------------------------------------------------------------------------
 | Get an event
 |--------------------------------------------------------------------------
 */
router.get('/get/:id', function(req, res, next) {
    var eventid = req.params.id;
    console.log(eventid);  

    var db = req.db;
    var Events = db.get('eventcollection');
    
// TODO: Get all events with this ID in case other events have same ID. Check Date
  Events.findOne({ invited: {token: eventid}}, function(err, event) {
    if (!event) {
      return res.status(401).send({ message: 'Event not found' });
    }
    return res.send(event);
  }); 
});

/*
 |--------------------------------------------------------------------------
 | Update an event
 |--------------------------------------------------------------------------
 */
router.put('/update', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
