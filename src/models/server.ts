import express, { Application } from 'express';
import cors from "cors";
import userRoutes from '../routes/user';
import db from '../db/connection';

type Paths = {
	users: string;
}

class Server {

	private app: Application;
	private port: String;
	private paths: Paths = {
		users: '/api/users'
	}

	constructor() {
		this.app = express();
		this.port = process.env.PORT || '8000';

		this.dbConnection();
		this.middlewares();
		this.routes();
	}
	async dbConnection() {
		try {
			await db.authenticate();
			console.log("Database online");
		} catch (error) {
			throw new Error('Error connecting to the database');
		}

	}
	middlewares() {
		this.app.use(cors());
		this.app.use(express.json());
		this.app.use(express.static('./src/public'));
	}

	routes() {
		this.app.use(this.paths.users, userRoutes);
	}
	listen() {
		this.app.listen(this.port, () => {
			console.log('Server on port', this.port);
		})
	}
}


export default Server