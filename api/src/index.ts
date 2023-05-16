import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express, { Express, Request, Response } from 'express';

import api from './routes';

import cors = require('cors');

dotenv.config();

const app: Express = express();
const port = process.env.API_PORT;

app.use(cors({ origin: '*' }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser('secretcode'));

app.use('/api', api);

app.get('/', (req: Request, res: Response) => {
    res.send('Api is on !');
});

app.listen(port, async () => {
    console.info(`⚡️[server]: Server is running at http://localhost:${port}`);
});
