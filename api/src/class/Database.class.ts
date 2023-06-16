import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';

dotenv.config();

export class Database {
	public static _instance: Database;
	private static _mysqlConnection: Sequelize;

	constructor() {
		if (Database._instance) {
			throw new Error(
				'Error: Instantiation failed: Use Database.getInstance() instead of new.'
			);
		}
		console.info('Initializing Database');
		console.log(process.env.DB_NAME);
		Database._mysqlConnection = new Sequelize({
			database: process.env.DB_NAME,
			host: process.env.DB_HOST,
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			dialect: 'mysql',
			logging: false,
		});
		Database._mysqlConnection
			.sync()
			.then(() => {
				console.info('Database created if necessary !');
			})
			.catch(reason => {
				console.error('Unable to connect to the database:');
				console.error(reason);
			});
		Database._mysqlConnection.authenticate().then(() => {
			console.info('Database authenticated !');
		});
		console.info('Database initialized !');
	}

	public static getInstance(): Database {
		if (!Database._instance) {
			Database._instance = new Database();
		}
		return Database._instance;
	}

	public get mysqlConnection(): Sequelize {
		return Database._mysqlConnection;
	}
}
