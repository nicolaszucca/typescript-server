import db from "../db/connection";

const { DataTypes } = require('sequelize');


const User = db.define('User', {
	// Model attributes are defined here
	name: {
		type: DataTypes.STRING,
		allowNull: false
	},
	email: {
		type: DataTypes.STRING
		// allowNull defaults to true
	},
	state: {
		type: DataTypes.TINYINT
	}
});

export default User;