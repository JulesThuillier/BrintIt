var express = require('express');
var router = express.Router();
var page = 1;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
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

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

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

/* POST to Add User Service */
router.post('/login', function(req, res) {
	page = 1;
    // Set our internal DB variable
    var db = req.db;
//    console.log(req);
    console.log("Hello login");
    
    res.status(200).end();
});


router.get('/ambisense', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    console.log(req);
    console.log("WELCOME AMBISENSE");
    
    res.status(200).end();
});


router.post('/simple_action', function(req, res) {

    // Set our internal DB variable
    var db = req.db;
    console.log(req.body);
    console.log("Hello Simple Action");
    console.log(req.body.type)
    res.status(200);
    res.json({
      "page_no": 3,
       "footer_on" : "yes",
       "screen_black" : "no",
       "4x4_on" : "yes"
    });
});

/* POST to Add User Service */

router.get('/time', function(req, res) {

    // Set our internal DB variable
    console.log(req.body);
    console.log("Hello Time :");
    res.status(200);
    res.json({
      "seconds": 11,
    });
	//res.render('seconds',10).end();
});

router.get('/available_comments', function(req, res) {

    // Set our internal DB variable
    console.log(req.body);
    console.log("Hello Time :");
 //   res.status(200);
//	res.setHeader('Content-Type', 'application/json');
//    res.send(JSON.stringify({"from":"JOhn doe", "message":"Comment fait on les bebes ?"}, {"from":"sarah connor", "message":"avec des cigognes"}));
/*	res.status(200).json(JSON.stringify([{
        "from": "Msg1",
        "message": "desc Msg1"
    }, {
        "from": "Msg4",
        "message": "desc Msg4"
    }]));*/
    res.status(200);
    res.json({"list":[{"from":"JOhn doe", "message":"Comment fait on les bebes ?"}, 
		{"from":"sarah connor", "message":"avec des cigognes"}]});		
        //res.render('seconds',10).end();
});

router.post('/vote_settings', function(req, res) {

    // Set our internal DB variable
    console.log(req.body);
    console.log("Hello Vote settings :");

    res.status(200).end();
});

router.post('/question', function(req, res) {

    // Set our internal DB variable
    console.log(req.body);
    console.log("Hello Question :");

    res.status(401).end();
});

router.post('/interaction_settings', function(req, res) {

    // Set our internal DB variable
    console.log(req.body);
    console.log("Hello Interactions :");

    res.status(200).end();
});

router.post('/logout', function(req, res) {

    // Set our internal DB variable
    console.log(req.body);
    console.log("Hello Logout:");

    res.status(200).end();
});

router.post('/brightness', function(req, res) {

    // Set our internal DB variable
    console.log(req.body);
    console.log("Hello Brightness");

    res.status(200).end();
});

router.post('/pointer', function(req, res) {

    // Set our internal DB variable
    console.log(req.body);
    console.log("Hello Pointer");

    res.status(200).end();
});

router.post('/comment', function(req, res) {

    // Set our internal DB variable
    console.log(req.body);
    console.log("Hello Comment:");

    res.status(401).end();
});

router.delete('/comment', function(req, res) {

    // Set our internal DB variable
    console.log(req.body);
    console.log("Hello DEL Comment:");

    res.status(401).end();
});

router.post('/interaction_settings', function(req, res) {

    // Set our internal DB variable
    console.log(req.body);
    console.log("Hello Interactions :");

    res.status(200).end();
});

router.post('/contrast', function(req, res) {

    // Set our internal DB variable
    console.log(req.body);
    console.log("Hello Contrast :");

    res.status(200).end();
});

router.post('/brightness', function(req, res) {

    // Set our internal DB variable
    console.log(req.body);
    console.log("Hello Brightnes :");

    res.status(200).end();
});

router.post('/pointer', function(req, res) {

    // Set our internal DB variable
    console.log(req.body);
    console.log("POINTER:");

    res.status(200).end();
});


module.exports = router;
