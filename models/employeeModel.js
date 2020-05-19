const Sequelize = require('sequelize');
const db = require('../db/connection');

const BankEmployee = db.define('bankEmployee', {
    id: {
        type: Sequelize.STRING,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
    },
    employeeCode: {
        type: Sequelize.STRING,
        primaryKey: true,
		allowNull: false
    } ,
    firstName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	lastName: {
		type: Sequelize.STRING,
		allowNull: false
	},
	email: {
        type: Sequelize.STRING,
		primaryKey: true,
		allowNull: false
	},
	password: {
		type: Sequelize.STRING,
		allowNull: false
    }
});

module.exports = BankEmployee;