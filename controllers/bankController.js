const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const BankEmployee = require('../models/employeeModel');
const Client = require('../models/employeeModel');
const faker = require('faker/locale/es');

exports.signup = function(req, res) {
    const saltRounds = 10;
    var employeeCode = faker.random.number();
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;

    bcrypt.hash(password, saltRounds, function(err, hash) {
        BankEmployee.findOrCreate({
            where: {email: email},
            defaults: {
                employeeCode: employeeCode,
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash
            }
        })
        .then(([employee, created]) => {
            if(created == true) {
                req.session.userId = employee.Id,
                res.session.user = employee,
                res.redirect('/dashboard')
                res.send('Created')
            } else {
                res.send('Employee alredy in database')
            }
        })
        .catch(err => console.log(err))
    })
}

exports.login = function(req, res, next) {
    var email = req.body.email;
    var password = req.body.password;
    var hashedPassword = ""

    BankEmployee.findOne({ where: { email: email } }).then(employee => {        
        if (employee == null) {
            res.send('There\'s no employee with this email in the database')
        } else {
            hashedPassword = employee['dataValues']['password'];
            bcrypt.compare(password, hashedPassword, function(err, result) {
                if(result == true) {
                    req.session.userId = employee.id,
                    req.app.locals.user = employee.dataValues,
                    next()
                } else {
                    res.send('Wrong password')
                }
            })
        }
    })

}

exports.getAllClients = function(req, res, next) {
    User.findAll()
        .then( users => res.send(users))
        .catch(err => console.log(err))
}

exports.getAllEmployees = function(req, res, next) {
    BankEmployee.findAll()
        .then( users => res.send(users))
        .catch(err => console.log(err))
}

exports.newClient = function(req, res) {

    const saltRounds = 10;
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    var email = req.body.email;
    var password = req.body.password;
    var bankNumber = faker.finance.iban();
    var amount = faker.finance.amount();

    bcrypt.hash(password, saltRounds, function(err, hash) {
        User.findOrCreate({
            where: {email: email},
            defaults: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: hash,
                bankNumber: bankNumber,
                amount: amount
            }
        })
        .then(([user, created]) => {
            if(created == true) {
                res.send(user)
            } else {
                res.send('Client alredy in the system')
            }
        })
        .catch(err => console.log(err))
    })
}

exports.deleteClient = function(req, res) {
    Client.destroy({
        where: { id: req.app.locals.user.id }
    })
}

exports.updateClient = function(req, res) {

}

exports.dashboard = function(req, res) {
    res.send(req.app.locals.user)
}