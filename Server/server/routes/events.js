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
/*  User.findOne({ email: req.body.email }, {}, function(err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email and/or password' });
    }
      console.log("User found " + user.password);
    bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
    //user.comparePassword(req.body.password, function(err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email and/or password' });
      }
      res.send({ token: createJWT(user) });
    });
  });*/
});


module.exports = router;
