import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express, NextFunction, Request, Response } from 'express';

import { Database } from './class/Database.class';
import api from './routes';
import { sync } from './utils/sync.db';
dotenv.config();

const app: Express = express();
const port = process.env.API_PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser('secretcode'));
app.use(cors({ origin: 'http://localhost:3000' }));

app.use('/api', api);
app.get('/', (req: Request, res: Response) => {
	res.send('API is running!');
});
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
	console.error(err.stack);
	res.status(500).send('Server error');
});

app.listen(port, () => {
	Database.getInstance();
	sync();
	console.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
