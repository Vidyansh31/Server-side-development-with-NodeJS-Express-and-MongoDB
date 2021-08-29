var express = require('express');
var bodyParser = require('body-parser');
var User = require('../models/user');
var passport = require('passport');


var router = express.Router();
router.use(bodyParser.json());
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/signup', (req, res, next) => {
  User.register(new User({ username: req.body.username }), req.body.password,
    (err, user) => {
      if (err) {
        res.statuscode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err: err });
      }
      else {
        passport.authenticate('local');
        res.statuscode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json({ success: true, status: "Registration succesful" });

      }
    }
  );
});

router.post('/login', passport.authenticate('local'), (req, res, next) => {
  res.statuscode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, status: "You logged in successfully!" });
});

router.post('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie("session-id");
    res.redirect('/')
  }
  else {
    var err = new Error("You are not Logged In");
    err.statuscode = 403;
    next(err);
  }
})

module.exports = router;
