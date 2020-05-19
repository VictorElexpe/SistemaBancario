require('dotenv').config()

var express = require('express');
var logger = require('morgan');
var helmet = require('helmet');
var session = require('express-session');

// Handles the database connection
var db = require('./db/connection');
db.sync();
db.authenticate()
    .then(() => console.log('Database connected...'))


var indexRouter = require('./routes/index');
var clientsRouter = require('./routes/clientRoutes');
var employeesRouter = require('./routes/employeeRoutes');

var app = express();

app.use(session({
    name: 'sid',
    resave: false,
    saveUninitialized: false,
    secret: 'ssshhhhh',
    cookie: {
        maxAge: 1000 * 60 * 60
    }
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet())
app.set('view engine', 'pug');

app.use('/', indexRouter);
app.use('/client', clientsRouter);
app.use('/employee', employeesRouter);

module.exports = app;