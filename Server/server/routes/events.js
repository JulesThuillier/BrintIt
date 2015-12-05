var express = require('express');
var router = express.Router();

/* GET events listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});


/*
 |--------------------------------------------------------------------------
 | Create new event
 |--------------------------------------------------------------------------
 */
router.post('/new', function(req, res) {
    console.log("Hello New Event : ");
    var db = req.db;
    var Events = db.get('eventcollection');
    console.log(req.body);
    
    //TODO : insert in DB, generate token, search for other users...
    
     // Submit to the DB
    Events.insert({
        req.body
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the event to the database.");
        }
        else {
            // And forward to success page
            res.send("Event added to Database");
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
    var eventid = request.params.id;
    console.log(eventid);
    return res.status(401).send({ message: 'Event Id' : eventid });
  /*  
  var id = req.body.user_id;
  var db = req.db;
  var Events = db.get('eventcollection');
// TODO: correct the search
  User.findOne({ email: req.body.email }, {}, function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email and/or password' });
    }
  res.send('respond with a resource');
  });*/
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
