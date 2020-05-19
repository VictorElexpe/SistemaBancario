var express = require('express');
var sessionHandler = require('../controllers/sessionHandler');
var router = express.Router();

var redirectHome = sessionHandler.redirectHome;

router.get('/', redirectHome, function(req, res) {
  res.send('Welcome to SSRbank');
});

router.get('/login', redirectHome, function(req, res) {
  res.send('This is the login page for both clients and users')
});

router.get('/signup', redirectHome, function(req, res) {
  res.send('This is the signup page for both clients and users')
});

router.get('/logout', sessionHandler.logout);

module.exports = router;