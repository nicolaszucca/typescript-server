import { Sequelize } from 'sequelize';

const db = new Sequelize('node-users', 'root', '6486581', {
	host: 'localhost',
	dialect: 'mysql',
	// loggin: false,
});


export default db;