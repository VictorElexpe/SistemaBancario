var express = require('express');
var sessionHandler = require('../controllers/sessionHandler');
var router = express.Router();

var redirectHome = sessionHandler.redirectHome;

router.get('/', redirectHome, function(req, res) {
  res.render('index')
});

router.get('/login', redirectHome, function(req, res) {  
  res.render('login')
});

router.get('/signup', redirectHome, function(req, res) {
  res.render('signup')
});

router.get('/logout', sessionHandler.logout);

module.exports = router;