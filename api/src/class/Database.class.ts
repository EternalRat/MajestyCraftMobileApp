import { Sequelize } from 'sequelize';

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
        Database._mysqlConnection = new Sequelize({
            host: process.env.DB_HOST,
            username: process.env.DB_USER,
            password: process.env.DB_PASS,
            dialect: 'mysql',
            logging: false,
        });
        Database._mysqlConnection
            .authenticate()
            .then(async () => {
                const newDatabase = await Database._mysqlConnection.query(
                    'CREATE DATABASE IF NOT EXISTS ' + process.env.DB_NAME + ';'
                );
                if (newDatabase) {
                    console.info('Database created');
                } else {
                    console.info('Database already exists');
                }
                console.info('Connection has been established successfully.');
            })
            .catch(reason => {
                console.error('Unable to connect to the database:');
                console.error(reason);
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
