var express = require('express');
var router = express.Router();

/*
 * GET userlist. (all users)
 */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(error, objs){
        if (error) { res.send(400, error); }
        else { 
          if (req.accepts('html')) {
              res.render('userlist',{"userlist" : objs});
          } else {
              res.json(objs);
          }
        }
        
    });
});


/*
 * GET a user by its email
 */
router.get('/getuser', function(req, res) {
    var email = req.param('email');
    var db = req.db;
    var collection = db.get('usercollection');
    var checkForHexRegExp = new RegExp("^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,63}$");
            if (!checkForHexRegExp.test(email)) callback({error: "invalid user email"});
            else collection.findOne({"email": email},{},function(error, objs){
                if (error) { res.send(400, error); }
                else { 
                      if (req.accepts('html')) {
                          res.json(objs);
                      } else {
                          res.json(objs);
                      }
                    }
            });    
});

/*
 * GET events by user id (ethier invited or organiser)
 */
router.get('/geteventlist', function(req, res) {
    var user_id = req.param('organiser');
    var db = req.db;
    var collection = db.get('eventcollection');
    var checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
            if (!checkForHexRegExp.test(user_id)) callback({error: "invalid user id"});
            else collection.find( {$or: [ { "organiser": user_id }, { "invited.invited_id": user_id } ] },{},function(error, objs){
                if (error) { res.send(400, error); }
                else { 
                      if (req.accepts('html')) {
                          res.json(objs);
                      } else {
                          res.json(objs);
                      }
                    }
            });    
});


/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
}); 


/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    
    // Set our collection
    var collection = db.get('usercollection');

    // Get our form values. These rely on the "name" attributes
    var email = req.param('email');
    var firstname = req.param('firstname');
    var lastname = req.param('lastname');
    var phone = req.param('phone');
    var password = req.param('password');
    var oauththype = req.param('oauththype');
    
    // TODO: Check that user is not already in DB
    

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // And forward to success page
            res.redirect("userlist");
        }
    });
});



module.exports = router;