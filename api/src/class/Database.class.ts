import dotenv from 'dotenv';
import {
	ConnectionError,
	ConnectionTimedOutError,
	Sequelize,
	TimeoutError,
} from 'sequelize';

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
	}

	public static getInstance(): Database {
		if (!Database._instance) {
			Database._instance = new Database();
			console.info('Initializing Database');
			Database._mysqlConnection = new Sequelize(
				process.env.DB_NAME!,
				process.env.DB_USER!,
				process.env.DB_PASS,
				{
					host: process.env.DB_HOST!,
					dialect: 'mysql',
					retry: {
						max: 10,
						match: [
							ConnectionError,
							ConnectionTimedOutError,
							TimeoutError,
							/Deadlock/i,
							'SQLITE_BUSY',
						],
					},
				}
			);
			Database._mysqlConnection.authenticate().then(() => {
				console.info('Database authenticated !');
			});

			console.info('Database initialized !');
		}
		return Database._instance;
	}

	public get mysqlConnection(): Sequelize {
		return Database._mysqlConnection;
	}
}
