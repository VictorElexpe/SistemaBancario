var express = require('express');
var clientController = require('../controllers/clientController');
var sessionHandler = require('../controllers/sessionHandler');
var router = express.Router();

var redirectLogin = sessionHandler.redirectLogin;

var session;

router.post('/login', clientController.login, function(req, res) {
    session = req.session;
    res.redirect('/client/dashboard');
});

router.get('/dashboard', [redirectLogin, clientController.dashboard]);

module.exports = router;