var express = require('express');
var bankController = require('../controllers/bankController');
var sessionHandler = require('../controllers/sessionHandler');
var router = express.Router();

var redirectLogin = sessionHandler.redirectLogin;

router.post('/login', bankController.login, function(req, res) {
    res.redirect('/employee/dashboard')
});

router.post('/signup', bankController.signup);

router.get('/getAllClients', [redirectLogin, bankController.getAllClients]);
router.get('/getAllEmployees', [redirectLogin, bankController.getAllEmployees]);

router.get('/dashboard', [redirectLogin, bankController.dashboard]);

router.post('/newClient', [redirectLogin, bankController.newClient]);
router.get('/updateClient', [redirectLogin, bankController.updateClient]);
router.get('/deleteClient', [redirectLogin, bankController.deleteClient]);

module.exports = router;