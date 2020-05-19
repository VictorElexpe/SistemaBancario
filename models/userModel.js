const Sequelize = require('sequelize');
const db = require('../db/connection');

const User = db.define('user', {
	id: {
		type: Sequelize.STRING,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
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
	},
	bankNumber: {
		type: Sequelize.STRING,
		allowNull: false
	},
	amount: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
});

module.exports = User;