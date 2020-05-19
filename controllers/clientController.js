const bcrypt = require('bcrypt');
const Client = require('../models/userModel');

exports.login = function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var hashedPassword = ""

    Client.findOne({ where: { email: email } }).then(client => {        
        if (client == null) {
            res.send('There\'s no client with this email in the database');
        } else {
            hashedPassword = client['dataValues']['password'];
            bcrypt.compare(password, hashedPassword, function(err, result) {
                if(result == true) {                                         
                    req.session.userId = client.id,
                    req.app.locals.user = client.dataValues,  
                    next()                 
                } else {
                    res.send('Wrong password')
                }
            })
        }
    })
}

exports.dashboard = function(req, res) {
    res.render('dashboard', { user: req.app.locals.user });
}